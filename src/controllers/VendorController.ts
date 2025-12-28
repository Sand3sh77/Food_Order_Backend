import { NextFunction, Request, Response } from "express";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";
import type { CreateFoodInputs, EditVendorInput, VendorLoginInput } from "../dto";
import { Food, Vendor } from "../models";
import { cloudinaryUploadImage } from "../utility/cloudinary";

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <VendorLoginInput>req.body;

    const existingUser = await FindVendor({ email });

    if (existingUser !== null) {

        const validation = await ValidatePassword({
            enteredPassword: password,
            savedPassword: existingUser.password,
            salt: existingUser.salt
        });
        if (validation) {

            const signature = await GenerateSignature({
                _id: existingUser._id.toString(),
                email: existingUser.email,
                name: existingUser.name
            })
            return res.json({
                message: "Login successful",
                token: signature
            });
        }
    }

    return res.json({ message: "Login credential is not valid" })

}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVendor = await FindVendor({ id: user._id });
        return res.json(existingVendor);
    }

    return res.json({ message: "Vendor Information Not Found" })
}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    const { foodType, name, address, phone } = <EditVendorInput>req.body;

    if (user) {

        const existingVendor = await FindVendor({ id: user._id });

        if (existingVendor !== null) {

            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodType;
            const saveResult = await existingVendor.save();

            return res.json(saveResult);
        }

    }
    return res.json({ 'message': 'Unable to Update vendor profile ' })
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const existingVendor = await FindVendor({ id: user._id });

        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const saveResult = await existingVendor.save();

            return res.json(saveResult);
        }

    }
    return res.json({ message: "Unable to Update vendor profile" })
};

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    console.log(req)

    if (user) {
        const {
            name,
            description,
            category,
            foodType,
            price,
            readyTime,
            images
        } = <CreateFoodInputs>req.body;

        const vendor = await FindVendor({ id: user._id });

        if (vendor !== null) {

            if (images) {
                const imageUrl = await cloudinaryUploadImage(images[0]);
                console.log(imageUrl);
            };

            const addedFood = await Food.create({
                vendorId: vendor._id.toString(),
                name,
                description,
                category,
                foodType,
                price,
                readyTime,
                images: []
            });

            vendor.foods.push(addedFood._id);
            const result = await vendor.save();

            return res.json({ message: "Food added successfully", data: result });
        }

    }
    return res.json({ message: "Unable to add food" })
};

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const foods = await Food.find({ vendorId: user._id });

        return res.json({ message: "Food fetched succesfully", data: foods });
    }
    return res.json({ message: 'Unable to get food' })
};
