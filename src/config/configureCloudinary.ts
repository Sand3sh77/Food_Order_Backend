import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

const configureCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });

        console.log("Cloudinary cinfgured Successfully");
    } catch (error: any) {
        console.error("Cloudinary configuration Failed:", error.message);
        process.exit(1);
    }
};

export default configureCloudinary;