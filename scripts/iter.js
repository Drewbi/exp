import fs from 'fs';
import path from 'path';

const getNextFolderNumber = (baseDir) => {
    const iterDir = path.join(baseDir, 'iter');
    if (!fs.existsSync(iterDir)) {
        fs.mkdirSync(iterDir);
    }
    const existingFolders = fs.readdirSync(iterDir).map(folder => parseInt(folder)).filter(Number.isInteger);
    let nextNumber = 1;
    while (existingFolders.includes(nextNumber)) {
        nextNumber++;
    }
    return nextNumber;
};

const copyFolderRecursiveSync = (source, target) => {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }
    const files = fs.readdirSync(source);
    files.forEach(file => {
        const curSource = path.join(source, file);
        const curTarget = path.join(target, file);
        if (fs.lstatSync(curSource).isDirectory()) {
            if (file !== 'iter') {
                copyFolderRecursiveSync(curSource, curTarget);
            }
        } else {
            fs.copyFileSync(curSource, curTarget);
        }
    });
};

const copyToIter = (currentDir) => {
    const nextFolderNumber = getNextFolderNumber(currentDir);
    const targetFolder = path.join(currentDir, 'iter', nextFolderNumber.toString());
    copyFolderRecursiveSync(currentDir, targetFolder);
    console.log(`Contents copied to: ${targetFolder}`);
};

const args = process.argv.slice(2);

const currentDir = args[0] || process.env.INIT_CWD;
console.log(currentDir)
copyToIter(currentDir);
