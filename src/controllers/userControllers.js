const Users = require('../models/user'),
 bcrypt = require('bcrypt'),
 jwt = require('jsonwebtoken'),
env = require('../environement')



exports.deleteUsers = (req, res) => {
    const data = (req.body.email !== undefined) ? {
        email: req.body.email,
    } : res.status(400).send("Veuillez rentrez un email")
Users.findOneAndRemove({email: req.body.email}).then(user => {
    if(user){
        res.status(201).send("User supprimer ")                    
    }
    else {
        res.status(500).send("User not exist")
    }
}
    ).catch(
        err =>res.status(500).send(err)
    )
}

exports.updateUsers = (req,res) => {
    bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword){
        const data = (req.body.email !== undefined) ? {
            email: req.body.email,
            password : bcryptedPassword,
            username : req.body.username
        } : res.status(201).send("Aucune modification")

        data.tokens = [{
            token : jwt.sign({
                email: data.email
            }, 
            env.jwt, {
                expiresIn: '72h'
            })
    }]

        Users.findOneAndUpdate({email: req.body.email_modif}, { "$set": { "email": data.email , "password": data.password, "username": data.username, "tokens": data.tokens}},{new: true, omitUndefined : true}).then(user => {
            if(user){
                res.status(201).send("User modifier ")                    
            }
            else {
                res.status(500).send("User not exist")
            }
        }
            ).catch(
                err =>res.status(500).send(err)
            )
                  
    })
}

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
