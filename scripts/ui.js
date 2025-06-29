"use strict";

export const updateCartUI = (productCount) => {
  const countElement = document.getElementById('count_product');
  if (countElement) {
    countElement.innerHTML = productCount;
  }
};

export const printCart = (cart, productCount, buy, removeFromCart, calculateTotal, calculateTotalByProduct) => {
  const cartList = document.getElementById('cart_list');
  const totalPriceElement = document.getElementById('total_price');

  if (!cartList || !totalPriceElement) return;

  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<tr><td colspan="4">Cart is empty</td></tr>';
    totalPriceElement.innerHTML = '0.00';
    return;
  }

  totalPriceElement.innerHTML = calculateTotal().toFixed(2);

  cart.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">
        <div class="d-flex align-items-center justify-content-between">
          <span>${product.name}</span>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-danger remove-btn" data-id="${product.id}">-</button>
            <button class="btn btn-outline-success add-btn" data-id="${product.id}">+</button>
          </div>
        </div>
      </th>
      <td>${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>${calculateTotalByProduct(product).toFixed(2)}</td>
    `;

    row.querySelector('.remove-btn').addEventListener('click', () => {
      removeFromCart(product.id);
      updateCartUI(productCount);
      printCart(cart, productCount, buy, removeFromCart, calculateTotal, calculateTotalByProduct);
    });

    row.querySelector('.add-btn').addEventListener('click', () => {
      buy(product.id);
      updateCartUI(productCount);
      printCart(cart, productCount, buy, removeFromCart, calculateTotal, calculateTotalByProduct);
    });

    cartList.appendChild(row);
  });
};
