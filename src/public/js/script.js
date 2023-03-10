const socket = io ();

const cardsContainer = document.getElementById("cards-container");

const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const price = document.getElementById("price");
const submit = document.getElementById("submit");

const isEmpty = (...args) => args.some((arg) => !arg);

const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

const resetForm = () => { 
  title.value = ""; description.value = ""; code.value = ""; stock.value = ""; category.value = ""; price.value = "";
};


const render = (data) => {  
  cardsContainer.innerHTML = "";
  data.forEach((product) => {
    cardsContainer.innerHTML += `
    <div class="card col-md-3">
    <img class="card-img-top" src="${product.thumbnail}" alt="Card image">
    <div class="card-body">
        <h5>${product.title}</h5>
        <p>${product.category}</p>
        <p>$ ${product.price} USD</p>
        <p>${product.description}</p>
        <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">
          Eliminar
        </button>
      </div>
    </div>
    `;
  });
};


submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (isEmpty(title.value, description.value, code.value, stock.value, category.value, price.value)) {
    return alert("Faltan campos por llenar.");
  } else {
    const newProduct = { title: title.value, description: description.value, code: code.value, stock: stock.value, category: category.value, price: price.value, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Q638_noun_23486_ccIlsurAptukov_music.svg/800px-Q638_noun_23486_ccIlsurAptukov_music.svg.png"};
    socket.emit("addProduct", newProduct);
    resetForm();
  }
});


socket.on("newProduct", (data) => {
  render(data);
});