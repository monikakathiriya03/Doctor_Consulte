const userServices = require('../services/user.service');
const userService = new userServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) =>{
      try{
         let user = await userService.getUser({email: req.body.email, isDelete: false});
         
         if(user){
            return res.status(400).json({message: 'User already Registered...'});
         }

         let hashPassword = await bcrypt.hash(req.body.password, 10);

         user = await userService.createUser({
            ...req.body,
            password: hashPassword
         });
         return res.status(201).json({user:user, message: 'User Registered Successfully...✅'});
      }catch(error){
        console.log(error);
        return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
      }
};


exports.loginUser = async(req, res) =>{
    try{
        let user = await userService.getUser({email: req.body.email, isDelete: false});

        if(!user){
            return res.status(404).json({message: 'User Not Found...'});
        }
        let checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            return res.status(401).json({message: 'Invalid Password...'});
        }
        let token = jwt.sign({userId: user._id},'User');
        return res.status(200).json({token, message: 'User Logged In Successfully...✅'});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
    };
};

exports.getAllUser = async(req,res)=>{
    try{
        let user = await userService.getAllUser({isDelete:false});
        if(!user){
            return res.status(404).json({message: 'User Not Found...'});
        }
        return res.status(200).json(user);
    }catch(error){
            console.log(error);
            return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
    }
};

exports.getUser = async (req, res)=>{
    try{
        let user = await userService.getUserById(req.user._id);
        if(!user){
            return res.status(404).json({message: 'User Not Found...'});
        }
        return res.status(200).json(user);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
    }    
};


exports.updateUser = async (req, res)=>{
    try{
        let user = await userService.getUserById(req.user._id);
        if(!user){
            return res.status(404).json({message: 'User Not Found...'});
        }
        user = await userService.updateUser(user._id, {...req.body});
        res.status(200).json({user,message:`User Update successfully ...✅`});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
    }
};

exports.deleteUser = async (req, res)=>{
    try{
        let user = await userService.getUserById(req.user._id);
        if(!user){
            return res.status(404).json({message: 'User Not Found...'});
        }
        user = await userService.updateUser(user._id, {isDelete:true});
        res.status(200).json({user,message:`User Delete successfully ...✅`});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
    }
};

exports.updatePassward = async (req,res)=>{
    try{
        let user = await userService.getUserById(req.user._id);
        if(!user){
            return res.status(404).json({message: 'User Not Found...'});
        }
        let oldPassward = req.body.oldPassward;
        let newPassward = req.body.newPassward;

        if(newPassward === oldPassward){
              return res.status(400).json({message: 'Old Passward and New Passward are same. Please enter Differnte Passward...'});
        }
        let confirmPassward = req.body.confirmPassward;

        if(newPassward !== confirmPassward){
            return res.status(400).json({message: 'New Passward and Confirm Passward is Notnot Same. Try Again...'});
    }
    let hashPassword = await bcrypt.hash(newPassward, 10);
    user = await userService.updateUser(req.user._id, {password:  hashPassword});
    res.status(200).json({user,message:`Passward Update successfully ...✅`});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: `Internal Server Error: ${consose.error()}`});
    }
};