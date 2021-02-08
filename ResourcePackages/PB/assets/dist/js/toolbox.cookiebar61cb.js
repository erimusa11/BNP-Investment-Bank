//var noConflictjQuery = noConflictjQuery || jQuery.noConflict();
(function ($) {
    $(function () {
        'use strict';
        if (window.BNPtoolbox) {
            window.BNPtoolbox.oCookieBar = {

                // ========= PUBLIC ==========
                // ===========================

                initialize: function initialize() {
                    this.setInitVariable();
                    this.initPage();
                },

                // ========= PRIVATE =========
                // ===========================

                // General variables, NOT page specific
                setInitVariable: function setInitVariable() {
                    // Toolbox ref
                    this.toolbox = window.BNPtoolbox;
                    // Cookie
                    this.cookieName = 'BNPCookiesAccepted';
                    this.cookieValue = 'true';
                    this.cookieCloseSpeed = 300;
                    // Resize
                    this.RESIZE_HEADER = 'resize.updateHeader';
                    // jQuery ref
                    this.cookieBar = $('.cookie-bar');
                    this.cookieBarClose = $('.cookie-bar__close');
                    this.header = $('.global-header');
                },
                // Call various page components
                initPage: function initPage() {
                    if (!$.cookie(this.cookieName)) {
                        this.activateCookieBar();
                    }
                },
                activateCookieBar: function activateCookieBar() {
                    var that = this;
                    // CB interaction
                    that.bindCookieBar();
                    // CB display
                    that.showCookieBar();
                    // Bind resize
                    that.addResizeHeader();
                    // Header and content display
                    // Done via timeout to avoid load rare case
                    window.setTimeout(function() {
                        that.updateHeader();
                    }, 0);
                },
                bindCookieBar: function bindCookieBar() {
                    var that = this;
                    that.cookieBarClose.on('click', function(e) {
                        e.preventDefault();
                        that.closeCookieBar(); 
                    });
                },
                closeCookieBar: function closeCookieBar() { 
                    this.setCookie(); 
                    this.hideCookieBar();
                    this.removeResizeHeader();
                    this.moveUpHeader();
                },
                showCookieBar: function showCookieBar() {
                    this.cookieBar.show();
                },
                hideCookieBar: function hideCookieBar() {
                    this.cookieBar.slideUp(this.cookieCloseSpeed);
                },
                setCookie: function setCookie() {
                    // Expiration date
                    var d = new Date();
                    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
                    // Cookie set
                    $.cookie(this.cookieName, this.cookieValue, { expires: d, path: '/' });
                },
                addResizeHeader: function addResizeHeader() {
                    var that = this;
                    $(window).on(that.RESIZE_HEADER, function() {
                        that.updateHeader();
                    });
                },
                removeResizeHeader: function removeResizeHeader() {
                    $(window).off(this.RESIZE_HEADER);
                },
                updateHeader: function updateHeader() {
                    var cookieBarHeight = this.getCookieBarHeight();
                    // Remove further calls if cookiebar is no more active
                    if (cookieBarHeight === 0) {
                        this.removeResizeHeader();
                    }
                    // Position header
                    //this.header.css('top', cookieBarHeight);
                    // Position content
                    //this.updateContent();
                },
                moveUpHeader: function moveUpHeader() {
                    this.header.animate({top: 0}, this.cookieCloseSpeed);
                },
                updateContent: function updateContent() {
                    if (this.toolbox.isMobile) {
                        //--- Mobile ---
                        // Ensure content never has an offset
                        this.toolbox.contentContainer.css('top', 0);
                    } else {
                        this.toolbox.contentContainer.css('top', this.getCookieBarHeight());
                    }
                },
                getCookieBarHeight: function getCookieBarHeight() {
                    var cookieBarHeight = 0;
                    if (this.cookieBar.is(':visible')) {
                        cookieBarHeight = this.cookieBar.outerHeight();
                    }
                    return cookieBarHeight;
                }
            };
            window.BNPtoolbox.oCookieBar.initialize();
        } else {
            //console.log("CPBB doesn't exist!");
        }
    });
})(jQuery);
//})(noConflictjQuery);
