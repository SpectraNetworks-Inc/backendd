const express = require('express');
const ShortUrl = require('../../models/shorturl.model');
const router = express.Router();

// Index ShortURL
router
  .get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('shorturl', { shortUrls: shortUrls });
  });


//Create URL Endpoint
router
  .post('/create', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/v1/shorturl');
});

//Get URL and redirect
router
  .get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
});

router
  .get('/:shortUrl/delete', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    shortUrl.deleteOne({ short: req.params.shortUrl });
    res.redirect('/v1/shorturl');
});


module.exports = router;
