// cartCounter.js

// Funzione per ottenere il carrello
function getCart() {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
}

// Funzione per salvare il carrello nel localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Funzione per aggiornare il numero di elementi nel carrello nella barra del menu
function updateCartNumber() {
  const totalQuantityElement = document.querySelector(".cart_number");
  const cart = getCart();
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
  totalQuantityElement.textContent = totalQuantity.toString();
}

// Funzione per rimuovere un prodotto dal carrello e aggiornare la pagina
function removeProductAndUpdatePage(index) {
  const updatedCart = removeProduct(index);
  saveCart(updatedCart);
  updateCartNumber();
  displayCartItems(updatedCart); // Aggiorna la visualizzazione con il carrello aggiornato
  // Aggiungi qui eventuali ulteriori azioni di aggiornamento della pagina
  return updatedCart;
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
  updateCartNumber();
  displayCartItems(); // Aggiorna la visualizzazione senza passare il carrello
  // Aggiungi qui eventuali ulteriori azioni di aggiornamento della pagina
}
document.addEventListener('DOMContentLoaded', function () {
  // Chiamata iniziale per visualizzare gli elementi nel carrello
  displayCartItems(getCart());
});
