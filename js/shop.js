// shop.js

// Funzione per aggiungere un prodotto al carrello
function addToCart(productName, price) {
  const cart = getCart();
  cart.push({
    productName: productName,
    price: price,
    quantity: 1
  });
  saveCart(cart);

  // Chiamata alla funzione per aggiornare il numero di elementi nel carrello
  updateCartNumber();
}
