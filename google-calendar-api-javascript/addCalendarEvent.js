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

const auth = new google.auth.GoogleAuth({
    keyFile: "./keys.json",
    scopes: SCOPES,
});

const calendarEvent = {
    summary: "Test Event added by Node.js",
    description: "This event was created by Node.js",
    start: {
        dateTime: "2022-06-03T09:00:00-02:00",
        timeZone: "Asia/Kolkata",
    },
    end: {
        dateTime: "2022-06-04T17:00:00-02:00",
        timeZone: "Asia/Kolkata",
    },
    attendees: [],
    reminders: {
        useDefault: false,
        overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
        ],
    },
};

const addCalendarEvent = async () => {
    auth.getClient().then((auth) => {
        calendar.events.insert(
            {
                auth: auth,
                calendarId: GOOGLE_CALENDAR_ID,
                resource: calendarEvent,
            },
            function (error, response) {
                if (error) {
                    console.log("Something went wrong: " + error); // If there is an error, log it to the console
                    return;
                }
                console.log("Event created successfully.")
                console.log("Event details: ", response.data); // Log the event details
            }
        );
    });
};

addCalendarEvent();