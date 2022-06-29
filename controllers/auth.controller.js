const Staff = require('../models/staff.model')
const jwt = require('jsonwebtoken');
const {loginValidation, registerValidation} = require('../utils/validation');
const bcrypt = require("bcrypt");

const createToken = (user) => {
    return jwt.sign(
        { user : user._id, login: user.login, access: user.permission},
        process.env.TOKEN_SECRET,
        { expiresIn: "6h"}
    )
};

module.exports.staffRegister = async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    const loginExiste = await Staff.findOne({ login: req.body.login});
    if (loginExiste)
        return res.status(400).json('Login already exists');

    try {
        let staff = await Staff.create ({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            login: req.body.login,
            password: req.body.password,
            birthday: req.body.birthday,
            sex: req.body.sex,
            profession: req.body.profession,
            permission: req.body.permission,
            phone : req.body.phone
        });
        res.status(200).json('Personnel ajouté avec succès');
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.login = async (req, res) => {
    const {error} = loginValidation(req.body);
    console.log(req.body)
    if (error)
        return res.status(400).json(error.details[0].message);
    try {
        const staff = await Staff.findOne({ login: req.body.login});
        if (!staff)
            return res.status(400).json('Login ou mot de passe invalide');
        const validPass = await bcrypt.compare(req.body.password, staff.password);
        if (!validPass)
            return res.status(400).json('Login ou mot de passe invalide');
        const token = createToken(staff);
        await Staff.findOneAndUpdate(
            { login: req.body.login },
            {
                $set: { token: token }
            }
        );
        res.status(200).setHeader('Authorization', `Bearer ${token}`).json({
            userId: staff._id,
            status: staff.permission,
            token: token
        });
    } catch (err) {
        res.status(400).json({err : err});
    }
};

module.exports.isAuth = (req, res) => {
    const token= req.headers['Authorization'].split(' ')[1];
    try {
        console.log("token :" + token);
        if (token) {
            jwt.verify(
                token, process.env.TOKEN_SECRET,'', async (err, decodedToken) => {
                    if (err) {
                        console.log(token)
                        res.status(200).send({ error: err, isAuth: false});
                    } else {
                        console.log(token)
                        res.status(200).send({isAuth: true, id: decodedToken.id});
                    }
                });
        } else {
            res.status(200).send({isAuth: false, token: token});
            console.log(token);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}