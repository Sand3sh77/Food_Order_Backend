import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';


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

    return res.json({
        name,
        ownerName,
        email,
        foodType,
        password,
        address,
        phone,
        pinCode
    });
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

};

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {

};
