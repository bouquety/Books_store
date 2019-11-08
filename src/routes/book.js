const Books = require('../controllers/booksControllers')
const route = require('express').Router()

route.post('/add', Books.addBooks)
route.post('/update', Books.updateBooks)
route.post('/delete', Books.deleteBooks)
route.post('/note', Books.noteBooks)
route.get('/books', Books.listBooks)

module.exports = route


