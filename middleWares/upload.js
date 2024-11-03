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

const upload = multer({
  storage: storage,
  //   limits: { fileSize: 100000 },

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypesImages = /jpg|png|webp|jpeg/;
  const filetypesVideos = /mp4|mov|wmv|avi|mkv/;
  const isValidType = filetypesImages.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = filetypesImages.test(file.mimetype);
  const isValidTypeVideos = filetypesVideos.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeTypeVideos = filetypesVideos.test(file.mimetype);

  if (
    (isValidType && isValidMimeType) ||
    (isValidTypeVideos && isValidMimeTypeVideos)
  ) {
    cb(null, true); // ! The first parameter is represent the errors or not and second wheather the file pass the type check
  } else {
    cb("Error: Enter a Valid Type Only!");
  }
}

exports.uploadSingle = upload.single("profilePicture");

exports.uploadmultiple = upload.array("images", 10);

exports.uploadVideo = upload.array("videos", 10);
