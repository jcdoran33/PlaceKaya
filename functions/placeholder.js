const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true,
    cloud_name: 'dzolcdtoy'
});

exports.handler = async (event, context) => {
    const { path } = event;
    const paramsPath = path.replace('/.netlify/functions/placeholder', '');
    const [img, width, height, background] = paramsPath.split('/').filter(param => !!param);
    
    const max = 3; //update this max value as we add new pictures to cloudinary
    //define function to pick a random number to append to kaya in cloudinary public ID below (url definition)
    function randomNum(max) {
        return Math.floor(Math.random() * max);
    };

    const url = cloudinary.url(`kaya${randomNum(max)}`, {
        width,
        height,
        // effect: 'colorize',
        // color: `#${background}`
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