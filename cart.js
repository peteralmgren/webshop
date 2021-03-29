if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

cartItemArray = [];
cartItemArray = JSON.parse(localStorage.getItem("cart"));


/* totalPriceInCart = 0 */
totalItemInCart = 0


if(cartItemArray){
cartOutput(cartItemArray)
}

function cartOutput(cartItemArray) {
  
    cartoutput = "";
    
        cartItemArray.forEach((Cartitem) => {
            console.log(Cartitem);
            
            id= Cartitem.id;
            title=Cartitem.title,
            image=Cartitem.image,
            price=Cartitem.price;

        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        
      cartoutput += `<div class="cart-item cart-column">
                        <span>
                            <img class="cart-item-image" src="${image}" width="85" height="85">
                            <a class="cart-item-title">${title}</a>
                            <a class="cart-price ">${price}</a>
                            <a class="cart-quantity "</a>
                            <input class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger btn-sm" type="button">Remove
                            <a id="cart-id">${id}</a>
                            </button>
                        </span>
                            
                    </div>
                </div>`

                    cartRow.innerHTML = cartoutput
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
            });
            
            
        document.getElementById("cart-output").innerHTML = cartoutput;
        /* document.getElementById("total-row").innerHTML = cartoutput; */
        
    
  }

  function ready() {
    updateCartTotal()

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)       
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
} 

function localCartRemove(){
    localStorage.removeItem("cart", JSON.stringify())
}

function removeCartItem(e) {
    var buttonClicked = e.target
    buttonClicked.parentElement.parentElement.remove()

    let thisId = buttonClicked.querySelector(".cart-item #cart-id").textContent;
    console.log("rad 141"+thisId);
    
    cartItemArray.splice(thisId,1)
    console.log("this id "+thisId);
    localStorage.setItem("cart", JSON.stringify(cartItemArray)) 

}
function purchaseClicked() {
    
    alert('Din beställning är skickad')
    cartItemArray = [];
    localStorage.setItem('cart',JSON.stringify(cartItemArray))
}

function updateCartTotal(){

    totalPriceInCart = 0
    
    cartItemArray.forEach(Cartitem =>{
        price = Cartitem.price
        price = price.replace("$","")
        price = parseFloat(price)
        totalPriceInCart += price
               
    })
    document.getElementById("cart-total-price").innerHTML = totalPriceInCart;
    console.log("totalitem in cart: "+ totalItemInCart);
    console.log("totalprice in cart"+ totalPriceInCart);

}
