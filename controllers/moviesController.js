// controllers/moviesController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMovieById = async (req, res) => {
    try {
        console.log('req', req.params)
        const movie = await prisma.movie.findUnique({
            where: { id: parseInt(req.params.movieId) },
        });
        console.log('movie', movie)
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createMovie = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newMovie = await prisma.movie.create({
            data: { title },
        });
        res.json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await prisma.movie.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await prisma.movie.delete({
            where: { id: parseInt(req.params.id) },
        });
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(deletedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchMovie = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const movies = await prisma.movie.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive', 
                },
            },
        });

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovie,
};
