import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId;
const connection = require('../db/connection')
const Schema = mongoose.Schema

var schema = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    slot: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    professor: {
        type: ObjectId,
        ref: 'tbl_professor',
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}, {
    collection: 'tbl_lecture'
})

schema.pre('save', function (next) {
    let url = this
    url.created_at = url.updated_at = new Date()
    next()
})

schema.pre('update', function (next) {
    let url = this
    url.updated_at = new Date()
    next()
})

module.exports = connection.model(schema.options.collection, schema)