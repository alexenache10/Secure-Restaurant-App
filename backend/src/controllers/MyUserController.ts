import { Request, Response } from "express";
import User from "../models/user";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const HTTP_OK = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_INTERN_ERROR = 500;
const HTTP_NOT_FOUND = 404;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZATE = 401;

const generateRandomKey = () => {
  return crypto.randomBytes(16).toString('hex');
};


const getCurrentUserClassic = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string; 
        const currentUser = await User.findOne({ email: email }); 
        
        if (!currentUser) {
            return res.status(HTTP_NOT_FOUND).json({ message: "User not found" });
        }
        
        res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(HTTP_INTERN_ERROR).json({ message: "Something went wrong" });
    }
};

const JWT_SECRET_KEY = generateRandomKey(); 


const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, { _id: 0, __v: 0 }); 
      res.status(HTTP_OK).json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Error fetching users" });
    }
  };
  


const updateCurrentUserClassic = async (req: Request, res: Response) => {
    try {
        const { email, name, addressLine1, country, city, money } = req.body;

        if (!email) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Email not provided" });
        }
        
        console.log('email=%s name=%s addressline1=%s money_str=%s money_int=%d', email,name,addressLine1, money, money);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(HTTP_NOT_FOUND).json({ message: "User not found!" });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
        user.money = money;
        await user.save();

        res.send(user);
    }
    catch (error) {
        console.log(error + 'TEST');
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Error updating user!" });
    }
};




const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "User already exists" });
        }

        const hashedPassword = await argon2.hash(password);

        const accountType =  role;
        const amount = 0;
        const newUser = new User({ email, password: hashedPassword, accountType, money: amount });
        await newUser.save();

        res.status(HTTP_CREATED).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Error registering user" });
    }
};


const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(HTTP_NOT_FOUND).json({ message: "Invalid credentials" });
        }

        if (!user.password) {
            return res.status(HTTP_UNAUTHORIZATE).json({ message: "Password not set" });
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(HTTP_UNAUTHORIZATE).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

        res.status(HTTP_OK).json({ token, accountType: user.accountType });

    } catch (error) {
        console.log(error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Error logging in" });
    }
};


const adminDelete = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Email not provided" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(HTTP_NOT_FOUND).json({ message: "User not found!" });
        }

        await User.deleteOne({ email });

        res.status(HTTP_OK).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Error deleting user" });
    }
};


export default {
    getCurrentUserClassic,
    login,
    register,
    updateCurrentUserClassic,
    getAllUsers,
    adminDelete,
};
