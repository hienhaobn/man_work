const multer = require('multer');
const path = require('path');
const { checkFileType } = require('../helpers/file');
const storage = multer.diskStorage({
    //hỉnh ảnh sẽ chưa trong folder uploads
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null , file.fieldname + '-' + Date.now() + path.extname(file.originalname)); ;// mặc định sẽ save name của hình ảnh
        // là name gốc, chúng ta có thể rename nó.
    }
});

//save trên local của server khi dùng multer
const upload = multer({
    storage:storage,
    limits: {fieldSize: 10},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;