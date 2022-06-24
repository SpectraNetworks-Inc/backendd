

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const shorturlValidation = require('../../validations/shorturl.validation');
const shorturlController = require('../../controllers/shorturl.controller');


router
  .route('/')
  .get(shorturlController.getAllUrls);

router
  .route('/:shortUrl')
  .get(shorturlController.getUrl);

router
  .route('/create')
  .post(validate(shorturlValidation.createShortUrl), shorturlController.createUrl);

router
  .route('/:shortUrl/delete')
  .post(shorturlController.deleteUrl);

  router
  .route('/:shortUrl/stats')
  .get(shorturlController.urlStats);



module.exports = router;
