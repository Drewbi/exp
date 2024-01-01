import crypto from "crypto";
import fs from 'fs';

const id = crypto.randomBytes(5).toString('hex').toUpperCase();
var dir = './src/test/' + id;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);

    fs.cpSync('./src/base/shader', dir, { recursive: true });
}
