var express = require('express');
var router = express.Router();

const Celebrity = require("../models/Celebrity.model");

/* GET home page. */
router.get('/all-celebrities', function (req, res, next) {
    Celebrity.find()
        .then((result) => {
            res.render('celebrities/celebrities.hbs', { celebrities: result });
        })
        .catch((err) => console.log(err));
});

/* GET home page. */
router.get('/add-celebrity', function (req, res, next) {
    res.render('celebrities/new-celebrity.hbs');
});

router.post('/add-celebrity', function (req, res, next) {

    const newCelebrity = req.body;
    console.log(req.body)
    Celebrity.create(newCelebrity)
        .then((result) => {
            res.redirect('/celebrities/all-celebrities');
        }).catch((err) => console.log(err))
});

router.get('/:id/delete', function (req, res, next) {
    Celebrity.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.redirect('/celebrities/all-celebrities')
        })
        .catch((err) => console.log(err))
});

module.exports = router;