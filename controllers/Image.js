const Image = require("../models/Image");
const path = require("path");
const fs = require("fs");

exports.uploadImages = async (req, res) => {
  try {
    const newFiles = req.files ? req.files.map((file) => file.filename) : [];

    let imageDocument = await Image.findOne();
    if (!imageDocument) {
      imageDocument = new Image({ images: [] }); // Initialize with an empty images array
    }

    imageDocument.images.push(...newFiles);

    await imageDocument.save();

    res.status(200).send(imageDocument);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
