const cloudinary = require('cloudinary').v2;

exports.handler = async (event, context) => {
    const { path } = event;
    const paramsPath = path.replace('/.netlify/functions/placeholder', '');
    const [width, height, background] = paramsPath.split('/').filter(param => !!param);
    console.log("width: ", width);
    console.log("height: ", height);
    console.log("background: ", background);
    return {
        statusCode: 200,
        body: JSON.stringify({status: 'Ok'})
    }
};