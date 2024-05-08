const Order=require('../../models/orders');
function ordercontroller(){
    return{
        store(req,res){
            const {phone, adress}=req.body;
            if(!phone || !adress){
                req.flash('error',"All fields are  required");
                return res.redirect('/cart');
            }

            const order=new Order({
                customerid:req.user._id,
                items:req.session.cart.items,
                phone:phone,
                adress:adress,
            })
            order.save().then(result=>{
                req.flash('sucess',"Order placed Succesfully");
                return res.redirect('/');
            }).catch(err=>{
                req.flash('error',"Something went wrong");
                return res.redirect('/cart');
            })
        }



    }
       
    
}
module.exports=ordercontroller;