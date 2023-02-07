import fs from 'node:fs';

function read() {
   let data = '';
   const readStream = fs.createReadStream('business_data.csv', 'utf-8');
   readStream.on('error', (error) => console.log(error.message));
   readStream.on('data', (chunk) => data += chunk);
   readStream.on('end', () => console.log('Reading complete'));
};

read();