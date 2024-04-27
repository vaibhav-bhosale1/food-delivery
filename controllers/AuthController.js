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
        }
    }
}




module.exports={
    SigninController,
    SignupController}