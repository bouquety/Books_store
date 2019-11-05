const mongoose = require('mongoose')
const stringQuery = require('mongoose-string-query')

let UserSchema = new mongoose.Schema({
    email: {
        trim: true,
        index: true,
        lowercase:true,
        type: String,
        required: true,
        unique: true
    },

    username: {
        trim: true,
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        bcrypt: true,
    },

    avatar: {
        type: String,
        required: true,
        trim: true,
        default: 'https://res.cloudinary.com/teepublic/image/private/s--qTzgPjhE--/t_Preview/b_rgb:6e2229,c_limit,f_jpg,h_630,q_90,w_630/v1524793004/production/designs/2632126_0.jpg'
    },

    isadmin:{
        type: Boolean,
        default: false,

    },

    dateInscription:{
        type: Date,
    },

    tokens: [{
        token:{
            type: String,
            require: true,
        },
        type:{
            type: String,
            require: true,
            default: 'auth'
        }
    }]
})

UserSchema.pre('save', (next) => {
    if(!this.isNew)
    next()
else
    console.log('send mail')
    next()
})

UserSchema.plugin(stringQuery)

module.exports = mongoose.model('Users', UserSchema)