const fs = require('fs');
const ReadFileHelper = (promise, json = false, filePath , encoding = 'utf-8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err)
        {
            throw err;
        }
        promise(json ? JSON.parse(data) : data)
    })
}
module.exports = ReadFileHelper