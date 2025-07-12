// Global event tracking system for the entire website

// Session management
export const getSessionId = () => {
  let sessionId = localStorage.getItem("adv_sessionId");
  if (!sessionId) {
    // Create session ID from current timestamp
    const isoString = new Date().toISOString();

    // Replace all :, ., T, and Z with -
    let formattedId = isoString
      .replace(/:/g, "-")
      .replace(/\./g, "-")
      .replace(/T/g, "-")
      .replace(/Z/g, "-");

    // Trim any trailing dash
    formattedId = formattedId.replace(/-$/, "");

    // Append hyphen plus random three-digit number
    const randomNum = Math.floor(Math.random() * 900) + 100; // Ensures 3 digits (100-999)
    sessionId = `${formattedId}-${randomNum}`;

    localStorage.setItem("adv_sessionId", sessionId);
  }
  return sessionId;
};

// Human detection
export const detectHuman = () => {
  sessionStorage.setItem("humanDetected", "true");
};

// Store events locally for batching
let eventQueue: any[] = [];
let lastSentTime = Date.now();
const BATCH_INTERVAL = 3000; // Send events every 3 seconds
const MAX_QUEUE_SIZE = 10; // Or when queue reaches 10 events
let isInitialized = false;

// Main tracking function - batches events per session
export const trackEvent = async (eventType: string, details: any = {}) => {
  try {
    const event = {
      action: details.action || eventType,
      input: details.input || details.value || "",
      field: details.field || "",
      button: details.button || "",
      focus: details.focus || "",
      timestamp: new Date().toISOString(),
    };

    // Add event to queue
    eventQueue.push(event);
    console.log(`Event queued: ${eventType}, Queue size: ${eventQueue.length}`);

    // Send if queue is full or enough time has passed
    const now = Date.now();
    if (
      eventQueue.length >= MAX_QUEUE_SIZE ||
      now - lastSentTime >= BATCH_INTERVAL
    ) {
      console.log(`Sending batch: ${eventQueue.length} events`);
      await sendEventBatch();
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// Send all queued events for this session
const sendEventBatch = async () => {
  if (eventQueue.length === 0) return;

  try {
    const payload = {
      sessionId: getSessionId(),
      eventType: "sessionEvents", // Special type for batched events
      details: {
        events: [...eventQueue], // All events for this session
        eventCount: eventQueue.length,
        sessionStart:
          sessionStorage.getItem("sessionStart") || new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
      },
    };

    // Clear queue and update time
    eventQueue = [];
    lastSentTime = Date.now();

    // Store session start time if not exists
    if (!sessionStorage.getItem("sessionStart")) {
      sessionStorage.setItem("sessionStart", new Date().toISOString());
    }

    // Send to Google Apps Script
    await fetch(
      "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      },
    );
  } catch (error) {
    console.error("Error sending event batch:", error);
  }
};

// Send remaining events when user leaves page
const sendFinalBatch = () => {
  if (eventQueue.length > 0) {
    // Use sendBeacon for reliable delivery when page unloads
    const payload = {
      sessionId: getSessionId(),
      eventType: "sessionEvents",
      details: {
        events: [...eventQueue],
        eventCount: eventQueue.length,
        sessionStart:
          sessionStorage.getItem("sessionStart") || new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        sessionEnd: true,
      },
    };

    navigator.sendBeacon(
      "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec",
      JSON.stringify(payload),
    );

    eventQueue = [];
  }
};

// Initialize website-wide tracking
export const initializeTracking = () => {
  if (isInitialized) {
    console.log("Tracking already initialized");
    return;
  }

  isInitialized = true;
  console.log("Initializing tracking system");

  // Track page load immediately
  trackEvent("pageLoad", {
    action: "pageLoad",
    input: window.location.pathname,
  });

  // Send events periodically
  setInterval(() => {
    if (eventQueue.length > 0) {
      console.log(`Periodic send: ${eventQueue.length} events`);
      sendEventBatch();
    }
  }, BATCH_INTERVAL);

  // Send final batch when page unloads
  window.addEventListener("beforeunload", sendFinalBatch);
  window.addEventListener("pagehide", sendFinalBatch);

  // Send batch when user becomes inactive
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && eventQueue.length > 0) {
      console.log("Page hidden, sending batch");
      sendEventBatch();
    }
  });

  // Track all focus events
  document.addEventListener(
    "focusin",
    (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("input, textarea, select")) {
        const field =
          target.getAttribute("name") ||
          target.getAttribute("id") ||
          target.getAttribute("placeholder") ||
          "input";
        detectHuman();
        trackEvent("focus", {
          focus: field,
          action: "focus",
        });
      }
    },
    true,
  );

  // Track all input changes (typing)
  document.addEventListener(
    "input",
    (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.matches('input:not([type="file"]), textarea')) {
        const field =
          target.getAttribute("name") ||
          target.getAttribute("id") ||
          target.getAttribute("placeholder") ||
          "input";
        detectHuman();
        trackEvent("input", {
          field: field,
          input: target.value || "",
          action: "input",
        });
      }
    },
    true,
  );

  // Track select changes and file uploads
  document.addEventListener(
    "change",
    (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.matches('input[type="file"]')) {
        detectHuman();
        trackEvent("fileUpload", {
          action: "fileUpload",
          input: `${target.files?.length || 0} files`,
          field: "file",
        });
      } else if (target.matches("select")) {
        const field =
          target.getAttribute("name") || target.getAttribute("id") || "select";
        detectHuman();
        trackEvent("select", {
          field: field,
          input: target.value || "",
          action: "select",
        });
      }
    },
    true,
  );

  // Track all button clicks and link clicks
  document.addEventListener(
    "click",
    (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.matches(
          'button, .btn, [role="button"], a[href], input[type="submit"], input[type="button"]',
        ) &&
        !target.closest("[data-no-track]")
      ) {
        const buttonText =
          target.getAttribute("data-action") ||
          target.textContent?.trim() ||
          target.getAttribute("aria-label") ||
          target.getAttribute("title") ||
          target.getAttribute("href") ||
          "button";

        detectHuman();
        trackEvent("click", {
          button: buttonText,
          action: "click",
        });
      }
    },
    true,
  );

  // Track form submissions
  document.addEventListener(
    "submit",
    (e: Event) => {
      const target = e.target as HTMLFormElement;
      const formName =
        target.getAttribute("name") || target.getAttribute("id") || "form";

      detectHuman();
      trackEvent("formSubmit", {
        action: "formSubmit",
        input: formName,
      });
    },
    true,
  );
};
