const path = require('path');

function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // check mine
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({message: 'Error: Images Only!', status: 401});
  }
}

const fileHelper = {
  checkFileType
};

module.exports = fileHelper;