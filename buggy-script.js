const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const target = process.argv[3];
const testSource = source ? source : './source.txt';
const testTarget = target ? target : './my-project'

// read contents of source
const contentsOfSource = fs.readFileSync(testSource, 'utf-8');

// get lines of source into an array, remove empty lines
const linesInSource = contentsOfSource.split('\n');

// make the target dir if it doesn't exist
if (!fs.existsSync(testTarget)) {
    fs.mkdirSync(testTarget);
}

// iterate over lines
linesInSource.forEach(line => {
    // get the content of the lines, first word is a filename rest is content
    const [ filename, ...contentArr ] = line.split(' ');
    const newContentArr = contentArr.join(' ')
    // construct the full path for the file to create
    const newFilePath = path.join(__dirname, testTarget, filename);
    // write the file and it's contents
    fs.writeFileSync(
        newFilePath,
        newContentArr,
        { flag: 'w+', encoding: 'utf-8' }
    );
});