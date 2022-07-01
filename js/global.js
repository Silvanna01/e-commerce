const menu = document.getElementById('menu');

// Activate menu animation
menu.addEventListener('click', e => menu.classList.toggle('is-active'));

// Cart Icon
(function refreshCart() {
  const cartIcon = document.querySelector('.link .cart-number');
  const cart = new Map(JSON.parse(window.localStorage.getItem('cart')));
  const cartSize = [...cart.values()].reduce((total, productInfo) => total + productInfo.quantity, 0);
  cartIcon.textContent = cartSize;
})()