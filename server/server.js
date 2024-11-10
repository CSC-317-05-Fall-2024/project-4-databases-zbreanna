import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {getRestaurants, getRestaurant} from "./data/restaurants.js";
import {backendRouter} from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use('/api', backendRouter);    

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/new-restaurant-form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-restaurant-form.html'));
});

app.get('/restaurants', async (req, res) => {
    const restaurants =await getRestaurants();
    res.render('restaurants', {restaurants});
});

app.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = await getRestaurant(id);
    if (restaurant) {
        res.render('restaurant-details', { restaurant });  // Render the details view with the restaurant data
    } else {
        res.status(404).send('Restaurant not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
