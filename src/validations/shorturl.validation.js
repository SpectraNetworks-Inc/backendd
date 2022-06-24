const Joi = require('joi');

const createShortUrl = {
  body: Joi.object().keys({
    full: Joi.string().required()
  }),
};

const getAllUrls = {
    query: Joi.object().keys({
        
    }),
  };

  module.exports = {
    createShortUrl,
    getAllUrls
  };