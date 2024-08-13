import User from "../models/Users.js"
import { NextFunction, Request, Response } from "express";
import {compare, hash} from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

//API to get all users from the db
export const getAllUsers = async (req:Request, res:Response, next: NextFunction) => {
    

    try {
        const users = await User.find();
        return res
        .status(200)
        .json({message: "OK",users})

    } catch (error) {
        console.log(error);
        
        return res
        .status(200)
        .json({message: "ERROR",cause: error.message})
    }
}

//API for sigup req
export const userSignup = async (req:Request, res:Response, next: NextFunction) => {
    

    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(401).send("user already Exists")

        const hashedPassword = await hash(password,10)  //hashing password 
        const user = new User({ name, email, password: hashedPassword })  //creating new instance of User
        await user.save();

        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true, 
            path: "/"
    });

    
    // after correct password, token is generated
    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        })


        return res
        .status(200)
        .json({message: "OK", id: user._id.toString()})

    } catch (error) {
        console.log(error);
        
        return res
        .status(200)
        .json({message: "ERROR",cause: error.message})
    }
}

//API for login req
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send("User not registered");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");
        }

        //clears cookie after the user has loggedIn
        res.clearCookie(COOKIE_NAME, {
                domain: "localhost",
                httpOnly: true,
                signed: true, 
                path: "/"
        });

        
        // after correct password, token is generated
        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

            res.cookie(COOKIE_NAME, token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
            })

        // Respond with success message
        return res.status(200).json({ message: "Login successful", userId: user._id.toString() });

    } catch (error) {
        console.log(error);

        return res
            .status(500)  // Changed to 500 to indicate server error
            .json({ message: "ERROR", cause: error.message });
    }
};

