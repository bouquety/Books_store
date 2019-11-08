var jwt = require('jsonwebtoken');
const env = require('../environement')

module.exports = {
    parseAuthorization: function(authorization){
        return (authorization !=null)? authorization.replace('Bearer ','') :null;
    },

    getUseremail:function(authorization){
        var Useremail = -1
        var token = module.exports.parseAuthorization(authorization);
        if (token!=null) {
            try {
                var jwtToken = jwt.verify(token, env.jwt);
                if(jwtToken != null)
                Useremail = jwtToken.email
            }catch(err){
                return res.statuts(400).send("ssssss")
            }
        }
        return Useremail;
    }


    
    
    
}