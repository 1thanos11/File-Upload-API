const { uploadImages } = require("../controllers/Image");

const e = require("express");
const { uploadMultipleImages } = require("../middleWares/upload");
const router = e.Router();

router.post("/upload/Images", uploadMultipleImages, uploadImages); // for multiple images

module.exports = router;
