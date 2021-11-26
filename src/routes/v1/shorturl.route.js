const express = require('express');
const ShortUrl = require('../../models/shorturl.model');
const router = express.Router();

// Index ShortURL
router
  .get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('shorturl', { shortUrls: shortUrls });
  });

// Success Endpoint
router
  .get('/success', async (req, res) => {
    res.json({
      success: true
    });
  });

//Create URL Endpoint
router
  .post('/create', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/v1/shorturl/success');
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

module.exports = router;