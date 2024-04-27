import axios from 'axios'

let add=document.querySelectorAll('.addtocart');
let cartcounter=document.querySelector('.cartCounter')
function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        cartcounter.innerText=res.data.totalQty
        

    })
}



add.forEach((btn)=>{
     btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
     })
})