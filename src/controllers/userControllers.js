const Users = require('../models/user'),
 bcrypt = require('bcrypt'),
 jwt = require('jsonwebtoken'),
env = require('../environement')


exports.inscription = (req, res) => {
    if (req.body.email !== undefined && req.body.password !== undefined && req.body.username !== undefined){
        bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword){
            const data = (req.body.email !== undefined) ? {
                email: req.body.email,
                password : bcryptedPassword,
                username : req.body.username
            } : res.status(400).send("Veuillez rentrez un email, un mot de passe ou un username")

            data.tokens = [{
                token : jwt.sign({
                    email: data.email
                }, 
                env.jwt, {
                    expiresIn: '72h'
                })
        }]

                      Users.create(data).then (user => 
                        res.status(201).json(user)                        
                        ).catch(
                            err =>res.status(500).send("L'adresse e-mail existe dèja veuillez rentrez une autre adresse e-mail")
                        )
        })
    }
    else{
        res.status(400).send("Veuillez rentrez un email, un mot de passe ou un username")
    }
}

exports.listUsers = (req, res) => {
    const query = req.query

    Users.apiQuery(query).select("username email avatar").then( user => 
        res.status(201).json(user)
        ).catch(
            err => 
            res.status(500).json(err)
        )

}

exports.connexion = (req, res) => {
    const data = (req.body.email !== undefined) ? {
        email: req.body.email
    } : {}

        const password = req.body.password
Users.find(data, function(err,users){
    const usersPassword = users[0].password
   bcrypt.compare(password, usersPassword, function(errBcrypt, resBcrypt){
    if(resBcrypt){
        res.status(200).send(JSON.stringify(users))
    } else {
        return res.status(404).send("Mauvais mot de passe")
    }
})
})
 
}
