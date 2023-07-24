import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/user.model.js';

//configuring dotenv
dotenv.config();

//Protected routes token based
const requireSignIn = async(req, res, next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {

        console.log(error);
        
    }
};



//Admin access
const isAdmin = async(req, res, next)=>{
    try {
        const user = await userModel.findById(req.user._id);

        if(user.role !== 1)
        {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized access"
            });
        }
        else{
            next();
        };
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "UnAuthorized Access",
            error
        });
    };
};


export {requireSignIn, isAdmin};