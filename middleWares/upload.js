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

// ! For Videos :

const uploadVideosFiles = multer({
  storage: storage,
  //   limits: { fileSize: 100000 },
  fileFilter: function (req, file, cb) {
    checkVideosTypes(file, cb);
  },
});

function checkVideosTypes(file, cb) {
  const filetypesVideos = /mp4|mov|wmv|avi|mkv/;
  const isValidType = filetypesVideos.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = filetypesVideos.test(file.mimetype);

  if (isValidType && isValidMimeType) {
    cb(null, true);
  } else {
    cb("Error: Enter a Valid Type Only!");
  }
}

// ! For Audios :

const uploadAudiosFiles = multer({
  storage: storage,
  //   limits: { fileSize: 100000 },
  fileFilter: function (req, file, cb) {
    checkAudiosTypes(file, cb);
  },
});

function checkAudiosTypes(file, cb) {
  const filetypesAudios = /mp3|wav|m4a/;
  const isValidType = filetypesAudios.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = filetypesAudios.test(file.mimetype);

  if (isValidType && isValidMimeType) {
    cb(null, true);
  } else {
    cb("Error: Enter a Valid Type Only!");
  }
}

// const multer = require("multer");
// const path = require("path");

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname) // ! path.extname : Extract the extension for the file
//     );
//   },
// });

// // Initialize multer with storage and file filter
// const upload = multer({
//   storage: storage,
//   //   limits: { fileSize: 100000 },

//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// // Function to check file types
// function checkFileType(file, cb) {
//   // Supported file types
//   const fileTypes = {
//     images: /jpg|png|webp|jpeg/,
//     videos: /mp4|mov|wmv|avi|mkv/,
//     audios: /mp3|wav|m4a/,
//   };

//   const extension = path.extname(file.originalname).toLowerCase();
//   const mimeType = file.mimetype;

//   // Check if file extension and mimetype match any supported type
//   const isValidType =
//     (fileTypes.images.test(extension) && fileTypes.images.test(mimeType)) ||
//     (fileTypes.videos.test(extension) && fileTypes.videos.test(mimeType)) ||
//     (fileTypes.audios.test(extension) && fileTypes.audios.test(mimeType));

//   if (isValidType) {
//     cb(null, true); // ! First parameter represents errors; second indicates if the file passed the check
//   } else {
//     cb(
//       "Error: Invalid file type. Please upload an image, video, or audio file."
//     );
//   }
// }

// Exporting various upload configurations
exports.uploadImages = uploadImagesFiles.single("profilePicture");
exports.uploadMultipleImages = uploadImagesFiles.array("images", 10);
exports.uploadVideosMiddleWare = uploadVideosFiles.array("videos", 10);
exports.uploadAudiosMiddleWare = uploadAudiosFiles.single("audio");
