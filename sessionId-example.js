// Example of how the new getSessionId function works

// Example: new Date().toISOString() returns: "2025-01-15T10:30:55.334Z"

// Step by step transformation:
// 1. Original: "2025-01-15T10:30:55.334Z"
// 2. Replace : with -: "2025-01-15T10-30-55.334Z"
// 3. Replace . with -: "2025-01-15T10-30-55-334Z"
// 4. Replace T with -: "2025-01-15-10-30-55-334Z"
// 5. Replace Z with -: "2025-01-15-10-30-55-334-"
// 6. Trim trailing -: "2025-01-15-10-30-55-334"
// 7. Add random 3-digit: "2025-01-15-10-30-55-334-289"

// Final result format: 2025-01-15-10-30-55-334-289

function exampleGetSessionId() {
  let sessionId = localStorage.getItem("adv_sessionId");
  if (!sessionId) {
    // Create session ID from current timestamp
    const isoString = new Date().toISOString();
    console.log("1. ISO String:", isoString);

    // Replace all :, ., T, and Z with -
    let formattedId = isoString
      .replace(/:/g, "-")
      .replace(/\./g, "-")
      .replace(/T/g, "-")
      .replace(/Z/g, "-");
    console.log("2. After replacements:", formattedId);

    // Trim any trailing dash
    formattedId = formattedId.replace(/-$/, "");
    console.log("3. After trimming:", formattedId);

    // Append hyphen plus random three-digit number
    const randomNum = Math.floor(Math.random() * 900) + 100; // Ensures 3 digits (100-999)
    sessionId = `${formattedId}-${randomNum}`;
    console.log("4. Final sessionId:", sessionId);

    localStorage.setItem("adv_sessionId", sessionId);
  }
  return sessionId;
}

// Example outputs:
// 2025-01-15-10-30-55-334-789
// 2025-01-15-14-22-18-567-123
// 2025-01-16-09-15-42-890-456
