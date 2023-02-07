# How to Process Large Files with Node.js

These are the example files used by the blog post [_"How to Process Large Files with Node.js"_](https://stateful.com/blog/process-large-files-nodejs-streams). Check it out for more details. To run the files you need to have [Node.js](https://nodejs.org/en/) installed.

## Prerequisites

You can download and unzip the statistics CSV file via:

```sh
curl https://www.stats.govt.nz/assets/Uploads/New-Zealand-business-demography-statistics/New-Zealand-business-demography-statistics-At-February-2021/Download-data/Geographic-units-by-industry-and-statistical-area-2000-2021-descending-order-CSV.zip -O -J -L
unzip ./Geographic-units-by-industry-and-statistical-area-2000-2021-descending-order-CSV.zip
mv ./Data7602DescendingYearOrder.csv ./business_data.csv
rm Geographic-units-by-industry-and-statistical-area-2000-2021-descending-order-CSV.zip Metadata\ for\ Data7602DescendingYearOrder.xlsx
```

## Examples

Execute example files by executing this in your terminal:

```sh
$ node read.js
```

```sh
$ node readAndParse.js
```

```sh
$ node outputParsedData.js
```