// routes/moviesRoute.js

const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.getAllMovies);
router.get('/search', moviesController.searchMovie);
router.get('/:movieId', moviesController.getMovieById);
router.post('/', moviesController.createMovie);
router.put('/:movieId', moviesController.updateMovie);
router.delete('/:movieId', moviesController.deleteMovie);

module.exports = router;
