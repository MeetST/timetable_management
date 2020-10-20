const Lecture = require('../models/lecture');
const Message = require('../../../config/message')

let _self = {
    addLecture: async (req, res) => {
        let returnResp;
        if (req.body.subject_name && req.body.slot && req.body.day && req.body.class && req.body.professor) {
            let totalLectureOfTheDayByProfessor = await Lecture.count({
                professor: req.body.professor,
                day: req.body.day
            })
            console.log("totalLectureOfTheDayByProfessor", totalLectureOfTheDayByProfessor)
            if (totalLectureOfTheDayByProfessor >= 4) {
                returnResp = {
                    message: Message.PROFESSOR_DAILY_LECTURE_LIMIT_REACHED,
                    data: {}
                }
                return res.status(400).send(returnResp)
            }

            let totalLectureOfTheWeekByProfessor = await Lecture.count({
                professor: req.body.professor
            })
            console.log("totalLectureOfTheWeekByProfessor", totalLectureOfTheWeekByProfessor)
            if (totalLectureOfTheWeekByProfessor >= 18) {
                returnResp = {
                    message: Message.PROFESSOR_WEEKLY_LECTURE_LIMIT_REACHED,
                    data: {}
                }
                return res.status(400).send(returnResp)
            }


            let totalLectureOfTheDayForClass = await Lecture.count({
                class: req.body.class,
                day: req.body.day
            })
            console.log("totalLectureOfTheDayForClass", totalLectureOfTheDayForClass)
            if (totalLectureOfTheDayForClass >= 6) {
                returnResp = {
                    message: Message.DAILY_LECTURE_LIMIT_REACHED,
                    data: {}
                }
                return res.status(400).send(returnResp)
            }


            let totalLectureOfTheWeekForClass = await Lecture.count({
                class: req.body.class
            })
            console.log("totalLectureOfTheWeekForClass", totalLectureOfTheWeekForClass)
            if (totalLectureOfTheWeekForClass >= 25) {
                returnResp = {
                    message: Message.WEEKLY_LECTURE_LIMIT_REACHED,
                    data: {}
                }
                return res.status(400).send(returnResp)
            }

            let newLecture = new Lecture({
                subject_name: req.body.subject_name,
                slot: req.body.slot,
                day: req.body.day,
                professor: req.body.professor,
                class: req.body.class
            });
            newLecture.save((err, result) => {
                if (err) {
                    console.log("err", err)
                    returnResp = {
                        message: Message.COMMON_ERROR,
                        data: {}
                    }
                    res.status(400).send(returnResp)
                } else {
                    returnResp = {
                        message: Message.LECTURE_ADDED,
                        data: {}
                    }
                    res.status(200).send(returnResp)
                }
            });
        } else {
            returnResp = {
                message: Message.PARAMETER_MISSING,
                data: {}
            }
            res.status(400).send(returnResp)
        }
    },

    getClassWeeklyTimetable: async (req, res) => {
        let returnResp
        if (req.query.class_id) {
            let query = {
                class: req.query.class_id
            }
            let lectures = await Lecture.find(query).sort({day:1, slot: 1});
            returnResp = {
                message: Message.COMMON_SUCCESS,
                data: {
                    list: lectures
                }
            }
            res.status(200).send(returnResp)
        } else {
            returnResp = {
                message: Message.CLASS_ID_REQUIRED,
                data: {}
            }
            res.status(400).send(returnResp)
        }
    }
}

module.exports = _self;