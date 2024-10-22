const {
  createPost,
  getPost,
  updatePost,
  uploadImages,
  deletePost,
} = require("../controllers/Post");

const e = require("express");
const { uploadmultiple } = require("../middleWares/upload");
const router = e.Router();

router.post("/create", createPost);
router.post("/upload/Images/:id", uploadmultiple, uploadImages);
router.get("/get/:id", getPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

module.exports = router;
