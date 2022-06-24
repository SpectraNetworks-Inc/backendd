const httpStatus = require('http-status');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { authService, userService, tokenService, emailService } = require('../services');

const ShortURL = require('../models/shorturl.model');

const getUrl = catchAsync(async (req, res) => {
    if (!req.params.shortUrl) {
        res.status(400).json({
          code: 400,
          message: "Short URL is required"
        });
      } else {
        try {
          await ShortURL.findOne({ 
            where: { 
              short: req.params.shortUrl 
            } 
          }).then(surl => {
            if (surl) {
              surl.clicks++;
              surl.save();
              res.redirect(surl.full);
            } else {
              res.status(404).json({
                code: 404,
                message: "URL not found"
              });
            }
          }).catch(error => {
            res.status(500).json({ 
              code: 500,
              message: "Internal Server Error"
            });
  
          })
      } catch (error) {
        res.status(500).json({ 
          code: 500,
          message: "Internal Server Error"
        });
      }
    }
});



const getAllUrls = catchAsync(async (req, res) => {
    try {
        await ShortURL.findAll().then(surl => {
            if (surl) {
                res.json({
                    surl
                });
            }
            return null;
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }

});




const createUrl = catchAsync(async (req, res) => {
    try {
        if (!req.body.full) {
          res.status(400).json({
            code: 400,
            message: "Full URL is required"
          });
        } else {
          await ShortURL.create({ 
            full: req.body.full 
          }).then(surl => {
            res.json(surl);
          }).catch(error => {
            res.status(500).json({ 
              code: 500,
              message: "Internal Server Error" 
            });
            console.log(error);
          });
        }
      } catch (error) {
        res.status(500).json({ 
          code: 500,
          message: "Internal Server Error" 
        });
        console.log(error);
      }
});


const deleteUrl = catchAsync(async (req, res) => {
    if (!req.params.shortUrl) {
        res.status(400).json({});
      } else {
        try {
          await ShortURL.findOne({
            where: {
              short: req.params.shortUrl
            }
          }).then(surl => {
            if (surl) {
              surl.destroy();
              res.json({
                code: 200,
                message: "URL deleted"
              });
            } else {
              res.status(404).json({
                code: 404,
                message: "URL not found"
              });
            }
          }).catch(error => {
            res.status(500).json({
              code: 500,
              message: "Internal Server Error"
            });
          })
        } catch (error) {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          });
        }
      }
});


const urlStats = catchAsync(async (req, res) => {
  if (!req.params.shortUrl) {
      res.status(400).json({});
    } else {
      try {
        await ShortURL.findOne({
          where: {
            short: req.params.shortUrl
          }
        }).then(surl => {
          if (surl) {
            res.json({
              clicks: `${surl.clicks}`,
              created: `${surl.createdAt}`,
              updated: `${surl.updatedAt}`
            });
          } else {
            res.status(404).json({
              code: 404,
              message: "URL not found"
            });
          }
        }).catch(error => {
          console.log(error);
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          });
        })
      } catch (error) {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      }
    }
});


module.exports = {
    getUrl,
    createUrl,
    getAllUrls,
    deleteUrl,
    urlStats
};
