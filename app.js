require('dotenv').config()
const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require("path");
const expresslayout=require('express-ejs-layouts')
const mongoose=require('mongoose');
const PORT=process.env.PORT || 3000
const session=require('express-session')
const flash=require('express-flash')
const User=require('./models/user')
const Mongodbstore=require('connect-mongo')
const passport=require('passport')
const passsportinit=require('./config/passport')
const cookiesParser = require('cookie-parser');

const googleauth=require('./config/passport');

//database Connection
mongoose.connect("mongodb://localhost/pizza").
then(e=>console.log("mongodb connected"))

//session store\
app.use(express.json())
app.use(cookiesParser(process.env.COOKIE_SECRET))

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.set("view engine",'ejs');
app.set("views",path.resolve("./resources/views"));



//session config
app.use(session(
    {
        secret:process.env.COOKIE_SECRET,
        resave:false,
        
        saveUninitialized:true,
        cookie:{maxAge:60*60*24*1000, secure : false},
        store:Mongodbstore.create({
            mongoUrl:"mongodb://localhost/pizza",
            collection:"session"
        }),
    }
))



//-passport
passsportinit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

//ejs 
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    console.log(req.user);
    next()
})








//route
require('./routes/web')(app);


app.listen(PORT,()=>{console.log(`listening on port:${PORT}`)})