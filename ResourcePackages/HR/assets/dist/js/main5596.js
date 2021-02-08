(function ($) {
    $(function () {
        'use strict';

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
                    this.closeModalVideo();
                    this.detectIEversion();
                    this.bindLanguageSelection();
                    this.bindContentNavbar();

                    if($(".modal-alerting").length > 0) {
                        this.bindJobAlertFormValidation();
                    }

                    if(this.exBoxSelection.length > 0) {
                        this.moveSidebarSelection();
                    }

                    if(this.JobBoxSelection.length > 0) {
                        this.moveSidebarJobSearch();
                    }
                    if(this.JobAlertBox.length > 0) {
                        this.moveAlertBoxJob();
                    }

                    if($("body").hasClass("page-homehr")){
                       this.bindCardList();
                    }

                    //Anchor Why BNP
                    if(this.anchorBoxTimeline.length > 0) {
                        this.bindAnchorWhy();
                        this.timelineBarSticky();
                    }

                    // Steptabs
                    if(this.stepTabs.length > 0) {
                        this.bindStepTabs();
                    }

                    // JobItemClick
                    // if($("body").hasClass("searchPage")){
                    //    $('#jobResults').on('click', '.job-item-box', this.jobItemClick);
                    // }

                    // Swipe
                    if($("body").hasClass("page-homehr")){
                       this.swipeCardsHome();
                    }

                    // Content Box List Social Related
                    if(this.contentBoxListSocial.length > 0) {
                        this.addLinkToSocialBoxContent();
                    }

                    // Content box Dixit related
                    if(this.contentBoxDixit.length > 0) {
                        this.contentBoxDixitHandler();
                    }

                    if($("body").hasClass("jobDetail")){
                       this.sticky();
                    }
                    
                    this.magnificPopup();


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
                this.mqXs = 'screen and (max-width: 480px)';
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
                this.cards = $('.card, .card--highlighted');
                // External Box Selection
                this.exBoxSelection = $("#ext-box-selection-item");
                // Job Search Box
                this.JobBoxSelection = $("#job-box-selection-item");
                // Job Alert Box
                this.JobAlertBox = $("#job-research-alert-box");
                //Anchor Timeline
                this.anchorBoxTimeline = $("#anchorBoxTimeline");
                // Step Tans
                this.stepTabs = $(".step-tabs");
                // content-box-list--social
                this.contentBoxListSocial = $('.content-box-list--social');
                // content-box--dixit
                this.contentBoxDixit = $('.content-box--dixit');
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
                    // console.log('fn found => removing it');
                    this.scrollList.splice(index, 1);
                }
                // console.log(this.scrollList);
            },



            // Job Item Click

            jobItemClick: function jobItemClick(e){

                var that = this;

                        var SELECTOR_LINK_TO_FOLLOW = '.itemjob_link',
                           clicked = $(e.target),
                           listItem = $(e.currentTarget);
                        if (!clicked.is('a') && !clicked.parent().is('a')) {
                           // Only executed when not a link or direct link child
                           var href = listItem.find(SELECTOR_LINK_TO_FOLLOW).attr('href');
                           if (href) {
                               window.location = href;
                           }
                        }
                    },


            closeModalVideo: function closeModalVideo(){


                $('.modalVideoIframe').on('hidden.bs.modal', function () {
                    var src = $(this).find('iframe').attr('src');
                    $(this).find('iframe').attr('src', '');
                    $(this).find('iframe').attr('src', src);

                });
            },

            /**
             * [bindCardList Bind event on card list]
             * To allow click on the entire card (not only on link), copy link URL and open item on click.
             */
            bindCardList: function bindCardList() {
                var that = this;

                // Bind click on each .card--bonus
                that.cards.bind("click.card", function (e) {

                    // Save target variable
                    var target = e.target,
                        targetType = target.tagName.toLowerCase();

                    // If click target is not a link item
                    if (targetType !== "a") {

                        // Save and find related url
                        var cardLink = $(this).find(".card__read-more");

                        if(cardLink.length > 0){
                            var cardUrl = cardLink.attr('href');

                            var keyPressed = key.getPressedKeyCodes();

                            // If click button is the middle mouse open new location in new tab
                            // OR
                            // If key CMD ([91]) (on mac) is pressed during click
                            // If key CTRL ([17]) (on other os) is pressed during click
                            if (e.which === 2 || keyPressed.indexOf("91") >= 0 && that.isMac || keyPressed.indexOf("17") >= 0 && that.isMac === false) {

                                window.open(cardUrl, '_blank');

                                // // Else act normaly
                            } else {
                                // Move to new url
                                window.location = cardUrl;
                            }
                        }

                    }
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

            moveSidebarSelection: function moveSidebarSelection() {
                    var that = this;
                    var exBoxSelection = this.exBoxSelection;
                    var exBoxSelecLG = $("#desktop-ext-box-selection");
                    var exBoxSelecSM = $("#mobile-ext-box-selection");
                    that.mqMoveElement = {
                        match: function () {
                            exBoxSelecLG.append(exBoxSelection);
                        },
                        unmatch: function () {
                            exBoxSelecSM.append(exBoxSelection);
                        }
                    };
                    enquire.register(that.mqLg, that.mqMoveElement);

                },

                moveSidebarJobSearch: function moveSidebarJobSearch() {
                    var that = this;
                    var JobBoxSelection = this.JobBoxSelection;
                    var JobBoxSelectionLG = $("#job-search-box__desktop");
                    var JobBoxSelectionSM = $("#job-search-box__mobile");
                    that.mqMoveElement = {
                        match: function () {
                            JobBoxSelectionLG.append(JobBoxSelection);

                        },
                        unmatch: function () {
                            JobBoxSelectionSM.append(JobBoxSelection);
                        }
                    };
                    enquire.register(that.mqLg, that.mqMoveElement);

                },
                moveAlertBoxJob: function moveAlertBoxJob() {
                    var that = this;
                    var JobAlertBox = this.JobAlertBox;
                    var JobAlertBoxLG = $("#job-research-alert-desktop");
                    var JobAlertBoxSM = $("#job-research-alert-mobile");
                    that.mqMoveElement = {
                        match: function () {
                            JobAlertBoxLG.append(JobAlertBox);
                        },
                        unmatch: function () {
                            JobAlertBoxSM.append(JobAlertBox);
                        }
                    };
                    enquire.register(that.mqDesktop, that.mqMoveElement);

                },

                scrollToPosition: function scrollToPosition(position) {
                    $('body,html').stop().animate({scrollTop:position});
                },

                bindAnchorWhy: function bindAnchorWhy() {
                    var that=this;
                    $('.timeline-point-link').bind('click', function(e){
                        e.preventDefault();

                       var targetAnchor = $(this).attr("href");

                       var target = $(targetAnchor);

                       if (target) {
                            // Get the distance between top of target and the top border of window
                           var targetTop = target.offset().top;
                           // Scroll to targetTop position - 20px
                           // To keep a small space between border top window and target top
                           that.scrollToPosition(targetTop - 20);
                       }
                    });

                    var timelinePointNumberOne = $('#timeline-point-numberone').find('.timeline-insidepoint'),
                        timelinePointNumberTwo = $('#timeline-point-numbertwo').find('.timeline-insidepoint'),
                        timelinePointNumberThree = $('#timeline-point-numberthree').find('.timeline-insidepoint'),
                        timelinePointNumberFour = $('#timeline-point-numberfour').find('.timeline-insidepoint');

                    var waypoint = new Waypoint({
                        element: document.getElementById("0"),
                        handler: function(direction) {
                            var timelinePoint = timelinePointNumberOne;

                            if (direction === 'down') {
                                that.resetActiveTimelinePoint();
                                timelinePoint.addClass('active');
                            }
                            else if (direction === 'up') {
                                timelinePoint.removeClass('active');
                            }
                        },
                        offset: 20
                    });


                    var waypoint2 = new Waypoint({
                        element: document.getElementById("1"),
                        handler: function(direction) {
                            var timelinePoint = timelinePointNumberTwo;

                            if (direction === 'down') {
                                that.resetActiveTimelinePoint();
                                timelinePoint.addClass('active');
                            }
                            else if (direction === 'up') {
                                // Set previous point into active
                                timelinePointNumberOne.addClass('active');
                                timelinePoint.removeClass('active');
                            }
                        },
                        offset: 20
                    });

                    var waypoint3 = new Waypoint({
                        element: document.getElementById("2"),
                        handler: function(direction) {
                            var timelinePoint = timelinePointNumberThree;

                            if (direction === 'down') {
                                that.resetActiveTimelinePoint();
                                timelinePoint.addClass('active');
                            }
                            else if (direction === 'up') {
                                // Set previous point into active
                                timelinePointNumberTwo.addClass('active');
                                timelinePoint.removeClass('active');
                            }
                        },
                        offset: 20
                    });


                    var waypoint4 = new Waypoint({
                        element: document.getElementById("3"),
                        handler: function(direction) {
                            var timelinePoint = timelinePointNumberFour;

                            if (direction === 'down') {
                                that.resetActiveTimelinePoint();
                               timelinePoint.addClass('active');
                            }
                            else if (direction === 'up') {
                              // Set previous point into active
                              timelinePointNumberThree.addClass('active');
                              timelinePoint.removeClass('active');
                            }
                        },
                        offset: 20
                    });
                },

                resetActiveTimelinePoint : function resetActiveTimelinePoint() {
                    var timelinePoint = $('.timeline-insidepoint').removeClass('active');
                },

             /**
             * [bindSideBarContentSticky Set sidebar-content sticky]
             */
            timelineBarSticky: function timelineBarSticky() {
                var that = this;

                var anchorBoxTimeline = that.anchorBoxTimeline,
                    anchorBoxTimelineHeight = anchorBoxTimeline.height(),
                    contentList = $('#contentList'),
                    contentListHeight = 0;


                // When all images inside #pageContent are loaded
                $('#pageContent').imagesLoaded( function() {
                    // Init sticky, using sticky waypoint module
                    // url: (http://imakewebthings.com/waypoints/shortcuts/sticky-elements/)
                    // Only start sticky behavior when window top hit the desired block


                    var stickySidebarContentStart = new Waypoint.Sticky({
                        element: that.anchorBoxTimeline,
                        direction: 'down right',
                        wrapper: '<div id="timeLineContentWrapper" class="sticky-wrapper" />',
                        offset: 66
                    });

                    // Dirty set timeOut hack to make sure calculation is execute at the right time
                    setTimeout( function() {

                        contentListHeight = contentList.innerHeight();

                        // Stop sticky after Xpx scroll down
                        var stickySidebarContentStop = new Waypoint({
                            element: $('#timeLineContentWrapper'),
                            handler: function(direction) {
                                // When scroll down
                                if (direction === 'down') {

                                    // Overwrite waypoint sticky behavior
                                    // Remove class that manage the fixed position
                                    anchorBoxTimeline.removeClass('stuck');

                                    // Make sure the element is position on the bottom (+ margin) of the parent container
                                    anchorBoxTimeline.css({
                                        // position: 'absolute'
                                        top: contentListHeight - anchorBoxTimelineHeight + 25
                                    });

                                // On scroll up
                                } else {
                                    // Put back fixed behavior on the item and let waypoint sticky handle the elemtn
                                    anchorBoxTimeline.removeAttr('style');
                                    anchorBoxTimeline.addClass('stuck');
                                }
                            },
                            offset: function() {
                                // Offset = contentListHeight - anchorBoxTimelineHeight - margin (magic number)
                                var offset = -(contentListHeight - anchorBoxTimelineHeight - 90);
                                return offset;
                            }
                        });
                    });
                });
            },
            /**
             * [bindStepTabs Bind event on stepTabs components]
             */
            bindStepTabs: function bindStepTabs () {
                var stepInputs = $('.step-input'),
                    buttonStepNext = $('.button--step-next');

                // Reset checked state of all stepInputs
                function resetCheckedStepState (){
                    stepInputs.removeClass("step-checked");
                }

                // Reset finished state of all next stepInputs
                function resetFinishedNextStepState (stepId){
                    var step = $("#tab" + stepId),
                        nextStep = step.nextAll('.step-input');

                    nextStep.removeClass("step-finished");
                }

                // Set all previous stepInput to finish
                function setPrevStepToFinish (stepId){
                    var step = $("#tab" + stepId),
                        previousStep = step.prevAll('.step-input');

                    previousStep.addClass("step-finished");
                }

                // Bind click event on step
                stepInputs.bind("click", function(){
                    var currentStepId = parseInt($(this).data('current-step'));

                    resetCheckedStepState();
                    $(this).removeClass("step-finished");
                    $(this).addClass("step-checked");
                    setPrevStepToFinish(currentStepId);
                    resetFinishedNextStepState(currentStepId);
                });

                // Bind click event on next step
                buttonStepNext.bind("click", function(){
                    // Step target (to show) is the currentStep + 1 (the next)
                    var currentStepId = parseInt($(this).data('current-step')),
                        nextStepId = currentStepId + 1,
                        step = $("#tab" + nextStepId);

                    resetCheckedStepState();
                    step.prop("checked", true);
                    step.addClass("step-checked");
                    setPrevStepToFinish(nextStepId);
                });
            },
            /**
             * [addLinkToSocialBoxContent Convert url inside real link in SocialBoxContent]
             */
            addLinkToSocialBoxContent: function addLinkToSocialBoxContent () {
                $.each($(".content-box--twitter div.social-content"), function(key, value) {
                    $(this).html(ReformatTwitter($(this).html()));
                });
            },
            /**
             * [contentBoxDixitHandler On mobile show the good button (os related) to download app]
             */
            contentBoxDixitHandler: function contentBoxDixitHandler () {

                var that = this;

                var buttonDownloadApp = this.contentBoxDixit.find('.button--download-app'),
                    playStoreBtnWrapper = $('#playStoreBtnWrapper'),
                    appStoreBtnWrapper = $('#appStoreBtnWrapper');

                that.mqHandlerSetIosRelatedDownloadButton = {
                    match: function () {
                        if (device.ios()) {
                            playStoreBtnWrapper.hide();
                        } else if(device.android()) {
                            appStoreBtnWrapper.hide();
                        }
                    },
                    unmatch: function () {
                        buttonDownloadApp.show();
                    }
                };
                enquire.register(that.mqBelowMd, that.mqHandlerSetIosRelatedDownloadButton);

            },

            detectIEversion: function detectIEversion(){
                if(window.detectIEversion === true) {
                    $("html").addClass("ie");
                }
            },

            swipeCardsHome: function swipeCardsHome(){
                var that = this;
                var slider =  $('.sliderhome');
                that.mqSlickMobile = {
                    match: function () {
                        slider.slick({
                            arrows: false,
                            dots: true,
                            infinite: false,
                            slidesToShow: 1,
                            centerMode: true,
                            centerPadding: 0,
                          });
                    },
                    unmatch: function () {
                        slider.slick('unslick');
                    }
                };
                enquire.register(that.mqXs, that.mqSlickMobile);

            },
            bindJobAlertFormValidation: function bindJobAlertFormValidation() {
                $('.form--validate').validate({
                    submitHandler: function(form) {

                    },
                    onfocusout: function (element) {
                        $(element).valid();
                    },
                    rules: {
                        alertName: 'required',
                        conditions: 'required',
                        mail: {
                            required: true,
                            email: true
                        }
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
            sticky: function sticky(){
                var that = this;

                that.mqMoveElement = {
                    match: function () {
                        $(".sidebarRightArticle").sticky({topSpacing:80, bottomSpacing:420});
                        $('.sidebarRightArticle').on('sticky-end');
                    },
                    unmatch: function () {
                        $('.sidebarRightArticle').unstick();
                    }
                };
                enquire.register(that.mqLg, that.mqMoveElement);
            },
            magnificPopup: function magnificPopup(){
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