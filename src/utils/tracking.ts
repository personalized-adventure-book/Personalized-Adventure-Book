// Global event tracking system for the entire website

// Session management
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem("trackingSessionId");
  if (!sessionId) {
    sessionId =
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("trackingSessionId", sessionId);
  }
  return sessionId;
};

// Human detection
export const detectHuman = () => {
  sessionStorage.setItem("humanDetected", "true");
};

// Main tracking function - simplified to capture only essential user actions
export const trackEvent = async (eventType: string, details: any = {}) => {
  try {
    const payload = {
      sessionId: getSessionId(),
      eventType,
      details: {
        action: details.action || eventType,
        input: details.input || details.value || "",
        field: details.field || "",
        button: details.button || "",
        focus: details.focus || "",
        timestamp: new Date().toISOString(),
      },
    };

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
    console.error("Error tracking event:", error);
  }
};

// Initialize website-wide tracking
export const initializeTracking = () => {
  // Track page load immediately
  trackEvent("pageLoad", {
    action: "pageLoad",
    input: window.location.pathname,
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
