import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Registering a new User
export const registerUser = async (req, res) => {

    // adding password security with salt "bcrypt package : hashing technique"
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPass;

    // taking user info
    const newUser = new UserModel(req.body)
    const { username } = req.body

    // now interact in DB
    try {
        // if user is already registered
        const oldUser = await UserModel.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ message: "username is already registered" })
        }
        // saving new user in DB
        const user = await newUser.save();
        // JWT : javaScript Web Token : used for session expiration of page
        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' })

        // sending response
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// login user
export const loginUser = async (req, res) => {
    const { username, password } = req.body
    // intercat with DB
    try {
        const user = await UserModel.findOne({ username: username })
        // if user is present in db then , validate with password & then redirect to homePage through login 
        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("Wrong Password");
            }
            else {
                // JWT : session establishement
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                // sending response 
                res.status(200).json({user,token})
            }
        }
        else {
            res.status(404).json("User does not exists")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}