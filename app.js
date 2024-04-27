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
const Mongodbstore=require('connect-mongo')

//database Connection
mongoose.connect("mongodb://localhost/pizza").
then(e=>console.log("mongodb connected"))

//session store\



//session config
app.use(session(
    {
        secret:process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{maxAge:1000*60*60*24},
        store:Mongodbstore.create({
            mongoUrl:"mongodb://localhost/pizza",
            collection:"session"
        }),
    }
))
app.use(flash())



//ejs 
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.set("view engine",'ejs');
app.set("views",path.resolve("./resources/views"));






//route
require('./routes/web')(app);


app.listen(PORT,()=>{console.log(`listening on port:${PORT}`)})