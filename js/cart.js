// cart.js

// Funzione per ottenere il carrello
function getCart() {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
}

// Funzione per salvare il carrello nel localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Funzione per visualizzare gli elementi nel carrello
function displayCartItems() {
  // Chiamata alla funzione per aggiornare il numero di elementi nel carrello nella barra del menu
  updateCartNumber();

  // Ottieni il carrello
  const cart = getCart();

  // Sezione HTML in cui mostrare i prodotti nel carrello
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Pulisci la sezione prima di aggiungere nuovi elementi

  // Se il carrello non è vuoto, popola la sezione con i prodotti
  if (cart.length > 0) {
    // Nascondi il messaggio di carrello vuoto
    document.getElementById('empty-cart-message').style.display = 'none';

    // Itera attraverso i prodotti nel carrello
    cart.forEach((product, index) => {
      // Crea un elemento HTML per ogni prodotto
      const productElement = document.createElement('div');
      productElement.className = 'box'; // Usa la stessa classe 'box' come nella pagina shop.html
      productElement.innerHTML = `
        <div class="price">
          <h6> Best PRICE </h6>
        </div>
        <div class="img-box">
          <img src="${product.image}" alt="${product.productName}">
        </div>
        <div class="name">
          <h5>${product.productName}</h5>
        </div>
        <div class="description">
          <p>Price: $${product.price.toFixed(2)}</p>
          <p>Quantity: <span class="quantity">${product.quantity}</span></p>
        </div>
      `;

      // Aggiungi i pulsanti "+" e "-"
      const quantityControls = document.createElement('div');
      quantityControls.className = 'quantity-controls';
      quantityControls.innerHTML = `
        <button class="quantity-button" onclick="decreaseQuantity(${index})">-</button>
        <button class="quantity-button" onclick="increaseQuantity(${index})">+</button>
      `;
      productElement.appendChild(quantityControls);

      // Aggiungi il pulsante per rimuovere il prodotto
      const removeButton = document.createElement('button');
      removeButton.className = 'remove-button';
      removeButton.innerHTML = 'Remove';
      removeButton.onclick = function () {
        removeProductAndUpdatePage(index);
      };
      productElement.appendChild(removeButton);

      // Aggiungi l'elemento alla sezione dei prodotti nel carrello
      cartItemsContainer.appendChild(productElement);
    });
  } else {
    // Se il carrello è vuoto, mostra il messaggio di carrello vuoto
    document.getElementById('empty-cart-message').style.display = 'block';
  }
}

// Funzioni per aumentare, diminuire e rimuovere un prodotto
function increaseQuantity(index) {
  const cart = getCart();
  cart[index].quantity++;
  saveCart(cart);
  displayCartItems(cart);
}

function decreaseQuantity(index) {
  const cart = getCart();
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    saveCart(cart);
    displayCartItems(cart);
  }
}

// Funzione per rimuovere un prodotto dal carrello e aggiornare la pagina
function removeProduct(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  return cart; // Restituisci il carrello aggiornato
}
// Funzione per aggiungere un prodotto al carrello e aggiornare la pagina
function addToCartAndUpdatePage(productName, price, image) {
  const cart = getCart();
  const existingProductIndex = cart.findIndex(product => product.productName === productName);

  if (existingProductIndex !== -1) {
    // Il prodotto è già nel carrello, aumenta la quantità
    cart[existingProductIndex].quantity++;
  } else {
    // Il prodotto non è nel carrello, aggiungilo
    cart.push({
      productName: productName,
      price: price,
      quantity: 1,
      image: image, // Aggiungi qui eventuali altre proprietà del prodotto
    });
  }

  saveCart(cart);
  displayCartItems(cart);
  // Aggiungi qui eventuali ulteriori azioni di aggiornamento della pagina
}

document.addEventListener('DOMContentLoaded', function () {
  // Chiamata iniziale per visualizzare gli elementi nel carrello
  displayCartItems(getCart());
});
