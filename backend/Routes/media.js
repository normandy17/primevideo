const express = require("express");
const router = express.Router();
const {
  getAllMedia,
  getMedia,
  getFavMedia,
  searchResult,
} = require("../controllers/media-controller");

router.get("/", getAllMedia);
router.get("/media/:id", getMedia);
router.post("/fav", getFavMedia);
router.post("/search", searchResult);

module.exports = router;
