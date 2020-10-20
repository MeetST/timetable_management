const Professor = require('../models/professor');
const Message = require('../../../config/message')

let _self = {
    getAllProfessors: (req, res) => {
        let returnResp;
        Professor
            .find()
            .then((professorList) => {
                returnResp = {
                    message: Message.COMMON_SUCCESS,
                    data: {
                        list: professorList
                    }
                }
                res.status(200).send(returnResp)
            }).catch((err) => {
                returnResp = {
                    message: Message.COMMON_ERROR,
                    data: {}
                }
                res.status(400).send(returnResp)
            })
    },

    addProfessor: async (req, res) => {
        let returnResp;
        if (req.body.first_name && req.body.last_name && req.body.email) {
            let existingProfessor = await Professor.findOne({
                email: req.body.email
            })
            if (existingProfessor) {
                returnResp = {
                    message: Message.PROFESSOR_DUPLICATE_EMAIL,
                    data: {}
                }
                return res.status(400).send(returnResp)
            }
            let newProfessor = new Professor({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            });
            newProfessor.save((err, result) => {
                if (err) {
                    console.log("err", err)
                    returnResp = {
                        message: Message.COMMON_ERROR,
                        data: {}
                    }
                    res.status(400).send(returnResp)
                } else {
                    returnResp = {
                        message: Message.PROFESSOR_ADDED,
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
    }
}

module.exports = _self;