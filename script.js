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
    constructor(id,title, image, price) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        
      }
  }    
  
itemArray = [];
cartItemArray= [];



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
    data = JSON.parse(localStorage.getItem("data"));
    dataOutput(data);
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
  
      Output += `<div class="d-flex justify-content-center">
                    <div class="col-md-3 mt-2 shop-items">
                        <div class="shop-item">
                            <div class="card" style="width: 14em;">
                            <a class="item-id">${id}</a>
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

    cartItemArray = JSON.parse(localStorage.getItem("cart"));
      
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var id = shopItem.getElementsByClassName('item-id')[0].innerText
    console.log(id);
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
     
    if (cartItemArray.length <10 ){
        addItemToCart(id,title, image, price)    
    }else{
        alert("Du kan inte ha fler varor i varukorgen")
    }
    localStorage.setItem("cart", JSON.stringify(cartItemArray))
    document.getElementById("cart-amount").innerHTML = cartItemArray.length; 
     
}

function addItemToCart(id, title, image, price) {

    newClickedItem = new Cartitem(id,title, image, price)
    
    cartItemArray.push(newClickedItem)
}


