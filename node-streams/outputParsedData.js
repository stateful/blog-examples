import fs from 'node:fs';

function outputParsedData() {
    const readStream = fs.createReadStream('business_data.csv')
    const writeStream = fs.createWriteStream('business_data_output.csv')
    readStream.pipe(writeStream);
    writeStream.on('finish', () => console.log('Copying completed'))
 }
 outputParsedData();