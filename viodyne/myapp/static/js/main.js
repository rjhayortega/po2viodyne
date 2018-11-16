jQuery(function ($) {
  

    $('#ulnav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeIn(0);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeOut(0);
    });


    $('#searchBtn').click(function (event) {
        // Remember the link href
        var href = this.href;

        // Don't follow the link
        event.preventDefault();

        // Do the async thing
     
            if ($('#searchTxt').val() != "" || $('#searchTxt').val() != undefined)
            {
                href = href + $('#searchTxt').val()
            }
            else
            {
                href = href + "";
            }
            window.location = href;
        
    });

    var cartWrapper = $('.cd-cart-container');
    var cartBody = cartWrapper.find('.body')
    var cartList = cartBody.find('table tbody').eq(0);
    var cartTotal = cartWrapper.find('.checkout').find('span');
    var cartTrigger = cartWrapper.children('.cd-cart-trigger');
    var cartCount = cartTrigger.children('.count')
    var addToCartBtn = $('.cd-add-to-cart');
    var undo = cartWrapper.find('.undo');
    var clearAll = cartWrapper.find('.clearCart');
    //var quickamount = $('.quickamount');
    //var quickadd = $('.quickadd');

	var productId = 0;
	var prodName = "";
	var productQuantity = "";

    //sessionStorage.clear();

	if (localStorage.cardata == undefined) {
	    if (localStorage.cardata != "[") {
	        localStorage.cardata = "[";
	       
	    }
	  
	}
	else if (localStorage.cardata != undefined && localStorage.cardata != "[") {
	    //$("#nocartItem").hide();
	    $("#SubmitForm").show();
	    updateCartCount();
	    updateCartItems();
	    cartWrapper.removeClass('empty');
	    updateCartTotal()
	    toggleCart();
	    $(".Home_content").css("background-color", "white");
	}

	inputjsonStr = localStorage.cardata;
	inputjsonStr = inputjsonStr + "]";
	inputjsonStr = inputjsonStr.replace(/\}{/g, "},{");
	obj = eval(inputjsonStr);
    var ct = 0
	for (var i = 0; i < obj.length; ++i)
	{
	    ct++;
	}
	if (ct > 0)
	{
	    $("#itemsJson").val(inputjsonStr)
	}


	

	
	//$("#navToggleCart").on('click', function (event) {
	//    event.preventDefault();

	//    id = $(this).next('.quantity').data('id');
	//    jsonStr = localStorage.cardata;
	//    jsonStr = jsonStr + "]";
	//    jsonStr = jsonStr.replace(/\}{/g, "},{");
	//    obj = eval(jsonStr);
	   
	//    if (obj.length > 0)
	//    {
	//        toggleCart();
	//    }
	//});

    //open/close cart
	cartTrigger.on('click', function (event) {
	    event.preventDefault();
	    toggleCart();
	});

	if (true) {
	   
	
	    var undoTimeoutId;

	    //add product to cart
	    addToCartBtn.on('click', function(event){
	        event.preventDefault();
	        addToCart($(this));
	        var check = checkProdOnCart($(this).data('id'));
	        if (check == 1)
	        {
	            if ($(this).data('from') == "main")
	            {
	                var imgsrc = $('#product_image_gallery').find('img:first').attr('src').replace(/\\/g, '\\\\');
	            }
	            else if ($(this).data('from') == "related")
	            {
	                var imgsrc = $(this).parent().parent().find('.row:first img').attr('src').replace(/\\/g, '\\\\');
	            }
                    
	            localStorage.cardata = localStorage.cardata + "{'prodId':'" + $(this).data('id').replace(/\s+$/, '') + "','prodName':'" + $(this).data('name') + "','prodQuant':1, 'prodIsDeleted':'0', 'prodcd':" + $(this).data('cd') + " ,'prodImg':'" + imgsrc + "' }";
	            cartList.empty();
	            updateCartItems();
	            updateCartCount();
	            updateCartTotal();
	        }
	        if (check == 0)
	        {
	            updateProdQuantity($(this).data('id'), 1, "add");
	            cartList.empty();
	            updateCartItems();
	            updateCartCount();
	            updateCartTotal();
	        }
		 
	        window.scrollTo(0,0);
	    });

	   

	    //close cart when clicking on the .cd-cart-container::before (bg layer)
	    cartWrapper.on('click', function(event){
	        if( $(event.target).is($(this)) ) toggleCart(true);
	    });

	    //delete an item from the cart
	    cartList.on('click', '.delete-item', function(event){
	        event.preventDefault();
	        id = $(this).parent().prev().find('.quantity').data('id');
	        jsonStr = localStorage.cardata;
	        jsonStr = jsonStr + "]";
	        jsonStr = jsonStr.replace(/\}{/g, "},{");
	        obj = eval(jsonStr);

	        for (var i = 0; i < obj.length; ++i)
	        {
	            if (obj[i].prodId == id)
	            {
	                delete obj[i].prodId;
	                delete obj[i].prodQuant;
	                delete obj[i].prodName;
	                delete obj[i].prodIsDeleted;
	                delete obj[i].prodImg;
	                delete obj[i].prodcd;
	                break;
	            }
	        }

	        localStorage.cardata = JSON.stringify(obj);
	        localStorage.cardata = localStorage.cardata.slice(0, -1);
	        localStorage.cardata = localStorage.cardata.replace(/\{}/g, "");
	        localStorage.cardata = localStorage.cardata.replace(/\[,{/g, "[{");
	        localStorage.cardata = localStorage.cardata.replace(/\},{/g, "}{");
	        localStorage.cardata = localStorage.cardata.replace(/\},/g, "}");

	        updateCartTotal();

	        $(this).parent().parent().fadeTo("slow", 0.5, function () {
	            $(this).remove();
	        })
	        //removeProduct($(event.target).parents('.product'));
	        //cartList.find('.delete-item').hide();
	    });

	    //update item quantity
	    cartList.on('click', 'a.quickadd', function (event) {
	        event.preventDefault();
	        id = $(this).parent().data('id');
	        val = 1;
	        updateProdQuantity(id, val, "add");

	        toupdate = parseInt($(this).parent().find(".quickamount").val());
	        toupdate = toupdate + parseInt(val);
	        $(this).parent().find(".quickamount").val(toupdate);

	        updateCartTotal();
	    });

	    cartList.on('click', 'a.quickdecrease', function (event) {
	        event.preventDefault();
	        id = $(this).parent().data('id');
	        val = 1;
	        updateProdQuantity(id, val, "dec");

	        toupdate = parseInt($(this).parent().find(".quickamount").val());
	        toupdate = toupdate - parseInt(val);
	      

	        if (toupdate < 1) {
	            $(this).parent().parent().next().find('.delete-item').click();
	        }
	        else
	        {
	            $(this).parent().find(".quickamount").val(toupdate);
	        }

	        updateCartTotal();
	    });
        
	    $(".quickamount").change(function () {
	        id = $(this).parent().data('id');
	        updateProdQuantity(id, $(this).val(), "update");
	        if ( parseInt($(this).val()) < 1) {
	            $(this).parent().parent().next().find('.delete-item').click();
	        }
	        updateCartTotal();
	    });
		//reinsert item deleted from the cart
	    undo.on('click', 'a', function (event) {
	        jsonStr = localStorage.cardata;
	        jsonStr = jsonStr + "]";
	        jsonStr = jsonStr.replace(/\}{/g, "},{");
	        obj = eval(jsonStr);

	        for (var i = 0; i < obj.length; ++i) {
	            if (obj[i].prodIsDeleted == '1') {
	                obj[i].prodIsDeleted = '0';
	                break;
	            }
	        }

	        localStorage.cardata = JSON.stringify(obj);
	        localStorage.cardata = localStorage.cardata.slice(0, -1);
	        localStorage.cardata = localStorage.cardata.replace(/\},{/g, "}{");

			clearInterval(undoTimeoutId);
			event.preventDefault();
			cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			    $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');

			
				updateCartTotal();
			});
			undo.removeClass('visible');
	    });

	    clearAll.on('click', 'a', function (event) {
	        event.preventDefault();
	        localStorage.cardata = "[";

	        updateCartCount();
	        updateCartItems();
	        updateCartTotal();
	        cartList.empty();
	        $("#nocartItem").show();
	        $("#SubmitForm").hide();
	        cartTrigger.click();
	    });
	   
	}

	function updateCartItems()
	{
	    jsonStr = localStorage.cardata;
	    jsonStr = jsonStr + "]";
	    jsonStr = jsonStr.replace(/\}{/g, "},{");
	    obj = eval(jsonStr);

	    for (var i = 0; i < obj.length; ++i)
	    {
	        //var productAdded = $('<li class="product"><div class="product-image"><a href="#0"><img src="' + obj[i].prodImg + '" alt="placeholder" style="width:90px"></a></div><div class="product-details"><h3><a href="#0">' + obj[i].prodName + '</a></h3><span class="price">' + obj[i].prodQuant + '</span><div class="actions"><a href="#" class="delete-item">Delete</a><div class="quantity" data-id=' + obj[i].prodId + '><a href="#" class="quickdecrease"><i class="glyphicon glyphicon-minus-sign"></i></a><input type="number" class="quickamount" value="1" required/><a href="#" class="quickadd"><i class="glyphicon glyphicon-plus-sign"></i></a></div></div></div></li>');
	        var productAdded = $('<tr><td><a href="/ProductList/ViewProduct_Pre?Cd=' + obj[i].prodcd + '"><img src="' + obj[i].prodImg + '" alt="placeholder" style="width:90px"></a></td><td><a style="color:black" href="/ProductList/ViewProduct_Pre?Cd=' + obj[i].prodcd + '">' + obj[i].prodId + '</a></td><td><a style="color:black" href="/ProductList/ViewProduct_Pre?Cd=' + obj[i].prodcd + '">' + obj[i].prodName + '</a></td><td><div class="quantity" data-id=' + obj[i].prodId + '><a href="#" class="quickdecrease"><i class="glyphicon glyphicon-minus-sign"></i></a><input type="number" class="quickamount" value="' + obj[i].prodQuant + '" required /><a href="#" class="quickadd"><i class="glyphicon glyphicon-plus-sign"></i></a></div></td><td><a href="#" class="delete-item"><i class="glyphicon glyphicon-remove-sign"></i></a> </td></tr>');
	        /*<tr>
                <td>
                    <img src="' + obj[i].prodImg + '" alt="placeholder" style="width:90px">
                </td>    
                <td>
                    '+ obj[i].prodId +'
                </td>
                <td>
                    '+ obj[i].prodName +'
                </td>
                <td>
                    <div class="quantity" data-id=' + obj[i].prodId + '>
                        <a href="#" class="quickdecrease"><i class="glyphicon glyphicon-minus-sign"></i></a>
                        <input type="number" class="quickamount" value="1" required />
                        <a href="#" class="quickadd"><i class="glyphicon glyphicon-plus-sign"></i></a>
                    </div>
                </td>
                <td>
                    <a href="#" class="delete-item">Delete</a> 
                </td>
            </tr>*/
	        cartList.prepend(productAdded);
        }
	}

	function updateProdQuantity(id, amount, type)
	{
	    jsonStr = localStorage.cardata;
	    jsonStr = jsonStr + "]";
	    jsonStr = jsonStr.replace(/\}{/g, "},{");
	    obj = eval(jsonStr);

	    for (var i = 0; i < obj.length; ++i)
	    {
	        if (obj[i].prodId == id)
	        {
	            if (type == "add")
	            {
	                obj[i].prodQuant = parseInt(obj[i].prodQuant) + parseInt(amount);
	                obj[i].prodIsDeleted = '0';
	                break;
	            }
	            else if( type=="dec")
	            {
	                obj[i].prodQuant = parseInt(obj[i].prodQuant) - parseInt(amount);
	                break;
	            }
	            else if (type == "update")
	            {
	                obj[i].prodQuant = parseInt(amount);
	                break;
	            }
	         
	        }
	    }
	    localStorage.cardata = JSON.stringify(obj);
	    localStorage.cardata = localStorage.cardata.slice(0, -1);
	    localStorage.cardata = localStorage.cardata.replace(/\},{/g, "}{");
	}

	function checkProdOnCart (id)
	{
	    jsonStr = localStorage.cardata;
	    jsonStr = jsonStr + "]";
	    jsonStr = jsonStr.replace(/\}{/g, "},{");
	    obj = eval(jsonStr);
	    retval = 1;
	    if (obj.length == 0) {
	        retval = 1;
	    }
	    else 
	    {
	        for (var i = 0; i < obj.length; ++i)
	        {
	            if (obj[i].prodId == id) {
	                retval = 0;
	                break;
	            }
	           
	        }
	    }

	    return retval;

	}

	function toggleCart(bool) {
		var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
		
		updateCartCount();

		if( cartIsOpen ) {
			cartWrapper.removeClass('cart-open');
			//reset undo
			clearInterval(undoTimeoutId);
			undo.removeClass('visible');
			cartList.find('.deleted').remove();

			setTimeout(function(){
				cartBody.scrollTop(0);
				//check if cart empty to hide it
				if( Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
			}, 500);
		} else {
			cartWrapper.addClass('cart-open');
		}
	}

	function addToCart(trigger) {
		cartWrapper.removeClass('empty');
	}

	function removeProduct(product) {
		//clearInterval(undoTimeoutId);
		//cartList.find('.deleted').remove();

		//var topPosition = product.offset().top - cartBody.children('ul').offset().top ,
		//	productQuantity = Number(product.find('.product_details').find('span').text()),
		//	productTotPrice = Number(product.find('.price').text()) * productQuantity;
		
		//product.css('top', topPosition+'px').addClass('deleted');

		//update items count + total price
		updateCartTotal();

		jsonStr = localStorage.cardata;
		jsonStr = jsonStr + "]";
		jsonStr = jsonStr.replace(/\}{/g, "},{");
		obj = eval(jsonStr);

		for (var i = 0; i < obj.length; ++i) {
		    if (obj[i].prodIsDeleted == '1') {
		        delete obj[i].prodId;
		        delete obj[i].prodQuant;
		        delete obj[i].prodName;
		        delete obj[i].prodIsDeleted;
		        delete obj[i].prodImg;
		    }
		}

		localStorage.cardata = JSON.stringify(obj);
		localStorage.cardata = localStorage.cardata.slice(0, -1);

		localStorage.cardata = localStorage.cardata.replace(/\{}/g, "");
		localStorage.cardata = localStorage.cardata.replace(/\[,{/g, "[{");
		localStorage.cardata = localStorage.cardata.replace(/\},{/g, "}{");
		localStorage.cardata = localStorage.cardata.replace(/\},/g, "}");
		//updateCartCount(true, -productQuantity);
		//undo.addClass('visible');

		//wait .0001 sec before completely remove the item
		//undoTimeoutId = setTimeout(function(){
			//undo.removeClass('visible');
			//cartList.find('.deleted').remove();

			
			//cartList.find('.delete-item').show();
	    //}, 1);
	}

	function quickUpdateCart() {
		var quantity = 0;
		var price = 0;
		
		cartList.children('li:not(.deleted)').each(function(){
			var singleQuantity = Number($(this).find('select').val());
			quantity = quantity + singleQuantity;
			price = price + singleQuantity*Number($(this).find('.price').text());
		});

		cartTotal.text(price);
	}

    //count outside
	function updateCartCount() {

	    jsonStr = localStorage.cardata;
	    jsonStr = jsonStr + "]";
	    jsonStr = jsonStr.replace(/\}{/g, "},{");
	    obj = eval(jsonStr);
        
	    cartCount.find('li').eq(0).text(obj.length);
	    cartCount.find('li').eq(1).text(obj.length + 1);

		
	}

    //total inside
	function updateCartTotal() {
	    jsonStr = localStorage.cardata;
	    jsonStr = jsonStr + "]";
	    jsonStr = jsonStr.replace(/\}{/g, "},{");
	    obj = eval(jsonStr);

	    retval = 0;

	    for (var i = 0; i < obj.length; i++) {
	        if (obj[i].prodIsDeleted == '0') {
	            retval = retval + parseInt(obj[i].prodQuant);

	        }
	    }
	    $('#navTotal').text(retval)
	    cartTotal.text(retval);

	}
});

