const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)