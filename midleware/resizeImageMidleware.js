const sharp = require("sharp");

function resizeImage(req, res, next) {
  if (!req.file) {
    return next(console.log("No file uploaded"));
  }
  sharp(req.file.buffer)
    .resize(320, 240)
    .toBuffer((err, buffer) => {
      if (err) {
        return next(err);
      }
      req.file.buffer = buffer;
      next();
    });
}

module.exports = resizeImage;
