import mongoose, { Document } from "mongoose";

interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string];
}

const FoodSchema = new mongoose.Schema({
    vendorId: { type: mongoose.SchemaTypes.ObjectId, ref: "Vendor", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    images: { type: [String] }
}, {
    timestamps: true
});

const Food = mongoose.model<FoodDoc>('Food', FoodSchema);

export { Food, FoodDoc };
