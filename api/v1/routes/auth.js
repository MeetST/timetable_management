import express from 'express'
const router = express.Router()
const ClassController = require('../controllers/class');
const ProfessorController = require('../controllers/professor');
const LectureController = require('../controllers/lecture');

router.post('/api/class/add', ClassController.addClass);
router.get('/api/class/list', ClassController.getAllClasses);

router.post('/api/professor/add', ProfessorController.addProfessor);
router.get('/api/professor/list', ProfessorController.getAllProfessors);

router.post('/api/lecture/add', LectureController.addLecture);
router.get('/api/lecture/class/weekly/list', LectureController.getClassWeeklyTimetable);
router.get('/api/lecture/professor/weekly/list', LectureController.getProfessorWeeklyTimeTable);

// exports router
module.exports = router