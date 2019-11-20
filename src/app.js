const express = require('express'), // Import express
    app = express(), //instance express
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    env = require('./environement')
    var cors = require('cors')

mongoose.connect(env.bdd.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/user/login', function(req,res){

    
})

app.use('/user', require('./routes/user'))
app.use('/book', require('./routes/book'))

app.listen(env.port, function() {
        console.log("Run serve" + env.port)
    }) // Run serve