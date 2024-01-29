// cart.js

// Funzione per aggiornare il numero di elementi nel carrello nella barra del menu
function updateCartNumber() {
  const totalQuantityElement = document.querySelector(".cart_number");
  const cart = getCart();

  // Calcola la quantità totale nel carrello
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  // Aggiorna il numero totale di elementi nel carrello nella barra del menu
  totalQuantityElement.textContent = totalQuantity.toString();
}

// Funzione per aggiornare la visualizzazione del carrello
function updateCartView() {
  // Recupera i dati del carrello da localStorage
  const cart = getCart();

  // Trova l'elemento HTML che mostra i prodotti nel carrello
  let cartItemsElement = document.getElementById("cart-items");

  // Trova l'elemento HTML che mostra il messaggio quando il carrello è vuoto
  let emptyCartMessageElement = document.getElementById("empty-cart-message");

  // Verifica se gli elementi sono presenti nella pagina
  if (!cartItemsElement || !emptyCartMessageElement) {
    console.error("One or more elements not found. Exiting updateCartView.");
    return;
  }

  // Svuota il contenuto attuale
  cartItemsElement.innerHTML = "";

  if (cart.length === 0) {
    // Se il carrello è vuoto, mostra il messaggio
    emptyCartMessageElement.style.display = "block";
  } else {
    // Se il carrello contiene prodotti, nascondi il messaggio
    emptyCartMessageElement.style.display = "none";

    // Cicla attraverso i prodotti nel carrello e crea elementi HTML per ognuno
    cart.forEach(item => {
      let cartItem = createCartItemElement(item);
      cartItemsElement.appendChild(cartItem);
    });
  }
}

// Funzione per creare un elemento HTML per un elemento del carrello
function createCartItemElement(item) {
  let cartItem = document.createElement("div");
  cartItem.className = "box"; // Aggiungi la classe desiderata
  cartItem.innerHTML = `
    <div class="price">
      <h6>${item.name}</h6>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button onclick="increaseQuantity('${item.name}')">+</button>
      <button onclick="decreaseQuantity('${item.name}')">-</button>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    </div>
  `;
  return cartItem;
}

// Funzione per ottenere i dati del carrello da localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Funzione per salvare i dati del carrello in localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Funzione per aggiungere un prodotto al carrello
function addToCart(productName, price) {
  // Recupera i dati del carrello
  let cart = getCart();

  // Verifica se il prodotto è già nel carrello
  const existingProduct = cart.find(product => product.name === productName);

  if (existingProduct) {
    // Se il prodotto esiste già, aumenta la quantità
    existingProduct.quantity++;
  } else {
    // Se il prodotto non esiste ancora nel carrello, aggiungilo
    const newProduct = {
      name: productName,
      price: price,
      quantity: 1
    };
    cart.push(newProduct);
  }

  // Salva i dati del carrello
  saveCart(cart);

  // Aggiorna la visualizzazione del carrello
  updateCartView();
  updateCartNumber(); // Aggiorna il numero di elementi nel carrello nella barra del menu
}

// Funzione per rimuovere un prodotto dal carrello
function removeFromCart(productName) {
  // Recupera i dati del carrello
  let cart = getCart();

  // Filtra i prodotti rimuovendo quello con il nome specificato
  cart = cart.filter(product => product.name !== productName);

  // Salva i dati del carrello aggiornati
  saveCart(cart);

  // Aggiorna la visualizzazione del carrello
  updateCartView();
  updateCartNumber(); // Aggiorna il numero di elementi nel carrello nella barra del menu
}

// Funzione per aumentare la quantità di un prodotto nel carrello
function increaseQuantity(productName) {
  // Recupera i dati del carrello
  let cart = getCart();

  // Trova il prodotto nel carrello
  const product = cart.find(product => product.name === productName);

  if (product) {
    // Aumenta la quantità
    product.quantity++;
  }

  // Salva i dati del carrello aggiornati
  saveCart(cart);

  // Aggiorna la visualizzazione del carrello
  updateCartView();
  updateCartNumber(); // Aggiorna il numero di elementi nel carrello nella barra del menu
}

// Funzione per diminuire la quantità di un prodotto nel carrello
function decreaseQuantity(productName) {
  // Recupera i dati del carrello
  let cart = getCart();

  // Trova il prodotto nel carrello
  const product = cart.find(product => product.name === productName);

  if (product) {
    // Diminuisci la quantità, assicurandoti che non sia mai inferiore a 1
    product.quantity = Math.max(1, product.quantity - 1);
  }

  // Salva i dati del carrello aggiornati
  saveCart(cart);

  // Aggiorna la visualizzazione del carrello
  updateCartView();
  updateCartNumber(); // Aggiorna il numero di elementi nel carrello nella barra del menu
}

// Chiamata per aggiornare la visualizzazione del carrello quando il documento è completamente caricato
document.addEventListener('DOMContentLoaded', function () {
  updateCartView();
  updateCartNumber();  // Nuova chiamata per aggiornare il numero di elementi nel carrello
});
