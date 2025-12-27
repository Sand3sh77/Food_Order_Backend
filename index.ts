import express from 'express';
import { AdminRoute, VendorRoute } from "./routes";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

app.listen(8000, () => {
    console.clear();
    console.log("App is listening to the port 8000");
})