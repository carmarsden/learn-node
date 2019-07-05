require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const POKEDEX = require('./pokedex.json');

const app = express();

app.use(morgan('dev'));
app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
});


// GET POKEMON TYPES
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];
function handleGetTypes(req, res) {
    res.json(validTypes);
};
app.get('/types', handleGetTypes);


// GET POKEMON
function handleGetPokemon(req, res) {
    let response = POKEDEX.pokemon;

    // filter our pokemon by name, case-insensitive, if name param is present
    if (req.query.name) {
        response = response.filter(pokemon =>
            pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
    }
    
    // filter our pokemon by type if type query param is present
    if (req.query.type) {
        response = response.filter(pokemon =>
            pokemon.type.includes(req.query.type)
        )
    }

    res.json(response);
};
app.get('/pokemon', handleGetPokemon);


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})