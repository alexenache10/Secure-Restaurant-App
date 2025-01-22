import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {verifyJWT}  from './middleware/verifyJWT.js';
const router = express.Router();
const BACKEND_BASE_URL = 'http://192.168.149.174:7000';

// Middleware pentru verificarea JWT


// Middleware pentru sanitizarea inputurilor
const sanitizeInput = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].replace(/[<>$]/g, '').trim();
    }
  }
  for (const key in req.query) {
    if (typeof req.query[key] === 'string') {
      req.query[key] = req.query[key].replace(/[<>$]/g, '').trim();
    }
  }
  next();
};

// Rute WAF pentru restaurante

// Obținerea datelor unui restaurant
router.get('/', verifyJWT, sanitizeInput, async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/my/restaurant?userEmail=${encodeURIComponent(userEmail)}`, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching restaurant:', error.message);
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Crearea unui restaurant
router.post('/', verifyJWT, sanitizeInput, async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/api/my/restaurant?userEmail=${encodeURIComponent(userEmail)}`, req.body, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error creating restaurant:', error.message);
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Actualizarea unui restaurant
router.put('/', verifyJWT, sanitizeInput, async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const response = await axios.put(`${BACKEND_BASE_URL}/api/my/restaurant?userEmail=${encodeURIComponent(userEmail)}`, req.body, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error updating restaurant:', error.message);
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Obținerea comenzilor
router.get('/order', verifyJWT, sanitizeInput, async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/my/restaurant/order?userEmail=${encodeURIComponent(userEmail)}`, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Actualizarea statusului unei comenzi
router.patch('/order/:orderId/status', verifyJWT, sanitizeInput, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Order status is required' });
  }

  try {
    const response = await axios.patch(`${BACKEND_BASE_URL}/api/my/restaurant/order/${orderId}/status`, { status }, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

export default router;
