import express from 'express'
const router = express.Router()
const ClassController = require('../controllers/class');
const ProfessorController = require('../controllers/professor');

router.post('/api/class/add', ClassController.addClass);
router.get('/api/class/list', ClassController.getAllClasses);

router.post('/api/professor/add', ProfessorController.addProfessor);
router.get('/api/professor/list', ProfessorController.getAllProfessors);

// exports router
module.exports = router