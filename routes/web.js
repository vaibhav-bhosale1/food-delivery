const HomeController=require('../controllers/homeController')
const {SignupController,SigninController, Logoutcontroller}=require('../controllers/AuthController')
const CartController=require('../controllers/customer/CartController')
const guest=require('../middleware/guest')
function Routers(app){
    app.get('/',HomeController().index)

    app.get('/signin',guest,SigninController().signin)

    app.get('/signup',guest,SignupController().signup)

     app.get('/cart',CartController().cart)

     app.post('/update-cart',CartController().update)

     app.post('/signup',SignupController().postsignup)

     app.post('/signin',SigninController().postsignin)

     app.post('/logout',Logoutcontroller().logout)
}

module.exports=Routers;