import { NextFunction, Request, Response } from "express";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";
import type { EditVendorInput, VendorLoginInput } from "../dto";

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

    return res.json({ 'message': 'Login credential is not valid' })

}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVendor = await FindVendor({ id: user._id });
        return res.json(existingVendor);
    }

    return res.json({ 'message': 'Vendor Information Not Found' })
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
