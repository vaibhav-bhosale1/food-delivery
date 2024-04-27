const { json } = require("express");

function CartController(){
    return{
        cart(req,res){

            res.render('customers/cart')

        },
        update(req,res){
            if(!req.session.cart){ //for the first time adding data and checking cart exist or not
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0,
                }
               
            }
            let cart=req.session.cart //if cart already exist get data from session
                console.log(req.body);
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,  
                    qty:1,
                }
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price
            }
            else{
                cart.items[req.body._id].qty=cart.items[req.body._id].qty+1;
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price;
            }
            return res.json({totalQty:req.session.cart.totalQty})
        }
    }
}
module.exports=CartController;