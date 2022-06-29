const jwt = require('jsonwebtoken');
const Staff = require("../models/staff.model");

const config = process.env;

module.exports.verifyToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
        return res.status(403).json("A token is required for authentication aa");
    }
    const token = bearerToken.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        if (token) {
            jwt.verify(
                token, process.env.TOKEN_SECRET,'', async (err, decodedToken) => {
                    if (err) {
                        console.log('echec')
                        res.status('200').json('Veuillez vous connecter');
                    } else {
                        req.user = decodedToken;
                        next();
                    }
                });
        } else {
            req.user = null;
            next();
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports.requireAuth = (req, res, next) => {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
        return res.status(403).send("A token is required for authentication");
    }
    const token = bearerToken.split(' ')[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    if (token) {
        jwt.verify(
            token, process.env.TOKEN_SECRET,'', async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(decodedToken.user)
                    next();
                }
            });
    } else {
        console.log('No token');
    }
}