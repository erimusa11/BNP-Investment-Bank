// var noConflictjQuery = jQuery.noConflict();
(function ($) {
    $(function () {
        'use strict';

        var BNPtoolbox = {

            // ========= PUBLIC ==========
            // ===========================

            // One time initialization
            initialize: function initialize() {
                if (!this.isInitialized) {
                    var that = this;

                    this.setInitVariable();
                    this.setMacOsState();
                    this.setMobileState();
                    this.setBelowSMstate();
                    this.initScroll();
                    this.initAccordionFooter();
                    this.slideTimeLine();
                    this.bindShareButton();
                    this.navigationHeaderSticky();
                    this.openSearchInput();
                    if (this.body.hasClass("podcast-page")) {
                        this.playerPodcast();
                    }
                    if (this.body.hasClass("new-podcast")) {
                        this.playerPlyr();
                    }
                    this.magnificPopup();
                    this.openShareBox();
                    this.bindCopyLink();
                    this.closeCopyLink();
                    this.podcastLinkUrl();
                    this.copyLinkUrl();
                    this.transformUrlPodcast();
                    this.socialWallMasonry();
                    this.socialWallLimitheight();

                    // Language selection related
                    this.bindLanguageSelection();

                    // Content Navbar (article detail related)
                    this.bindContentNavbar();

                    // Sidebar content
                    if(this.body.hasClass("page-detail"))  {
                        this.bindSideBarSticky();
                    }

                    //Card List related
                    if(this.cards) {
                        this.bindCardList();
                    }

                    // If there is a filter box build it (move it in the dom)
                    // if(this.filterBox.length > 0) {
                    //     this.buildFilterBox();
                    // }

                    // If there is a filter event box build it (move it in the dom)
                    // if(this.desktopEventTypes.length > 0) {
                    //     this.buildDesktopEventTypes();
                    // }

                    // Specific method for page-list
                    // Page that display content list, and possibility to switch between card / list view
                    if(this.body.hasClass("page-list") || this.body.hasClass("page-search")) {
                        this.currentViewType = "card";

                        // Bind button
                        //this.bindButtonViewType();

                        $("#ul-brands li span, #ul-categories li span").click(function() {
                            //console.log("NEW SEARCH (OFF) - filter brands/categories");
                            //***ELIMINATE DOUBLE EVENT
                            /*
                             $(this).parent().toggleClass('selected');
                            that.newSearch({
                                displayType: that.currentViewType
                            });*/
                        });

                        $("#filter-documents, #filter-images,#filter-videos").click(function () {
                            //console.log("NEW SEARCH (OFF) - documents/images/videos");
                            /*that.newSearch({
                                displayType: that.currentViewType
                            });*/
                        });

                        $("#filter-year").bind("change", function () {
                            //console.log("NEW SEARCH (OFF) - filter year");
                            /*that.newSearch({
                                displayType: that.currentViewType
                            });*/
                        });
                        // Bind card list loader
                        //this.cardListScrollBind();
                    }

                    if (this.body.hasClass("page-search")) {
                        //console.log("NEW SEARCH (ON) - page-search");
                        if (this.body.hasClass("no-search")) {
                            that.newSearch({
                                displayType: that.currentViewType
                            });
                        }
                    }

                    // Specific method for page-event
                    if(this.body.hasClass("page-event")) {
                        this.getEvents(this.asyncAnchorNav);
                    }

                    // Specific method for page-detail
                    if(this.body.hasClass("page-detail")) {
                        this.buildSidebarContentDetail();
                    }


                    // Galery List related
                    if(this.galeryList.length > 0) {
                        this.bindGaleryList();
                    }

                    // Content Box List Social Related
                    if(this.contentBoxListSocial.length > 0) {
                        this.addLinkToSocialBoxContent();
                    }

                    // Bind selector sharer plugins
                    if($('.article-body').length > 0) {
                        this.bindSelectorSharer();
                    }
                }
            },

            // ========= PRIVATE =========
            // ===========================

            // General variables, NOT page specific
            setInitVariable: function setInitVariable() {
                this.scrollList = [];
                // States
                this.isInitialized = true;
                this.isMobile = false;
                this.isMac = false;
                this.isBelowSM = false;
                this.isBelowMd = false;
                this.isIos = false;
                // Enquire media queries
                this.mqMobile = 'screen and (max-width: 991px)';
                this.mqDesktop = 'screen and (min-width: 992px)';
                this.mqBelowSm = 'screen and (max-width: 767px)';
                this.mqBelowMd = 'screen and (max-width: 991px)';
                this.mqBelowLg = 'screen and (max-width: 1159px)';
                this.mqSm = 'screen and (min-width: 768px)';
                this.mqMd = 'screen and (min-width: 768px) and (max-width: 1999px)';
                this.mqLg = 'screen and (min-width: 1160px)';
                this.mqMdPortrait = 'screen and (min-width: 768px) and (max-width: 1999px) and (orientation: portrait)';
                this.mqMdLandscape = 'screen and (min-width: 768px) and (max-width: 1999px) and (orientation: landscape)';
                // jQuery selections
                this.body = $('body');
                this.html = $('html');
                this.siteContainer = $('.global-container');
                this.contentContainer = $('.global-content');
                // Language selector
                this.languageSelectionButton = $('#languageSelectionButton');
                this.languageSelection = $('#languageSelection');
                this.languageSelectionState = false;
                // Card list
                this.cards = $('.card, .card--highlighted');
                // Popup Galery
                this.galeryList = $('.galery-list');
                // formNewsletter
                this.formNewsletter = $('#formNewsletter');
                // content-box-list--social
                this.contentBoxListSocial = $('.content-box-list--social');
                // Current Language
                this.currentLanguage = this.html.attr('lang');
                // Current search index
                this.contentList = $("#contentList");
                this.currentStartSearchIndex = 0;
                // Filter list
                this.filterBox = $("#filterBox");
                // Desktop-event-types
                this.desktopEventTypes = $(".desktop-event-types");
                // this.vueInstance = new Vue();
            },
            // Store OS state
            setMacOsState: function setMacOsState() {
                if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
                    this.isMac = true;
                } else {
                    this.isMac = false;
                }
            },
            // Store mobile state on breakpoint change
            setMobileState: function setMobileState() {
                var that = this;
                that.mqHandlerSetMobileState = {
                    match: function () {
                        that.isMobile = true;
                    },
                    unmatch: function () {
                        that.isMobile = false;
                    }
                };
                enquire.register(that.mqMobile, that.mqHandlerSetMobileState);
            },
            // Store mobile only (below tablet/SM breakpoint) state on breakpoint change
            setBelowSMstate: function setBelowSMstate() {
                var that = this;
                that.mqHandlerSetBelowSMstate = {
                    match: function () {
                        that.isBelowSM = true;
                    },
                    unmatch: function () {
                        that.isBelowSM = false;
                    }
                };
                enquire.register(that.mqBelowSm, that.mqHandlerSetBelowSMstate);
            },
            // Store mobile state on breakpoint change
            setBelowMDstate: function setBelowMDstate() {
                var that = this;
                that.mqHandlerSetMobileState = {
                    match: function () {
                        that.isBelowMD = true;
                    },
                    unmatch: function () {
                        that.isBelowMD = false;
                    }
                };
                enquire.register(that.mqBelowMd, that.mqHandlerSetMobileState);
            },

            initAccordionFooter: function initAccordionFooter() {
                var that = this;

                that.mqHandleFooterMobile = {
                    match: function() {
                        $(".main-footer__link .sf_colsIn").accordion({
                            collapsible: true,
                            active: 1
                        });
                        $(".main-footer__link .sf_4cols_1_25 .sf_colsIn").accordion({
                            collapsible: true,
                            active: 0
                        });
                        $(".main-footer__link .sf_4cols_2_25 .sf_colsIn").accordion({
                            collapsible: true,
                            active: 1
                        });
                        $(".main-footer__link .sf_4cols_3_25 .sf_colsIn").accordion({
                            collapsible: true,
                            active: 1
                        });
                        $(".main-footer__link .sf_4cols_4_25 .sf_colsIn").accordion("destroy");
                    },
                    unmatch: function() {
                        $(".main-footer__link .sf_colsIn").accordion({
                            collapsible: true,
                            active: 1
                        });
                        $(".main-footer__link .sf_4cols_1_25 .sf_colsIn").accordion("destroy");
                        $(".main-footer__link .sf_4cols_2_25 .sf_colsIn").accordion("destroy");
                        $(".main-footer__link .sf_4cols_3_25 .sf_colsIn").accordion("destroy");
                        $(".main-footer__link .sf_4cols_4_25 .sf_colsIn").accordion("destroy");
                    }
                };
                enquire.register(that.mqMobile, that.mqHandleFooterMobile);
            },
            // Create scroll function that will run functions added
            // to scroll list later on
            initScroll: function initScroll() {
                var that = this;
                $(window).scroll(function () {
                    var totalFunc = that.scrollList.length;
                    for (var i = 0; i < totalFunc; i++) {
                        that.scrollList[i].call(that);
                    }
                });
            },
            addToScroll: function addToScroll(fn) {
                if (fn) {
                    // console.log('adding...');
                    // console.log(fn);
                    // console.log('...to scroll list');
                    this.scrollList.push(fn);
                    // console.log(this.scrollList);
                }
            },
            removeFromScroll: function removeFromScroll(fn) {
                // console.log(':: removeFromScroll');
                var index = this.scrollList.indexOf(fn);
                if (index > -1) {
                    // console.log('fn found => removing it');
                    this.scrollList.splice(index, 1);
                }
                // console.log(this.scrollList);
            },
            socialWallMasonry: function socialWallMasonry() {
                if (this.body.hasClass('page-social-wall')) {
                    $('.content-box-list--social').masonry({
                    // options
                        itemSelector: '.content-box--social',
                        gutter: 15
                    });
                }
            },
            socialWallLimitheight: function socialWallLimitheight() {
                $('.social-content__text').each(function() {
                    if ($(this).height() > 120) {
                        var fiveLines = $(this).height(120);
                        $(this).addClass('more-points');
                    }
                })
                setTimeout(function() {
                    $('.more-points').each(function() {
                        var fithSentence = $(this).find('.line').eq(4).text();
                        var splitResult = fithSentence.split(" ");
                        fithSentence = fithSentence.split(" ").slice(0, -1).join(" ");
                        $(this).find('.line').eq(4).text(fithSentence);
                    })
                }, 2000);
            },
            /**
             * [bindCardList Bind event on card list]
             * To allow click on the entire card (not only on link), copy link URL and open item on click.
             */
            bindCardList: function bindCardList() {
                var that = this;

                var cards = $('.card, .card--highlighted');

                cards.unbind("click.card");
                // Bind click on each .card--bonus
                cards.bind("click.card", function (e) {

                    // Save target variable
                    var target = e.target,
                        targetType = target.tagName.toLowerCase();

                    // If click target is not a link item
                    if ($(e.target).closest('a').length === 0) {

                        // Save and find related url
                        var cardLink = $(this).find(".card__read-more"),
                            cardUrl = cardLink.attr('href'),
                            targetType = cardLink.attr('target');

                        var keyPressed = key.getPressedKeyCodes();

                        // If click button is the middle mouse open new location in new tab
                        // OR
                        // If key CMD ([91]) (on mac) is pressed during click
                        // If key CTRL ([17]) (on other os) is pressed during click
                        if (e.which === 2 || keyPressed.indexOf("91") >= 0 && that.isMac || keyPressed.indexOf("17") >= 0 && that.isMac === false || targetType === '_blank') {

                            var newWindow = window.open(cardUrl, '_blank');
                            // Secure window.open
                            newWindow.opener = null;

                            // // Else act normaly
                        } else {
                            // Move to new url
                            window.location = cardUrl;
                        }
                    }
                });
            },
            openShareBox: function openShareBox() {

                var linkShare = $('.open-share__box');
                

                $(linkShare).bind('click', function(){
                    var that = this;
                    if($('.share__box').hasClass('share__box-show')) {
                        if ( $(that).next('.share__box').hasClass('share__box-show')) {
                            $(that).next('.share__box').removeClass('share__box-show').removeClass('share__box-move');
                            //for the url podcast
                            $('.podcast__copylink').removeClass('podcast__copylink-show');
                            setTimeout(function(){ 
                                $('.share__box-move').removeClass('width-for-copylink');
                            }, 300);
                            
                                             }  
                        else {
                            $('.share__box').removeClass('share__box-show').removeClass('share__box-move');
                            //for the url podcast
                            $('.podcast__copylink').removeClass('podcast__copylink-show');
                            setTimeout(function(){ 
                                $('.share__box-move').removeClass('width-for-copylink');
                            }, 300);
                            setTimeout(function(){ 
                                $(that).next('.share__box').addClass('share__box-show');
                                setTimeout(function(){ 
                                    $(that).next('.share__box').addClass('share__box-move');
                                }, 10);
                            },5);
                        }
                    } else {
                        setTimeout(function(){ 
                            $(that).next('.share__box').addClass('share__box-show');
                        }, 5);
                        setTimeout(function(){ 
                            $(that).next('.share__box').addClass('share__box-move');
                        }, 100);
                    }
                });

                $(document).on('click', function(event) {
                    if (!$(event.target).closest('.podcast__header').length && !$(event.target).closest('.podcast__header-share').length && !$(event.target).closest('.share__box').length && !$(event.target).closest('.podcast__icons-list').length && !$(event.target).closest('.headerShare').length && !$(event.target).closest('.headerShare__link').length)  {
                        $('.share__box').removeClass('share__box-show').removeClass('share__box-move');
                        //for the url podcast
                        $('.podcast__copylink').removeClass('podcast__copylink-show');
                        setTimeout(function(){ 
                            $('.share__box').removeClass('width-for-copylink');
                        }, 300);
                    }
                });
            },

            playerPodcast: function playerPodcast() {

                var audio_widgets = $("audio");
                if(audio_widgets.mediaelementplayer) {

                    $('audio').each(function(){
                        var that = this;

                        $(that).mediaelementplayer({
                            features: ['playpause', 'current', 'progress', 'duration'],
                            success: function (mediaElement, domObject) {
                                mediaElement.setVolume(1.0);
                                mediaElement.load();
                            }
                        });
                    });
                }
            },

            playerPlyr: function playerPlyr(){
                // Change "{}" to your options:
                // https://github.com/sampotts/plyr/#options
                const players = Array.from(document.querySelectorAll('.js-player')).map(p => new Plyr(p));

                // Expose player so it can be used from the console
                window.player = players;
            },

            magnificPopup: function magnificPopup() {
                $(document).ready(function () {
                    if (typeof magnificPopup != "undefined") {
                        $('.play-youtube').magnificPopup({
                            disableOn: 700,
                            type: 'iframe',
                            mainClass: 'mfp-fade',
                            removalDelay: 160,
                            preloader: false,

                            fixedContentPos: false,
                            iframe: {
                                markup: '<div class="mfp-iframe-scaler">' +
                                    '<div class="mfp-close"></div>' +
                                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                                patterns: {
                                    youtube: {
                                        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                                        id: 'v=', // String that splits URL in a two parts, second part should be %id%
                                        // Or null - full URL will be returned
                                        // Or a function that should return %id%, for example:
                                        // id: function(url) { return 'parsed id'; }

                                        src: '//www.youtube.com/embed/%id%?autoplay=0' // URL that will be set as a source for iframe.
                                    },
                                    vimeo: {
                                        index: 'vimeo.com/',
                                        id: '/',
                                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                                    },
                                    gmaps: {
                                        index: '//maps.google.',
                                        src: '%id%&output=embed'
                                    }

                                },

                                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
                            }
                        });
                    }
                });
            },
           
            bindCopyLink: function bindCopyLink() {
                var buttonOpenLink = $('.share__box-icons-list .icon-external-link');
                var that = this;
                buttonOpenLink.bind('click', function(){
                    setTimeout(function(){ 
                        $('.share__box-move').find('.podcast__copylink').addClass('podcast__copylink-show');
                    }, 50);
                    $('.share__box-move').addClass('width-for-copylink');
                    that.podcastLinkUrl();
                });
            },

            closeCopyLink: function closeCopyLink() {
                var buttonCloseLink = $('.podcast__copylink-close');
                buttonCloseLink.bind('click', function(){
                    $('.share__box-move').find('.podcast__copylink').removeClass('podcast__copylink-show');
                    setTimeout(function(){ 
                        $('.share__box-move').removeClass('width-for-copylink');
                    }, 300);
                });
            },

            podcastLinkUrl: function podcastLinkUrl() {
                var inputUrlPodcast = $('.share__box-move').find('.podcast__copylink-input');
                var urlPodcastList = $(inputUrlPodcast).parents('.podcast__list-item').find('audio').attr('src');
                var locationUrl = window.location.host;
                var locationProtocol = window.location.protocol + '//';
                var newUrlPodcastList = urlPodcastList


                var urlPodcastDetail = window.location.href;
                if ($('.media-wrapper').hasClass('list')) {
                    inputUrlPodcast.val(newUrlPodcastList);
                } 
                if ($('.media-wrapper').hasClass('detail')) {
                    inputUrlPodcast.val(urlPodcastDetail);
                } 
            },

            copyLinkUrl: function copyLinkUrl() {
                var submitUrl = $('.podcast__copylink-submit');

                submitUrl.click(function() {
                    var that = this;
                    var $input = $(that).prev();
                    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                        var el = $input.get(0);
                        var editable = el.contentEditable;
                        var readOnly = el.readOnly;
                        el.contentEditable = true;
                        el.readOnly = false;
                        var range = document.createRange();
                        range.selectNodeContents(el);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                        el.setSelectionRange(0, 999999);
                        el.contentEditable = editable;
                        el.readOnly = readOnly;
                    } else {
                        $input.select();
                    }
                    document.execCommand('copy');
                    $input.blur();
                });
            },
            transformUrlPodcast: function transformUrlPodcast() {
          
                // $('audio').each(function(){
                //     var that = this;
                //     var completeUrl = $(that).attr('src');
                //     var locationUrl = window.location.host;
                //     var locationProtocol = window.location.protocol + '//';
                //     var newUrl = $(that).attr('src').replace(locationUrl, '').replace(locationProtocol, '');
                //     $(that).attr('src', newUrl);

                // });
            },
            /**
             * [bindLanguageSelection Bind event on language selector]
             */
            bindLanguageSelection: function bindLanguageSelection() {
                var that = this;

                that.languageSelectionButton.bind('click', function(e){
                    e.preventDefault();

                    if(that.languageSelectionState === false){
                        //for new header
                        that.languageSelection.addClass('language-selection--open');
                        that.languageSelectionState = true;
                    } else {
                        that.languageSelection.removeClass('language-selection--open');
                        that.languageSelectionState = false;
                    }

                    $(document).bind('click', function(e) {
                        if (!$(e.target).closest('#languageSelection .language-list').length && !$(e.target).closest('#languageSelection .language-selected').length) {
                            that.languageSelection.removeClass('language-selection--open');
                            that.languageSelectionState = false;
                        }
                    });
                });

                //for new header 
                $(".header .clickable_lng").click(function(e) {
                    e.stopPropagation();
                    $(".lng_change").toggleClass("open");
                    if ($(".lng_change").attr("aria-expanded") === "true") {
                        $(".lng_change").attr("aria-expanded", false)
                    } else {
                        $(".lng_change").attr("aria-expanded", true)
                    }
                    
                })

                $(document).on('click', function(event) {
                    if (!$(event.target).closest('.lng_change').length) {
                        $(".lng_change").removeClass("open");
                    }
                });

            },

            openSearchInput: function openSearchInput() {
                $(".sfsearchSubmit").click(function(e) {
                    if (!$('.k-widget').hasClass('open-input')) {
                        $('.k-widget').addClass('open-input');
                       
                    }
                    
                });

                $(document).on('click', function(event) {
                    if (!$(event.target).closest('.k-widget').length) {
                        setTimeout(function(){ 
                            $(".k-widget").removeClass("open-input");
                        }, 300);   
                    }
                });
            },
            navigationHeaderSticky: function navigationHeaderSticky() {
                var didScroll;
                var lastScrollTop = 0;
                var delta = 5;
                var navbarHeight = 100;
                var scrollPos = 0;
                
                $(window).scroll(function(event) {
                    didScroll = true;
                    // if ($(".navigation_control").hasClass("menu-show")) {
                    //     $(".navigation_control").removeClass("menu-show")
                    // }
                    var st = $(window).scrollTop();
                    if (Math.abs(lastScrollTop - st) <= delta) {
                        return
                        // $('.shareButtonsTariff').show();
                    }
                    if (st > navbarHeight) {
                        $("body").addClass("nav-up")
                        
                    } else {
                        if (st + $(window).height() < $(document).height()) {
                            if (st < 120) {
                                $("body").removeClass("nav-up");
                            } 
                        }
                    }
                    lastScrollTop = st
                })
            },
            /**
             * [bindContentNavbar Set content-navbar sticky behavior]
             */
            bindContentNavbar: function bindContentNavbar() {
                var contentNavbar = $('#contentNavbar'),
                    mainFooter = $('#mainFooter'),
                    footerHeight = mainFooter.height(),
                    contentNavbarHeight = contentNavbar.height();

                // If contentNavbar is present on page
                if(contentNavbar.length > 0) {

                    $('#contentNavbar').addClass('stuck');

                    var stickyContentNavbar = new Waypoint.Sticky({
                      element: contentNavbar[0],
                      direction: 'up right',
                      offset: function() {
                        var windowHeight = $(window).innerHeight();
                        return windowHeight - footerHeight + contentNavbarHeight;
                      }
                    });
                }
            },
            /**
             * [bindGaleryList Init gallery-list]
             * Gallery list use the jquery plugin Magnific Popup
             * url: http://dimsemenov.com/plugins/magnific-popup/documentation.html
             */
            bindGaleryList: function bindGaleryList() {
                //console.log("Bind Gallery List (OFF)");
                /*
                $('.galery-list__item').magnificPopup({
                    type:'image',
                    gallery:{
                        enabled:true
                    }
                });*/
            },
            // DATE CHANGE
            slideTimeLine: function slideTimeLine() {

                var monthWidth = $(".slider ul li").outerWidth();
                 var position;
                 var newPosition;
                 var positionMin =-($(".slider ul li").length-11)*$(".slider ul li").outerWidth()+$("a.left").outerWidth()+$(".current-year").outerWidth()+$(".slider ul li").outerWidth();
                 var positionMax = $("a.left").outerWidth();
                 var i;
                 var posLeftYear;
                 var posLeftCurrentYear;
                 var posTopYear;
                 var posTopCurrentYear;

                 /** initialize position **/
                 var currentYear = new Date().getFullYear();
                 var currentMonth =  "0" + new Date().getMonth();
                 var currentMonthLi = $("li[data-month='"+currentMonth+"'][data-year='"+currentYear+"']");
                 var nthChildCurrentMonth = $(currentMonthLi).index()+1;
                 var initialPosition = -($(".slider ul li").outerWidth() * nthChildCurrentMonth) + $("a.left").outerWidth()+$(".current-year").outerWidth();

                 $(".slider ul").css("left",initialPosition);

                 $("a.left").click(function(){
                     position = parseInt($(".slider ul").css("left"));
                     goRight(position);
                     getYear();
                 });
                 $("a.right").click(function(){
                     position = parseInt($(".slider ul").css("left"));
                     goLeft(position);
                     getYear();
                 });

                 function goLeft(position){
                     newPosition = position-monthWidth;

                     if(newPosition<=positionMin){
                         $(".slider ul").css("left",positionMin);
                     }
                     else{
                          $(".slider ul").css("left",newPosition);
                     }
                 }

                 function goRight(position){
                   newPosition = position+monthWidth;

                   if(newPosition>=positionMax){
                       $(".slider ul").css("left",positionMax);
                   }
                   else{
                       $(".slider ul").css("left",newPosition);
                   }
                 }

                function getYear(){
                   posLeftCurrentYear = $(".current-year").offset().left;
                   posTopCurrentYear = $(".current-year").offset().top;

                   for(i=1; i<$(".slider ul li").length; i++){
                     posLeftYear = $(".slider ul li:nth-child("+i+")").offset().left;
                     posTopYear = $(".slider ul li:nth-child("+i+")").offset().top;

                     if(posLeftYear==posLeftCurrentYear && posTopYear==posTopCurrentYear){
                         var newCurrentYear = $(".slider ul li:nth-child("+i+")").attr("data-year");
                         $(".current-year").text(newCurrentYear);
                     }
                   }
                }
            },
            // /**
            //  * [getHandlebarsTemplateAjax Load external handlebar templates using ajax]
            //  * @param  {[type]}   path     [Template path]
            //  * @param  {Function} callback [Callback to execute after load finish]
            //  */
            // getHandlebarsTemplateAjax: function getHandlebarsTemplateAjax(path, callback) {
            //     var source;
            //     var template;

            //     $.ajax({
            //         url: path,
            //         dataType: 'html',
            //         success: function(data) {
            //           source    = data;
            //           template  = Handlebars.compile(source);

            //           //execute the callback if passed
            //           if (callback) callback(template);
            //         }
            //     });
            // },
            // /**
            //  * [loadHandlebarsTemplatesListContent Preload all external handlebars templates related to content-list (card / list templates)]
            //  */
            // loadHandlebarsTemplatesListContent: function loadHandlebarsTemplatesListContent() {
            //     var that = this;

            //     // Load list templates
            //     that.getHandlebarsTemplateAjax('/ResourcePackages/BNPtoolbox/assets/dist/js/templates/list-item.html', function(template) {
            //       // Add template to html
            //       $('body').append(template);
            //     });
            // },
            /**
             * [bindButtonViewType Bind event on button button--view-type]
             * This button are use to switch between result view has Card or List
             */
            bindButtonViewType: function bindButtonViewType() {

                var that = this;

                var buttonCardView = $("#buttonCardView"),
                    buttonListView = $("#buttonListView");

                buttonCardView.bind("click", function(){
                    // If the currentViewType is not card
                    if (that.currentViewType !== "card") {
                        buttonListView.removeClass("active");
                        buttonCardView.addClass("active");
                        // Set current view type to card
                        that.buildCardView();
                    }
                });

                buttonListView.bind("click", function(){
                    // If the currentViewType is not card
                    if (that.currentViewType !== "list") {
                        buttonCardView.removeClass("active");
                        buttonListView.addClass("active");
                        // Set current view type to card
                        that.buildListView();
                    }
                });
            },
            /**
             * [emptyContentList Clear all content inside contentList]
             */
            emptyContentList: function emptyContentList() {
                this.contentList.empty();
            },
            /**
             * [buildCardView Build content view with card layout]
             */
            buildCardView: function buildCardView() {
                var that = this;

                this.currentViewType = "card";

                that.contentList.removeClass("vignette-list");
                that.contentList.addClass("card-list--2-col");

                that.newSearch({
                    displayType: that.currentViewType
                });
            },
            /**
             * [buildListView Build content view with card layout]
             */
            buildListView: function buildListView() {
                var that = this;

                this.currentViewType = "list";

                that.contentList.removeClass("card-list--2-col");
                that.contentList.addClass("vignette-list");

                that.newSearch({
                    displayType: that.currentViewType
                });
            },
            /**
             * [addItemToContentList Add an item to the content list using handlebar]
             */
            addItemToContentList: function addItemToContentList(templateElement, data) {
                var source = templateElement.html(),
                // Template compilation can be skipped if precompiled locally
                template = Handlebars.compile(source),
                newItem = template(data);
                // Add item to container
                this.contentList.append(newItem);
            },
            // Set Search index
            setSearchIndex: function setSearchIndex(searchIndex) {
                $("#indexName").val(searchIndex);
                $(".button-group .button").removeClass("active");
                $("#data-type-" + searchIndex).addClass("active");
                this.newSearch({
                    displayType: this.currentViewType
                });
            },
            /**
             * [newSearch Call webservice for search item]
             * @param  {[string]} displayType [card or list] (default: card)
             * @param  {[boolean]} emptyContent (default: true)
             */
            newSearch: function newSearch(options, callback) {

                //console.log("GET NEW SEARCH (OFF)");

                /*
                var that = this;

                var displayType = (typeof options.displayType === 'undefined') ? "card" : options.displayType;
                var emptyContent = (typeof options.emptyContent === 'undefined') ? true : options.emptyContent;

                var brands = [],
                    categories = [],
                    skip = 0,
                    take = 0;

                // Clean contentList if emptyContent set to true
                if(emptyContent === true) {
                    this.emptyContentList();
                    // skip = $("#skip").val();
                    // take = $("#take").val();
                    skip = 0;

                    // Verify the display type for the
                    if (displayType == "card") {
                        take = 5;
                    }else{
                        take = 10;
                    }

                    // Rebind card scroll list
                    this.cardListScrollBind();
                } else {
                    skip = that.currentStartSearchIndex;
                    take = 4;
                }

                // Get all current brands
                $("#ul-brands li.selected span").each(function () {
                    brands.push($(this).data('id'));
                });

                // Get all current categories
                $("#ul-categories li.selected span").each(function () {
                    categories.push($(this).data('id'));
                });

                // Save Url
                var url = '/restapi/customSearch/' + $("#language").val() + '?IndexName=' + $("#indexName").val() + '&Skip=' + skip + '&Take=' + take;
                url += '&Brands=' + JSON.stringify(brands) + '&Categories=' + JSON.stringify(categories) + '&Year=' + $("#filter-year").val() +
                    '&HasDocs=' + $("#filter-documents").is(":checked") + '&HasImageGalleries=' + $("#filter-images").is(":checked") + '&HasVideos=' + $("#filter-videos").is(":checked");

                console.log(url);

                // Display spinner during the loading
                // Template of the spinner
                var spinnerTpl = '<div id="spinner" class="bnp-spinner"><div class="dot bounce1"></div><div class="dot bounce2"></div><div class="dot bounce3"></div></div>';
                // Create dom element in the contentList using spinnerTpl

                if ($("#spinner").length > 0) {
                    $("#spinner").remove();
                }

                $(spinnerTpl).insertAfter(that.contentList);
                var spinner = $("#spinner");

                // Call ajax
                $.ajax({
                    url: url,
                    type: 'get',
                    contentType: 'application/json',
                    success: function (result) {

                        // Call finish remove spinner from the dom
                        spinner.remove();

                        if(result.SearchResults.Articles.length > 0 || result.SearchResults.PressReleases.length > 0 || result.SearchResults.SearchResults.length > 0 ){
                            // Search results is not empty

                            // Set default template to card
                            var template = $("#handlebar-cardItem");
                            // If displayType = list, set handlebar template to list
                            if(displayType === 'list') {
                                template = $("#handlebar-listItem");
                            }

                            $.each(result.SearchResults.PressReleases, function(i, item) {

                                // Verify if item is highlighted
                                // Only the first item of the list is consider has an highlighted if we empty the list before
                                var isHighlighted = false;

                                if(i === 0 && emptyContent === true) {
                                    isHighlighted  = true
                                }

                                var category = '';
                                if(item.Categories[0] !== undefined) {
                                    category = item.Categories[0].Title;
                                }


                                var titleTwitter = item.Title;

                                if (titleTwitter) {

                                    var nbChar = titleTwitter.length;
                                    if(nbChar > 95) {
                                        titleTwitter = titleTwitter.substr(0, 95);
                                        titleTwitter += '&hellip;';
                                    }
                                }

                                var viaText = '';

                                var language = this.currentLanguage;

                                switch (language) {
                                    case "fr":
                                        viaText = "BNPPFBelgique";
                                        break;
                                    case "nl":
                                        viaText = "BNPPFBelgie";
                                        break;
                                    default:
                                        viaText = "BNPPFBelgie";
                                }

                                var shareUrl = item.Url;

                                // Register all data for handlebar
                                var data = {
                                    viaText: viaText,
                                    titleTwitter: titleTwitter,
                                    title: item.Title,
                                    publicationDate: item.PublicationDate,
                                    description: item.Description,
                                    category: category,
                                    backgroundUrl: item.Thumbnail,
                                    url: shareUrl,
                                    isHighlighted: isHighlighted,
                                    hasDocuments: item.HasDocuments,
                                    hasVideos: item.HasVideos,
                                    hasImageGalleries: item.HasImageGalleries
                                };

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data);
                            });

                            $.each(result.SearchResults.Articles, function(i, item) {

                                // Verify if item is highlighted
                                // Only the first item of the list is consider has an highlighted if we empty the list before
                                var isHighlighted = false;

                                if(i === 0 && emptyContent === true) {
                                    isHighlighted  = true
                                }

                                 var category = '';
                                if(item.Categories[0] !== undefined) {
                                    category = item.Categories[0].Title;
                                }

                                var titleTwitter = item.Title;

                                if (titleTwitter) {

                                    var nbChar = titleTwitter.length;
                                    if(nbChar > 95) {
                                        titleTwitter = titleTwitter.substr(0, 95);
                                        titleTwitter += '&hellip;';
                                    }
                                }

                                var viaText = '';

                                var language = this.currentLanguage;

                                switch (language) {
                                    case "fr":
                                        viaText = "BNPPFBelgique";
                                        break;
                                    case "nl":
                                        viaText = "BNPPFBelgie";
                                        break;
                                    default:
                                        viaText = "BNPPFBelgie";
                                }

                                var shareUrl = item.Url;

                                // Register all data for handlebar
                                var data = {
                                    viaText: viaText,
                                    titleTwitter: titleTwitter,
                                    title: item.Title,
                                    publicationDate: item.PublicationDate,
                                    description: item.Description,
                                    category: category,
                                    backgroundUrl: item.Thumbnail,
                                    url: shareUrl,
                                    isHighlighted: isHighlighted,
                                    hasDocuments: item.HasDocuments,
                                    hasVideos: item.HasVideos,
                                    hasImageGalleries: item.HasImageGalleries
                                };

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data);
                            });

                            $.each(result.SearchResults.SearchResults, function (i, item) {
                                // Verify if item is highlighted
                                // Only the first item of the list is consider has an highlighted if we empty the list before
                                var isHighlighted = false;

                                if(i === 0 && emptyContent === true) {
                                    isHighlighted  = true
                                }

                                // Store current item data, according if its PressRelease or Article
                                var currentItem = '""';

                                if (item.PressRelease !== undefined) {
                                    currentItem = item.PressRelease;
                                }
                                if (item.Article !== undefined) {
                                    currentItem = item.Article;
                                }

                                var category = '';
                                if(currentItem.Categories[0] !== undefined) {
                                    category = currentItem.Categories[0].Title;
                                }

                                var titleTwitter = item.Title;

                                if (titleTwitter) {

                                    var nbChar = titleTwitter.length;
                                    if(nbChar > 95) {
                                        titleTwitter = titleTwitter.substr(0, 95);
                                        titleTwitter += '&hellip;';
                                    }
                                }

                                var viaText = '';

                                var language = this.currentLanguage;

                                switch (language) {
                                    case "fr":
                                        viaText = "BNPPFBelgique";
                                        break;
                                    case "nl":
                                        viaText = "BNPPFBelgie";
                                        break;
                                    default:
                                        viaText = "BNPPFBelgie";
                                }

                                var shareUrl = currentItem.Url;

                                // Register all data for handlebar
                                var data = {
                                    viaText: viaText,
                                    titleTwitter: titleTwitter,
                                    title: currentItem.Title,
                                    publicationDate: currentItem.PublicationDate,
                                    description: currentItem.Description,
                                    category: category,
                                    backgroundUrl: currentItem.Thumbnail,
                                    url: shareUrl,
                                    isHighlighted: isHighlighted,
                                    hasDocuments: currentItem.HasDocuments,
                                    hasVideos: currentItem.HasVideos,
                                    hasImageGalleries: currentItem.HasImageGalleries
                                };

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data);
                            });

                            // Rebind event on card if display is card
                            if(displayType !== 'list') {
                                that.bindCardList();
                                //that.bindShareButton(); //FIX REDONDANT (#10299122)
                            }

                        } else {
                            // If search result is empty and we empty the content list, display an adapted view
                            if(emptyContent === true) {
                                // Save template
                                var template = $("#handlebar-resultEmpty");
                                var data = [];

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data);
                            }

                        }

                        // Callback
                        if(typeof callback == "function") {
                            callback(result);
                        }

                    }
                });*/
            },
            /**
             * [getEvents Call webservice for event]
             */
            getEvents: function getEvents(callback) {
                //console.log("GET EVENTS (OFF)");
                /*
                var that = this;

                var eventType = $("#event_type").val();
                var curentLanguage = $("#current_language").val();
                var url = '/restapi/event/' + curentLanguage + '/' + eventType + '?Skip=0&Take=99&EventType=' + $("input[name='eventTypeRadio']:checked").val();//eventTypes;
                if (eventType === "filter") { url += "&year=" + $("#event_year").val() + "&month=" + $("#event_month").val(); }

                that.emptyContentList();

                // Display spinner during the loading
                // Template of the spinner
                var spinnerTpl = '<div id="spinner" class="bnp-spinner"><div class="dot bounce1"></div><div class="dot bounce2"></div><div class="dot bounce3"></div></div>';
                // Create dom element in the contentList using spinnerTpl

                if ($("#spinner").length > 0) {
                    $("#spinner").remove();
                }

                $(spinnerTpl).insertBefore(contentList);
                var spinner = $("#spinner");

                $.ajax({
                    url: url,
                    type: 'get',
                    contentType: 'application/json'
                }).done(function (result) {

                    spinner.remove();

                    if(result.Events.length > 0) {
                        // Call finish remove spinner from the dom

                        // Save template
                        var template = $("#handlebar-cardEventItem");


                        $.each(result.Events, function (i, item) {

                            var category = '';
                            if (item.EventTypes.length > 0) {
                                category = item.EventTypes[0].Title;
                            }

                            // Register all data for handlebar
                            var data = {
                                id: item.Id,
                                title: item.Title,
                                content: item.Content,
                                category: category,
                                backgroundUrl: item.Picture,
                                location: item.Location,
                                country: item.Country,
                                state: item.State,
                                city: item.City,
                                street: item.Street,
                                time: item.Time,
                                eventStart: item.EventStart,
                                eventEnd: item.EventEnd,
                                eventStartTime: item.EventStartTime,
                                eventEndTime: item.EventEndTime,
                                eventStartDate: item.EventStartDate,
                                eventEndDate: item.EventEndDate,
                                allDayEvent: item.AllDayEvent,
                                url: item.Url,
                                eventStartDayOfWeek: item.EventStartDayOfWeek,
                                eventEndDayOfWeek: item.EventEndDayOfWeek,
                                eventStartDayMonth: item.EventStartDayMonth,
                                eventEndDayMonth: item.EventEndDayMonth,
                                eventStartYear: item.EventStartYear,
                                eventEndYear: item.EventEndYear,
                                contacts: item.Contacts
                            };

                            //  Add item to the dom using handelbar
                            that.addItemToContentList(template, data);
                        });

                        // Bind event expander
                        that.bindEventCardExpander();

                        // Event add to calendar refresh
                        if(addeventatc) {
                            addeventatc.refresh();
                        }
                    } else {
                        // If search result is empty and we empty the content list, display an adapted view
                        // Save template

                        //---duplication of code on main.js and every sub site section, normally we have to clear the duplication , for now we will impact
                        //---only the visual portion with multiple empty messages on search at jobs & newsroom

                        var template = $("#handlebar-resultEmpty");
                        var data = [];

                        //  Add item to the dom using handelbar
                        that.addItemToContentList(template, data);
                    }

                    // Callback
                    if(typeof callback == "function") {
                        callback(that);
                    }

               });*/
            },
            /**
             * [addLinkToSocialBoxContent Convert url inside real link in SocialBoxContent]
             */
            addLinkToSocialBoxContent: function addLinkToSocialBoxContent () {
                $.each($(".content-box--twitter div.social-content"), function(key, value) {
                    //$(this).html(ReformatTwitter($(this).html()));
                });
            },
            /**
             * [bindSelectorSharer On article/press-release detail bind slectorSharer libraries on content]
             * url https://github.com/xdamman/selection-sharer
             */
            bindSelectorSharer: function bindSelectorSharer() {
                //console.log("Bind Selection Sharer (OFF)");
                //$('.article__introduction, .article__content, .article__content p').selectionSharer();
            },
            buildSidebarContentDetail: function buildSidebarContentDetail() {
                var that= this;

                that.mqHandlerBuildSidebarContentDetail = {
                    match: function () {
                        var sidebarContentPlaceholder = $("#sidebarContentPlaceholder").detach();

                        that.contentContainer.append(sidebarContentPlaceholder);
                    },
                    unmatch: function () {
                        var sidebarContentPlaceholder = $("#sidebarContentPlaceholder").detach();

                        that.contentContainer.prepend(sidebarContentPlaceholder);
                    }
                };
                enquire.register(this.mqBelowLg, that.mqHandlerBuildSidebarContentDetail);

            },
            /**
             * [bindSideBarSticky Set sidebar sticky behavior]
             */
            bindSideBarSticky: function bindSideBarSticky() {
                var sidebarContent = $('#sidebarContent'),
                    mainFooter = $('#mainFooter'),
                    footerHeight = mainFooter.height();

                var offset = 0;

                if(sidebarContent.hasClass('sidebar-content--offset')) {
                    offset = -108;
                }

                // If sidebarContent is present on page
                if(sidebarContent.length > 0) {
                    var sidebarContentSticky = new Waypoint.Sticky({
                        element: sidebarContent[0],
                        wrapper: "<div class='sticky-wrapper'></div>",
                        offset: offset // sidebar-content--offset translation + 20px (top position when fixed)
                    });
                }
            },
            /**
             * [bindShareButton Bind click event on share button]
             * Toggle the share box linked to the item
             */
            bindShareButton: function bindShareButton() {
                $(".share-button, .link--share").unbind('click');
                $(".share-button, .link--share").bind('click', function(e){

                    e.preventDefault();

                    var sharebox = $(this).next('.sharebox'),
                        currentShareButton = $(this);

                    if(sharebox.hasClass('visible')){
                        sharebox.removeClass('visible');
                    }else{
                        sharebox.addClass('visible');
                    }

                    $(document).bind('click', function(e) {
                        if (!$(e.target).closest(sharebox).length && !$(e.target).closest(currentShareButton).length) {
                            sharebox.removeClass('visible');
                        }
                    });
                });
            },
            /**
             * [cardListScrollBind: Bind a scroll event on window to call function when reaching the bottom of the page]
             */
            cardListScrollBind: function cardListScrollBind() {
                var that = this;

                this.cardListScrollIsEnabled = true;

                var documentHeight = $(document).height(),
                    scrollPagination = 0,
                    scrollEnableFlag = true;

                $(window).unbind('scroll.cardList');

                $(window).bind('scroll.cardList', function () {

                    if (scrollEnableFlag === true) {

                        // var currentScroll = $(window).height() + $(window).scrollTop();
                        var currentScroll = $(this).scrollTop() + $(this).height();

                        // Save current index of search item
                        that.currentStartSearchIndex = that.contentList.children().length;

                        if (currentScroll >= documentHeight - 200) {
                            scrollEnableFlag = false;

                            //to eliminate double scroll event (on main and sub main js files)
                            /*
                            that.newSearch({
                                displayType: that.currentViewType,
                                emptyContent: false
                            }, function(result) {
                                if(result.SearchResults.Articles.length > 0 || result.SearchResults.PressReleases.length > 0 || result.SearchResults.SearchResults.length > 0 ) {
                                    documentHeight = $(document).height();
                                    scrollEnableFlag = true;
                                } else {
                                    // $(window).unbind('scroll.cardList');
                                }

                            });*/

                            // var categoryId = $(".univers-filter-item.active").find("a").data("categoryid"),
                            //     contentTypeId = $(".category-filter-item.active").data("typeid"),
                            //     startIndex = 21 + scrollPagination,
                            //     endIndex = 41 + scrollPagination;

                            // //console.log('/restapi/getbonuscontent/' + that.currentLanguage + '/' + categoryId + '/' + contentTypeId + '/' + startIndex + '/' + endIndex);

                            // $.ajax({
                            //     url: '/restapi/getbonuscontent/' + that.currentLanguage + '/' + categoryId + '/' + contentTypeId + '/' + startIndex + '/' + endIndex,
                            //     type: 'get',
                            //     contentType: 'application/json',
                            //     success: function (result) {
                            //         //console.log('nb of items: ' + result.Items.length);
                            //         if (result.Items.length > 0) {
                            //             window.addItems(contentList, result.Items);
                            //             that.reloadCardMasonry(contentList);

                            //             that.bonusCardBindClick();

                            //             scrollPagination = scrollPagination + 20;
                            //             //console.log('scrollPagination: ' + scrollPagination);
                            //             documentHeight = $(document).height();
                            //             scrollEnableFlag = true;
                            //             // contentList.on( 'layoutComplete', function() {
                            //             // });
                            //         } else {
                            //             $(window).unbind('scroll.cardList');
                            //         }
                            //     },
                            //     error: function (xhr, ajaxOptions, thrownError) {
                            //         console.log(xhr.status + '-' + thrownError);
                            //     }
                            // });
                        }
                    }
                });
            },
            bindEventCardExpander: function bindEventCardExpander() {
                // Expander
                /*var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
                var readMoreTrans = $("#view_more").val()
                var readLessTrans = $("#view_less").val()
                if(!isMobile) {

                    $('.card__detail').expander({
                        slicePoint: 100,
                        expandText: readMoreTrans,
                        userCollapseText: readLessTrans,
                        expandEffect: 'fadeIn',
                        expandSpeed: 200,
                        collapseEffect: 'fadeOut',
                        collapseSpeed: 200,
                        beforeExpand: function () {
                            $(this).parents('.card--event ').addClass('expended');
                        },
                        afterCollapse: function () {
                            $(this).parents('.card--event ').removeClass('expended');
                        }

                    });

                    $('.more-link, .less-link').click(function() {
                        $(this).parent().next().fadeIn( 400 );
                    });
                }*/
            },
            /**
             * [asyncAnchorNav Scroll to the current anchor in url after page load]
             */
            asyncAnchorNav: function asyncAnchorNav(that) {
                var currentUrl = window.location.href;

                if(currentUrl.indexOf("#") > -1) {
                    var currentUrlId = currentUrl.substring(currentUrl.indexOf("#")+1);

                    var targetTopPosition = $("#" + currentUrlId).position().top;

                    that.scrollToPosition(targetTopPosition);
                }
            },
            /**
             * [scrollToPosition Smootly scroll to a given position]
             * @param  {[int]} position [Destination position in px]
             */
            scrollToPosition: function scrollToPosition(position) {
                $('body,html').stop().animate({
                    scrollTop:position
                });
            },
            /**
             * [buildFilterBox Build filter box according the current breakpoint]
             */
            buildFilterBox: function buildFilterBox() {
                var that = this;

                var filterBoxDesktop = $("#filter-box__desktop"),
                    filterBoxMobile = $("#filter-box__mobile");

                that.mqMoveElement = {
                    match: function () {
                        filterBoxDesktop.append(that.filterBox);
                    },
                    unmatch: function () {
                        filterBoxMobile.append(that.filterBox);
                    }
                };
                enquire.register(that.mqLg, that.mqMoveElement);
            },
            /**
             * [buildDesktopEventTypes Build event filter for desktop, to avoid move element on mobile the widget is originality place on top of the event page, move the desktop block to the sidebarContent]
             */
            buildDesktopEventTypes: function buildDesktopEventTypes() {
                var that = this;

                var sidebarContent = $('#sidebarContent');
                sidebarContent.append(that.desktopEventTypes);
                // To avoid flashing effect and seeing the desktopEventTypes block move, display it in block only after the change in dom
                that.desktopEventTypes.addClass("desktop-visible");
            },
            addItemToContainer: function addItemToContentList(templateElement, data, containerTarget) {
                var source = templateElement.html(),
                    // Template compilation can be skipped if precompiled locally
                    template = Handlebars.compile(source),
                    newItem = template(data);
                // Add item to container
                containerTarget.append(newItem);
                // Rebind article hover
            },
            shareFacebook: function shareFacebook(title, url) {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(url), 'Facebook', 'toolbar=no,width=550,height=180'); return false;
            },
            shareTwitter: function shareTwitter(title, url) {
                window.open('https://twitter.com/share?text=' + encodeURIComponent(title) + '&url=' + encodeURI(url), 'Twitter', 'toolbar=no,width=550,height=450'); return false;
            },
            shareLinked: function shareLinked(title, url) {
                window.open('http://www.linkedin.com/shareArticle?mini=true&amp;url=' + encodeURI(url) + '&amp;title=' + encodeURIComponent(title), 'LinkedIn', 'toolbar=no,width=550,height=450', 'yes', 'center'); return false;
            }
        };
        BNPtoolbox.initialize();
        window.BNPtoolbox = BNPtoolbox;
    });
// })(noConflictjQuery);
})(jQuery);
