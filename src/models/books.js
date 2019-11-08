const mongoose = require('mongoose')
const stringQuery = require('mongoose-string-query')


let BookSchema = new mongoose.Schema({
    title: {
        trim: true,
        index: true,
        lowercase:true,
        type: String,
        required: true,
        unique: true,
    },
    author: {
        trim: true,
        type: String,
        lowercase: true,
        required: true,
    },
    publishDate: {
        type: Date,
        required: true,
    },
    rating: [{
        rate: {
            type: Number,
            required: true,
        },
        comment: {
            trim: true,
            type: String,
            required: false,
        },
        userName: {
            type: String,
            required: false,
        },
        publishDate_rating: {
            type: Date,
            required: false,
        },
    }],
    links: [{
        name: {
            type: String,
            required: true,
            default: 'Amazon',
        },
        link: {
            type: String,
            required: true,
        },
    }]
})

BookSchema.pre('save', function(next) {
    next()
})

BookSchema.plugin(stringQuery)

module.exports = mongoose.model('Books', BookSchema)