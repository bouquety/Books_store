const Users = require('../controllers/userControllers'),
route = require('express').Router()


route.post('/delete', Users.deleteUsers)
route.post('/register', Users.inscription)
route.post('/update',Users.updateUsers)
route.post('/login',Users.connexion)
route.post('/forgot', Users.motdepasseForgot)
route.get('//userforgot/:token',)
route.get('/list', Users.listUsers)

module.exports = route
