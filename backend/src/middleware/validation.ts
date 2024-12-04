// validation.ts

import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HTTP_BAD_REQUEST } from "../controllers/MyUserController";

const handleValidationErrors = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).json({errors: errors.array()}); 
    }
    next();
};

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string!"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string!"),
    body("city").isString().notEmpty().withMessage("City must be a string!"), 
    body("country").isString().notEmpty().withMessage("Country must be a string!"), 

    handleValidationErrors,
];

export const validateRegisterRequest = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    handleValidationErrors,
];

export const validateLoginRequest = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required!"),
    body("city").notEmpty().withMessage("City is required!"),
    body("country").notEmpty().withMessage("Country is required!"),
    body("deliveryPrice").isFloat().withMessage("Country is required!"),
    body("estimatedDeliveryTime").isInt().withMessage("Country is required!"),
    body("cuisines").isArray().withMessage("Cuisines must be an array!").not().isEmpty().withMessage("Cuisines array cannot be empty!"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat().withMessage("Menu item price is required"),
    handleValidationErrors,
];