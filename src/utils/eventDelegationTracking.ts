// Event delegation tracking system following user specifications

// Generate session ID
function getSessionId() {
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
    const payload = {
      sessionId,
      eventType,
      details: {
        ...details,
        timestamp: new Date().toISOString(),
      },
    };

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

// Initialize event delegation tracking
export const initializeEventDelegationTracking = () => {
  const form = document.getElementById("adventureForm");
  if (!form) {
    console.warn("Adventure form not found, skipping event delegation setup");
    return;
  }

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

  // Track page load/reload
  window.addEventListener("load", () => {
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const evt = nav?.type === "reload" ? "pageReload" : "pageLoad";
    trackEvent(evt);
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

  console.log("Event delegation tracking initialized");
};
