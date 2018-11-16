$(document).ready(function () {
   // $('.cd-cart-container').addClass('empty');
   
    if (sessionStorage.cartdata == undefined || sessionStorage.cartdata == "[") {

        $('#items_container').append('<div style="text-align:center;  align-self: center;" ><b>No item on cart</b></div>');
    }
    else {
        jsonStr = sessionStorage.cartdata;
        jsonStr = jsonStr + "]";
        jsonStr = jsonStr.replace(/\}{/g, "},{");
        obj = eval(jsonStr);

        $("#itemsJson").val(jsonStr);

        for (var i = 0; i < obj.length; ++i) {
            var productAdded = $('<li class="product"><div class="row" style="padding-top:20px"><div class="product-image col-md-3"><a ><img src="' + obj[i].prodImg + '"  alt="Product" style="height:80px;width:auto"></a></div><div class="product-details col-md-offset-1 col-md-8" ><br /> <h5><a >' + obj[i].prodName + '</a></h5><span class="price">' + obj[i].prodQuant + ' order/s</span></div></div></li>');
            $('#items').prepend(productAdded);
        }
    }
});

