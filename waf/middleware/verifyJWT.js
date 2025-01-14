import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = "secret_key";

export const verifyJWT = (req, res, next) => {
 
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
   
    const token = authHeader.split(' ')[1]; // Extrage token-ul din formatul Bearer <token>
   
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY); // Verifică și decodifică token-ul
        req.user = decoded; // Adaugă informațiile utilizatorului decodificat în obiectul req

        next(); // Continuă procesarea cererii
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};
