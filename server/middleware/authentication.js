//FireBase VerifyToken
const createError = require('http-errors');

module.exports = function(admin) {
    return function(req, res, next) {
        const auth = req.get('Authorization');
        if (auth != null && auth !== "") {
            admin.auth().verifyIdToken(auth)
                .then(function (decodedToken) {
                    req.uid = decodedToken.uid;
                    next();
                }).catch(function (error) {
                let err = createError(401, error.message);
                return next(err);
            });
        } else {
            let err = createError(401, "Unauthorized, missing Authorization header.");
            return next(err);
        }
    }
};