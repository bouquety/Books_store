const Users = require('../models/user'),
 bcrypt = require('bcrypt'),
 jwt = require('jsonwebtoken'),
env = require('../environement')
var validator = require('validator');
var mailer = require("nodemailer");

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'




exports.deleteUsers = (req, res) => {
    const data = (req.body.email !== undefined) ? {
        email: req.body.email,
    } : res.status(400).send("Veuillez rentrez un email")

    let isEmail = validator.isEmail(data.email);

    if (isEmail == false){
        return res.status(500).send("L'adresse e-mail est mauvaise")
    }

    Users.findOneAndUpdate({email: req.body.email}, { "$set": { "isactive": false}},{new: true, omitUndefined : true}).then(user => {
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
},

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

    let isEmail = validator.isEmail(data.email);
    if (isEmail == false){
        return res.status(500).send("L'adresse e-mail est mauvaise")
    }


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
},

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
        let isEmail = validator.isEmail(data.email);
        if (isEmail == false){
            return res.status(500).send("L'adresse e-mail est mauvaise")
        }
                      Users.create(data).then (user => 
                        res.status(201).json(user)                        
                        ).catch(
                            err =>res.status(500).send("L'adresse e-mail ou l'username existe dèja veuillez rentrez une autre adresse e-mail ou un autre username")
                        )
        })
    }
    else{
        res.status(400).send("Veuillez rentrez un email, un mot de passe ou un username")
    }
},

exports.listUsers = (req, res) => {
    const query = req.query

    Users.apiQuery(query).select("username email avatar tokens").then( user => 
        res.status(201).json(user)
        ).catch(
            err => 
            res.status(500).json(err)
        )

},

exports.motdepasseForgot = (req, res) => {
    const data = (req.body.email !== undefined) ? {
        email: req.body.email,
    } : res.status(400).send("Veuillez rentrez un email")


    let isEmail = validator.isEmail(data.email);
        if (isEmail == false){
            return res.status(500).send("L'adresse e-mail est mauvaise")
        }
    var smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mangas.store.imie@gmail.com",
            pass: "YOUNGreezy972"
        }
    });

    
    
    Users.findOne({email: req.body.email}).then(user => {
        if(user){
            let userresetPasswordToken = user.tokens[0].token;
            let userresetPasswordExpires = Date.now() + 3600000;

            var mail = {
                from: "mangas.store.imie@gmail.com",
                to: req.body.email,
                subject: "réanitillisation mot de passe",
                html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
'http://' + req.headers.host + '/user/userforgot/' + userresetPasswordToken + '\n\n' +
'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                    res.redirect('/user/userforgot/');
                    return res.status(500).send("Erreur lors de l'envoie du mail!");
                    console.log(error);
                }else{
                    return res.status(200).send("Mail envoyé avec succès!")
                }
                smtpTransport.close();
            });
            
        }
        else {                                                                                                                                                          
            res.status(500).send("User not exist with this e-mail")
        }
    }
        ).catch(
            err =>res.status(500).send(err)
        )

  
},

exports.reanitialisationmdp = (req, res) => {

    console.log(req.params.token)


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
