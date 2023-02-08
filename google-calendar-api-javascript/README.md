# How to Use the Google Calendar API With JavaScript

These are the example files used by the blog post [*"How to Use the Google Calendar API With JavaScript"*](https://stateful.com/blog/google-calendar-api-javascript). Check it out for more details. To run the files you need to have [Node.js](https://nodejs.org/en/) installed.

## Install Dependencies

To set up the project, first install all dependencies:

```sh { background=true }
npm install
```

## Set Environment Variables

The following environment variables need to be set. Please read the blog post to find out how to receive this information. Then run:

```sh
export PRIVATE_KEY="<PRIVATE_KEY>"
export CLIENT_EMAIL="<CLIENT_EMAIL>"
export PROJECT_NUMBER="<PROJECT_NUMBER>"
export CALENDAR_ID="<CALENDAR_ID>"
```

## Scenario

The blog post describes the following scenarios:

### Create Events Using Google Calendar API

To run this example, execute:

```sh
node addCalendarEvent.js
```

### List Events Using Google Calendar API

To run this example, execute:

```sh
node listCalendarEvents.js
```

---

If you experience any issues with the example or have questions on how to run it, please don't hesitate to [join us on Discord](https://discord.com/invite/BQm8zRCBUY)!