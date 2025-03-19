document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        document.getElementById('product-image').src = product.thumbnail;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('cart-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-price-large').textContent = `$${product.price.toFixed(2)}`;

        const aboutItemList = document.getElementById('about-item-list');
        const aboutItems = [
            `Category: ${product.category}`,
            `Brand: ${product.brand}`,
            `SKU: ${product.sku}`,
            `Weight: ${product.weight} kg`,
            `Dimensions: ${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`,
            `Warranty: ${product.warrantyInformation}`,
            `Shipping: ${product.shippingInformation}`,
            `Availability: ${product.availabilityStatus}`
        ];

        aboutItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            aboutItemList.appendChild(li);
        });

        const quantitySelect = document.getElementById('quantity');
        const totalPriceElement = document.getElementById('total-price');

        quantitySelect.addEventListener('change', () => {
            const quantity = parseInt(quantitySelect.value);
            const totalPrice = product.price * quantity;
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        });

        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            addToCart(product.id, parseInt(quantitySelect.value));
        });

        document.getElementById('go-to-cart-btn').addEventListener('click', () => {
            window.location.href = 'Shopping-Cart.html';
        });
    }
});

function addToCart(productId, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ id: productId, quantity: quantity });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Product added to cart!');
}