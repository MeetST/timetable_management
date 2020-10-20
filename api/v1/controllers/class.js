const Class = require('../models/class');
const Message = require('../../../config/message')

let _self = {
    getAllClasses: (req, res) => {
        let returnResp;
        Class
            .find()
            .then((classList) => {
                returnResp = {
                    message: Message.COMMON_SUCCESS,
                    data: {
                        list: classList
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

    addClass: (req, res) => {
        let returnResp;
        if (req.body.class_name) {
            let newClass = new Class({
                name: req.body.class_name
            });
            newClass.save((err, result) => {
                if (err) {
                    console.log("err", err)
                    returnResp = {
                        message: Message.CLASS_NAME_REQUIRED,
                        data: {}
                    }
                    res.status(400).send(returnResp)
                } else {
                    returnResp = {
                        message: Message.CLASS_CREATED,
                        data: {}
                    }
                    res.status(200).send(returnResp)
                }
            });
        } else {
            returnResp = {
                message: Message.CLASS_NAME_REQUIRED,
                data: {}
            }
            res.status(400).send(returnResp)
        }
    }
}

module.exports = _self;