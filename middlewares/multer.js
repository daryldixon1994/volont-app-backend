const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, Date.now() + name);
  },
});
// my image.png   ===> 175896696996my_image.png

const upload = multer({
  storage: storage,
});

module.exports = upload;