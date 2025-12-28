import { v2 as cloudinary } from "cloudinary";

export const cloudinaryUploadImage = async (fileToUpload:any) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto",
        });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

export const cloudinaryRemoveImage = async (imagePublicId:any) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

export const cloudinaryRemoveMultipleImage = async (publicIds:any) => {
    try {
        const result = await cloudinary.api.delete_resources(publicIds)
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

