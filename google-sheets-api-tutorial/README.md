# Google Sheets API Tutorial: The Basics You Need to Get Going

This project is an example project from the Stateful blog post on: [*Google Sheets API Tutorial: The Basics You Need to Get Going*](https://stateful.com/blog/google-sheets-api-tutorial). You can interactively run through the example using [Runme](https://runme.dev/).

## Prerequisites

To run through the code example, ensure you have:

- set up a service account to authenticate with Google, a `keys.json` should exist within this directory
- you have created a demo spreadsheet that you have shared with the service account email

## Install Dependencies

Install all dependencies via:

```sh { interactive=false }
npm install
```

## Examples

First, let's start the server. Ensure you have the spreadsheet id you like to work with.

```sh { background=true }
export SPREADSHEET_ID="<SPREADSHEET_ID>"
npm run dev
```

### Reading Data From a Spreadsheet

To read data from the spreadsheet, run:

```sh { interactive=false }
curl http://localhost:8080
```

### Writing and Updating Data in the Spreadsheet

To write data into the spreadsheet, run:

```sh { interactive=false }
curl -X POST http://localhost:8080
```

To update a cell in the spreadsheet, run:

```sh { interactive=false }
curl -X POST http://localhost:8080/update
```

### Deleting Data From Google Sheets

To delete the cell we created, run:

```sh { interactive=false }
curl -X DELETE http://localhost:8080
```

### Updating Spreadsheet Formatting

To update the formatting, run:

```sh { interactive=false }
curl -X POST http://localhost:8080/format
```

---

If you experience any issues with the example or have questions on how to run it, please don't hesitate to [join us on Discord](https://discord.com/invite/BQm8zRCBUY)!