import express from 'express'
const router = express.Router()
const ClassController = require('../controllers/class');

router.post('/api/class/add', ClassController.addClass);
router.get('/api/class/list', ClassController.getAllClasses);

// exports router
module.exports = router