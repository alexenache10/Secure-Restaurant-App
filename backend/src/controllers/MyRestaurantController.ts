import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Order from "../models/order";
const HTTP_OK = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_INTERN_ERROR = 500;
const HTTP_NOT_FOUND = 404;

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.userEmail as string;
    const restaurant = await Restaurant.findOne({ userEmail });
    if (!restaurant) {
      return res.status(HTTP_NOT_FOUND).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(HTTP_INTERN_ERROR).json({ message: "Error fetching restaurant" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ userEmail: req.query.userEmail });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    
    const restaurant = new Restaurant({ ...req.body, imageUrl, userEmail: req.query.userEmail });
    
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(HTTP_OK).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};
const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.userEmail as string;
    const restaurant = await Restaurant.findOne({ userEmail });

    if (!restaurant) {
      return res.status(HTTP_NOT_FOUND).json({ message: "restaurant not found" });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }


    await restaurant.save();
    res.status(HTTP_OK).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

const getMyRestaurantOrders = async (req: Request, res: Response) => {
  try {

    const userEmail = req.query.userEmail as string;
    const restaurant = await Restaurant.findOne({ userEmail });

    if (!restaurant) {
      return res.status(HTTP_NOT_FOUND).json({ message: "restaurant not found" });
    }


    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "something went wrong" });
  }
};


const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  getMyRestaurantOrders,
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};