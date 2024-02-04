// cart.js

document.addEventListener('DOMContentLoaded', function () {
  // Chiamata alla funzione per aggiornare il numero di elementi nel carrello nella barra del menu
  updateCartNumber();

  // Ottieni il carrello
  const cart = getCart();

  // Sezione HTML in cui mostrare i prodotti nel carrello
  const cartItemsContainer = document.getElementById('cart-items');

  // Se il carrello non è vuoto, popola la sezione con i prodotti
  if (cart.length > 0) {
    // Nascondi il messaggio di carrello vuoto
    document.getElementById('empty-cart-message').style.display = 'none';

    // Itera attraverso i prodotti nel carrello
    cart.forEach(product => {
      // Crea un elemento HTML per ogni prodotto
      const productElement = document.createElement('div');
      productElement.className = 'cart-item';
      productElement.innerHTML = `
        <img src="images/product_placeholder.jpg" alt="${product.productName}">
        <div class="item_details">
          <h3>${product.productName}</h3>
          <p>Price: $${product.price.toFixed(2)}</p>
          <p>Quantity: ${product.quantity}</p>
        </div>
      `;

      // Aggiungi l'elemento alla sezione dei prodotti nel carrello
      cartItemsContainer.appendChild(productElement);
    });
  } else {
    // Se il carrello è vuoto, mostra il messaggio di carrello vuoto
    document.getElementById('empty-cart-message').style.display = 'block';
  }
});
