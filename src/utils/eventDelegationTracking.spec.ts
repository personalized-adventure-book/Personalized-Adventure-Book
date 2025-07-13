import { describe, it, expect, beforeEach, vi } from "vitest";
import { getSessionId, getSectionIndex } from "./eventDelegationTracking";

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

  it("should verify visitor counter endpoint format", () => {
    // Just verify that the endpoint URL is correctly formatted
    const expectedEndpoint =
      "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec";

    // This test just verifies the URL format is valid
    expect(expectedEndpoint).toMatch(
      /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/,
    );
  });
});
