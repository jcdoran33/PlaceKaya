const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dzolcdtoy'
});

exports.handler = async (event, context) => {
    const { path } = event;
    const paramsPath = path.replace('/.netlify/functions/placeholder', '');
    const [width, height, background] = paramsPath.split('/').filter(param => !!param);
    
    const url = cloudinary.url('kaya_edit_1', {
        width,
        height,
        effect: 'colorize',
        color: `#${background}`
    });
    console.log("url: ", url);
    
    return {
        statusCode: 302,
        // body: JSON.stringify({status: 'Ok'})
        headers: {
            Location: url
        }
    }
};