window.Homepage = {

    API_URL: "http://localhost:8082/",

    getProducts () {
        $.ajax({
            method: "GET",
            url: Homepage.API_URL + "/products"
        }).done(function (response) {
            console.log(response);
            Homepage.displayProducts(response.content);
        })
    },

    addProductToCart: function (productId) {
        let userId = 1;

        let body = {
            productIds: [
                productId
            ]
        };

        $.ajax({
            method: "PUT",
            url: Homepage.API_URL + "/carts/" + userId,
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function () {
            window.location.replace('cart.html');
        });
    },

    getProductHtml: function (product) {
        return `
  <div class="single-product">
                                <div class="product-f-image">
                                    <img src="img/product-00.jpg" alt="">
                                    <div class="product-hover">
                                        <a class="add-to-cart-link" data-quantity="1" data-product_sku="" data-product_id=${product.id} rel="nofollow">><i class="fa fa-shopping-cart"></i> Add to cart</a>
                                        <a href="single-product.html" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                                    </div>
                                </div>
                                
                                <h2><a href="single-product.html">${product.name}</a></h2>
                                
                                <div class="product-carousel-price">
                                    <ins>$${product.price}</ins> <del>$${product.price}</del>
                                </div> 
                            </div>
    `
    },

    displayProducts: function (products) {
        console.log("asdsadasdsa")
        let productsHtml= '';

        products.forEach(product => productsHtml += Homepage.getProductHtml(product));

        $('.maincontent-area .single-product').html(productsHtml);
    },

    bindEvents: function () {
        $('.single-product').delegate('.add-to-cart-link', 'click', function (event) {
            event.preventDefault();
            let productId = $(this).data('product_id');
            Homepage.addProductToCart(productId);event.preventDefault();
        });
    }
};

let products = Homepage.getProducts();
Homepage.bindEvents();
