"use strict"

import { products } from './products.js';

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];
const total = 0;
let productCount = 0;

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
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

// Exercise 2
const cleanCart = () => {
    cart.forEach(product => delete product.subtotalWithDiscount)
    cart.length = 0;
    productCount = 0;
    updateCartUI();
    printCart();
}

// Exercise 3
const calculateTotal = () => {
    // Calculate total price of the cart using the "cartList" array
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

// Exercise 4
const applyPromotionsCart = () => {
    // Apply promotions to each item in the array "cart"
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

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom
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
        
        // Add event listeners to the buttons
        const removeBtn = row.querySelector('.remove-btn');
        const addBtn = row.querySelector('.add-btn');
        
        removeBtn.addEventListener('click', () => removeFromCart(product.id));
        addBtn.addEventListener('click', () => addToCart(product.id));
        
        cartList.appendChild(row);
    })
}

// ** Nivell II **

// Exercise 7
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

// Utility functions
const updateCartUI = () => {
    const countProductElement = document.getElementById('count_product');
    if (countProductElement) {
        countProductElement.innerHTML = productCount;
    }
}

// Event Listeners and DOM Initialization
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
    
    // Fix accessibility issue: remove focus from modal elements when closing
    cartModal.addEventListener('hide.bs.modal', function() {
        // Remove focus from any focused element within the modal
        const focusedElement = cartModal.querySelector(':focus');
        if (focusedElement) {
            focusedElement.blur();
        }
    });
    
    // Additional fix: ensure proper focus management when modal is shown
    cartModal.addEventListener('shown.bs.modal', function() {
        // Optionally focus on the first interactive element or modal itself
        const closeButton = cartModal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.focus();
        }
    });
}