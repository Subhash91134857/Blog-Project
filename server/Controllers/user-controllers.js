import User from "../models/user.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import Token from "../models/token.js";

export const SignupUser = async (request, response) => {
    // console.log(request);
    try {
        //  Doing encryption
        const salt = await bcrypt.genSalt(10);   // generating the salt
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        //    Geeting data
        const user = {
            name: request.body.name,
            userName: request.body.userName,
            password: hashedPassword
        };

        //     Creating new user with above data
        const newUser = new User(user);

        //     Saving the data to the mongoDB server
        await newUser.save();


        return response.status(200).json({ msg: 'Signup Successfull' })
    } catch (error) {
        console.log(error);
        return response.status(500).json({ msg: "Error while signup" })
    }
}



//  Loign Controllers

export const LoginUser = async (request, response) => {
    //   Checking for username in database 
    const userName = request.body.userName;
    // console.log(userName);
    let existing_user = await User.findOne({ userName:request.body.userName})
    // console.log(existing_user);
    // if user does not exist
    if (existing_user == null) {
        return response.status(400).json({ msg: "User Not Found" })
    }
    // if user exist
    else {
        try {
            let match = await bcrypt.compare(request.body.password, existing_user.password);
            console.log(match);
            if (match) {
                // Generating token
                const accessToken = jwt.sign(existing_user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
                const refereshToken = jwt.sign(existing_user.toJSON(), process.env.REFERESH_SECRET_KEY);

                const newToken = new Token({ token: refereshToken });
                await newToken.save();

        
                return response.status(200).json({ accessToken: accessToken, refereshToken: refereshToken, name: existing_user.name, userName: existing_user.userName });

        
            } else {
                return response.status(400).json({ msg: "Password does not match" });
            }
        } catch (error) {
            response.status(500).json({ msg: "Error while login in user" })
        }
    }
}