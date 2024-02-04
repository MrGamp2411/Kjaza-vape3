// shop.js

// Funzione per aggiungere un prodotto al carrello
function addToCart(productName, price) {
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
      // Aggiungi qui eventuali altre proprietà del prodotto
    });
  }

  saveCart(cart);
  updateCartNumber();
}
