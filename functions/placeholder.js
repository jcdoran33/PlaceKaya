const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true,
    cloud_name: 'dzolcdtoy'
});

exports.handler = async (event, context) => {
    const { path } = event;
    const paramsPath = path.replace('/.netlify/functions/placeholder', '');
    const [img, width, height, background] = paramsPath.split('/').filter(param => !!param);
    
    const max = 9; //update this max value as we add new pictures to cloudinary. 
    //This max should be set to +1 of the highest number image in Cloudinary
    //So if the latest image in clodinary is "kaya6", max should be set to 7 (because math.random is exclusive of the max number)
    //define function to pick a random number to append to kaya in cloudinary public ID below (url definition)
    function randomNum(max) {
        return Math.floor(Math.random() * max);
    };

    const url = cloudinary.url(`kaya${randomNum(max)}`, {
        background: "auto",
        gravity: "auto",
        width,
        height,
        crop: "fill_pad"
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