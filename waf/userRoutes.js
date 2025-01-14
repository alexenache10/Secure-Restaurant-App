import express from 'express';
import axios from 'axios';
import { verifyJWT } from './middleware/verifyJWT.js';

const router = express.Router();
const BACKEND_BASE_URL = 'http://172.27.168.229:7000';

const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        return input.replace(/[$<>]/g, '');
    }
    return input;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Endpointurile protejate cu JWT
router.get('/classic', verifyJWT, async (req, res) => {
    const { email } = req.query;
    if (!email || !validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const sanitizedEmail = sanitizeInput(email);
        const response = await axios.get(`${BACKEND_BASE_URL}/api/my/user/classic?email=${encodeURIComponent(sanitizedEmail)}`, {
            headers: { Authorization: req.headers['authorization'] }, // Adaugă JWT
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.get('/data', verifyJWT, async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/my/user/data`, {
            headers: { Authorization: req.headers['authorization'] }, // Adaugă JWT
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Endpointurile publice
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email or password format' });
    }

    try {
        const sanitizedBody = {
            email: sanitizeInput(email),
            password: sanitizeInput(password),
            role: sanitizeInput(role),
        };

        const response = await axios.post(`${BACKEND_BASE_URL}/api/my/user/register`, sanitizedBody);
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || !validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email or password format' });
    }

    try {
        const sanitizedBody = {
            email: sanitizeInput(email),
            password: sanitizeInput(password),
        };

        const response = await axios.post(`${BACKEND_BASE_URL}/api/my/user/login`, sanitizedBody);
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.delete('/delete', verifyJWT, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Adăugăm corpul cererii sub forma unui obiect `data` și includem JWT
        const response = await axios.delete(`${BACKEND_BASE_URL}/api/my/user/delete`, {
            headers: { Authorization: req.headers['authorization'] }, // Adaugă JWT
            data: { email },
        });
        res.status(200).json({ message: 'User deleted successfully', data: response.data });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});
router.put('/update', async (req, res) => {
    const { email} = req.body;
    if (!email || !validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
      
        const response = await axios.put(`${BACKEND_BASE_URL}/api/my/user/update`, req.body, {
            headers: { Authorization: req.headers['authorization'] },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: 'Failed to update user' });
    }
});
export default router;
