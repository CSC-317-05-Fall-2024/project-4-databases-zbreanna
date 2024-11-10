// Fill this in
import { pool } from '../config/database.js';

const getRestaurants = async() => {
    try {
        const results = await pool.query('SELECT * FROM restaurants ORDER BY id ASC')
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
};


const getRestaurant = async (id) => {
    try {
        const results = await pool.query('SELECT * FROM restaurants WHERE id=$1', [id])
        return results.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

const getReviewsForRestaurant = async (id) =>{
    try {
        const results = await pool.query('SELECT * FROM reviews WHERE restaurant_id=$1', [id]);
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
}

const createRestaurant = async (newRestaurant) => {
    try {
        const insertQuery = `
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
       const {name,phone, address, photo} = newRestaurant;
       const result = await pool.query(insertQuery, [name,phone, address, photo]);
       return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    };
};

const updateRestaurant = async (id, data) => {
    try {
        const query = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id])
        const current = query.rows[0];
        const updatedData = {
            ...current,
            ...data
        }
        const { name, phone, address, photo } = updatedData;
        const results = await pool.query('UPDATE restaurants SET name = $1, phone = $2, address = $3, photo = $4 WHERE id = $5 RETURNING *', [name, phone, address, photo, id])
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
};
// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    try {
        const results = await pool.query('DELETE FROM restaurants WHERE id = $1', [id]);
        return {message: 'Restaurant with id ${id} deleted.'}
    } catch (error) {
        console.error( error.message )
        throw error;
    }
};


export { getRestaurants, getRestaurant, getReviewsForRestaurant,createRestaurant,updateRestaurant,deleteRestaurant};