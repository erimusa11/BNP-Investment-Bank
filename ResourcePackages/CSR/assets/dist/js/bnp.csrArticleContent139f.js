(function ($) {
    $(function () {
        'use strict';
        if (window.BNPtoolbox) {
            window.BNPtoolbox.csrArticleContent = {
                initialize: function initialize() {
                    this.setInitVariable();
                    this.getRelatedArticles();
                },
                setInitVariable: function setInitVariable() {
                    this.toolbox = window.BNPtoolbox;
                    this.relatedArticleContainerDiv = $('.relatedArticleContainer');
                    this.relatedArticleContainer = $("#relatedArticleList");
                    this.currentLanguage = $('#currentLanguage').val();
                },
                getRelatedArticles: function getRelatedArticles() {
                    var that = this;
                    var mainCat = $('#articleCategoryId').val();
                    var excludeId = $('#articlId').val();
                    var tags = [];
                    tags.push(mainCat);
                    var url = '/restapi/csr/' + that.currentLanguage + '/related?IndexName=csr-search&skip=0&take=5&tags=' + tags + '&excludeId=' + excludeId;
                    that.relatedArticleContainer.empty();
                   
                    $.ajax({
                        url: url,
                        type: 'get',
                        contentType: 'application/json',
                        success: function (result) {

                            if (result && result.ResultCode !== 500) {
                                if (result && result.ResultCode !== 500 && result.SearchResults.ListCSRArticles.length !== 0) {
                                    var template = $('#handlebar-articleRelatedResulItem');
                                    $('#sticky').css('display', 'block')
                                    $.each(result.SearchResults.ListCSRArticles, function (key, val) {
                                        var d = new Date(val.PublicationDate.match(/\d+/)[0] * 1);
                                        var data = {
                                            id: val.Id,
                                            publicationDate: d.getDate() + '.' + parseInt(d.getMonth() + 1) + '.' + d.getFullYear(),
                                            displayDate: val.displayDateString,
                                            url: val.Url,
                                            title: val.Title,
                                            header: val.Header,
                                            summary: val.Summary,
                                            content: val.Content,
                                            picture: (val.Picture) ? val.Picture.Url : '',
                                            tagTitle: val.MainTag.Title,
                                            tagColor: val.MainTag.CssName,
                                            socialTitle: val.Title.replace(/'/g, ''),
                                            socialUri: val.Url.replace(/'/g, '')
                                        };
                                        that.toolbox.addItemToContainer(template, data, that.relatedArticleContainer);
                                    });
                                    window.BNPtoolbox.addColorTag();

                                    that.initSwiper();
                                } else {
                                    that.relatedArticleContainerDiv.hide();
                                }
                            }
                        }
                    });
                    return false;
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
                    enquire.register(that.toolbox.mqXsToSm, that.mqHandlerArticleHighlightedInitSwiperBelowMd);

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
                    enquire.register(that.toolbox.mqSmToLg, that.mqHandlerArticleHighlightedInitSwiperSmToMd);

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
                    enquire.register(that.toolbox.mqLg, that.mqHandlerArticleHighlightedInitSwiperMd);
                },
            }
            window.BNPtoolbox.csrArticleContent.initialize();
        } else {
        }
    });
})(jQuery);
