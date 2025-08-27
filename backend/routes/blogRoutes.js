
const express = require('express');
const router = express.Router();
const { list, get, create, remove, update } = require('../controllers/blogController');
const auth = require('../middleware/auth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pisceses_blogs',
    allowed_formats: ['jpg','png','svg','webp','jpeg']
  }
});
const upload = multer({ storage });

router.get('/', list);
router.get('/:id', get);
router.post('/', auth, upload.single('image'), create);
router.put('/:id', auth, upload.single('image'), update);
router.delete('/:id', auth, remove);

module.exports = router;
