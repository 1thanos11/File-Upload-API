const multer= require("multer");
const path =require("path");

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
  const filetypes = /jpg|png|webp|jpeg/;
  const isValidType = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = filetypes.test(file.mimetype);

  if (isValidType && isValidMimeType) {
    cb(null, true); // ! The first parameter is represent the errors or not and second wheather the file pass the type check
  } else {
    cb("Error: Images Only!");
  }
}

exports.uploadSingle = upload.single("profilePicture");

exports.uploadmultiple = upload.array("images", 10);
