const Books = require('../models/books')


exports.saveBook = (req, res) => {
    let book = new Books() // New instance de book
    book.title = (req.body.title !== undefined) ? req.body.title : "Mike le roi!"
    book.author = "MoHammed EL Korchi"
    book.publishDate = new Date()
    book.save(function(err) { // Save book
        console.log(err)
        res.status(201).send(JSON.stringify(req.body))
    })
}

exports.listBooks = (req, res) => {
    const query = req.query

    Books.apiQuery(query).select("title author links rating").then( book => 
        res.status(201).json(book)
        ).catch(
            err => 
            res.status(500).json(err)
        )
}

exports.addBooks = (req, res) => {
            const data = (req.body.title !== undefined) ? {
                title: req.body.title,
                author : req.body.author,
                publishDate : req.body.publishDate,
                rating : [{
                    rate : req.body.rating,
                    comment: req.body.comment,
                }],
                links : [{
                    name : req.body.name_link,
                    link : req.body.link,
                }],
            } : res.status(400).send("Veuillez rentrez un livre")
                      Books.create(data).then (book => 
                        res.status(201).json(book.title)                     
                        ).catch(
                            err =>res.status(500).send(err)
                        )
}