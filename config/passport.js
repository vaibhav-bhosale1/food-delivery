const localstrategy=require("passport-local").Strategy
var GoogleStrategy = require('passport-google-oauth20');
const User=require('../models/user')
const bcrypt=require('bcrypt')


function init(passport){
    passport.use(new localstrategy({usernameField:'email'},async (email,password,done)=>{
        const user=await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:"No User with This Email"})
        }
        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null,user,{message:"Loged in Suucessfully"})
            }
            return done(null,false,{message:"Incorrect Username or Password"})
        }).catch(err=>{
            console.log(err)
            return done(null,false,{message:"Something went wrong"})
        })

    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id).then(user => {
         done(null, user);
        }).catch(err => {
          done(err, null);
        });

    })

}









module.exports=init;