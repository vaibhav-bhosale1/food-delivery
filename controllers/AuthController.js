const User=require('../models/user')
const bcrypt=require('bcrypt')
function SigninController(){
    return{
        signin(req,res){
            res.render('auth/signin')
        }
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
                console.log('This email is already taken. Please choose another.');
                return false;
            } 


            
            const user=new User({
                name:name,
                email:email,
                password:hashedpassword,
            })
            

            user.save().then((user)=>{
                console.log(user)
                return res.redirect('/')
            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/signup')
            })
        }   
    }
}




module.exports={
    SigninController,
    SignupController}