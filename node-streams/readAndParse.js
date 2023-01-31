import fs from 'node:fs';
import readline from 'node:readline';

function readAndParse() {
    let counter = 0;
    const readStream = fs.createReadStream('business_data.csv', 'utf-8');
    let rl = readline.createInterface({ input: readStream })
    rl.on('line', (line) => {
        const year = line.split(',')[2];
        const geo_count = line.split(',')[3];
        if (year === '2020' && geo_count > 200) {
            counter++
        }
    });
    rl.on('error', (error) => console.log(error.message));
    rl.on('close', () => {
        console.log(`About ${counter} areas have geographic units of over 200 units in 2020`)
        console.log('Data parsing completed');
    })
}
readAndParse();