let data = localStorage.getItem("data");

if (!data) {
  // then fetch your data
  fetch("http://webacademy.se/fakestore/")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data));
      
      dataOutput(data);
    })

    //CATCH ANY ERRORS
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
    let title = data.title;
    let image = data.image;
    let description = data.description;
    let price = data.price;

    Output += `
            <div class="d-flex justify-content-center">
            <div class="col-md-3 mt-2">
            <div class="card" style="width: 16em;">
                <img class="card-img-top" src="${image} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <a href="#" style="background-color:indianred; width: 12em; border:1px solid black;" class="btn btn-primary">Lägg i korg</a>
                        <a href="#" style="color:black;" class="price">Price: ${price}</a>
                    </div>
            </div>
            </div>
            </div>`;
        });

  document.getElementById("output").innerHTML = Output;
}
