import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import User from "../models/user";
import Order from "../models/order";
import { stringify } from "querystring";
import { HTTP_BAD_REQUEST } from "./MyUserController";

const HTTP_OK = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_INTERN_ERROR = 500;
const HTTP_NOT_FOUND = 404;

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(HTTP_NOT_FOUND).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERN_ERROR).json({ message: "something went wrong" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(HTTP_NOT_FOUND).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastUpdated"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

const processOrder = async (req: Request, res: Response) => {
   const { userEmail, totalPrice, cartItems, restaurantName } = req.body;
 
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(HTTP_NOT_FOUND).json({ message: "User not found" });
    }
    const addressLine1  = user.addressLine1;
    const city = user.city;

    const  deliveryDetails = {addressLine1, city};

    if (user.money != null && user.money < totalPrice) {
      return res.status(HTTP_BAD_REQUEST).json({ message: "Insufficient funds" });
    }

    if(user.money != null)
      user.money -= totalPrice;

    const restaurant = await Restaurant.findOne({restaurantName: restaurantName});
   
    if(!restaurant)
      {
        return res.status(HTTP_NOT_FOUND).json({message:"Restaurant not found"});
      }
    await user.save();


    const newOrder = new Order({
      user: user,
      restaurant: restaurant,
      cartItems: cartItems,
      deliveryDetails: deliveryDetails,
      totalAmount: totalPrice,
      createdAt: new Date(),
    });

    try {
      await newOrder.save();
      res.status(HTTP_OK).json({ message: "Order processed successfully", order: newOrder, estimatedDeliveryTime: restaurant.estimatedDeliveryTime});
    } catch (orderSaveError) {
      if (orderSaveError instanceof Error) {
        console.error("Failed to save order:", orderSaveError.message);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Failed to save the order", error: orderSaveError.message });
      } else {
        console.error("An unexpected error occurred:", orderSaveError);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
      }
    }
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error });
  }
};


const deleteRestaurantByUserEmail = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.body; 

    if (!userEmail) {
      return res.status(HTTP_BAD_REQUEST).json({ message: "userEmail is required" });
    }


    const restaurant = await Restaurant.findOne({ userEmail });
    if (!restaurant) {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "No restaurant found for the specified userEmail" });
    }

    await Restaurant.deleteOne({ userEmail });

    res.status(HTTP_OK).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete restaurant", error });
  }
};

export default {
  deleteRestaurantByUserEmail,
  getRestaurant,
  searchRestaurant,
  getAllRestaurants,
  processOrder,
};