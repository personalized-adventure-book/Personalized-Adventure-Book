import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getSessionId,
  getSectionIndex,
  trackEvent,
} from "./eventDelegationTracking";

describe("Event Delegation Tracking", () => {
  beforeEach(() => {
    // Setup basic DOM structure
    document.body.innerHTML = `
      <div id="adventureForm">
        <input name="parentName" id="parentName" />
        <input name="email" id="email" type="email" />
        <div class="adventure-section">
          <input name="experienceTitle" />
          <textarea name="experienceDescription"></textarea>
        </div>
        <div class="adventure-section">
          <input name="experienceTitle2" />
        </div>
        <button id="createBookBtn">Create Book</button>
      </div>
    `;
  });

  it("should generate session ID with correct format", () => {
    // Clear localStorage
    localStorage.removeItem("adv_sessionId");

    const sessionId = getSessionId();

    // Should match format like "2025-01-16-20-02-30-123-456"
    expect(sessionId).toMatch(
      /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}-\d{3}$/,
    );

    // Should store in localStorage
    expect(localStorage.getItem("adv_sessionId")).toBe(sessionId);

    // Should return same ID on subsequent calls
    const sessionId2 = getSessionId();
    expect(sessionId2).toBe(sessionId);
  });

  it("should correctly identify section indices", () => {
    const mainInput = document.getElementById("parentName")!;
    const exp1Input = document.querySelector(
      '.adventure-section input[name="experienceTitle"]',
    )! as Element;
    const exp2Input = document.querySelector(
      ".adventure-section:nth-child(4) input",
    )! as Element;

    // Test section index calculation
    expect(getSectionIndex(mainInput)).toBe(0); // Main form
    expect(getSectionIndex(exp1Input)).toBe(1); // First adventure section
    expect(getSectionIndex(exp2Input)).toBe(2); // Second adventure section
  });

  it("should send JSON payload correctly", () => {
    // Mock fetch to capture the payload format
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    // Mock console.log to capture debug output
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    // Test tracking with details
    trackEvent("input", {
      field: "email",
      section: 0,
      value: "test@gmail.com",
    });

    // Should have called fetch with JSON payload
    expect(mockFetch).toHaveBeenCalledWith(
      "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec",
      expect.objectContaining({
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: expect.stringContaining("sessionId"),
      }),
    );

    // Parse the body to verify structure
    const call = mockFetch.mock.calls[0];
    const payload = JSON.parse(call[1].body);
    expect(payload).toEqual({
      sessionId: expect.any(String),
      eventType: "input",
      details: { field: "email", section: 0, value: "test@gmail.com" },
    });

    // Test tracking with empty details
    trackEvent("pageLoad", {});
    const call2 = mockFetch.mock.calls[1];
    const payload2 = JSON.parse(call2[1].body);
    expect(payload2).toEqual({
      sessionId: expect.any(String),
      eventType: "pageLoad",
      details: {},
    });

    // Cleanup
    consoleSpy.mockRestore();
  });
});
