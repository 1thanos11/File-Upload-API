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

// To Upload Images And Videos And Audios (One Function For All) :

// exports.uploadFiles = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).send({ message: "No Posts Found" });

//     const newFiles = req.files ? req.files.map((file) => file.filename) : [];
//     const fileTypeMapping = {
//       videos: /mp4|mov|wmv|avi|mkv/,
//       audio: /mp3|wav|m4a/,
//       images: /jpg|png|webp|jpeg/,
//     };

//     if (newFiles.length === 0) {
//       return res.status(400).send({ message: "No files uploaded" });
//     }

//     for (const [key, regex] of Object.entries(fileTypeMapping)) {
//       if (
//         newFiles.some((file) => regex.test(path.extname(file).toLowerCase()))
//       ) {
//         post[key].push(...newFiles);
//         break;
//       }
//     }

//     await post.save();
//     res.status(200).send(post);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// To Upload Images :

exports.uploadImages = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ message: "No Posts Found" });

    const newFiles = req.files ? req.files.map((file) => file.filename) : [];

    post.images.push(...newFiles);

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// To Upload Videos :

exports.uploadVideos = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ message: "No Posts Found" });

    const newVideos = req.files ? req.files.map((file) => file.filename) : [];

    post.videos.push(...newVideos);

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// To Upload Audios :

exports.uploadAudios = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ message: "No Posts Found" });

    const newAudio = req.file ? req.file.filename : "";

    post.audio.push(newAudio);

    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// To Get The Post :

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ message: "No Posts Found" });

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// To Update The Post :

exports.updatePost = async (req, res) => {
  try {
    const { content, imagesToDelete, videosToDelete } = req.body;

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
    if (videosToDelete && Array.isArray(videosToDelete)) {
      post.videos = post.videos.filter((video) => {
        const videoPath = path.join(__dirname, "..", "uploads", video);

        if (videosToDelete.includes(video)) {
          fs.unlink(videoPath, (err) => {
            if (err) {
              console.error(`Failed to delete video: ${video}`, err);
            }
          });

          return false;
        }

        return true;
      });
    }

    const newImages = req.files ? req.files.map((file) => file.filename) : [];
    const newVideos = req.files ? req.files.map((file) => file.filename) : [];

    if (newImages.length > 0) {
      post.images.push(...newImages); // Add new images
    }

    if (newVideos.length > 0) {
      post.videos.push(...newVideos); // Add new videos
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

    post.videos.forEach((video) => {
      const videoPath = path.join(__dirname, "..", "uploads", video);
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error(`Failed to delete video: ${video}`, err);
        }
      });
    });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
