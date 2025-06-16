"use strict"

const cart = [];

const total = 0;

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
    let index = cart.findIndex(product => product.id === id)

    if (index === -1) {
        const product = products.find(parameter => parameter.id === id)
        product.quantity = 1
        cart.push (product)
    } else {
        cart[index].quantity++
    }

    count_product.innerHTML++
}

// Exercise 2
const cleanCart = () =>  {
    cart.forEach(product => delete product.subtotalWithDiscount)
    count_product.innerHTML = 0

    cart.length = 0
    printCart()
}

// Exercise 3
const calculateTotal = () =>  {
    // Calculate total price of the cart using the "cartList" array
    let totalAmount = 0

    if (cart.length == 0) {
        return totalAmount
    }

    applyPromotionsCart()

    for (let i=0; i<cart.length; i++) {
        let product = cart [i]
        let TotalPriceProduct = calculateTotalByProduct(product)
        totalAmount += TotalPriceProduct
    }
    return totalAmount
}

const calculateTotalByProduct = (product) => {
    let finalPrice = (product.subtotalWithDiscount) ? product.subtotalWithDiscount : product.price;
    
    let totalProduct = finalPrice * product.quantity
    return totalProduct
}

// Exercise 4
const applyPromotionsCart = () =>  {
    // Apply promotions to each item in the array "cart"
    for (let i = 0; i < cart.length; i++) {
        let product = cart [i]

        if (product.offer) {
            const {number, percent} = product.offer

            if (product.quantity >= number) {
                let discount = (100 - percent) / 100
                product.subtotalWithDiscount = product.price * discount
            }
        }
    }
}

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const cartList = document.getElementById('cart_list')
    cartList.innerHTML= ''

    if (!cart || cart.length === 0) {
    cartList.innerHTML = '<tr><td colspan="6">Carrito vacío</td></tr>';
    return;
}

    let totalPriceElement = document.getElementById('total_price')
    totalPriceElement.innerHTML = calculateTotal().toFixed(2)

    cart.forEach (product => {
        const row = document.createElement("tr")

        row.innerHTML = `
        <td>
            <button type="button"> </button>
        </td>
        `
    })
}


// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {

}

const open_modal = () =>  {
    printCart();
}