const { google } = require("googleapis");
require("dotenv").config();

const GOOGLE_PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.CALENDAR_ID;

if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PROJECT_NUMBER || !GOOGLE_CALENDAR_ID) {
  throw new Error('Not all required environment variables are set up!')
}

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

const listCalendarEvents = () => {
    calendar.events.list(
      {
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, result) => {
        if (error) {
          console.log("Something went wrong: ", error); // If there is an error, log it to the console
        } else {
          if (result.data.items.length > 0) {
            console.log("List of upcoming events: ", result.data.items); // If there are events, print them out
          } else {
            console.log("No upcoming events found."); // If no events are found
          }
        }
      }
    );
  };
  listCalendarEvents();