// var noConflictjQuery = jQuery.noConflict();
(function ($) {
    $(function () {
        // 'use strict';

        var BNPtoolbox = {

            // ========= PUBLIC ==========
            // ===========================
            
            // One time initialization
            initialize: function initialize() {
                if (!this.isInitialized) {
                    this.setInitVariable();
                    this.setMacOsState();
                    this.setMobileState();
                    this.setBelowSMstate();
                    this.initScroll();
                    this.initAccordionFooter();
                    this.navigationHeaderSticky();
                    this.bindLanguageSelection();

                    if ($('.pageHome').length > 0) {
                        this.enableParallaxHeader();
                        //this.tagToggle();
                        // this.bindSideBarContentSticky();
                    }

                    if ($('.pageDetail').length > 0) {
                        this.progressList();
                        this.bindSelectorSharer();
                        this.stickyPrefooter();
                        // this.bindSideBarContentSticky();
                    }

                    this.customSelect();
                    this.initSwipeBox();
                    this.enableToggleSearchMobile();
                    this.langToggle();
                    this.filtersToggle();
                    this.magnificPopup();

                    if(this.cards) {
                        this.bindCardList();
                    }

                    this.bindShareButton();
                    // this.addLinkToSocialBoxContent();

                    //this.addColorTag();
                    this.toggleTag();

                    this.enterKeyInput()
                    
                    this.stickySidebar();

                    if ($('.pageDetail .mainWrapper.longArticle').length > 0) {
                        this.appendSidebar();
                    }

                    this.objectifIcon();
                    
                    if ($('.pageHome').length > 0) {
                        this.appendSidebarCustomContent();
                    }

                    this.initCopyLink();
                    this.youtubeMagnificPopup();
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
                this.mqBelowLg = 'screen and (max-width: 1160px)';
                this.mqSm = 'screen and (min-width: 768px)';
                this.mqMd = 'screen and (min-width: 768px) and (max-width: 1999px)';
                this.mqLg = 'screen and (min-width: 1200px)';
                this.mqMdPortrait = 'screen and (min-width: 768px) and (max-width: 1999px) and (orientation: portrait)';
                this.mqMdLandscape = 'screen and (min-width: 768px) and (max-width: 1999px) and (orientation: landscape)';
                this.mqXsToSm = 'screen and (max-width: 767px)';
                this.mqSmToLg = 'screen and (min-width: 768px) and (max-width: 1159px)';
                this.mqSmToMd = 'screen and (min-width: 768px) and (maxWidth: 991px)';
                this.mqMdToLg = 'screen and (min-width: 991px) and (max-width: 1159px)';
                // jQuery selections
                this.body = $('body');
                this.html = $('html');
                this.siteContainer = $('.global-container');
                this.contentContainer = $('.global-content');
                // Sub menu
                this.subMenuSecondLevelState = false;
                // Mobile Menu
                this.mobileMenu = $('#menuMobile');
                this.buttonMenuMobile = $('#buttonMenuMobile');
                this.mobileMenuState = false;
                this.subMobileMenuState = false;
                // Language selector
                this.languageSelectionButton = $('#languageSelectionButton');
                this.languageSelection = $('#languageSelection');
                this.languageSelectionState = false;
                // Card list
                this.cards = $('.boxArticle');

                this.contentNavbar = $(".sticky");
            },
            // Set current breakpoint
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
                    this.scrollList.splice(index, 1);
                }
            },
            bindCardList: function bindCardList() {
                var that = this;
                that.cards = $('.boxArticle');

                that.cards.unbind("click.card");

                // Bind click on each .card--bonus
                that.cards.bind("click.card", function (e) {

                    // Save target variable
                     var target = e.target,
                         targetType = target.tagName.toLowerCase(),
                         card = $(target);

                     if($(target).hasClass("boxArticle") === false){
                         card = $(target).parents(".boxArticle");
                     }


                     // If click target is not a link item
                     if (targetType !== "a") {

                         // Save and find related url
                         var cardLink = $(this).find(".linkBox"),
                             cardUrl = cardLink.attr('href');

                         var keyPressed = key.getPressedKeyCodes();

                         // If click button is the middle mouse open new location in new tab
                         // OR
                         // If key CMD ([91]) (on mac) is pressed during click
                         // If key CTRL ([17]) (on other os) is pressed during click
                         if (e.which === 2 || keyPressed.contains(91) && that.isMac || keyPressed.contains(17) && that.isMac === false || cardLink.attr("target") === "_blank" ) {

                             window.open(cardUrl, '_blank');

                             // // Else act normaly
                         } else {
                             // Move to new url
                             window.location = cardUrl;
                         }

                     }
                 });
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

                    $(".sharebox .icon-close").bind('click', function(e) {
                        sharebox.removeClass('visible');
                    });

                });
            },
            /**
             * [bindLanguageSelection Bind event on language selector]
             */
            bindLanguageSelection: function bindLanguageSelection() {
                var that = this;

                that.languageSelectionButton.bind('click', function(e){
                    e.preventDefault();

                    if(that.languageSelectionState === false){
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
                    console.log("test open langage");
                    $(".lng_change").toggleClass("open");
                    if ($(".lng_change").attr("aria-expanded") === "true") {
                        $(".lng_change").attr("aria-expanded", false)
                    } else {
                        $(".lng_change").attr("aria-expanded", true)
                    }
                    console.log('header-click');
                })

                $(document).on('click', function(event) {
                    if (!$(event.target).closest('.lng_change').length) {
                        $(".lng_change").removeClass("open");
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
            destroySideBarContentSticky: function destroySideBarContentSticky() {
                this.stickySidebarContentStart.destroy();
                // this.stickySidebarContentStop.destroy();
            },
            sidebarStickyInit: function sidebarStickyInit() {
                var that = this;

                this.mqHandleSidebarSticky = {
                    match: function() {
                        that.bindSideBarContentSticky();
                    },
                    unmatch: function() {
                        that.destroySideBarContentSticky();
                    }
                };
                enquire.register(that.mqLg, that.mqHandleSidebarSticky);
            },
            revealOnScroll: function revealOnScroll() {
                window.sr = ScrollReveal();
                sr.reveal('.boxArticle', {origin: 'top', scale: 1, delay: 500, useDelay: 'once', mobile:false, duration:1000}, 200);
                window.BNPtoolbox.addColorTag();
            },
            enableParallaxHeader: function enableParallaxHeader() {
                var that = this;
                that.enableParallaxHeader = {
                    match: function () {
                        that.parallaxHeader();
                    },
                    unmatch: function () {
                        
                    }
                };
                enquire.register(that.mqLg, that.enableParallaxHeader);

            },
            parallaxHeader: function parallaxHeader() {
                var s = skrollr.init({
                    edgeStrategy: 'set',
                    easing: {
                        WTF: Math.random,
                        inverted: function(p) {
                            return 1-p;
                        }
                    }
                });
            },
            customSelect: function customSelect() {
                $(".custom-select").each(function() {
                  var classes = $(this).attr("class"),
                      id      = $(this).attr("id"),
                      name    = $(this).attr("name");
                  var template =  '<div class="' + classes + '">';
                      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
                      template += '<div class="custom-options">';
                      $(this).find("option").each(function() {
                        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
                      });
                  template += '</div></div>';
                  
                  $(this).wrap('<div class="custom-select-wrapper"></div>');
                  $(this).hide();
                  $(this).after(template);
                });
                $(".custom-option:first-of-type").hover(function() {
                  $(this).parents(".custom-options").addClass("option-hover");
                }, function() {
                  $(this).parents(".custom-options").removeClass("option-hover");
                });
                $(".custom-select-trigger").on("click", function() {
                  $('html').one('click',function() {
                    $(".custom-select").removeClass("opened");
                  });
                  $(this).parents(".custom-select").toggleClass("opened");
                  event.stopPropagation();
                });
                $(".custom-option").on("click", function() {
                  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
                  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
                  $(this).addClass("selection");
                  $(this).parents(".custom-select").removeClass("opened");
                  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
                });
            },
            initSwipeBox: function initSwipeBox() {
                $('.popup-youtube').magnificPopup({
                  disableOn: 700,
                  type: 'iframe',
                  mainClass: 'mfp-fade',
                  removalDelay: 160,
                  preloader: false,

                  fixedContentPos: false
                });
            },
            enableToggleSearchMobile: function enableToggleSearchMobile() {
                var that = this;
                that.enableToggleSearchMobile = {
                    match: function () {
                        that.toggleSearchMobile();
                    },
                    unmatch: function () {}
                };
                enquire.register(that.mqBelowMd, that.enableToggleSearchMobile);
            },
            toggleSearchMobile: function toggleSearchMobile() {
                $(".searchBar input[type='button']").on("click", function() {
                    $(".core-feature").addClass("active");
                });
            },
            langToggle: function langToggle() {
                $(".language-selection .selected").click(function() {
                    $(".language-selection ul").toggle();
                });
                $(document).on('click', function(event) {
                    if (!$(event.target).closest('.language-selection ul').length && !$(event.target).closest('.language-selection .selected').length) {
                        $(".language-selection ul").css("display","none");
                    }
                });
            },
            filtersToggle: function filtersToggle() {
                $(".buttonFilter").on('click', function() {
                    $(".mainContentRight").fadeIn();
                    $("body").addClass("filtersOpen");
                });

                $(".closeFilter, .buttonFilterSubmit").on('click', function () {
                    $(".mainContentRight").fadeOut();
                    $("body").removeClass("filtersOpen");
                });

                $(".submitFilter").on('click', function () {
                    window.BNPtoolbox.pbArticleSearchResultList.getSearchResult();
                });
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
            /**
             * [bindSelectorSharer On article/press-release detail bind slectorSharer libraries on content]
             * url https://github.com/xdamman/selection-sharer
             */
            bindSelectorSharer: function bindSelectorSharer() {
                $('.articleContent').selectionSharer();
            },
            magnificPopup: function magnificPopup(){
                var popup = $(".detailContent a.headerImage").has("img");

                popup.addClass("articleImage");
                if ($(".objectifImageLink")) {$(".articleImage").removeClass('articleImage')}
                popup.magnificPopup({
                  type: 'image',
                  mainClass: 'mfp-fade',
                  removalDelay: 160,
                  preloader: false,

                  fixedContentPos: false
                });
            },
            /**
             * [addSpinnerToContainer Create a spinner into specific container]
             * @param {STRING} id      [ID of the spinner]
             * @param {DOM OBJECT} container [Container where to put the spinner]
             */
            addSpinnerToContainer: function addSpinnerToContainer(id, container) {
                // Display spinner during the loading
                // Template of the spinner
                var spinnerTpl = '<div id="'+ id +'" class="bnp-spinner"><div class="dot bounce1"></div><div class="dot bounce2"></div><div class="dot bounce3"></div></div>';
                // Create dom element in the contentList using spinnerTpl

                // Verify if spinner exist and remove spinner
                this.removeSpinner(id);

                $(spinnerTpl).insertAfter(container);

            },
            /**
             * [removeSpinner Remove a spinner from the dom]
             * @param  {STRING} id [id of the spinner to remove]
             */
            removeSpinner: function removeSpinner(id) {
                var spinner = $("#" + id);

                if (spinner.length > 0) {
                    spinner.remove();
                }
            },
            /**
             * [addLinkToSocialBoxContent Convert url inside real link in SocialBoxContent]
             */
            addLinkToSocialBoxContent: function addLinkToSocialBoxContent() {
                var that = this;
                $.each($(".socialTexte"), function (key, value) {
                    $(this).html(that.reformatTwitter(($(this).html())));
                });
            },
            reformatTwitter: function ReformatTwitter(content) {
                var regex1 = new RegExp('((^|\\s)#(\\w+))', 'g');
                //var regex1 = new RegExp('(([^&#]|#)[\\w\-éèàçâ]*)', 'gi');
                var regex2 = new RegExp('(@[\\w\-éèàçâ]*)', 'gi');
                //var regex2 = new RegExp('(^|\\s)(@\\w+)', 'g');
                var regex3 = new RegExp('((http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(\\w)*)?(\\?(\\w)*)?)', 'g');

                content = content.replace(regex3, "<a href='$1' target='_blank' class='hashtag'>$1</a>");
                content = content.replace(regex1, function (_, $1) {
                    if ($1.indexOf("#") != 0) {
                        return " <a href='https://twitter.com/search?q=" + encodeURIComponent($1.substr(1)) + "' target='_blank' class='hashtag'>" + $1.substr(1) + "</a>";
                    }
                    return "<a href='https://twitter.com/search?q=" + encodeURIComponent($1) + "' target='_blank' class='hashtag'>" + $1 + "</a>";
                });
                content = content.replace(regex2, function (_, $1) {
                    return "<a href='https://twitter.com/" + encodeURIComponent($1.substr(1)) + "' target='_blank' class='hashtag'>" + $1 + "</a>";
                });

                return content;
            },
            shareFacebook: function shareFacebook(title, url) {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(url), 'Facebook', 'toolbar=no,width=550,height=180'); return false;
            },
            shareTwitter: function shareTwitter(title, url) {
                window.open('https://twitter.com/share?text=' + encodeURIComponent(title) + '&url=' + encodeURI(url), 'Twitter', 'toolbar=no,width=550,height=350'); return false;
            },
            shareLinked: function shareLinked(title, url) {
                window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(url) + '&title=' + encodeURIComponent(title), 'LinkedIn', 'toolbar=no,width=550,height=540', 'yes', 'center'); return false;
            },
            shareWhatsapp: function shareWhatsapp(title, url) {
                window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(title) + '%0D%0A' + encodeURI(url), 'Whatsapp', 'toolbar=no,width=550,height=475', 'yes', 'center'); return false;
            },
            openCopyLink: function openCopyLink(element) {
                $(element).next('.share-box__copylink').addClass('visible');
            },
            initCopyLink: function initCopyLink() {
                $(document).on('click', '.share-box__copylink-close', function(){
                    $(this).closest('.share-box__copylink').removeClass('visible');
                });

                $(document).on('click', '.share-box__copylink-button', function(){
                    /* Get the text field */
                    var str = $(this).closest('.share-box__copylink').find('.share-box__copylink-url').text();

                    const el = document.createElement('textarea');
                    el.value = str;
                    el.setAttribute('readonly', '');
                    el.style.position = 'absolute';
                    el.style.left = '-9999px';
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);

                    $(this).closest('.share-box__copylink').removeClass('visible');
                });
            },
            /**
             * [addSpinnerToContainer Create a spinner into specific container]
             * @param {STRING} id      [ID of the spinner]
             * @param {DOM OBJECT} container [Container where to put the spinner]
             */
            addSpinnerToContainer: function addSpinnerToContainer(id, container) {
                // Display spinner during the loading
                // Template of the spinner
                var spinnerTpl = '<div id="' + id + '" class="bnp-spinner"><div class="dot bounce1"></div><div class="dot bounce2"></div><div class="dot bounce3"></div></div>';
                // Create dom element in the contentList using spinnerTpl

                // Verify if spinner exist and remove spinner
                this.removeSpinner(id);

                $(spinnerTpl).insertAfter(container);
            },
            stickyPrefooter: function stickyPrefooter() {
                $('.prefooter').scrollToFixed( {
                    bottom: 0,
                    limit: $('#mainFooter').offset().top,
                });
            },
            addColorTag: function addColorTag(){

                var customColor = $("#progress").data('color');

                // color tag filter research
                $(".listTag li").css('background-color', function () {
                    return $(this).data('color');
                });

                $( ".listTag li" ).bind( "click", function() {
                    if($(".listTag li").hasClass("active")) {
                        $(this).css('border-color', function () {
                            return $(this).data('color');
                        });
                        $(this).find('a').css('color', function () {
                            return $(this).parent().data('color');
                        });
                    }
                });    

                // color tag box article & detail article
                $(".boxArticle .category, .headerContainer .category, .topRelatedArticle .category, #progress .toc-title").css('background', function () {
                    return $(this).data('color');
                });

                //COLOR LONG ARTICLE
                $(".articleIntroduction").css('border-left-color', function () {
                    return $(this).data('color');
                });
                
                //COLOR TOC + SIDEBAR LONG ARTICLE
                $(".toc-bar").css('background', customColor);
                $(".sidebarContent").css('border-top-color', customColor);
                $(".toc-storybar").css('border-left-color', customColor);
                $(".articleIntroduction").css('border-left-color', customColor);
                
            },
            toggleTag: function toggleTag(){
                $('.moreTag, .lessTag').click(function(){
                    $('.relatedTag ul').toggleClass('toggleTag', 500);
                });
                $('.moreTag').click(function(){
                    $('.moreTag').removeClass('active', 500);
                    $('.lessTag').addClass('active', 500);
                });
                $('.lessTag').click(function(){
                    $('.lessTag').removeClass('active', 500);
                    $('.moreTag').addClass('active', 500);
                });
            },
            progressList: function progressList() {
                
                var wrapElement = $("div.longArticle");
                if (wrapElement.length) {
                    var elements = wrapElement.find("h2");

                    if (elements.length) {
                        for (var i = 0; i < elements.length; i++) {
                            if (!$(elements[i]).hasClass("articleTagTitle")) {
                                $(elements[i]).attr("data-toc", i);
                                if (i > 0) {
                                    $previous = $(elements[i]).prevUntil("h2");
                                    $previous.attr("data-toc", i - 1);
                                }
                                if (i == (elements.length - 2)) {
                                    $next = $(elements[i]).nextUntil("div");
                                    $next.attr("data-toc", i);
                                }
                            }
                        }

                        for (var i = 0; i < elements.length; i++) {
                            var sub_elements = $("*[data-toc='" + i + "']");
                            if (sub_elements.length) {
                                sub_elements.wrapAll("<div class='chapter'></div>");
                            }
                        }
                    }
                }

                $('#progress').tocProgress({
                    storyElem: '.chapter'
                });
            },
            stickySidebar: function stickySidebar(){
                var that = this;
                that.mqstickySidebar = {
                    match: function () {
                        $(".stickyLongArticle").sticky({
                            topSpacing: 80,
                            bottomSpacing: 4200
                        });
                    },
                    unmatch: function () {
                        $(".stickyLongArticle").unstick();
                    }
                };
                enquire.register(that.mqLg, that.mqstickySidebar);
            },
            appendSidebar: function appendSidebar(){
                var that = this;
                that.mqappendSidebar = {
                    match: function () {
                        //console.log('match');
                        $(".stickyLongArticle").prependTo('.mainContentLeft');
                        $(".sticky-wrapper").remove();
                        $(".headerDetail").addClass('headerTableOfContent');
                    },
                    unmatch: function () {
                        //console.log('unmatch');
                        $(".stickyLongArticle").prependTo('.mainContentRight');
                        //$(".sticky-wrapper").remove();
                        $(".headerDetail").removeClass('headerTableOfContent');
                    }
                };
                enquire.register(that.mqBelowLg, that.mqappendSidebar);  
            },
            enterKeyInput: function enterKeyInput(){
                $('.jobSearchBox').keypress(function(e) {
                    if(e.which == 13) {
                        // $(this).blur();
                        $('#submitFilter').focus().click();
                        return false;
                    }
                });
            },
            objectifIcon: function objectifIcon(){
                if ($('a.objectifImageLink').length > 0) {
                    $('.objectif').show();
                } 
            },
            appendSidebarCustomContent: function appendSidebarCustomContent() {
                // $('.pb-custom-content').appendTo(".mainContentLeft");
                var that = this;

                this.mqHandleAppendSidebarCustom = {
                    match: function() {
                        // that.bindSideBarContentSticky();
                        // $('.mainContentLeft').appendTo(".pb-custom-content");
                        $('.pb-custom-content').appendTo(".mainContentLeft");
                    },
                    unmatch: function() {
                        // that.destroySideBarContentSticky();
                        $('.pb-custom-content').appendTo(".mainContentRight");
                    }
                };
                enquire.register(that.mqBelowSm, that.mqHandleAppendSidebarCustom);
            },
            youtubeMagnificPopup: function youtubeMagnificPopup() {
                $(document).ready(function () {
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
                });
            }
        };

        BNPtoolbox.initialize();

        window.BNPtoolbox = BNPtoolbox;
    });
})(jQuery);
// })(noConflictjQuery);