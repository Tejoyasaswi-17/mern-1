import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/errors.js";
export const register = async(req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        }) 
        await newUser.save();
        res.status(200).send("User has been created")
    } catch(err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        console.log('user', user)
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(404, "Password is incorrect"))
        }
        const {password = '', isAdmin = '', ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (err) {
        return next(err);
    }
};