# How to Process Large Files with Node.js

These are the example files used by the blog post [*"How to Process Large Files with Node.js"*](https://stateful.com/blog/process-large-files-nodejs-streams). Check it out for more details. To run the files you need to have [Node.js](https://nodejs.org/en/), [curl](https://curl.se/) and [unzip](https://infozip.sourceforge.net/UnZip.html) installed.

## Prerequisites

You can download and unzip the statistics CSV file via:

```sh { interactive=false }
curl https://www.stats.govt.nz/assets/Uploads/New-Zealand-business-demography-statistics/New-Zealand-business-demography-statistics-At-February-2021/Download-data/Geographic-units-by-industry-and-statistical-area-2000-2021-descending-order-CSV.zip -O -J -L
unzip ./Geographic-units-by-industry-and-statistical-area-2000-2021-descending-order-CSV.zip
mv ./Data7602DescendingYearOrder.csv ./business_data.csv
rm Geographic-units-by-industry-and-statistical-area-2000-2021-descending-order-CSV.zip Metadata\ for\ Data7602DescendingYearOrder.xlsx
```

## Examples

Execute example files by executing this in your terminal or via Runme.

### Step 1: Reading the File

```sh { interactive=false }
$ node read.js
```

### Step 2: Parsing the File

```sh { interactive=false }
$ node readAndParse.js
```

### Step 3: Outputting the Parsed Data

```sh { interactive=false }
$ node outputParsedData.js
```

---

If you experience any issues with the example or have questions on how to run it, please don't hesitate to [join us on Discord](https://discord.com/invite/BQm8zRCBUY)!
