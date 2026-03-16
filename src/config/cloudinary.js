import { v2 as cloudinary } from "cloudinary"
import config from "../config/config.js"
import fs from "fs"

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (pathName) => {

    if(pathName) return null;

try {

    const response = await cloudinary.uploader.upload(pathName);
    fs.unlinkSync(pathName);

    console.log("FILE UPLOAD SUCCESSFULLY : ", response);

    return response;
    
} catch (error) {
    fs.unlinkSync(pathName)
    return null  
}
}

export {uploadOnCloudinary};