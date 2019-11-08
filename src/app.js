const express = require('express'), // Import express
    app = express(), //instance express
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    env = require('./environement')

mongoose.connect(env.bdd.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/user', require('./routes/user'))
app.use('/book', require('./routes/book'))

app.listen(env.port, function() {
        console.log("Run serve")
    }) // Run serve