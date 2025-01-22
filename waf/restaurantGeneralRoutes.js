import express from 'express';
import axios from 'axios';
import {verifyJWT}  from './middleware/verifyJWT.js';
const router = express.Router();
const BACKEND_BASE_URL = 'http://192.168.149.174:7000'; 
router.get('/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/restaurant/${restaurantId}`, {headers: req.headers});
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching restaurant by ID:', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.get('/search/:city', async (req, res) => {
    const { city } = req.params;
    const { searchQuery, page, selectedCuisines, sortOption } = req.query;
    const params = new URLSearchParams({ searchQuery, page, selectedCuisines, sortOption }).toString();

    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/restaurant/search/${city}?${params}`, {headers: req.headers,});
        res.json(response.data);
    } catch (error) {
        console.error('Error searching restaurants:', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/restaurant/all`, {headers: req.headers,});
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching all restaurants:', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.delete('/delete', async (req, res) => {
    const { userEmail } = req.body;
    try {
        const response = await axios.delete(`${BACKEND_BASE_URL}/api/restaurant/delete`, {
            data: { userEmail },
            headers: req.headers,
        });
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

router.put('/update', async (req, res) => {
    const { userEmail } = req.query;
    const updatedRestaurant = req.body;

    if (!userEmail) {
        return res.status(400).json({ message: 'User email is required' });
    }

    try {
        const response = await axios.put(`${BACKEND_BASE_URL}/api/restaurant/update?userEmail=${encodeURIComponent(userEmail)}`, updatedRestaurant, {
            headers: req.headers
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error updating restaurant:', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});


router.post('/', verifyJWT, async (req, res) => {
    try {
      const { userEmail, totalPrice, cartItems, restaurantName } = req.body;
        
      const response = await fetch(`${BACKEND_BASE_URL}/api/restaurant/`, {
        method: 'POST',
        headers: req.headers,
        body: JSON.stringify({
          userEmail,
          totalPrice,
          cartItems,
          restaurantName,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ message: errorData.message });
      }
  
      const responseData = await response.json();
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router;
