// var noConflictjQuery = noConflictjQuery || jQuery.noConflict();
(function ($) {
    $(function () {
        'use strict';


        if (window.BNPtoolbox) {
            window.BNPtoolbox.mainNav = {

                // ========= PUBLIC ==========
                // ===========================

                initialize: function initialize() {
                    this.setInitVariable();

                    this.buildMenu();

                    // this.linkCloseSubMenu();
                    if(this.toolbox.isMobile === true) {
                        this.bindMobileMenuButton();
                    } else {
                        this.bindSubMenu();
                    }
                },

                // ========= PRIVATE =========
                // ===========================

                // General variables, NOT page specific
                setInitVariable: function setInitVariable() {
                    // Toolbox ref
                    this.toolbox = window.BNPtoolbox;
                    // Menu
                    this.mainMenuWidget = $('#mainMenuWidget');
                    this.menuDesktopContent = $('#menuDesktopContent');
                    this.menuMobileContent = $('#menuMobileContent');
                    this.SupraBarWidgetFirstlevel = $('#supraBarMenuWidget .menu__first-level');

                    this.footerMenu = $('#mainFooter .menu');
                    this.menuFooterPosition = $('#mainFooter .container .copyright-block');
                    this.languageSelectionMobile = $('#languageSelectionMobile');

                    // Sub menu
                    this.subMenuSecondLevelState = true;
                    this.subMenuLink = $('.has-sub-menu > .link');
                    this.MenuItem = $('.menu__item');
                    

                    // Mobile Menu
                    this.mobileMenu = $('#menuMobile');
                    this.buttonMenuMobile = $('#buttonMenuMobile');
                    this.subMenuMobileButton = this.mobileMenu.find('.menu__item.has-sub-menu .link');
                    this.mobileMenuState = false;
                    this.subMobileMenuState = false;
                    this.LinkMinorForContactURL = $('.link--minor').get().shift();
                    this.LinkMinorForContactText = $('.link--minor').text();
                    this.LinkHome = $('.menu__item .link--home');

                },
                /**
                 * [buildMenu Build the menu for mobile/desktop version ]
                 */
                buildMenu: function buildMenu() {

                    var that = this;

                    that.mqBuildMenu = {

                         setup : function() {


                            if(that.toolbox.isMobile === true) {

                                if (!$('body').hasClass('new-header')) {
                                    that.menuMobileContent.prepend(that.mainMenuWidget);
                                    that.menuMobileContent.prepend(that.footerMenu);
                                    that.footerMenu.insertBefore(that.languageSelectionMobile);
                                    that.footerMenu.addClass('footer-menu-mobile');
                                }

                                else {
                                    that.menuMobileContent.prepend(that.mainMenuWidget);
                                    that.menuMobileContent.append(that.languageSelectionMobile);
                                    that.SupraBarWidgetFirstlevel.append("<li class='menu__item' id='contactLink'><a class='link' href='" + that.LinkMinorForContactURL + "'>" + that.LinkMinorForContactText + "</a></li>");
                                    that.LinkHome.hide();
                                }
                            }
                        },    

                        match: function () {
                            if (!$('body').hasClass('new-header')) {
                                that.menuDesktopContent.prepend(that.mainMenuWidget);
                                that.footerMenu.insertAfter(that.menuFooterPosition);
                                that.resetMenuState();
                            } else {
                                that.menuDesktopContent.prepend(that.mainMenuWidget);
                                that.LinkHome.show();
                                that.resetMenuState();
                                $('#contactLink').remove();

                            }

                        },
                        unmatch: function () {
                            if (!$('body').hasClass('new-header')) {
                                that.menuMobileContent.prepend(that.mainMenuWidget);
                                that.footerMenu.insertBefore(that.languageSelectionMobile);
                                that.footerMenu.addClass('footer-menu-mobile');
                                that.resetMenuState();
                            } else {
                                that.menuMobileContent.prepend(that.mainMenuWidget);
                                that.menuMobileContent.append(that.languageSelectionMobile);
                                that.resetMenuState();
                                that.LinkHome.hide();
                                that.SupraBarWidgetFirstlevel.append("<li class='menu__item' id='contactLink'><a class='link' href='" + that.LinkMinorForContactURL + "'>" + that.LinkMinorForContactText + "</a></li>");

                            }

                        }
                    };
                    enquire.register(that.toolbox.mqDesktop, that.mqBuildMenu);

                },

                bindTitleSubMenu: function bindTitleSubMenu() {
                    var that = this;
                    var closeMenu = $('.title-back');
                    closeMenu.click(function() {
                        that.closeMobileSubMenu();
                    });     
                },


                buildTitleSubMenu: function buidTitleSubMenu() {
                    var that = this;
                    var containerSubMenuSecondLevel = $('.menu__second-level.show-menu .container ul');
                    var titleSubMenuSecondLevel = $('.menu__second-level.show-menu').prev().text();
                    var containerSubMenuThirdLevel = $('.menu__third-level.show-menu .container ul');
                    var titleSubMenuThirdLevel = $('.menu__third-level.show-menu').prev().text();
                 
                    if ($('body').hasClass('new-header')) {
                        if ($('.menu__third-level').hasClass('show-menu') && this.toolbox.isMobile === true) {
                            containerSubMenuThirdLevel.find('#closemenuSecond').remove();
                            setTimeout(function(){
                                containerSubMenuThirdLevel.prepend("<li class='menu__item title-back' id='closemenuThird'><a class='link'>" + titleSubMenuThirdLevel + "</a></li>");
                                that.bindTitleSubMenu();
                            }, 10);
                        } 
                        
                        else {
                            $('.title-back').remove();
                            setTimeout(function(){
                                containerSubMenuSecondLevel.prepend("<li class='menu__item title-back' id='closemenuSecond'><a class='link'>" + titleSubMenuSecondLevel + "</a></li>");
                                that.bindTitleSubMenu();
                            }, 10);
                        }  
                    }   
                },
                /**
                 * [resetMenuState Reset menu state (all submenu etc etc)]
                 */
                resetMenuState: function resetMenuState() {


                    if (this.toolbox.isMobile === false) {
                        this.bindSubMenu();
                        this.closeMobileMenu();
                        this.closeMobileSubMenu();
                    } else {
                        this.bindMobileMenuButton();
                        this.closeMobileSubMenu();
                        var subMenu = $(".sub-menu");
                        this.closeSubMenu(subMenu);
                    }
                },
                // Bind event on MobileMenuButton
                bindMobileMenuButton: function bindMobileMenuButton() {
                    var that = this;

                    // Unbind all previous event click on buttonMobile menu to avoid conflict on breakpoint change

                    this.buttonMenuMobile.unbind("touchstart click");

                    this.buttonMenuMobile.bind("touchstart click", function(e){
                        e.preventDefault();

                        that.toggleMobileMenu();
                    });

                    // Bind menuMobile Sub Menu
                    this.bindMobileMenuSubMenu();

                    $('.nav_small').click(function(e) { 
                        e.preventDefault();
                        that.toggleMobileMenu();
                    });

                    $(document).on('click', function(event) {
                        if (!$(event.target).closest('.mm_offcanvas').length && !$(event.target).closest('.nav_small').length && !$(event.target).closest('.search_input').length && !$(event.target).closest('.title-back').length && !$(event.target).closest('.menu-mobile__content').length)  {
                            that.closeMobileMenu();
                            $('.sub-menu').removeClass('show-menu');
                            that.mobileMenu.removeClass('sub-menu-open'); 
;                       }
                    });
                },
                toggleMobileMenu: function toggleMobileMenu() {

                    // If subMobileMenu is hide
                    if(this.subMobileMenuState === false) {
                        // And if mobileMenu is hide, then open the mobile menu
                        if(this.mobileMenuState === false) {
                            this.openMobileMenu();

                        // Else if the mobileMenu is currently open, hide it
                        } else {
                            this.closeMobileMenu();
                        }
                    // If subMobileMenu is show, close subMobileMenu instead of close the entire menu
                    } else {
                        var subMenu = this.mobileMenu.find('.sub-menu.show-menu').last();
                        // subMenu.removeClass('show-menu');
                        // this.mobileMenu.removeClass('sub-menu-open');
                        // this.subMobileMenuState = false
                        this.closeMobileSubMenu(subMenu);
                    }
                },
                openMobileMenu: function openMobileMenu() {
                    this.mobileMenuState = true;

                    if ($('body').hasClass('new-header')) {
                        this.toolbox.body.addClass('mm_opening');
                        if ($('body').hasClass('sub-menu-open')) {
                          $('.container.left').closest('.sub-menu').addClass('show-menu');
                        }
                    } else {
                        this.mobileMenu.addClass('show-menu');
                        this.toolbox.body.addClass("mobile-menu-open"); 
                    }
                },
                closeMobileMenu: function closeMobileMenu() {
                    this.mobileMenuState = false;
                    if ($('body').hasClass('new-header')) {
                        this.toolbox.body.removeClass('mm_opening');
                        $('.sub-menu.show-menu').removeClass('show-menu')  
                    } else {
                        this.mobileMenu.removeClass('show-menu').removeClass('sub-menu-open');
                        this.toolbox.body.removeClass("mobile-menu-open");
                    }
                },
                // Bind event for all submenu in Mobile Menu
                bindMobileMenuSubMenu: function bindMobileMenuSubMenu() {

                    // Unbind all previous event click on sub-menu link (define by desktop) to avoid conflict on breakpoint change
                    this.subMenuLink.unbind("touchstart click");
                    this.subMenuMobileButton.unbind("touchstart click");

                    var that = this;

                      // this.subMenuMobileButton.bind("touchstart click", function(e) {
                    this.subMenuMobileButton.click(function(e) { 

                        var nextItem = $(this).next('.sub-menu');

                        // If nextItem is a submenu
                        if(nextItem.is('.sub-menu')){
                            e.preventDefault();
                            that.toggleMobileSubMenu(nextItem);
                        }


                    });
                },
                toggleMobileSubMenu: function toggleMobileSubMenu(subMenu) {
                    
                    if(subMenu.hasClass('show-menu')) {
                        this.closeMobileSubMenu(subMenu);
                    }else{
                        this.openMobileSubMenu(subMenu);
                    }
                },
                openMobileSubMenu: function openMobileSubMenu(subMenu) {
                    
                    if (!$('body').hasClass('new-header')) {
                        this.mobileMenu.addClass('show-menu');
                        subMenu.addClass('show-menu');
                        this.mobileMenu.addClass('sub-menu-open');
                        this.subMobileMenuState = true;

                    } else {

                        subMenu.addClass('show-menu');
                        setTimeout(function(){
                            subMenu.find('.container').first().addClass('left');
                        });
                        if(subMenu.hasClass('menu__third-level')) {
                            $('.menu__second-level.show-menu').addClass('for-third-level');
                        }
                        $('body').addClass('sub-menu-open');
                        this.buildTitleSubMenu();
                        
                    }
                    
                },
                closeMobileSubMenu: function closeMobileSubMenu(subMenu) {

                    if (!$('body').hasClass('new-header')) {
                        
                        var subMenu = this.mobileMenu.find('.sub-menu.show-menu').last();
                        // If subMenu is menu__second-level, it's mean that it is the last subMenu, then set subMobileMenuState to false
                        if(subMenu.hasClass('menu__third-level')) {
                            $('.menu__third-level').removeClass('show-menu');
                            this.mobileMenu.addClass('sub-menu-open');
                            this.subMobileMenuState = true;
                        
                        } else {
                            subMenu.removeClass('show-menu');
                            this.mobileMenu.removeClass('sub-menu-open');
                            this.subMobileMenuState = false
                        }
                    } else {
        
                        if ($('.menu__second-level').hasClass('show-menu') && $('.menu__third-level').hasClass('show-menu')) {
                            
                            setTimeout(function(){
                                
                                $('.menu__third-level').removeClass('show-menu');
                                $('.menu__third-level .title-back').remove();
                            }, 500);
                            $('.menu__third-level').find('.container').removeClass('left');
                            $('.menu__second-level.show-menu').removeClass('for-third-level');
                        }
                        else {
                            setTimeout(function(){
                                $('.menu__second-level').removeClass('show-menu');
                                $('.menu__second-level .title-back').remove();
                            }, 500);
                            $('.menu__second-level').find('.container').removeClass('left');
                            $('body').removeClass('sub-menu-open');
                            
                        }
      
                     }

                },
                // Bind Event for subMenu
                // Open second level of submenu (third level is handle on hover in css)
                bindSubMenu: function bindSubMenu() {
                    var that = this;
                   
                    // Unbind all previous event click on sub-menu link to avoid conflict on breakpoint change
                    this.subMenuLink.unbind("touchstart click");

                    // On hover all the menu to test if i need to close the submenu or not
                    this.MenuItem.bind("mouseenter", function (e) {
                        if (!$(event.currentTarget).hasClass('has-sub-menu')) {
                            $(".sub-menu").removeClass("sub-menu--open").parent().removeClass("menu__item--current");
                        }
                    });

                    // On hover on a menu link of first level
                    this.subMenuLink.bind("mouseenter", function (e) {
                        // Save nextItem state
                        var nextItem = $(this).next();

                        // If nextItem is a submenu
                        if(nextItem.is('.sub-menu')){

                            e.preventDefault();

                            // Open submenu if on touch device
                            that.toggleSubMenu(nextItem);

                            // If submenu is a second level
                            if(nextItem.is('.menu__second-level')){
                                // Get the height of the subMenu
                                var secondLevelMenuHeight = nextItem.height();
                                var contentContainerOffset = 30;

                                // Toggle subMenuSecondLevelState flag
                                that.subMenuSecondLevelState = !that.subMenuSecondLevelState;

                                // If the subMenu is display
                                // Adapt global-content offset to push global-content below submenu
                                if (that.subMenuSecondLevelState === true) {
                                    contentContainerOffset = secondLevelMenuHeight + 30;
                                }

                                if (that.isBelowMD === false) {
                                    that.contentContainer.css({
                                        "margin-top": contentContainerOffset
                                    });
                                }
                            }
                            //**for desktop closing the third level**
                            if ($('.sub-menu.menu__third-level').hasClass('sub-menu--open')) {
                                if(!$(this).hasClass('.has-sub-menu')) {
                                    $('.sub-menu.menu__third-level').removeClass('sub-menu--open').parent().removeClass("menu__item--current");
                                }
                            }
                        }
                    });
                },
                /**
                 * [toggleSubMenu Toggle the sub menu for desktop]
                 */
                toggleSubMenu: function toggleSubMenu(subMenu) {

                    if (subMenu.hasClass("sub-menu--open")) {

                        // this.closeSubMenu(subMenu);
                        
                    }else{
                        // Only close all submenu if submenu is not third level
                        if (!subMenu.hasClass('menu__third-level')) {
                            this.closeAllSubMenu();
                        }
                        this.openSubMenu(subMenu);
                        // this.buildTitleSubMenu();
                    }
                },
                /**
                 * [openSubMenu Open subMenu for desktop]
                 */
                openSubMenu: function openSubMenu(subMenu) {
                        
                    // Add submenu class (Display is handle in css)

                    subMenu.addClass("sub-menu--open");

                    // Set clicked link parent on active
                    subMenu.parent().addClass("menu__item--current");
                },
                /**
                 * [closeSubMenu Close subMenu for desktop]
                 */
                closeSubMenu: function closeSubMenu(subMenu) {
                    // Remove submenu class (Display is handle in css)
                    subMenu.removeClass("sub-menu--open");
                    subMenu.parent().removeClass("menu__item--current");
                },
                /**
                 * [closeAllSubMenu Close all subMenu for desktop]
                 */
                closeAllSubMenu: function closeAllSubMenu() {
                    $(".sub-menu").removeClass("sub-menu--open").parent().removeClass("menu__item--current");
                }

            };
            window.BNPtoolbox.mainNav.initialize();
        } else {
        }
    });
})(jQuery);
