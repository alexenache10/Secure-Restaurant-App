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

const JWT_SECRET_KEY = "secret_key";


const getCurrentUserClassic = async (req: Request, res: Response) => {
    try {
        const email = (req as any).user.email; 
        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(currentUser);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userRole = (req as any).user.role;
        if (userRole !== "Admin") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        const users = await User.find({}, { _id: 0, __v: 0 });
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};


const updateCurrentUserClassic = async (req: Request, res: Response) => {
    try {
        const senderEmail = (req as any).user.email;
        const userRole = (req as any).user.role;
        const { name, addressLine1, country, city, money, email } = req.body;
        
        if(userRole != 'Admin') 
        {
            if(senderEmail != email) // poti update doar tie insuti
            {
                return res.status(403).json({ message: "Forbidden: Admins only" });
            }
        }
        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        user.name = name || user.name;
        user.addressLine1 = addressLine1 || user.addressLine1;
        user.city = city || user.city;
        user.country = country || user.country;
        user.money = money || user.money;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user!" });
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

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generăm tokenul JWT
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.accountType, // Rolul utilizatorului
            },
            JWT_SECRET_KEY,
            { expiresIn: "1h" } // Valabilitate de 1 oră
        );

        res.status(HTTP_OK).json({
            token,
            accountType: user.accountType,
            message: "Login successful",
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: "Error logging in" });
    }
};

const adminDelete = async (req: Request, res: Response) => {
    try {
        const userRole = (req as any).user.role;
        if (userRole !== "Admin") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        await User.deleteOne({ email });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user" });
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
