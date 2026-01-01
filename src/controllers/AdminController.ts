import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt, uploadToCloudinary } from '../utility';

export const FindVendor = async ({ id, email }: { id?: string, email?: string }) => {
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

    const existingVandor = await FindVendor({ email });

    if (existingVandor !== null) {
        return res.json({ message: "A vendor already exists with this email ID" })
    }

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword({ password, salt });

    const files = req.files as Express.Multer.File[];

    let imageUrls: string[] = [];

    if (files && files.length > 0) {
        for (const file of files) {
            const url = await uploadToCloudinary(file.buffer);
            imageUrls.push(url);
        }
    }

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
        coverImages: imageUrls,
    })

    return res.json({
        message: "Vendor Created Successfully",
        vendor: createdVendor
    });
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

    const vendors = await Vendor.find();

    if (vendors !== null) {
        return res.json(vendors)
    }

    return res.json({ message: "Vendors data not available" });
};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;

    const vendors = await FindVendor({ id: vendorId });

    if (vendors !== null) {
        return res.json(vendors)
    }

    return res.json({ message: "Vendors data not available" })
};
