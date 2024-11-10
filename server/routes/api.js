/*import express from 'express';
import {getRestaurants, getRestaurant, getReviewsForRestaurant, createRestaurant,updateRestaurant, deleteRestaurant } from '../data/restaurants.js';
const router = express.Router();
// Add routes here
router.get('/restaurants', async (req, res) => {
    try{
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({message: 'error to fetch restaurants'});
    }

});

router.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const restaurant = await getRestaurant(id);
        const reviews = await getReviewsForRestaurant(id);
        console.log(restaurant);
        console.log(reviews);

        if (restaurant){
            res.render("restaurant-details", {restaurant, reviews});
        } else{
            res.status(404).json({ message: 'restaurant not found}' });
        }    
    } catch (error) {
        res.status(500).json({message: 'error to fetch restaurant'});
    }
});

router.post('/restaurants', async (req, res) => {
    const {name,address,phone,photo} = req.body;
    const newRestaurant ={
        name,
        phone,
        address,
        photo
    };
    const createdRestaurant = await createRestaurant(newRestaurant);
    res.status(201).json(createdRestaurant);
});
router.delete('/restaurants/:id',async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedRestaurant = await deleteRestaurant(id);
        res.json({message : 'deleted Restaurant:', deletedRestaurant});
    }catch(error){
        res.status(500).json({ "message": '${error}' });
    } 
});

export {router as backendRouter};
*/
import express from 'express';
import { getRestaurants, getRestaurant, getReviewsForRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

// Get all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants' });
    }
});

// Get a single restaurant by ID with its reviews
router.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const restaurant = await getRestaurant(id);
        const reviews = await getReviewsForRestaurant(id);

        if (restaurant) {
            res.render("restaurant-details", { restaurant, reviews });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurant' });
    }
});

// Create a new restaurant
router.post('/restaurants', async (req, res) => {
    const { name, address, phone, photo } = req.body;
    const newRestaurant = { name, phone, address, photo };

    try {
        const createdRestaurant = await createRestaurant(newRestaurant);
        res.status(201).json(createdRestaurant);
    } catch (error) {
        res.status(500).json({ message: `Error creating restaurant: ${error.message}` });
    }
});

// Delete a restaurant by ID
router.delete('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await deleteRestaurant(id);
        res.json({ message: `Restaurant with ID ${id} deleted.` });
    } catch (error) {
        res.status(500).json({ message: `Error deleting restaurant: ${error.message}` });
    }
});

export { router as backendRouter };

