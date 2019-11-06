const Books = require('../controllers/booksControllers')
route = require('express').Router()

route.post('/add', Books.addBooks)
route.post('/book', Books.saveBook)
route.post('/update', Books.updateBooks)
route.post('/delete', Books.deleteBooks)
route.get('/books', Books.listBooks)

module.exports = route


