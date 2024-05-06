const User=require('../models/user')
const bcrypt=require('bcrypt')
const passport=require('passport')
function SigninController(){
    return{
        signin(req,res){
            res.render('auth/signin')
        },
        postsignin(req,res,next){
            passport.authenticate('local',{session:false},(err,user,info)=>{
                console.log(user)
                
                if(err){
                    req.flash('error',info.message)
                    return next(err);
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/signin')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
                
               
            })(req,res,next)
        },
    
    }
}

function SignupController(){
    return{
        signup(req,res){
            res.render('auth/signup')
        },
        async postsignup(req,res){
            const { name,email,password}=req.body
            //validation
            if(!name || !email || !password){
                req.flash('error','All fields are required')
                return res.redirect('/signup')
            }
           

            const hashedpassword=await bcrypt.hash(password,10)


         

            const userr= await User.findOne({ email: req.body.email }).exec();
    
            if (userr) {
                // User with this email already exists
                req.flash('error','email already taken');
                req.flash("name",name);
                req.flash("email",email)
                return res.redirect('/signup');
            } 


            
            const user=new User({
                name:name,
                email:email,
                password:hashedpassword,
            })
            

            user.save().then((user)=>{
                console.log(user)
                return res.redirect('/signin')
            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/signup')
            })
        }   
    }
}

function Logoutcontroller(){
   return{
      logout(req,res){
        req.logout(function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
          });
      }
   }
}



module.exports={
    SigninController,
    SignupController,
    Logoutcontroller,
}