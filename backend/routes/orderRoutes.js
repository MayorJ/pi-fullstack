
const express = require('express');
const router = express.Router();
const { create, list, get } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', create);
router.get('/', auth, list);
router.get('/:id', auth, get);

module.exports = router;
