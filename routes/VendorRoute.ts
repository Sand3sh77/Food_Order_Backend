import express, { Request, Response, NextFunction } from 'express';
import { GetVendorProfile, UpdateVendorProfile, VendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", Authenticate, UpdateVendorProfile);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from Vendor" });
});

export { router as VendorRoute };