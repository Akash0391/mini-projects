document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: "Product 1", price: 54.99},
        {id: 2, name: "Product 2", price: 65.99},
        {id: 3, name: "Product 3", price: 29.99},
    ];


    const cart = [];
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-item');
    const emptyCartMsg = document.getElementById('empty-cart');
    const cartTotalMsg = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkOutBtn = document.getElementById('checkout-btn');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - ${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add To Cart</button>
        `;
        productList.appendChild(productDiv);
    });


    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId)
            addToCart(product);
        }
    })

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMsg.classList.add('hidden');
            cartTotalMsg.classList.remove('hidden');
            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} - ${item.price.toFixed(2)}
                <button data-id = "${item.id}">Remove</button>
                `
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            })
        } else {
            emptyCartMsg.classList.remove('hidden');
            totalPriceDisplay.textContent = `$0.00`;

        }
    }


    cartItems.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = cart.find(p => p.id === productId)
            removeFromCart(product);
        }
    })

    function removeFromCart(product) {
    const index = cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    renderCart();
}

    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert('Checkout Successfully');
        renderCart();
    })
});