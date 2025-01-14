import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "secret_key";

// Extindem tipul Request doar pentru acest fișier
interface CustomRequest extends Request {
    user?: any;
}

export const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extragem tokenul
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY); // Validăm semnătura
        req.user = decoded; // Adăugăm utilizatorul decodat în request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
