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
            productCard.innerHTML = `
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </a>
                <h5>${product.title}</h5>
                <p>$${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        });
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
});
