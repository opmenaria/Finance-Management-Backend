const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//user registeration
exports.register = async(req,res)=>{
    try{

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
            role:req.body.role
        })
        await newUser.save()
        res.status(200).json({success:true, message:"Successfully created"})
    } catch(err){
        res.status(422).json({success:false, message:"failed to create. Try again"})
    }
};

//user login
exports.login = async(req,res)=>{

    const email = req.body.email

    try{
        const user = await User.findOne({email})

        // if user does't exist
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        // if user exist then check password and compare the pass
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        // if password is wrong
        if(!checkCorrectPassword){
            return res.status(401).json({success:false, message:'Incorrect email or password'})
        }

        const {password, role, ...rest} = user._doc

        //create jwt token
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn:"15d"})

        // set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires:new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        }).status(200).json({token, data:{...rest}, role})

    } catch(err){
        res.status(422).json({success:false, message:'failed to login'})
    }
};