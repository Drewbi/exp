import crypto from "crypto";
import fs from 'fs';

const id = crypto.randomBytes(5).toString('hex').toUpperCase();
var dir = './src/test/' + id;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);

    const content = `
export default function () {
    return (
        <>
            test
        </>
    )
}
    `

    fs.appendFile(dir + '/index.tsx', content, function (err) {
        if (err) throw err;
        console.log('New test file: ' + id);
    });
}
