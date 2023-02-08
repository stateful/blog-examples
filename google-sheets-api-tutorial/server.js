const express = require("express");

const { google } = require("googleapis");

const app = express();
const port = 8080;

//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));

async function authSheets() {
    //Function for authentication object
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    //Create client instance for auth
    const authClient = await auth.getClient();

    //Instance of the Sheets API
    const sheets = google.sheets({ version: "v4", auth: authClient });

    return {
        auth,
        authClient,
        sheets,
    };
}

function endpoint (fnName, fn) {
    return async (req, res) => {
        try {
            await fn(req, res)
        } catch (err) {
            res.send(JSON.stringify({ error: `Failed to run ${fnName}: ${err.message}` }, null, 4))
        }
    }
}

async function getContent(req, res) {
    const { sheets } = await authSheets();

    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1",
    });

    res.send(getRows.data);
}

async function writeContent(req, res) {
    const { sheets } = await authSheets();

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [["Bencho", "Engineer"]],
        },
    });

    return getContent(req, res);
}

async function updateContent(req, res) {
    const { sheets } = await authSheets();

    await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1!A2",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [["Adam (UPDATED)"]],
        },
    });

    return getContent(req, res);
}

async function deleteContent(req, res) {
    const { sheets } = await authSheets();

    await sheets.spreadsheets.values.clear({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1!A3:B3",
    });

    return getContent(req, res);
}

async function batchUpdate(req, res) {
    const { sheets } = await authSheets();

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.SPREADSHEET_ID,
        resource: {
            requests: [{
                updateBorders: {
                    range: {
                        sheetId: 0,
                        startRowIndex: 0,
                        endRowIndex: 6,
                        startColumnIndex: 0,
                        endColumnIndex: 3,
                    },
                    top: {
                        style: "DASHED",
                        width: 1,
                        color: {
                            red: 1.0,
                        },
                    },
                    bottom: {
                        style: "DASHED",
                        width: 1,
                        color: {
                            red: 1.0,
                        },
                    },
                    innerHorizontal: {
                        style: "DASHED",
                        width: 1,
                        color: {
                            red: 1.0,
                        },
                    },
                },
            }],
        },
    });

    return getContent(req, res);
}

app.get("/", endpoint('getContent', getContent));
app.post("/", endpoint('writeContent', writeContent));
app.post("/update", endpoint('updateContent', updateContent));
app.delete("/", endpoint('deleteContent', deleteContent));
app.post("/format", endpoint('batchUpdate', batchUpdate));