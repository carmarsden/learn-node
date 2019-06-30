const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());


const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { search = "", sort, genres } = req.query;

    // validate sort & genre inputs
    const acceptableSort = ['Rating', 'App'];
    const acceptableGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    if (sort) {
        if (!acceptableSort.includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either "App" or "Rating"');
        }
    }
    if (genres) {
        if (!acceptableGenres.includes(genres)) {
            return res
                .status(400)
                .send('Genres must be one of the following: "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"');
        }
    }

    // filter by search
    let results = apps
        .filter(app => 
            app.App
            .toLowerCase()
            .includes(search.toLowerCase())
        );

    // sort by App or Rating if applicable
    if(sort) {
        results
            .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        }); 
    }

    // filter by genre if applicable 
    if(genres) {
        console.log('searching on: ', genres);
        results = results.filter(app => app.Genres.includes(genres));
    }

    res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
