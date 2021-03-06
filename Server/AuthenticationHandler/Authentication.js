var jwt = require('jsonwebtoken');
const jwtKey = "NJxe+Xn+hsc9o6tIH63/FjQ0nuQp699C+ZsmdLvqYanngf4zHzMq9rOcUp6EPNEzkyyFLFjFehLxgk+Jnfmjbg==";

 class Authenticate {

    static createToken(object) {
        var token = jwt.sign(object, jwtKey);
        return token;
    }

    static deserializeObject(token) {
        return new Promise((resolve, reject) => {

            
            jwt.verify(token, jwtKey, (err, decodedObj) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decodedObj);
            });

        });
    }
}
module.exports = Authenticate;