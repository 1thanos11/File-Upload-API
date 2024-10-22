const Post = require("../models/Post");
const path = require("path");
const fs = require("fs");

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = new Post({
      content,
      images: [],
    });

    await post.save();

    res.status(200).send({ message: "Post Added Successfully", post });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ message: "No Posts Found" });

    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    post.images.push(...newImages);

    await post.save();

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ message: "No Posts Found" });

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { content, imagesToDelete } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ message: "No Posts Found" });

    if (content) {
      post.content = content;
    }

    if (content.length === 0) {
      post.content = null;
    }

    if (imagesToDelete && Array.isArray(imagesToDelete)) {
      post.images = post.images.filter((image) => {
        const imagePath = path.join(__dirname, "..", "uploads", image);

        if (imagesToDelete.includes(image)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Failed to delete image: ${image}`, err);
            }
          });

          return false;
        }

        return true;
      });
    }

    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    if (newImages.length > 0) {
      post.images.push(...newImages); // Add new images
    }

    await post.save();

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// To Delete The Post :

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ message: "No Posts Found" });

    post.images.forEach((image) => {
      const imagePath = path.join(__dirname, "..", "uploads", image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${image}`, err);
        }
      });
    });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
