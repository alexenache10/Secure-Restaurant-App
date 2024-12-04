import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"
import {v2 as cloudinary} from 'cloudinary';
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
console.log("Starting connection to database...");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>console.log("Connected to the database!"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json())
app.use("/api/restaurant", restaurantRoute);

app.use("/api/my/user", myUserRoute); 
app.use("/api/my/restaurant", myRestaurantRoute);


app.listen(7000, "0.0.0.0", ()=>{
    console.log("server started on 0.0.0.0:7000");
})
