
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error);
    }
};


const createTables = async () => {
    try {
        // Separate each create table command
        await pool.query(`
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT
            );
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                rating INT NOT NULL,
                content TEXT NOT NULL,
                restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `);

        console.log('Created tables: restaurants and reviews');
    } catch (error) {
        console.log(error);
    }
};

const insertData = async () => {
    try {
        const restaurantInsertQuery = `
            INSERT INTO restaurants (name, phone, address, photo) VALUES 
                ('Vivace Ristorante','(650) 637-0611','1910 Ralston Ave, Belmont, CA 94002','/images/rest-1.jpg'),
                ('Godfathers Burger Lounge','650-637-9257','1500 El Camino Real, Belmont, CA','/images/rest-2.jpg'),
                ('China Village Restaurant','650-593-1831','600 Ralston Ave, Belmont, CA','/images/rest-3.jpg'),
                ('Hobees','(+1) 650-596-0400','1101 Shoreway Rd, Belmont, CA 94002','/images/rest-4.jpg'),
                ('Sushi Kuu','650-592-1878','1001 Alameda de Las Pulgas, Belmont, CA','/images/rest-5.jpg'),
                ('Victorias Kitchen','(650) 594-0000','390 El Camino Real ste v, Belmont, CA','/images/rest-6.jpg'),
                ('Cafe Bliss','(650) 595-1520','2039 Ralston Ave, Belmont, CA','/images/rest-7.jpg'),
                ('Spoon & Fork','(650) 832-1517','1480 El Camino Real, Belmont, CA','/images/rest-8.jpg'),
                ('Blue Sky Café','(650) 595-0228','1625 El Camino Real #9, Belmont, CA','/images/rest-9.jpg');
        `;
        await pool.query(restaurantInsertQuery);

        const reviewInsertQuery = `
            INSERT INTO reviews (rating, content, restaurant_id) VALUES
                (5, 'This place is awesome! I will come again!', 1),
                (5, 'This is a wonderful place with the best price and best food. Awesome!', 1),
                (4, 'I came here for home taste food. Awesome!', 3),
                (5, 'I came here because of good reviews, and it is awesome!', 3),
                (3, 'Awesome!', 7);
        `;
        await pool.query(reviewInsertQuery);

        console.log('Inserted restaurants and reviews');
    } catch (error) {
        console.log(error);
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
    pool.end(); // Close the pool after all queries are complete
}

setup();