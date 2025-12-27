import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const FindVendor = async (id: String | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email: email })
    } else {
        return await Vendor.findById(id);
    }

}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const {
        name,
        ownerName,
        email,
        foodType,
        password,
        address,
        phone,
        pinCode
    } = <CreateVendorInput>req.body;

    const existingVandor = await FindVendor('', email);

    if (existingVandor !== null) {
        return res.json({ message: "A vendor already exists with this email ID" })
    }

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt);

    const createdVendor = await Vendor.create({
        name,
        address,
        pinCode,
        foodType,
        email,
        password: userPassword,
        salt,
        ownerName,
        phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
    })

    return res.json({
        message: "Vendor Created Successfully",
        vendor: createdVendor
    });
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {

};
