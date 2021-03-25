if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
class Product {
    constructor(id, title, description, image, price) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
      this.price = price;
      
    }
  } 
  class Cartitem{
    constructor(title, image, price) {
        this.title = title;
        this.image = image;
        this.price = price;
        
      }
  
  }   

itemArray = [];
cartItemArray = [];
index = 0;
let data = localStorage.getItem("data");
let cart = localStorage.getItem("cart");


if (!data) {
    // if no data in localStorage then fetch your data
    fetch("http://webacademy.se/fakestore/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
        dataOutput(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    console.log("här i else satsen");
    data = JSON.parse(localStorage.getItem("data"));
    dataOutput(data);
  }

  if (cart){
     cartItemArray = JSON.parse(localStorage.getItem("cart"));  
    addLocalCart(cartItemArray);
  }


function dataOutput(data) {
  
    Output = "";
    
    data.forEach((data) => {
        
        item = new Product(
        id=data.id,
        title=data.title,
        description=data.description.substr(0, 120)+"....",
        image=data.image,
        price=data.price);
        itemArray.push(item);
        });
        
    itemArray.forEach((Product) => {

      id = Product.id;
      title = Product.title;
      image = Product.image;
      description = Product.description.substr(0, 120)+"....";
      price = Product.price;
  
      Output += `<div class="d-flex justify-content-left">
                    <div class="col-lg-6 mt-2 shop-items">
                        <div class="shop-item">
                            <div class="card" style="width: 14em;">
                                <span class="card-title shop-item-title">${title}</span>
                                <img class="card-img-top shop-item-image" src="${image}">
                                <div class="card-text shop-item-details">${description}</div>
                                <span class="shop-item-price">$${price.toFixed(2)}</span>
                                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                            </div>  
                        </div>
                    </div>
                </div>`
            });
            
        document.getElementById("output").innerHTML = Output;
    
  }

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    cartItemArray = [];
    localStorage.setItem('cart',JSON.stringify(cartItemArray))

    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function localCartRemove(){
    localStorage.removeItem("cart", JSON.stringify())
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    cartItemArray.pop()
    localStorage.setItem("cart", JSON.stringify(cartItemArray)) 
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
     
    if (cartItemArray.length <10 ){
        addItemToCart(title, image, price)    
    }else{
        alert("Du kan inte ha fler varor i varukorgen")
    }  
    localStorage.setItem("cart", JSON.stringify(cartItemArray)) 
    updateCartTotal()
    
}

function addLocalCart(cartItemArray){
    cartItemArray.forEach((Cartitem) => { 
        title = Cartitem.title
        image = Cartitem.image
        price = Cartitem.price

        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
    
        cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${image}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
            
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    })
    updateCartTotal()
}

function addItemToCart(title, image, price) {

    newClickedItem = new Cartitem(title, image, price)
    
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    
    cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    
    cartItemArray.push(newClickedItem)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    
}