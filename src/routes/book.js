const Books = require('../controllers/booksControllers')
route = require('express').Router()

route.post('/add', Books.addBooks)
route.post('/book', Books.saveBook)
route.get('/book/:title', Books.listBooks)
route.get('/books', Books.listBooks)

module.exports = route


