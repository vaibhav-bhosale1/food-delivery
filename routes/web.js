const HomeController=require('../controllers/homeController')
const {SignupController,SigninController}=require('../controllers/AuthController')
const CartController=require('../controllers/customer/CartController')
function Routers(app){
    app.get('/',HomeController().index)

    app.get('/signin',SigninController().signin)

    app.get('/signup',SignupController().signup)

     app.get('/cart',CartController().cart)

     app.post('/update-cart',CartController().update)
}

module.exports=Routers;