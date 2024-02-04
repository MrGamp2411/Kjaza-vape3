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
