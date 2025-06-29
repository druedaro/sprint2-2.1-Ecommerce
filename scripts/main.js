"use strict";

import {
    cart,
    productCount,
    buy,
    removeFromCart,
    cleanCart,
    calculateTotal,
    calculateTotalByProduct
} from './cart.js'

import {
    updateCartUI,
    printCart
} from './ui.js';

updateCartUI(productCount);

const productButtons = document.querySelectorAll('.add-to-cart');
productButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = parseInt(button.getAttribute('data-product-id'));
        buy(id);
        updateCartUI(productCount);
    });
});

const cleanBtn = document.getElementById('clean-cart');
if (cleanBtn) {
    cleanBtn.addEventListener('click', () => {
        cleanCart();
        updateCartUI(productCount);
        printCart(cart, productCount, buy, removeFromCart, calculateTotal, calculateTotalByProduct);
    });
}

const cartModal = document.getElementById('cartModal');
if (cartModal) {
    cartModal.addEventListener('show.bs.modal', () => {
        printCart(cart, productCount, buy, removeFromCart, calculateTotal, calculateTotalByProduct);
    });
}
