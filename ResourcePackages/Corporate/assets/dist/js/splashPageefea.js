(function ($) {

        var currentDropdown = "";
        $('.language-preselect__dropdown').click(function (e) {
            e.stopPropagation();
            if  ($('.language-preselect__dropdown').hasClass('open')){
                $('.open').removeClass('open');
                if(currentDropdown ==  $(this).attr('id')) {
                    $('.open').removeClass('open');
                }else{
                    $(this).addClass('open');
                }
            } else{
                $(this).addClass('open');
            }
            currentDropdown = $(this).attr('id');
        });
        $(document).click(function() {
            $('.open').removeClass('open');
        });
        $('.language-preselect__btn').click(function (e) {
            var value = $(this).data('value');
            SetCookiePreselectedLanguage(value);
        });


}(jQuery));