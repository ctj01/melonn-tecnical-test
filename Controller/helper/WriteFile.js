const fs = require('fs')
const writeFile = (fileData, promise, filePath , encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        promise();
    });
};
module.exports = writeFile;