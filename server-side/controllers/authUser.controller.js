import { comparePassword, hashPassword } from "../helpers/authUser.helper.js";
import userModel from "../models/user.model.js";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

//configuring dotenv for environment variable usage
dotenv.config();

const registerController = async(req, res)=>{
    try {
        const {name, email, password, phone, address} = req.body;

        //validation
        if(!name | !email | !password | !phone | !address)
        {
            return res.send({
                success: false,
                error:"All fields need to be filled."
            });
        };

        //checking existing user
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            res.status(200).send({
                success: true,
                message: 'User already exists, go to the login page.'
            });
        };

        //register user
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name, email, phone, address, password: hashedPassword});
        user.save();

        return res.status(200).send({
            success: true,
            message: "User registered successfully!",
            user
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message:"Registration failed!",
            error
        });
    }
};



const loginController = async(req, res)=>{
    try {

        const {email, password} = req.body;

        //validation
        if(!email | !password){
            return res.status(404).send({
                status: false,
                error:'Fill all the required fields.'
            });
        };

        //check email validity
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password.'
            });
        };

        //email and password compatibility
        const match = await comparePassword(password, user.password)

        if(!match){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password.'
            });
        };

        //token creation
        const token = JWT.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

        return res.status(200).send({
            success: true,
            message: 'Login successful',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Login failed',
            error
        })
    };
};

const testController = (req, res) =>{
    try {
        return res.send({
            success: true,
            message: 'Protected Route'
        })
        
    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: 'test failed',
            error
        })
    }
}

export {registerController, loginController, testController};