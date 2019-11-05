const Users = require('../controllers/userControllers')
route = require('express').Router()



route.post('/register',Users.inscription)

route.post('/login',Users.connexion)

route.get('/list', Users.listUsers)

module.exports = route
