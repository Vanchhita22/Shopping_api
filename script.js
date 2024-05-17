let productDiv = document.querySelector(".product");
let categoryListDiv = document.querySelector(".categoryList");
let allCatName = [];

let displayProduct = async (allCheckCat = [], searchText = '') => {
    productDiv.innerHTML = '';

    let product = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    let finalProduct = await product.json();

    finalProduct?.categories.forEach((element) => {
        if (!allCatName.includes(element.category_name)) {
            categoryListDiv.innerHTML += ` <label>
                <input type="checkbox" onclick='categoryFilter()' value="${element.category_name}"> &nbsp; ${element.category_name}
            </label>`
            allCatName.push(element.category_name)
        }

        if (allCheckCat.length == 0 || allCheckCat.includes(element.category_name)) {
            element.category_products.forEach((item) => {
                if (item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.vendor.toLowerCase().includes(searchText.toLowerCase())) {
                    productDiv.innerHTML += `<div class="productItems">
                        <img src=${item.image}>
                        <h6>${item.vendor}</h6>
                        <hr/>
                        <h6>${item.badge_text === null ? "" : item.badge_text}</h6>
                        <h6>Price Rs. ${item.price} | <span>${item.compare_at_price}</span></h6>
                        <h5>${item.title}</h5>
                    </div>`
                }
            })
        }
    })
}

displayProduct();

let categoryFilter = () => {
    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkdata = [];
    checkInput.forEach((element) => {
        if (element.checked) {
            checkdata.push(element.value);
        }
    })
    displayProduct(checkdata, document.getElementById('searchInput').value);
}

document.getElementById('searchInput').addEventListener('input', () => {
    categoryFilter();
});