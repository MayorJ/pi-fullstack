
const express = require('express');
const router = express.Router();
const { listAll, deleteByPublicId } = require('../controllers/fileController');
const auth = require('../middleware/auth');

router.get('/', listAll);
router.delete('/:publicId', auth, deleteByPublicId);

module.exports = router;
