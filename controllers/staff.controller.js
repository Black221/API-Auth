const Staff = require('../models/staff.model');
const {ObjectId} = require("mongodb");
const {updateValidation} = require("../utils/validation");
const bcrypt = require("bcrypt");

module.exports.getAllStaff = async (req, res) => {
    try {
        const staffs = await Staff
            .find()
        return res.status(200).json({staffs : staffs});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getOneStaff= async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const staff = await Staff
            .findById({_id: req.params.id})
            .select('-password');
        return res.status(200).json({staff : staff});
    } catch (err) {
        return  res.status(400).json({error: err});
    }
}

module.exports.deleteStaff = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await Staff
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.updateStaff = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');

    try {
        const staff = await Staff.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    login: req.body.login,
                    birthday: req.body.birthday,
                    sex: req.body.sex,
                    profession: req.body.profession,
                    address: req.body.address,
                    cni : req.body.cni,
                    phone : req.body.phone
                }
            }
        ).select('-password');
        res.status(200).json({staff : staff});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updatePassword = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const staff = await Staff.findById({ _id: req.params.id});
        if (!staff)
            return res.status(400).json('Mot de passe invalide');
        console.log(req.body)
        const validPass = await bcrypt.compare(req.body.exPassword, staff.password);
        if (!validPass)
            return res.status(400).json('Mot de passe invalide');
        let password = req.body.password;
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const newStaff = await Staff.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    password: password,
                }
            }
        );
        res.status(200).json({staff : newStaff});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err });
    }

}

module.exports.logout = async (req, res) => {
    const token = req.user;
    console.log(token);
    try {
        await Staff.findByIdAndUpdate(
            {_id: token.user},
            {
                $set: { token: 'fake token'}
            }
        );
        res.status(200).setHeader('Authorization', '').json('disconnected');
    } catch (err) {
        res.status(500).json({error: err})
    }
};

module.exports.validateRegister = async (req, res) => {
    if (!ObjectId.isValid(req.params.staff))
        return res.status(400).send('Id unknown');
    if (!ObjectId.isValid(req.params.register))
        return res.status(400).send('Id unknown');
    try {
        const staff = await Staff
            .findById({_id: req.params.staff})
            .select("-password");
        /*
        if (staff.canAccept)

         */
        const newStaff = await Staff.findByIdAndUpdate(
            {_id: req.params.register},
            {
                $set: {
                    accept: true
                }
        });

    } catch (err) {

    }
};