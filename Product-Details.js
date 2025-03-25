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

        let quantity = 1;
        const quantityDisplay = document.getElementById('quantity-display');
        const totalPriceElement = document.getElementById('total-price');

        const updateTotalPrice = () => {
            const totalPrice = product.price * quantity;
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
            quantityDisplay.textContent = quantity;
        };

        document.getElementById('increase-qty').addEventListener('click', () => {
            quantity++;
            updateTotalPrice();
        });

        document.getElementById('decrease-qty').addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateTotalPrice();
            }
        });

        updateTotalPrice(); 

        document.getElementById('go-to-cart-btn').addEventListener('click', () => {
            window.location.href = 'shopping-cart.html';
        });
        
        
        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            addToCart(product.id, quantity);
        });

        const detailsContainer = document.querySelector('.product-details');

        const reviewsTitle = document.createElement('h3');
        reviewsTitle.textContent = 'Customer Reviews';
        reviewsTitle.classList.add('reviews-title');
        detailsContainer.appendChild(reviewsTitle);

        product.reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');

            const stars = getStars(review.rating);

            reviewDiv.innerHTML = `
                <div class="reviewer-name">${review.reviewerName}</div>
                <div class="review-rating">${stars}</div>
                <div class="review-comment">${review.comment}</div>
                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
            `;

            detailsContainer.appendChild(reviewDiv);
        });

        function getStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
            let starsHTML = '';
        
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '★';
            }
            if (halfStar) {
                starsHTML += '⯨'; 
            }
            for (let i = 0; i < emptyStars; i++) {
                starsHTML += '☆';
            }
        
            return starsHTML;
        }
        


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
