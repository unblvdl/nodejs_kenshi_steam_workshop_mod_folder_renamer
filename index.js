const { readdirSync } = require('fs')
const fs = require('fs')
const path = require('path');

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

let directories = getDirectories('./')

for (const directory of directories) {
    const directoryPath = path.join(__dirname, directory);

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            if (file.includes('.mod')) {
                // newPath is new name
                let newPath = file.substring(0, file.indexOf('.'));
                fs.rename(directoryPath, newPath, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Successfully renamed the directory: " + directoryPath)
                    }
                })
            }
        });
    });

}