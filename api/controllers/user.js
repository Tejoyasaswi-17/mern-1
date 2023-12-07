import User from "../models/User.js";

export const updateUser = async(req, res, next) => {
    try {
        const toUpdateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(toUpdateUser)
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        const toDeleteUser = await User.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json("User has been successfully")
    } catch(err) {
        next(err);
    }
}

export const getAllUsers = async(req, res, next) => {
    try {
        const fetchUsers = await User.find();
        res.status(200).json(fetchUsers);
    } catch(err) {
        next(err);
    }
}

export const getUser = async(req, res, next) => {
    try {
        const fetchUser = await User.find(req.params.id);
        res.status(200).json(fetchUser);
    } catch (err) {
        next(err);
    }
}