// Event delegation tracking system following user specifications

// Generate session ID
export function getSessionId() {
  const key = "adv_sessionId";
  let sid = localStorage.getItem(key);

  // only generate once if it doesn't already exist
  if (!sid) {
    // e.g. "2025-07-12T03:51:55.334Z" → "2025-07-12-03-51-55-334-"
    const now = new Date()
      .toISOString()
      .replace(/[:.TZ]/g, "-")
      .replace(/-$/, "");
    const suffix = String(Math.floor(Math.random() * 900 + 100));
    sid = `${now}-${suffix}`; // e.g. "2025-07-12-03-51-55-334-289"
    localStorage.setItem(key, sid);
  }

  return sid;
}

const sessionId = getSessionId();

// Human detection
export const detectHuman = () => {
  localStorage.setItem("adv_humanDetected", "true");
};

// Track events to Google Apps Script
export const trackEvent = async (eventType: string, details: any = {}) => {
  try {
    // Format timestamp as [YYYY-MM-DD HH:mm:ss]
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace("T", " ");

    // Create simple formatted message
    const detailsJson =
      Object.keys(details).length > 0 ? JSON.stringify(details) : "{}";
    const message = `[${timestamp}] ${eventType} ${detailsJson}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: message,
      },
    );

    // Log the message for debugging
    console.log("📊", message);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// Helper to figure out section index (1-based, or 0 for the main form)
export function getSectionIndex(el: Element): number {
  const secs = Array.from(document.querySelectorAll(".adventure-section"));
  const sec = el.closest(".adventure-section");
  return sec
    ? secs.indexOf(sec) + 1 // first adventure is 1, second is 2…
    : 0; // everything else is section 0
}

// Helper function to get element identifier
function getElementId(element: HTMLElement): string {
  return (
    element.name ||
    element.id ||
    element.getAttribute("placeholder") ||
    "unknown"
  );
}

// Separate function to set up event listeners
function setupEventListeners(form: Element) {
  console.log("🔧 Setting up form event listeners...");

  // Delegate focus events
  form.addEventListener("focusin", (e) => {
    const t = e.target as HTMLElement;
    if (t.matches("input, textarea, select")) {
      detectHuman();
      trackEvent("focus", {
        field: getElementId(t),
        section: getSectionIndex(t),
      });
    }
  });

  // Delegate typing events, but only when there's some non-empty content
  form.addEventListener("input", (e) => {
    const t = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (!t.matches('input:not([type="file"]), textarea, select')) return;

    const val = t.value.trim();
    if (!val) return; // still skip empty

    // build the "details" object
    const details: any = {
      field: getElementId(t),
      section: getSectionIndex(t),
    };

    // if this is the email field, also send the value
    const elementId = getElementId(t).toLowerCase();
    if (elementId.includes("email")) {
      details.value = val;
    }

    detectHuman();
    trackEvent("input", details);
  });

  // Delegate file-picker changes
  form.addEventListener("change", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.matches('input[type="file"]')) {
      trackEvent("change", {
        field: getElementId(t) || "images",
        section: getSectionIndex(t),
        count: t.files?.length || 0,
      });
    }
  });

  // Track form submission
  const createBookBtn = document.getElementById("createBookBtn");
  if (createBookBtn) {
    createBookBtn.addEventListener("click", () => {
      trackEvent("submit essay", {
        adventureCount: document.querySelectorAll(".adventure-section").length,
      });
    });
  }

  console.log("✅ Form event listeners set up successfully");
}

// Initialize event delegation tracking
export const initializeEventDelegationTracking = () => {
  console.log("🔧 Initializing event delegation tracking...");

  const form = document.getElementById("adventureForm");
  if (!form) {
    console.warn(
      "❌ Adventure form not found, skipping event delegation setup",
    );
    // Try again after a short delay
    setTimeout(() => {
      console.log("🔄 Retrying event delegation setup...");
      const retryForm = document.getElementById("adventureForm");
      if (retryForm) {
        console.log("✅ Adventure form found on retry!");
        setupEventListeners(retryForm);
      } else {
        console.error("❌ Adventure form still not found after retry");
      }
    }, 500);
    return;
  }

  console.log("✅ Adventure form found, setting up event listeners");
  setupEventListeners(form);
};

// Track page load/reload (global events - run immediately when module loads)
window.addEventListener("load", () => {
  console.log("🔄 Page load event triggered");
  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  const evt = nav?.type === "reload" ? "pageReload" : "pageLoad";

  console.log(`📊 Tracking ${evt} event`);
  // Send empty object as requested
  trackEvent(evt, {});
});

// ▶︎ visitor-counter ping (global event - run immediately when module loads)
window.addEventListener("load", () => {
  // detectHuman(); // Removed automatic human detection on page load
  console.log("i entered");
  fetch(
    "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec",
    {
      method: "GET",
      mode: "no-cors", // we don't care about the response body
    },
  )
    .then(() => console.log("✅ Visit counted"))
    .catch((err) => console.warn("Visitor ping failed", err));
  console.log("i am out");
});
