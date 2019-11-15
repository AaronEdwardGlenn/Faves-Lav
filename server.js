// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Database Client
const client = require('./lib/client');
// Services
const drinksApi = require('./lib/drinks-api');
console.log(drinksApi);
// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    async selectUser(email) {
        const result = await client.query(`
            SELECT id, email, hash, display_name as "displayName" 
            FROM users
            WHERE email = $1;
        `, [email]);
        return result.rows[0];
    },
    async insertUser(user, hash) {
        console.log(user);
        const result = await client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `, [user.email, hash, user.displayName]);
        return result.rows[0];
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// *** API Routes ***
app.get('/api/drinks', async(req, res) => {
    
    try {
        const query = req.query;

        // get the data from the third party API
        const drinks = await drinksApi.get(query.search, query.page);

        // This part is coded after initial functionality is complete...
        
        // Check if any of these are favorites:
        // Make an array of ids
        const ids = drinks.map(drink => drink.id);
        // Select these ids from the favorites table, for _this user_
        const result = await client.query(`
            SELECT id
            FROM   favorites
            WHERE  user_id = $1
            AND    id = ANY($2)
        `, [req.userId, ids]);

        // make a lookup of all favorite ids:
        const lookup = result.rows.reduce((acc, drink) => {
            acc[drink.id] = true;
            return acc;
        }, {});

        // adjust the favorite property of each item:
        drinks.forEach(drink => drink.isFavorite = lookup[drink.id] || false);
        
        // Ship it!
        res.json(drinks);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/me/favorites', async(req, res) => {
    // Get the favorites _for the calling user_
    try {
        const result = await client.query(`
            SELECT id, 
                name as strDrink, 
                image as strDrinkThumb, 
                ingredient as strIngredient1, 
                user_id as "userId", 
                TRUE as "isFavorite"
            FROM   favorites
            WHERE user_id = $1;
        `, [req.userId]);
            
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

// const stringHash = require('string-hash');

app.post('/api/me/favorites', async(req, res) => {
    // Add a favorite _for the calling user_
    try {
        const drink = req.body;
        console.log(drink);
        const result = await client.query(`
            INSERT INTO favorites (id, name, user_id, ingredient, image)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, user_id as "userId", ingredient, image;
        `, [
            drink.idDrink, 
            drink.strDrink, 
            req.userId, 
            drink.strIngredient1, 
            drink.strDrinkThumb
        ]);
        
        res.json(result.rows[0]);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/api/me/favorites/:id', (req, res) => {
    // Remove a favorite, by favorite id _and the calling user_
    try {
        client.query(`
            DELETE FROM favorites
            WHERE id = $1
            AND   user_id = $2;
        `, [req.params.id, req.userId]);

        res.json({ removed: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});