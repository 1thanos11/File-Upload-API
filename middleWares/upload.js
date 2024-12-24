const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname) // ! path.extname : Extract the Extension for the file
    );
  },
});

// ! For Images :

const uploadImagesFiles = multer({
  storage: storage,
  //   limits: { fileSize: 100000 },

  fileFilter: function (req, file, cb) {
    checkImagesTypes(file, cb);
  },
});

function checkImagesTypes(file, cb) {
  const filetypesImages = /jpg|png|webp|jpeg/;

  const isValidType = filetypesImages.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = filetypesImages.test(file.mimetype);

  if (isValidType && isValidMimeType) {
    cb(null, true); // ! The first parameter is represent the errors or not and second wheather the file pass the type check
  } else {
    cb("Error: Enter a Valid Type Only!");
  }
}

exports.uploadMultipleImages = uploadImagesFiles.array("images", 10);
