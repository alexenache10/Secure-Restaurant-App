import { auth } from "express-oauth2-jwt-bearer";
import {Request, Response, NextFunction} from 'express';
import { HTTP_UNAUTHORIZATE } from "../controllers/MyUserController"
import jwt from 'jsonwebtoken';
import User from "../models/user";

// verificam autenticitatea token-urilor JWT emise de auth0 (ce folosim pentru logare)
// aplicatia functioneaza si fara aceasta autentificare, dar nesigur

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// cautam username-ul in functie de id-ul din auth0
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(HTTP_UNAUTHORIZATE);
    }

    const token = authorization.split(" ")[1]; // preluam tokenul

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded.sub;

        const user = await User.findOne({auth0Id});

        if(!user) {
           return res.sendStatus(HTTP_UNAUTHORIZATE);
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();
    }
    catch(error) {
      return res.sendStatus(HTTP_UNAUTHORIZATE);
    }

  };

