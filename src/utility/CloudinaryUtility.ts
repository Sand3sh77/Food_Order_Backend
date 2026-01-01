import { v2 as cloudinary } from "cloudinary";
import { configureCloudinary } from "../config";

configureCloudinary();

export const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "/Food_Order_System",
                resource_type: "auto"
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result!.secure_url);
            }
        );

        stream.end(fileBuffer);
    });
};

export const cloudinaryRemoveImage = async (imagePublicId: any) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};

export const cloudinaryRemoveMultipleImage = async (publicIds: any) => {
    try {
        const result = await cloudinary.api.delete_resources(publicIds)
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
};
