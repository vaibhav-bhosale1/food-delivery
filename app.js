const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require("path");
const expresslayout=require('express-ejs-layouts')
const PORT=process.env.PORT || 3000
//ejs 

app.use(express.static('public'))
app.set("view engine",'ejs');
app.set("views",path.resolve("./resources/views"));





//route
app.get('/',(req,res)=>{
   res.render("home");
})
app.get('/cart',(req,res)=>{
   res.render('customers/cart')
})
app.get('/signin',(req,res)=>{
   res.render('auth/signin')
})
app.get('/signup',(req,res)=>{
   res.render('auth/signup')
})



app.listen(PORT,()=>{console.log(`listening on port:${PORT}`)})