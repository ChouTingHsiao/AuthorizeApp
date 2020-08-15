// at the top of the test spec:
const fs = require('fs');

function NotExist(filename: string): boolean {
    fs.exists(filename, (exists: boolean) => {
        if (exists) {
            return false;
        }
    });
    return true;
}

function createDic(filepath: string): Promise<boolean> {
    return new Promise((resolve, rejecit) => {
        fs.mkdir(filepath, (err) => {
            if (err) {
                rejecit(err);
            }
        });
        resolve(true);
    });
}

function writeFile(data: string, filename: string) {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {

    const folder = './dist';
    const filepath = `${folder}/${filename}`;

    if (NotExist(folder)) {
        createDic(folder).then((isCreate) => {
            if (isCreate) {
                writeFile(data, filepath);
            }
        });
    } else {
        writeFile(data, filepath);
    }

}

export  { writeScreenShot };
