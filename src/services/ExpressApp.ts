import { Application } from "express";
import bodyParser from 'body-parser';
import { AdminRoute, VendorRoute } from "../routes";

export default async (app: Application) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/admin", AdminRoute);
    app.use("/vendor", VendorRoute);

    return app;
}
