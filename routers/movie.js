const express = require('express');
const router = express.Router();
const moviesController = require('./../controllers/movieController');

// index
router.get("/", moviesController.index);
// show
router.get("/:id", moviesController.show)
// store review
router.post("/:id/review", moviesController.storeReview)
module.exports = router;
