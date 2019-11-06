const Books = require('../models/books')


exports.updateBooks = (req,res) => {

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

        Books.findOneAndUpdate({title: req.body.title_modif}, { "$set": { 
            "title": data.title , 
            "author": data.author, 
            "publishDate": data.publishDate,
            "rating": [{
            "rate" : data.rating[0].rate,
            "comment": data.rating[0].comment,
        }],
        "links" : [{
            "name" : data.links[0].name_link,
            "link" : data.links[0].link,
        }]
    }},{new: true, omitUndefined : true}).then(user => {
            if(user){
                res.status(201).send("Book modifier ")                    
            }
            else {
                res.status(500).send("Book not exist")
            }
        }
            ).catch(
                err =>res.status(500).send(err)
            )
                  
   
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

exports.deleteBooks = (req, res) => {
    const data = (req.body.title !== undefined) ? {
        title: req.body.title,
    } : res.status(400).send("Veuillez rentrez un email")
Books.findOneAndRemove({title: req.body.title}).then(book => {
    if(book){
        res.status(201).send("Book supprimer ")                    
    }
    else {
        res.status(500).send("Book not exist")
    }
}
    ).catch(
        err =>res.status(500).send(err)
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