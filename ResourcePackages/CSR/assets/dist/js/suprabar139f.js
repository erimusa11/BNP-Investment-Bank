(function ($) {

    // Functions for opening and closing the curtain element
    function closeCurtain() {
        $('body').removeClass('overlay');
        $('.supra-content').each(function(){
            $(this).removeClass('active');
        });
        $('.supra-links a').removeClass('active');
        $('.modal-containers li').removeClass('active');

        $('.search-btn-dt').removeClass('focused');
        $('.sfsearchBox').removeClass('focused');
        $('.sfsearchBox').removeClass('container-12');
        $('.sfsearchTxt').removeAttr('placeholder');
    }
    function showCurtain(obj) {
        $('body').addClass('overlay');
        var relatedLinks = obj.data('target');
        obj.addClass('active');

        $('.' + relatedLinks).addClass('active');
    }
    function showCurtainStatic() {
        $('body').addClass('overlay');
    }

    // Creating the behavior of the curtain element
    $('.supra-links a').on('click', function() {
        var selectedLink = $(this);

        if(!$('body').hasClass('overlay')) {
            showCurtain($(this));
        }
        else if(selectedLink.hasClass('active')) {
            closeCurtain();
        }
        else if($('.supra-links a').hasClass('active') || $('.search-btn-dt').hasClass('focused')) {
            closeCurtain();
            showCurtain(selectedLink);
        }
        else {
            closeCurtain();
        }
    });

    $('.curtain, .modal-containers, .modal-containers li, .supra-box').on('click', function(e){
        if($(e.target).is($(this))) {
            closeCurtain();
        }
    });

    $('.search-btn-dt').on('click', function(){

        if(!$(this).hasClass('focused') || $('.supra-links a').hasClass('active')) {
            closeCurtain();

            $(this).addClass('focused');
            $('.sfsearchBox').addClass('focused');
            $('.sfsearchBox').addClass('container-12');
            $('.sfsearchTxt').attr('placeholder', 'Can we help you ?');
            showCurtainStatic();
            var searchbox = $('.k-input');
            searchbox.focus();
            searchbox.scrollIntoView();
        }
        else {
            closeCurtain();
        }

        if(!$('.sfsearchSubmit').hasClass('streched')) {

            var btnText = $('.sfsearchSubmit').val().length;

            if(btnText > 6) {
                var btnWidth = (btnText*10) + 70 + "px";

                $('.sfsearchSubmit').each(function(){$(this).css('width', btnWidth);});
                $('.sfsearchSubmit').addClass('streched');
            }
        }
    });
}(jQuery));