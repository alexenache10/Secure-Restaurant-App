import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './userRoutes.js'; 
import restaurantRoutes from './restaurantRoutes.js';
import restaurantGeneralRoutes from './restaurantGeneralRoutes.js';
import { detectAndLogAttacks } from './middleware/detectionAndLogging.js';

const app = express();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pentru detectarea atacurilor
app.use(detectAndLogAttacks);

// Rute
app.use('/api/my/user', userRoutes);
app.use('/api/my/restaurant', restaurantRoutes);
app.use('/api/restaurant', restaurantGeneralRoutes);

// Gestionarea erorilor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on 0.0.0.0:3000");
});
