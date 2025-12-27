import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { connectDB } from './config';
import { AdminRoute, VendorRoute } from "./routes";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.clear();
    console.log("App is listening to the port", port);
});
