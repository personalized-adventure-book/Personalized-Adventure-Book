// Google Apps Script code to handle batched session events
// This should be in your Google Apps Script project

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

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
  const SHEET_ID = "YOUR_SHEET_ID"; // Replace with your sheet ID
  const EVENTS_SHEET_NAME = "Events";

  const ss = SpreadsheetApp.openById(SHEET_ID);
  let eventsSheet = ss.getSheetByName(EVENTS_SHEET_NAME);

  if (!eventsSheet) {
    eventsSheet = ss.insertSheet(EVENTS_SHEET_NAME);
    eventsSheet.appendRow([
      "SessionID",
      "SessionStart",
      "LastUpdate",
      "EventCount",
      "AllActions",
      "AllInputs",
      "AllButtons",
      "AllFields",
      "AllFocus",
      "Timeline",
    ]);
  }

  const sessionId = payload.sessionId;
  const events = payload.details.events || [];

  // Find existing row for this session
  const data = eventsSheet.getDataRange().getValues();
  let existingRowIndex = -1;

  for (let i = 1; i < data.length; i++) {
    // Start from 1 to skip header
    if (data[i][0] === sessionId) {
      existingRowIndex = i + 1; // +1 because getRange is 1-indexed
      break;
    }
  }

  // Prepare aggregated data
  let allActions = [];
  let allInputs = [];
  let allButtons = [];
  let allFields = [];
  let allFocus = [];
  let timeline = [];

  // If row exists, get existing data first
  if (existingRowIndex > 0) {
    const existingRow = data[existingRowIndex - 1];
    allActions = existingRow[4] ? existingRow[4].split(" | ") : [];
    allInputs = existingRow[5] ? existingRow[5].split(" | ") : [];
    allButtons = existingRow[6] ? existingRow[6].split(" | ") : [];
    allFields = existingRow[7] ? existingRow[7].split(" | ") : [];
    allFocus = existingRow[8] ? existingRow[8].split(" | ") : [];
    timeline = existingRow[9] ? existingRow[9].split(" | ") : [];
  }

  // Add new events to aggregated data
  events.forEach((event) => {
    const time = new Date(event.timestamp).toLocaleTimeString();

    if (event.action) {
      allActions.push(event.action);
      timeline.push(`${time}: ${event.action}`);
    }

    if (event.input) {
      allInputs.push(`${event.field || "unknown"}: "${event.input}"`);
    }

    if (event.button) {
      allButtons.push(event.button);
    }

    if (event.field) {
      allFields.push(event.field);
    }

    if (event.focus) {
      allFocus.push(event.focus);
    }
  });

  // Prepare row data
  const rowData = [
    sessionId,
    payload.details.sessionStart,
    payload.details.lastUpdate,
    allActions.length,
    allActions.join(" | "),
    allInputs.join(" | "),
    allButtons.join(" | "),
    allFields.join(" | "),
    allFocus.join(" | "),
    timeline.join(" | "),
  ];

  // Update existing row or create new one
  if (existingRowIndex > 0) {
    eventsSheet
      .getRange(existingRowIndex, 1, 1, rowData.length)
      .setValues([rowData]);
  } else {
    eventsSheet.appendRow(rowData);
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      sessionId: sessionId,
      eventCount: events.length,
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

// Keep your existing saveOrder function for order submissions
function saveOrder(payload) {
  // Your existing order saving logic here
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
  sendConfirmationEmail(payload.parentEmail, payload.parentName, orderId);
  return orderId;
}

// Keep your existing saveEvent function for individual events (fallback)
function saveEvent(payload) {
  // Your existing individual event saving logic
}
