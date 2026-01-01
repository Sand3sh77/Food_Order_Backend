import express, { Request, Response, NextFunction } from 'express';
import { CreateVendor, GetVendorById, GetVendors } from '../controllers';
import { upload } from '../middlewares';

const router = express.Router();

router.post("/vendor", upload.array("coverImages", 5), CreateVendor);
router.get("/vendor", GetVendors);
router.get("/vendor/:id", GetVendorById);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from Admin" });
});

export { router as AdminRoute };