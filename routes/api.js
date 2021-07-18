const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
    const search = req.query.search || '';
    let sort = req.query.sort || -1;
    sort = Number(sort);

    if (sort !== -1 && sort !== 1) {
        sort = -1;
    }

    const findNews = News
        .find({
            title: new RegExp(search.trim(), 'i')
        })
        .sort({
            created: sort
        });

    findNews.exec((err, data) => {
        res.status(200).json(data);
    })

});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const findNews = News
        .findById(id);

    findNews.exec((err, data) => {
        res.status(200).json(data);
    })

});

module.exports = router;