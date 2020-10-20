import mongoose from 'mongoose'
const connection = require('../db/connection')
const Schema = mongoose.Schema

var schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    collection: 'tbl_professor'
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