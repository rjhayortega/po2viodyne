$(document).ready(function () {
    //$('#Website_Banner').hide();
    //$('.navbar').hide();
    if (getParameterByName('category') != null )
    {
        $('.categories_container').find("[data-id='" + getParameterByName('category') + "']").click();
       
        $('html, body').animate({
            scrollTop: $("#Product_Categories_Container").offset().top
        }, 1000);
    }

    $.ajax({
        url: "/HomePage/GetFooterLinksHTML",
        async: false,
        success: function (result) {
            
            $("#footer_Links").html(result);
        },  
    });

    $.ajax({
        url: "/HomePage/GetMenuLinksHTML",
        async: false,
        success: function (result) {

            $("#ulnav").html(result);
        },
    });

    $.ajax({
        url: "/HomePage/GetMobileMenuLinksHTML",
        async: false,
        success: function (result) {

            $("#mobile_ulnav").html(result);
        },
    });

    

    $('#showProducts').hide();


    $('.Categories').click(function (e) {
        e.preventDefault();
      
      
            $("#showProducts").slideUp(300);
       
        
            $.ajax({
                url: "/ProductList/Fn_ProductsGet",
                data: { Cat: $(this).data('id') },
                async: false,
                success: function (result) {

                    $("#showProducts").html(result);
                },
            });

            $('#showProducts').slideDown(300);
      

    });

  

    $('#searchTxt').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#searchBtn').click();
            return false;
        }
    });
    
    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
   
  
});

(function ($) {
    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    }
})(jQuery);