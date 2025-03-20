const express = require('express');
const router = express.Router();
const moviesController = require('./../controllers/movieController');
const upload = require("../middlewares/multer")
// index
router.get("/", moviesController.index);
// show
router.get("/:id", moviesController.show)
// store review
router.post("/:id", moviesController.storeReview)
// store
router.post("/", upload.single('image'), moviesController.store)
module.exports = router;
