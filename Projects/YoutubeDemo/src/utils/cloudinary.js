import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary= async(localFilePath)=>{
    try {
      
        if(!localFilePath) return null;
        //upload file on cloudinary
        
       const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto" //for all types of file
        })

        //file has been uploaded successfully
        // console.log("File has been uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath) //delete from locally after save
        return response;

    } catch (error) {
        console.log("CLOUDINARY UPLOAD ERROR:", error);
        //if upload failed remove locally saved file 
            fs.unlinkSync(localFilePath);
            return null;

    }
}

const deleteFromCloudinary = async (fileUrl) => {
    try {
        if (!fileUrl) return null;

        //extract public_id from the url (filename without extension)
        const publicId = fileUrl.split("/").pop().split(".")[0];

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image"
        })

        console.log("CLOUDINARY DELETE RESPONSE:", response);
        return response;

    } catch (error) {
        console.log("CLOUDINARY DELETE ERROR:", error);
        return null;
    }
}


export {uploadOnCloudinary,deleteFromCloudinary}