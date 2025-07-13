// ▶︎ Google Apps Script endpoint
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec';

// ------------------------------
// Session-ID Generation
// ------------------------------
export function getSessionId() {
  const key = 'adv_sessionId';
  let sid = localStorage.getItem(key);

  if (!sid) {
    // e.g. "2025-07-12T03:51:55.334Z" → "2025-07-12-03-51-55-334"
    const now = new Date()
      .toISOString()
      .replace(/[:.TZ]/g, '-')
      .replace(/-$/, '');
    const suffix = String(Math.floor(Math.random() * 900 + 100));
    sid = `${now}-${suffix}`;  // e.g. "2025-07-12-03-51-55-334-289"
    localStorage.setItem(key, sid);
  }

  return sid;
}
const sessionId = getSessionId();

// ------------------------------
// Human-detection Gate
// ------------------------------
export const detectHuman = () => {
  localStorage.setItem('adv_humanDetected', 'true');
};

// ------------------------------
// Core Tracking Function
// ------------------------------
export const trackEvent = async (eventType, details = {}) => {
  try {
    // Build the JSON payload your Apps Script expects
    const payload = { sessionId, eventType, details };
    console.log('📊 sending payload:', payload);

    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    console.log('✅ event tracked');
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// ------------------------------
// Helpers for Form Tracking
// ------------------------------
export function getSectionIndex(el) {
  const secs = Array.from(document.querySelectorAll('.adventure-section'));
  const sec = el.closest('.adventure-section');
  return sec ? secs.indexOf(sec) + 1 : 0;
}

function getElementId(element) {
  return element.name || element.id || element.getAttribute('placeholder') || 'unknown';
}

// ------------------------------
// Set Up Event Delegation
// ------------------------------
function setupEventListeners(form) {
  console.log('🔧 Setting up form event listeners...');

  // Focus events
  form.addEventListener('focusin', e => {
    const t = e.target;
    if (t.matches('input, textarea, select')) {
      detectHuman();
      trackEvent('focus', {
        field: getElementId(t),
        section: getSectionIndex(t),
      });
    }
  }, true);

  // Input events
  form.addEventListener('input', e => {
    const t = e.target;
    if (!t.matches('input:not([type="file"]), textarea, select')) return;

    const val = t.value.trim();
    if (!val) return;

    const details = {
      field: getElementId(t),
      section: getSectionIndex(t),
    };
    if (/email/i.test(getElementId(t))) {
      details.value = val;
    }

    detectHuman();
    trackEvent('input', details);
  });

  // File-picker changes
  form.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('input[type="file"]')) {
      detectHuman();
      trackEvent('change', {
        field: getElementId(t),
        section: getSectionIndex(t),
        count: t.files?.length || 0,
      });
    }
  });

  // Submit button click
  const createBookBtn = document.getElementById('createBookBtn');
  if (createBookBtn) {
    createBookBtn.addEventListener('click', () => {
      detectHuman();
      trackEvent('submit essay', {
        adventureCount: document.querySelectorAll('.adventure-section').length,
      });
    });
  }

  console.log('✅ Form event listeners set up successfully');
}

export const initializeEventDelegationTracking = () => {
  console.log('🔧 Initializing event delegation tracking...');

  const form = document.getElementById('adventureForm');
  if (form) {
    console.log('✅ Adventure form found, setting up listeners');
    setupEventListeners(form);
  } else {
    console.warn('❌ Adventure form not found, retrying...');
    setTimeout(() => {
      const retry = document.getElementById('adventureForm');
      if (retry) {
        console.log('✅ Adventure form found on retry');
        setupEventListeners(retry);
      } else {
        console.error('❌ Adventure form still not found');
      }
    }, 500);
  }
};

// ------------------------------
// Page-load & Visitor Ping
// ------------------------------
window.addEventListener('load', () => {
  // PageLoad vs PageReload
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const evt = nav.type === 'reload' ? 'pageReload' : 'pageLoad';
  console.log(`📊 Tracking ${evt}`);
  detectHuman();
  trackEvent(evt, {});

  // Visitor-counter ping
  console.log('🔄 Visitor ping');
  fetch(GAS_URL, { method: 'GET', mode: 'no-cors' })
    .then(() => console.log('✅ Visit counted'))
    .catch(err => console.warn('Visitor ping failed', err));
});

// Kick off form tracking
initializeEventDelegationTracking();
