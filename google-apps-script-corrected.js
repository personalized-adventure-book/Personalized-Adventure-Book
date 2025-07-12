/**
 * CORRECTED Google Apps Script code to handle batched session events
 * This ensures same session events go to the same row and get appended
 */

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    console.log("Received payload:", JSON.stringify(payload, null, 2));

    // Handle regular order submissions (existing code)
    if (!payload.eventType) {
      return saveOrder(payload);
    }

    // Handle batched session events
    if (payload.eventType === "sessionEvents") {
      return saveSessionEvents(payload);
    }

    // Handle other individual events (fallback)
    return saveEvent(payload);
  } catch (error) {
    console.error("Error in doPost:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveSessionEvents(payload) {
  const SHEET_ID = "YOUR_SHEET_ID"; // Replace with your actual sheet ID
  const EVENTS_SHEET_NAME = "Events";

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let eventsSheet = ss.getSheetByName(EVENTS_SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!eventsSheet) {
      eventsSheet = ss.insertSheet(EVENTS_SHEET_NAME);
      eventsSheet.appendRow([
        "SessionID",
        "SessionStart",
        "LastUpdate",
        "EventCount",
        "Actions",
        "Inputs",
        "Buttons",
        "Fields",
        "Focus",
        "Timeline",
      ]);

      // Format header row
      const headerRange = eventsSheet.getRange(1, 1, 1, 10);
      headerRange.setBackground("#4285f4");
      headerRange.setFontColor("white");
      headerRange.setFontWeight("bold");
    }

    const sessionId = payload.sessionId;
    const events = payload.details.events || [];

    console.log(`Processing ${events.length} events for session: ${sessionId}`);

    // Get all data to find existing session
    const dataRange = eventsSheet.getDataRange();
    const allData = dataRange.getValues();

    let existingRowIndex = -1;
    let existingData = {
      actions: [],
      inputs: [],
      buttons: [],
      fields: [],
      focus: [],
      timeline: [],
    };

    // Look for existing session (skip header row)
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][0] === sessionId) {
        existingRowIndex = i + 1; // Convert to 1-based index for getRange

        // Parse existing data
        existingData.actions = allData[i][4]
          ? allData[i][4].split(" | ").filter(Boolean)
          : [];
        existingData.inputs = allData[i][5]
          ? allData[i][5].split(" | ").filter(Boolean)
          : [];
        existingData.buttons = allData[i][6]
          ? allData[i][6].split(" | ").filter(Boolean)
          : [];
        existingData.fields = allData[i][7]
          ? allData[i][7].split(" | ").filter(Boolean)
          : [];
        existingData.focus = allData[i][8]
          ? allData[i][8].split(" | ").filter(Boolean)
          : [];
        existingData.timeline = allData[i][9]
          ? allData[i][9].split(" | ").filter(Boolean)
          : [];

        console.log(`Found existing session at row ${existingRowIndex}`);
        break;
      }
    }

    // Process new events and append to existing data
    events.forEach((event, index) => {
      const time = new Date(event.timestamp).toLocaleTimeString();

      if (event.action) {
        existingData.actions.push(event.action);
        existingData.timeline.push(`${time}:${event.action}`);
      }

      if (event.input && event.input.trim()) {
        const fieldName = event.field || "unknown";
        existingData.inputs.push(`${fieldName}:"${event.input}"`);
      }

      if (event.button && event.button.trim()) {
        existingData.buttons.push(event.button);
      }

      if (event.field && event.field.trim()) {
        existingData.fields.push(event.field);
      }

      if (event.focus && event.focus.trim()) {
        existingData.focus.push(event.focus);
      }
    });

    // Prepare row data
    const rowData = [
      sessionId,
      payload.details.sessionStart,
      payload.details.lastUpdate,
      existingData.actions.length,
      existingData.actions.join(" | "),
      existingData.inputs.join(" | "),
      existingData.buttons.join(" | "),
      existingData.fields.join(" | "),
      existingData.focus.join(" | "),
      existingData.timeline.join(" | "),
    ];

    // Update existing row or create new one
    if (existingRowIndex > 0) {
      console.log(`Updating existing row ${existingRowIndex}`);
      eventsSheet
        .getRange(existingRowIndex, 1, 1, rowData.length)
        .setValues([rowData]);
    } else {
      console.log("Creating new row");
      eventsSheet.appendRow(rowData);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        sessionId: sessionId,
        eventCount: events.length,
        totalActions: existingData.actions.length,
        updated: existingRowIndex > 0 ? "existing" : "new",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error saving session events:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Your existing saveOrder function for order submissions
function saveOrder(payload) {
  const SHEET_ID = "YOUR_SHEET_ID"; // Replace with your actual sheet ID
  const SHEET_NAME = "Orders";

  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);

  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow([
      "Timestamp",
      "OrderID",
      "ParentName",
      "ParentEmail",
      "ChildName",
      "ChildAge",
      "ChildGender",
      "AdventureType",
      "CustomAdventureType",
      "FinalAdventureType",
      "AdventureLocation",
      "FavoriteColor",
      "PetName",
      "IncludeFriends",
      "SpecialDetails",
      "OrderType",
      "OrderPrice",
      "OrderDate",
      "OrderNumber",
      "ShippingFullName",
      "ShippingStreet",
      "ShippingCity",
      "ShippingPostalCode",
      "ShippingCountry",
      "ShippingPhone",
      "ShippingCost",
      "InterfaceLanguage",
      "BookLanguage",
      "ExperiencesCount",
      "ExperiencesSummary",
      "AllActivities",
      "AllCharacters",
      "TotalImages",
      "Adventures",
    ]);
  }

  const orderNum = String(sh.getLastRow()).padStart(3, "0");
  const orderId = `ADV-${orderNum}`;

  sh.appendRow([
    new Date(),
    orderId,
    payload.parentName,
    payload.parentEmail,
    payload.childName,
    payload.childAge,
    payload.childGender,
    payload.adventureType,
    payload.customAdventureType,
    payload.finalAdventureType,
    payload.adventureLocation,
    payload.favoriteColor,
    payload.petName,
    payload.includeFriends,
    payload.specialDetails,
    payload.orderType,
    payload.orderPrice,
    new Date(payload.orderDate),
    payload.orderNumber,
    payload.shippingFullName,
    payload.shippingStreet,
    payload.shippingCity,
    payload.shippingPostalCode,
    payload.shippingCountry,
    payload.shippingPhone,
    payload.shippingCost,
    payload.interfaceLanguage,
    payload.bookLanguage,
    payload.experiencesCount,
    payload.experiencesSummary,
    payload.allActivities,
    payload.allCharacters,
    payload.totalImages,
    JSON.stringify(payload.adventures),
  ]);

  // sendConfirmationEmail(payload.parentEmail, payload.parentName, orderId);
  return orderId;
}

// Fallback for individual events
function saveEvent(payload) {
  console.log("Individual event (fallback):", payload);
  // You can implement individual event handling here if needed
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, type: "individual" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
