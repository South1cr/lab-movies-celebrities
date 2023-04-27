var express = require('express');
var router = express.Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

/* GET home page. */
router.get('/all-movies', function (req, res, next) {
    Movie.find()
        .then((result) => {
            console.log(result)
            res.render('movies/movies.hbs', { movies: result });
        })
        .catch((err) => console.log(err))

});

router.get('/movie-details/:id', function (req, res, next) {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((result) => {
            console.log(result)
            res.render('movies/movie-details.hbs', { movie: result });
        })
        .catch((err) => console.log(err))

});

router.get('/add-movie', function (req, res, next) {
    Celebrity.find()
        .then((result) => {
            res.render('movies/new-movie.hbs', { celebrities: result });
        })
});

router.post('/add-movie', function (req, res, next) {
    const newMovie = req.body;
    Movie.create(newMovie)
        .then((result) => {
            res.redirect('/movies/all-movies');
        }).catch((err) => console.log(err))
});

router.get('/:id/delete', function (req, res, next) {
    Movie.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.redirect('/movies/all-movies')
        })
        .catch((err) => console.log(err))
});

module.exports = router;