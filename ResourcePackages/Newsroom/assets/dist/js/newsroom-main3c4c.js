// var noConflictjQuery = jQuery.noConflict();

(function ($) {
    $(function () {
        'use strict';

        var BNPtoolbox = {

            enableFilters : true,

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
                    this.processMailTo();
                    this.getUrlMediaKit();
                    // Language selection related
                    this.bindLanguageSelection();

                    // Content Navbar (article detail related)
                    this.bindContentNavbar();

                    // Sidebar content
                    /*if(!this.body.hasClass("page-home")) {
                        this.bindSideBarSticky();
                    }*/

                    // Card List related
                    if(this.cards) {
                        this.bindCardList();
                    }

                    // Form news alert related
                    if(this.formNewsletter.length > 0) {
                        this.bindNewsAlertFormValidation();
                    }

                    // If there is a filter box build it (move it in the dom)
                    if(this.filterBox.length > 0) {
                        this.buildFilterBox();
                    }

                    // If there is a filter event box build it (move it in the dom)
                    if(this.desktopEventTypes.length > 0) {
                        this.buildDesktopEventTypes();
                    }

                    $("#newsroomHomeKeywordSearch").submit(function (event) {
                        event.preventDefault();
                        var url = $("#formUrl").val();
                        var keyword = $("#keywordNewsroom").val();
                        url = url + "?keyword=" + keyword;
                        window.location.href = url;
                    });

                    // Specific method for page-list
                    // Page that display content list, and possibility to switch between card / list view
                    if(this.body.hasClass("page-list") || this.body.hasClass("page-search")) {
                        this.currentViewType = "card";


                        // Bind button
                        this.bindButtonViewType();

                        $("#newsroomKeywordSearch").submit(function (event) {

                            event.preventDefault();

                            if (that.enableFilters === true) {
                                that.enableFilters = false;
                                that.newSearch({
                                    displayType: that.currentViewType
                                });
                            }
                        });

                        $("#ul-brands li span, #ul-categories li span").click(function () {
                            if (that.enableFilters === true) {
                                $(window).scrollTop(0); //scroll to the top, so bind to scroll is not fired, and double results are made
                                that.enableFilters = false;
                                $(this).parent().toggleClass('selected');
                                that.newSearch({
                                    displayType: that.currentViewType
                                });
                            }
                        });

                        $("#filter-documents, #filter-images,#filter-videos").click(function () {
                            if (that.enableFilters === true) {
                                $(window).scrollTop(0); //scroll to the top, so bind to scroll is not fired, and double results are made
                                that.enableFilters = false;
                                that.newSearch({
                                    displayType: that.currentViewType
                                });
                            }
                        });

                        $("#filter-year").bind("change", function () {

                            if (that.enableFilters === true) {
                                $(window).scrollTop(0); //scroll to the top, so bind to scroll is not fired, and double results are made
                                that.enableFilters = false;
                                that.newSearch({
                                    displayType: that.currentViewType
                                });
                            }
                        });

                        $("a.button--primary--md.see-more-button.home").click(function () {
                            that.newSearch({
                                displayType: that.currentViewType,
                                emptyContent: false
                            });
                        });
                        // Bind card list loader
                        //this.cardListScrollBind();
                    }

                    if (this.body.hasClass("page-search")) {
                        if (this.body.hasClass("no-search")) {
                            that.newSearch({
                                displayType: that.currentViewType
                            });
                        } else {
                            that.newSearch({
                                displayType: that.currentViewType
                            });
                        }
                    }

                    // Specific method for page-event
                    if(this.body.hasClass("page-event")) {
                        this.getEvents(this.asyncAnchorNav);
                        this.initMoveFiltersEvents();
                        this.enablebindEventCardExpander();
                        this.slideTimeLine();
                    }

                    // Galery List related
                    if(this.galeryList.length > 0) {
                        this.bindGaleryList();
                    }

                    // Content Box List Social Related
                    if (this.contentBoxListSocial.length > 0) {
                        this.addLinkToSocialBoxContent();
                    }

                    // Bind selector sharer plugins
                    if($('.article-body').length > 0) {
                        this.bindSelectorSharer();
                    }

                    this.filtersToggle();

                    this.initCopyLink();

                    if ($('#relatedArticleContainer').length > 0){
                        this.initSwiper();
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
                this.isIos = true;
                // Enquire media queries
                this.mqMobile = 'screen and (max-width: 991px)';
                this.mqDesktop = 'screen and (min-width: 992px)';
                this.mqBelowSm = 'screen and (max-width: 767px)';
                this.mqBelowMd = 'screen and (max-width: 991px)';
                this.mqSm = 'screen and (min-width: 768px)';
                this.mqMd = 'screen and (min-width: 768px) and (max-width: 1999px)';
                this.mqLg = 'screen and (min-width: 1160px)';
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
                // Language selector
                this.languageSelectionButton = $('#languageSelectionButton');
                this.languageSelection = $('#languageSelection');
                this.languageSelectionState = false;
                // Card list
                this.cards = $('.card, .card--highlighted--new');
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
                    this.scrollList.push(fn);
                }
            },
            removeFromScroll: function removeFromScroll(fn) {
                var index = this.scrollList.indexOf(fn);
                if (index > -1) {
                    this.scrollList.splice(index, 1);
                }
            },
            /**
             * [bindCardList Bind event on card list]
             * To allow click on the entire card (not only on link), copy link URL and open item on click.
             */
            bindCardList: function bindCardList() {
                var that = this;

                var cards = $('.card, .card--highlighted--new');

                // Bind click on each .card--bonus
                cards.bind("click.card", function (e) {

                    // Save target variable
                    var target = e.target,
                        targetType = target.tagName.toLowerCase();

                    // If click target is not a link item
                    if ($(e.target).closest('a').length === 0) {

                        // Save and find related url
                        var cardLink = $(this).find(".card__read-more"),
                            cardUrl = cardLink.attr('href');

                        var keyPressed = key.getPressedKeyCodes();

                        // If click button is the middle mouse open new location in new tab
                        // OR
                        // If key CMD ([91]) (on mac) is pressed during click
                        // If key CTRL ([17]) (on other os) is pressed during click
                        if (e.which === 2 || keyPressed.indexOf("91") >= 0 && that.isMac || keyPressed.indexOf("17") >= 0  && that.isMac === false) {

                            window.open(cardUrl, '_blank');

                            // // Else act normaly
                        } else {
                            // Move to new url
                            window.location = cardUrl;
                        }
                    }
                });
            },
            getUrlMediaKit: function getUrlMediaKit() {
                // var urlDownloadZip = $('.item__type--zip .link').attr("href");
                var liThumbnail =  $('.item__type--zip');
                liThumbnail.each(function() {
                    var linkZip = $(this).find('.link');
                    var linkZipUrl = linkZip.prop("href");
                    $(this).on('click', function(){
                        window.location = linkZipUrl;    
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
            },
            /**
             * [bindContentNavbar Set content-navbar sticky behavior]
             */
            bindContentNavbar: function bindContentNavbar() {
                var contentNavbar = $('#contentNavbar'),
                    mainFooter = $('#mainFooter'),
                    footerHeight = mainFooter.height();

                // If contentNavbar is present on page
                if(contentNavbar.length > 0) {

                    var stickyContentNavbar = new Waypoint.Sticky({
                        element: contentNavbar[0],
                        direction: 'up right',
                        offset: function() {
                            var windowHeight = $(window).innerHeight();
                            return windowHeight - footerHeight;
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
                $('.galery-list__item').magnificPopup({
                    type:'image',
                    gallery:{
                        enabled:true
                    }
                });
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
                var currentMonth = $("#event_month").val();
                if (currentMonth != undefined && currentMonth.length < 2) currentMonth = '0' + currentMonth;
                var currentYear = $("#event_year").val();
                var currentMonthLi = $("li[data-month='"+currentMonth+"'][data-year='"+currentYear+"']");
                var nthChildCurrentMonth = $(currentMonthLi).index() + 1;
                var initialPosition = -($(".slider ul li").outerWidth() * nthChildCurrentMonth) + $("a.left").outerWidth() + $(".current-year").outerWidth() + 75;

                $(".slider ul").css("left", initialPosition);

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
            addItemToContentList: function addItemToContentList(templateElement, data, isHighlighted) {
                var source = templateElement.html(),
                // Template compilation can be skipped if precompiled locally
                template = Handlebars.compile(source),
                newItem = template(data);
                // Add item to container
                if (isHighlighted) this.contentList.prepend(newItem);
                else this.contentList.append(newItem);
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
            submitNewsroomKeyword: function submitNewsroomKeyword(url) {
                var that = this;
                var keyword = $("#keywordNewsroom").val();
                url = url + "?keyword=" + keyword;
                alert(url);
                window.location.href = '/fr/newsroom/resultat-recherche?keyword=web';
            },

            newSearch: function newSearch(options, callback) {

                var that = this;

                var displayType = (typeof options.displayType === 'undefined') ? "card" : options.displayType;
                var emptyContent = (typeof options.emptyContent === 'undefined') ? true : options.emptyContent;

                var brands = [],
                    categories = [],
                    keyword = '',
                    skip = 0,
                    take = 0;

                var moreButton = $("a.button--primary--md.see-more-button.home");

                // Clean contentList if emptyContent set to true
                if (emptyContent === true) {

                    this.emptyContentList();
                    skip = 0;

                    // Verify the display type for the
                    if (displayType == "card") {
                        //take = 5;
                        take = 11;
                    }else{
                        take = 10;
                    }

                    moreButton.data("skip", take);

                    // Rebind card scroll list
                    //this.cardListScrollBind();
                } else {
                    //skip = that.currentStartSearchIndex;
                    skip = parseInt(moreButton.data("skip"));
                    take = 10;

                    moreButton.data("skip", skip + take);
                }

                //console.log(moreButton.data("skip"));

                // Get all current brands
                $("#ul-brands li.selected span").each(function() {
                    brands.push($(this).data('id'));
                });

                // Get all current categories
                $("#ul-categories li.selected span").each(function() {
                    categories.push($(this).data('id'));
                });

                keyword = $("#keywordNewsroom").val();

                // Save Url
                var url = '/restapi/customSearch/' + $("#language").val() + '?IndexName=' + $("#indexName").val() + '&Skip=' + skip + '&Take=' + take;
                url += '&Keyword=' + encodeURIComponent(keyword) + '&Brands=' + JSON.stringify(brands) + '&Categories=' + JSON.stringify(categories) + '&Year=' + $("#filter-year").val() +
                    '&HasDocs=' + $("#filter-documents").is(":checked") + '&HasImageGalleries=' + $("#filter-images").is(":checked") + '&HasVideos=' + $("#filter-videos").is(":checked");

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

                        if ((result.SearchResults) && (result.SearchResults.Articles.length > 0 || result.SearchResults.PressReleases.length > 0 || result.SearchResults.SearchResults.length > 0)) {
                            // Search results is not empty

                            // Set default template to card
                            var template = $("#handlebar-cardItem");
                            // If displayType = list, set handlebar template to list
                            if(displayType === 'list') {
                                template = $("#handlebar-listItem");
                            }

                            $.each(result.SearchResults.PressReleases, function (i, item) {

                                // Verify if item is highlighted
                                // Only the first item of the list is consider has an highlighted if we empty the list before
                                var isHighlighted = false;

                                if(i === 0 && emptyContent === true) {
                                    isHighlighted  = true
                                }

                                var category = '';
                                if(item.Categories[0] !== undefined) {
                                    category = item.Categories[0].Title;
                                } else {
                                    if (item.Brands[0] !== undefined) {
                                        //if category not found, we fill it with the first brand found
                                        category = item.Brands[0].Title;
                                    }
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
                                    id: item.Id,
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
                                    hasImageGalleries: item.HasImageGalleries,
                                    socialTitle: item.Title.replace(/'/g, ''),
                                    socialUri: item.Url.replace(/'/g, '')
                                };

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data, isHighlighted);
                            });

                            $.each(result.SearchResults.Articles, function (i, item) {

                                // Verify if item is highlighted
                                // Only the first item of the list is consider has an highlighted if we empty the list before
                                var isHighlighted = false;

                                if(i === 0 && emptyContent === true) {
                                    isHighlighted = true
                                }

                                var category = '';
                                if (item.Categories[0] !== undefined) {
                                    category = item.Categories[0].Title;
                                } else {
                                    if (item.Brands[0] !== undefined) {
                                        //if category not found, we fill it with the first brand found
                                        category = item.Brands[0].Title;
                                    }
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
                                    id: item.Id,
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
                                    hasImageGalleries: item.HasImageGalleries,
                                    socialTitle: item.Title.replace(/'/g, ''),
                                    socialUri: item.Url.replace(/'/g, '')
                                };

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data, isHighlighted);
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
                                if (currentItem.Categories[0] !== undefined) {
                                    category = currentItem.Categories[0].Title;
                                } else {
                                    if (currentItem.Brands[0] !== undefined) {
                                        //if category not found, we fill it with the first brand found
                                        category = currentItem.Brands[0].Title;
                                    }
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
                                    hasImageGalleries: currentItem.HasImageGalleries,
                                    socialTitle: currentItem.Title.replace(/'/g, ''),
                                    socialUri: currentItem.Url.replace(/'/g, '')
                                };

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data, isHighlighted);
                            });

                            // Rebind event on card if display is card
                            if(displayType !== 'list') {
                                that.bindCardList();
                                that.bindShareButton();
                            }

                        } else {
                            // If search result is empty and we empty the content list, display an adapted view
                            if (emptyContent === true) {
                                // Save template
                                var template = $("#handlebar-resultEmpty");
                                var data = [];

                                //  Add item to the dom using handelbar
                                that.addItemToContentList(template, data, false);
                            }

                            moreButton.hide();
                        }

                        that.enableFilters = true;

                        // Callback
                        if(typeof callback == "function") {
                            callback(result);
                        }
                    }
                });
            },
            initEvents : function initEvents(){
            },
            /**
             * [getEvents Call webservice for event]
             */
            getEvents: function getEvents(callback) {
                var that = this;
                var month = $("#event_month").val();
                var year = $("#event_year").val();
                var eventType = $("#event_type").val();
                var curentLanguage = $("#current_language").val();
                var url = '';
                var firstCall = $('#initEvents').val();
                if (firstCall == 'true') {
                    //var currentMonthLi = $("li[data-month='" + month + "'][data-year='" + year + "']");
                    //var nthChildCurrentMonth = $(currentMonthLi).index() + 1;
                    //var initialPosition = -($(".slider ul li").outerWidth() * nthChildCurrentMonth) + $("a.left").outerWidth() + $(".current-year").outerWidth() + 75;
                    //$(".slider ul").css("left", initialPosition);
                    url = '/restapi/event/' + curentLanguage + '/' + eventType + '?Skip=0&Take=10';
                } else {
                    url = '/restapi/event/' + curentLanguage + '/' + eventType + '?Skip=0&Take=99&EventType=' + $("input[name='eventTypeRadio']:checked").val();//eventTypes;
                }

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
                                backgroundUrl: item.Thumbnail,
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
                            that.addItemToContentList(template, data, false);
                        });

                        // Bind event expander
                        that.enablebindEventCardExpander();

                        // Event add to calendar refresh
                        if(addeventatc) {
                            addeventatc.refresh();
                        }
                    } else {
                        // If search result is empty and we empty the content list, display an adapted view
                        // Save template
                        var template = $("#handlebar-resultEmpty");
                        var data = [];

                        //  Add item to the dom using handelbar
                        that.addItemToContentList(template, data, false);
                    }

                    // Callback
                    if(typeof callback == "function") {
                        callback(that);
                    }

               });
            },
            bindNewsAlertFormValidation: function bindNewsAlertFormValidation() {
                var validator = $('#formNewsletter').validate({
                    submitHandler: function (form) {
                        var newsAlertThemes = [];

                            $("#ul-newsalert-themes > li > div > input").each(function () {
                                if ($(this).data('id') != "selectAll") {
                                    if ($(this).prop("checked")) {
                                        newsAlertThemes.push($(this).data('id').replace(/\"/g, ""));
                                    }
                                }
                            });

                            $('#modalNewsLetterSuccess').modal();

                            SubscribeToNewsAlerts($("#NR_NewsAlert_Language").val(), $("#NR_NewsAlert_FirstName").val(), $("#NR_NewsAlert_LastName").val(), $("#NR_NewsAlert_Email").val(), $("#NR_NewsAlert_Company").val(), $("#NR_NewsAlert_Function").val(), newsAlertThemes);
                    },
                    onfocusout: function (element) {
                        $(element).valid();
                        if($(element).val() == ''){
                            $(element).removeClass('valid');
                        }
                    },
                    rules: {
                        NR_NewsAlert_FirstName: 'required',
                        NR_NewsAlert_LastName: 'required',
                        NR_NewsAlert_Email: {
                            required: true,
                            email: true
                        },
                        //NR_NewsAlert_Company: 'required',
                        //NR_NewsAlert_Function: 'required',
                        //NR_NewsAlert_Optim: 'required',
                        NR_NewsAlert_Language: 'required',
                    },
                    errorPlacement: function(error, element) {
                        element.parent().addClass('error');
                    },
                    highlight: function(element, errorClass, validClass) {
                        $(element).parent().addClass(errorClass);
                        $(element).addClass(errorClass);
                        $(element).removeClass(validClass);
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        $(element).parent().removeClass(errorClass);
                        $(element).removeClass(errorClass);
                        $(element).addClass(validClass);
                    }
                });
                $("#modalNewsLetterSuccess .button-modal-close").click(function() {
                    document.getElementById("formNewsletter").reset();
                    validator.resetForm();
                });
            },
            /**
             * [addLinkToSocialBoxContent Convert url inside real link in SocialBoxContent]
             */
            addLinkToSocialBoxContent: function addLinkToSocialBoxContent () {
                $.each($(".content-box--twitter div.social-content"), function (key, value) {
                    //$(this).html(ReformatTwitter($(this).html()));
                });
            },
            /**
             * [bindSelectorSharer On article/press-release detail bind slectorSharer libraries on content]
             * url https://github.com/xdamman/selection-sharer
             */
            bindSelectorSharer: function bindSelectorSharer() {
                $('.article__introduction, .article__content, .article__content p').selectionSharer();
            },
            /**
             * [bindSideBarSticky Set sidebar sticky behavior]
             */
            /*bindSideBarSticky: function bindSideBarSticky() {
                var sidebarContent = $('#sidebarContent'),
                    mainFooter = $('#mainFooter'),
                    footerHeight = mainFooter.height();

                var offset = 0;

                if(sidebarContent.hasClass('sidebar-content--offset')) {
                    offset = 140;
                }

                // If contentNavbar is present on page
                if(sidebarContent.length > 0) {
                    var sidebarContentSticky = new Waypoint.Sticky({
                        element: sidebarContent[0],
                        offset: offset // sidebar-content--offset translation + 20px (top position when fixed)
                    });
                }
            },*/
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
             * [cardListScrollBind: Bind a scroll event on window to call function when reaching the bottom of the page]
             */
            cardListScrollBind: function cardListScrollBind() {

                var that = this;

                this.cardListScrollIsEnabled = true;

                var documentHeight = $(document).height(),
                    scrollPagination = 0,
                    scrollEnableFlag = true;

                $(window).bind('scroll.cardList', function () {
                    /*if (scrollEnableFlag === true) {

                        // var currentScroll = $(window).height() + $(window).scrollTop();
                        var currentScroll = $(this).scrollTop() + $(this).height();

                        // Save current index of search item
                        that.currentStartSearchIndex = that.contentList.children().length;

                        if (currentScroll >= documentHeight - 200) {
                            scrollEnableFlag = false;

                            that.newSearch({
                                displayType: that.currentViewType,
                                emptyContent: false
                            }, function (result) {
                                if ((result.SearchResults) && (result.SearchResults.Articles.length > 0 || result.SearchResults.PressReleases.length > 0 || result.SearchResults.SearchResults.length > 0)) {
                                    documentHeight = $(document).height();
                                    scrollEnableFlag = true;
                                } else {
                                    // $(window).unbind('scroll.cardList');
                                }
                            });
                        }
                    }*/
                });
            },
            enablebindEventCardExpander: function enablebindEventCardExpander() {
                var that = this;
                that.mqBindEventCardExpander = {
                    match: function () {
                        that.bindEventCardExpander();
                    },
                    unmatch: function () {

                    }
                };
                enquire.register(that.mqSm, that.mqBindEventCardExpander);
            },
            bindEventCardExpander: function bindEventCardExpander() {
                // Expander
                var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
                var readMoreTrans = $("#view_more").val()
                var readLessTrans = $("#view_less").val()
                //if(!isMobile) {

                    $('.card__detail').expander({
                        slicePoint: 140,
                        sliceOn: '<ul class="contact-list">',
                        expandText: readMoreTrans,
                        userCollapseText: readLessTrans,
                        expandEffect: 'fadeIn',
                        expandSpeed: 200,
                        collapseEffect: 'fadeOut',
                        collapseSpeed: 200,
                        expandPrefix: '',
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
               //}
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
            initMoveFiltersEvents: function initMoveFiltersEvents() {
                var that = this;

                var filterMobile = $(".mobile-event-types"),
                    filterMobileWrapper = $(".filterMobileWrapper");

                that.mqMoveElement = {
                    match: function () {
                        filterMobileWrapper.append(filterMobile);
                    },
                    unmatch: function () {
                        filterMobileWrapper.append(filterMobile);
                    }
                };
                enquire.register(that.mqBelowMd, that.mqMoveElement);
            },
            filtersToggle: function filtersToggle() {
                $(".buttonFilter").on('click', function() {
                    $(".fade").addClass("in");
                    $("body").addClass("filtersOpen");
                });

                $(".icon-close, .button-validation").on('click', function () {
                    $(".fade").removeClass("in");
                    $("body").removeClass("filtersOpen");

                    //remove class for sharebox (article details)
                    $("ul.sharebox").removeClass("visible");
                });
            },
            processMailTo: function processMailTo() {
                $("a.social-link--mail").click(function () {

                    var subject = $(this).data("subject");
                    var body = $(this).data("body");
                    var email = $(this).data("destination");

                    var tmpWindow = window.open("mailto:" + ((email) ? email : '') + "?body=" + ((body) ? body : '') + "&subject=" + ((subject) ? subject : ''));
                    setInterval(function () {
                        tmpWindow.close();
                    }, 5000);
                });
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
                $(document).on('click', '.share-box__copylink-close', function () {
                    $(this).closest('.share-box__copylink').removeClass('visible');
                });

                $(document).on('click', '.share-box__copylink-button', function () {
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
                * [initSwiper Configure swiper for article inside article slider widget]
                * http://idangero.us/swiper/
                */
            initSwiper: function initSwiper() {
                var that = this;

                var swiper1Slide = "";
                var swiper2Slide = "";
                var swiper3Slide = "";

                // Swiper for PHONE (< 767px)
                that.mqHandlerArticleHighlightedInitSwiperBelowMd = {
                    match: function () {

                        swiper1Slide = new Swiper('#relatedArticleContainer', {
                            slidesPerView: 1,
                            centeredSlides: false,
                            spaceBetween: 30,
                            prevButton: '.button-swiper--prev',
                            nextButton: '.button-swiper--next'
                        });

                    },
                    unmatch: function () {
                        swiper1Slide.destroy(true, true);
                    }
                };
                enquire.register(that.mqXsToSm, that.mqHandlerArticleHighlightedInitSwiperBelowMd);

                // Swiper for Large Device (> 767px < 1199px)
                that.mqHandlerArticleHighlightedInitSwiperSmToMd = {
                    match: function () {
                        swiper2Slide = new Swiper('#relatedArticleContainer', {
                            slidesPerView: 2,
                            centeredSlides: false,
                            spaceBetween: 30,
                            prevButton: '.button-swiper--prev',
                            nextButton: '.button-swiper--next'
                        });
                    },
                    unmatch: function () {
                        swiper2Slide.destroy(true, true);
                    }
                };
                enquire.register(that.mqSmToLg, that.mqHandlerArticleHighlightedInitSwiperSmToMd);

                // Swiper for Large Device (> 1199px)
                that.mqHandlerArticleHighlightedInitSwiperMd = {
                    match: function () {

                        swiper3Slide = new Swiper('#relatedArticleContainer', {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 30,
                            prevButton: '.button-swiper--prev',
                            nextButton: '.button-swiper--next'
                        });
                    },
                    unmatch: function () {
                        swiper3Slide.destroy(true, true);
                    }
                };
                enquire.register(that.mqLg, that.mqHandlerArticleHighlightedInitSwiperMd);
            },
        };

        BNPtoolbox.initialize();

        window.BNPtoolbox = BNPtoolbox;
    });
// })(noConflictjQuery);
})(jQuery);
