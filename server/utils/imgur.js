const imgur = require('imgur');

// Change this cliend id to your own.
const clientId = '29183e0f6e0cf4e';

// Setting
imgur.setClientId(clientId);

// You can specify path or keep it null. Defaults to ~/.imgur
const path = null;

// Saving to disk. Returns a promise.
imgur
    .saveClientId(clientId, path)
    .then(() => {
        console.log('Saved.');
    })
    .catch((err) => {
        console.log(err.message);
    });

//Setting
imgur.setAPIUrl('https://api.imgur.com/3/');

//If setAPIUrl() is not called, API URL is read from process.env.IMGUR_API_URL

const uploadImage = async (filePath) => {
    try {
        // A single image
        const data = await imgur.uploadBase64(filePath);
        console.log(data.link);
        return data.link;
    }
    catch (err) {
        console.log(err);
    }
}

const setUpFile = async (uploadedFile) => {
    return new Promise((resolve) => {
        const {createReadStream,filename,mimetype} = uploadedFile;
        let file; 
        createReadStream().on('data', (chunk) => {
          file = chunk.toString('base64');
        }).on('close', () => {
          resolve(file);
        }); 
    });
}

module.exports = { uploadImage, setUpFile };