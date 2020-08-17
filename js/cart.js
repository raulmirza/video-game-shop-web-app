window.Cart = {
    API_URL: "http://localhost:8082",

    getCart: function () {
        let userId = 1;
        $.ajax({
            method: "GET",
            url: Cart.API_URL + "/carts/" + userId
        }).done(function (response) {
            Cart.displayProductsInCart(response.products);
        });

        },

    removeProductFromCart: function (productId) {
        let userId = 1;
        $.ajax({
            method: "DELETE",
            url:Cart.API_URL + "/carts/"+ userId + "/" + productId,

        }).done(function(response) {
            window.location.reload()
    });
    },


    getProductInCartHtml: function (product) {
        return `
        <tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" onclick="Cart.removeProductFromCart(${product.id})">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-00.jpg"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">$${product.price}</span> 
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">$${product.price}</span> 
                                            </td>
                                        </tr>
        `
    },

    displayProductsInCart: function (products) {
        let productRows = '';

        products.forEach(product => productRows += Cart.getProductInCartHtml(product));

        $('table.shop_table.cart tbody').html(productRows);

    },



    }
Cart.getCart();
