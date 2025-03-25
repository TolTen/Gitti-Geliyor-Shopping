document.addEventListener("DOMContentLoaded", function() {
    const productGrid = document.getElementById("productGrid");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");
    const sortBy = document.getElementById("sortBy");

    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });

    function renderProducts(filteredProducts) {
        productGrid.innerHTML = "";
        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("card");
            productCard.setAttribute('data-id', product.id);
    
            const ratingStars = getStars(product.rating);
    
            productCard.innerHTML = `
                <a href="Product-Details.html?id=${product.id}">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </a>
                <h5>${product.title}</h5>
                <p>$${product.price}</p>
                <p class="rating">${ratingStars} (${product.rating.toFixed(1)})</p>
            `;
    
            productGrid.appendChild(productCard);
        });
    }
    
    function getStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = (rating - fullStars) >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
        let starsHTML = '';
    
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<span class="star full">★</span>';
        }
        if (halfStar) {
            starsHTML += '<span class="star half">★</span>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<span class="star empty">☆</span>';
        }
    
        return `<span class="stars">${starsHTML}</span>`;
    }
    
    

    function filterAndSortProducts() {
        let filteredProducts = products.filter(product => 
            (categoryFilter.value === "" || product.category === categoryFilter.value) &&
            (searchInput.value === "" || product.title.toLowerCase().includes(searchInput.value.toLowerCase()))
        );

        if (sortBy.value === "lowToHigh") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy.value === "highToLow") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        renderProducts(filteredProducts);
    }

    categoryFilter.addEventListener("change", filterAndSortProducts);
    searchInput.addEventListener("input", filterAndSortProducts);
    sortBy.addEventListener("change", filterAndSortProducts);

    renderProducts(products);

    function redirect() {
        const productGrid = document.getElementById("productGrid");
        productGrid.addEventListener("click", function(event) {
            if (event.target.closest('.card')) {
                const productId = event.target.closest('.card').getAttribute('data-id');  
                window.location.href = `Product-Details.html?id=${productId}`;
            }
        });
    }

    // Call the redirect function to enable redirection on product click
    redirect();
});