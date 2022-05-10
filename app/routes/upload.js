const router = require('express').Router();
const upload = require('../controllers/uploadController').single('uploadImage');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(404).json(err);
    } else {
      if (req.file === undefined) {
        res.status(404).json('Error: No file selected');
      } else {
        res.status(200).json({
          message: 'File upload success',
          file: `/uploads/${req.file.filename}`
        })
      }
      console.log(req.file);
      res.status(404).json('test');
    }
  });
});

module.exports = router;
