"use strict"

import { products } from "./products.js";

export const cart = [];
export let productCount = 0;

export const buy = (id) => {
    const index = cart.findIndex (p => p.id === id);
    if (index === -1) {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push ( {...product, quantity: 1});
            productCount++;
        }
    } else {
        cart[index].quantity++;
        productCount++;
    }
}

export const removeFromCart = (id) => {
    const index = cart.findIndex (p => p.id === id);
    if (index === -1)  return;

    if (cart[index].quantity === 1) {
        delete cart[index].subtotalWithDiscount;
        cart.splice(index,1);
    } else {
        cart[index].quantity--;
        if (cart[index].offer && cart [index].quantity < cart [index].offer.number) {
            delete cart[index].subtotalWithDiscount;
        }
    }

    productCount--;
};

export const cleanCart = () => {
    cart.forEach(p => delete p.subtotalWithDiscount);
    cart.length = 0;
    productCount = 0;
}