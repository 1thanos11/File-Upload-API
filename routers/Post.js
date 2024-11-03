const {
  createPost,
  getPost,
  updatePost,
  // uploadFiles,
  uploadImages,
  uploadVideos,
  uploadAudios,
  deletePost,
} = require("../controllers/Post");

const e = require("express");
const {
  uploadMultipleImages,
  uploadVideosMiddleWare,
  uploadAudiosMiddleWare,
} = require("../middleWares/upload");
const router = e.Router();

router.post("/create", createPost);
router.post("/upload/Images/:id", uploadMultipleImages, uploadImages); // for multiple images
router.post("/upload/Videos/:id", uploadVideosMiddleWare, uploadVideos); // for multiple videos
router.post("/upload/audios/:id", uploadAudiosMiddleWare, uploadAudios); // for single audio

router.get("/get/:id", getPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

module.exports = router;
