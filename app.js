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

app.listen(PORT,()=>{console.log(`listening on port:${PORT}`)})