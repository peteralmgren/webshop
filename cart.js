if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

cartItemArray = JSON.parse(localStorage.getItem("cart"));

totalItemInCart = 0
totalPriceInCart = 0
currentValue=1
removeindex = 0

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
        
      cartoutput += `<div class="cart-item cart-column" id="cart-itemid">
                        <span>
                            <img class="cart-item-image" src="${image}" width="85" height="85">
                            <a class="cart-item-title">${title}</a>
                            <a class="cart-price" id="price-id">${price}</a>
                            <a class="cart-quantity "</a>
                            <input id="cart-amount" class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger btn-sm" type="button">Remove
                            <a id="cart-id" class="cart-id">${id}</a>
                            </button>
                        </span>
                            
                    </div>
                </div>`

                    cartRow.innerHTML = cartoutput
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', updateCartItems)
        
        
            });
            
        document.getElementById("cart-output").innerHTML = cartoutput;
    
  }

  function ready() {
    updateCartTotal()

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)       
    }
    var changeCartAmount = document.getElementsByClassName('cart-quantity-input')
    
    for (var i = 0; i < changeCartAmount.length; i++) {
        var button = changeCartAmount[i]
        button.addEventListener('click', updateCartItems)       
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
} 

function localCartRemove(){
    localStorage.removeItem("cart", JSON.stringify())
}

function removeCartItem(e) {
    var itemClicked = e.target
    var item = e.target

    itemClicked.parentElement.parentElement.remove()
    
    var itemToRemove = item.parentElement.parentElement

    var title = itemToRemove.getElementsByClassName("cart-item-title")[0].innerText;
    console.log(title);

    for (var i = 0; i <cartItemArray.length; i++){
        if(title===cartItemArray[i].title){
            removeindex=i
            
        }
    }
    cartItemArray.splice(removeindex,1)
    localStorage.setItem("cart", JSON.stringify(cartItemArray)) 

}
function purchaseClicked() {

    let firstname = document.getElementById("inputfirstname").value;
    let lastname = document.getElementById("inputlastname").value;
    let address = document.getElementById("inputAddress").value;
    let email = document.getElementById("inputemail").value;
    let phone = document.getElementById("inputphone").value;
    let city = document.getElementById("inputCity").value;
    let zip = document.getElementById("inputZip").value;
  
    if (firstname === "" || lastname === "" || address === "" || email === "" || phone === "" || city === "" || zip ==="") {
      alert("Du har inte fyllt i alla fält");

    }else{
        alert('Din beställning är skickad')
        cartItemArray = [];
        localStorage.setItem('cart',JSON.stringify(cartItemArray))
    }

}
function updateCartItems(e){

    var currentItem = e.target
    var item = currentItem.parentElement.parentElement
    var price = item.getElementsByClassName('cart-price')[0].innerText
    var value = item.getElementsByClassName("cart-quantity-input")[0].value; 
    
    price = price.replace("$","")
    price = parseFloat(price)
        if(value>currentValue){
            totalPriceInCart +=price
            currentValue++
        } 
        if(value<currentValue){
            totalPriceInCart -=price
            currentValue--
        }
       
    document.getElementById("cart-total-price").innerHTML = totalPriceInCart;

}

function updateCartTotal(){

    cartItemArray.forEach(Cartitem =>{
        price = Cartitem.price
        price = price.replace("$","")
        price = parseFloat(price)
        totalPriceInCart += price
               
    })
    document.getElementById("cart-total-price").innerHTML = totalPriceInCart;
    
}
