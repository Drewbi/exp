import crypto from "crypto";
import fs from 'fs';

const id = crypto.randomBytes(5).toString('hex').toUpperCase();
var dir = './src/test/' + id;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);

    const args = process.argv.slice(2);
    const type = args[0] || "shader";

    if (!["flat", "shader"].includes(type)) throw Error(`${type} is not a valid type`)
    fs.cpSync('./src/base/' + type, dir, { recursive: true });
    console.log(`Created new ${type} test with id ${id}`)
}
