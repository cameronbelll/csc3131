//logic for signing in/ signing up user

import bcrypt from 'bcryptjs'; //used to hash passwords
import jwt from 'jsonwebtoken'; //used to store user in browser - stays logged in even if they leave site
import User from '../models/user.js';

export const signIn = async (req, res) => {
    const {email, password} = req.body; //retrieves email and password from frontend and stores in req.body

    try {
        const existingUser = await User.findOne({email}); //checks if user exists in database
        if (!existingUser) return res.status(404).json({message: "User does not exist. Sign up instead"});

        const correctPassword = await bcrypt.compare(password, existingUser.password); //checks if password is correct compared to hash in database
        if (!correctPassword) return res.status(400).json({messge: "Incorrect password."});

        //code executes if user found in database
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"}); //test is secret string; change later!

        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong. Please try again"});
    }
}

export const signUp = async (req, res) => {
    const {email, password, confirmPassword, firstName, surname} = req.body;

    try {
        const existingUser = await User.findOne({email}); //checks if email already taken
        if (existingUser) return res.status(400).json({message: "Email address already in use. Please try another"});

        if (password != confirmPassword) return res.status(400).json({message: "Passwords do not match."});

        const hashedPassword = await bcrypt.hash(password, 12); //12 is the salt used to hash password
        
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${surname}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"}); //test is secret string; change later!
        
        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong. Please try again"});
    }


}