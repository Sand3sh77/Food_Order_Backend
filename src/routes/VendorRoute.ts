import express, { Request, Response, NextFunction } from 'express';
import { AddFood, GetFoods, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers';
import { Authenticate, upload } from '../middlewares';

const router = express.Router();

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);

router.get("/foods", GetFoods);

router.use(upload.none());
router.post("/food", AddFood);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from Vendor" });
});

export { router as VendorRoute };