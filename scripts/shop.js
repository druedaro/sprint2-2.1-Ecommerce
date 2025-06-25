"use strict"

import { products } from './products.js';

const cart = [];
const total = 0;
let productCount = 0;

const buy = (id) => {
    let index = cart.findIndex(product => product.id === id)

    if (index === -1) {
        const product = products.find(p => p.id === id)
        if (product) {
            const cartProduct = { ...product, quantity: 1 };
            cart.push(cartProduct);
            productCount++;
        }
    } else {
        cart[index].quantity++
        productCount++
    }
}

const cleanCart = () => {
    cart.forEach(product => delete product.subtotalWithDiscount)
    cart.length = 0;
    productCount = 0;
    updateCartUI();
    printCart();
}

const calculateTotal = () => {
    let totalAmount = 0

    if (cart.length == 0) {
        return totalAmount
    }

    applyPromotionsCart()

    for (let i = 0; i < cart.length; i++) {
        let product = cart[i]
        let totalPriceProduct = calculateTotalByProduct(product)
        totalAmount += totalPriceProduct
    }
    return totalAmount;
}

const calculateTotalByProduct = (product) => {
    let finalPrice = product.subtotalWithDiscount ? product.subtotalWithDiscount : product.price;
    
    let totalProduct = finalPrice * product.quantity
    return totalProduct;
}

const applyPromotionsCart = () => {
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i]

        if (product.offer) {
            const {number, percent} = product.offer

            if (product.quantity >= number) {
                let discount = (100 - percent) / 100
                product.subtotalWithDiscount = product.price * discount
            } else {
                delete product.subtotalWithDiscount;
            }
        }
    }
}

const printCart = () => {
    const cartList = document.getElementById('cart_list')
    if (!cartList) return;
    cartList.innerHTML = ''

    if (!cart || cart.length === 0) {
        cartList.innerHTML = '<tr><td colspan="4">Carrito vacío</td></tr>';

        const totalPriceElement = document.getElementById('total_price')
        if (totalPriceElement) {
            totalPriceElement.innerHTML = '0.00';
        }
        return;
    }

    const totalPriceElement = document.getElementById('total_price')
    if (totalPriceElement) {
        totalPriceElement.innerHTML = calculateTotal().toFixed(2)
    }

    cart.forEach(product => {
        const row = document.createElement("tr")

        row.innerHTML = `
        <th scope="row">
                <div class="d-flex align-items-center justify-content-between">
                    <span>${product.name}</span>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-danger btn-sm remove-btn" data-product-id="${product.id}" title="Quitar uno">-</button>
                        <button type="button" class="btn btn-outline-success btn-sm add-btn" data-product-id="${product.id}" title="Agregar uno">+</button>
                    </div>
                </div>
            </th>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${calculateTotalByProduct(product).toFixed(2)}</td>
        `
        
        const removeBtn = row.querySelector('.remove-btn');
        const addBtn = row.querySelector('.add-btn');
        
        removeBtn.addEventListener('click', () => removeFromCart(product.id));
        addBtn.addEventListener('click', () => addToCart(product.id));
        
        cartList.appendChild(row);
    })
}

const removeFromCart = (id) => {
    let index = cart.findIndex(product => product.id === id)

    if (index == -1) return;

    let product = cart[index]

    if (product.quantity == 1) {
        delete product.subtotalWithDiscount
        cart.splice(index, 1)
    } else {
        product.quantity--;

        if (product.offer) {
            const {number} = product.offer
            if (product.quantity < number) {
                delete cart[index].subtotalWithDiscount
            }
        }
    }

    productCount--
    updateCartUI();
    printCart();
}

const addToCart = (id) => {
    buy(id)
    updateCartUI();
    printCart();
}

const open_modal = () => {
    printCart();
}

const updateCartUI = () => {
    const countProductElement = document.getElementById('count_product');
    if (countProductElement) {
        countProductElement.innerHTML = productCount;
    }
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-product-id'));
        buy(productId);
        updateCartUI();
    });
});

const cleanCartButton = document.getElementById('clean-cart');
if (cleanCartButton) {
    cleanCartButton.addEventListener('click', cleanCart);
}

const countProductElement = document.getElementById('count_product');
if (countProductElement) {
    countProductElement.innerHTML = productCount;
}

const cartModal = document.getElementById('cartModal');
if (cartModal) {
    cartModal.addEventListener('show.bs.modal', function() {
        printCart();
    });
}