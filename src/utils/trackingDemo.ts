// Demo showing the exact message formats that will be sent

/* 
Examples of messages that will be sent to Google Apps Script:

1. Input field without email:
   [2025-01-16 22:27:14] input {"field":"country","section":0}

2. Page load event:
   [2025-01-16 20:46:42] pageLoad {}

3. Email input (includes value):
   [2025-01-16 11:29:20] input {"field":"email","section":0,"value":"fff@gmail.c"}

4. Focus event on an adventure section:
   [2025-01-16 14:15:30] focus {"field":"experienceTitle","section":1}

5. File upload:
   [2025-01-16 16:45:12] change {"field":"images","section":2,"count":3}

6. Form submission:
   [2025-01-16 18:20:45] submit essay {"adventureCount":2}

The format is always:
[YYYY-MM-DD HH:mm:ss] eventType {details}

Where:
- Timestamp is in ISO format without timezone (local time)
- eventType is the action name
- details is JSON object with relevant data (empty {} if no details)
- section 0 = main form, section 1+ = adventure sections
*/

export const TRACKING_FORMAT_EXAMPLES = [
  '[2025-01-16 22:27:14] input {"field":"country","section":0}',
  "[2025-01-16 20:46:42] pageLoad {}",
  '[2025-01-16 11:29:20] input {"field":"email","section":0,"value":"fff@gmail.c"}',
  '[2025-01-16 14:15:30] focus {"field":"experienceTitle","section":1}',
  '[2025-01-16 16:45:12] change {"field":"images","section":2,"count":3}',
  '[2025-01-16 18:20:45] submit essay {"adventureCount":2}',
];
