(function ($) {
    $(function () {

        'use strict';
        if (window.BNPtoolbox) {
            window.BNPtoolbox.csrArticleSearchResultList = {
                initialize: function initialize() {
                    this.setInitVariable();
                    this.getSearchResult();
                },
                setInitVariable: function setInitVariable() {
                    this.toolbox = window.BNPtoolbox;
                    this.searchResultListContainer = $("#searchResultList");
                    this.searchHighlightContainer = $("#searchHighlight");
                    this.currentLanguage = $('#currentLanguage').val();
                },
                changeClass: function changeClass(id) {
                    if ($('#' + id).hasClass("active")) {
                        $('#' + id).removeClass('active');
                    } else {
                        $('#' + id).addClass('active');
                    }
                    this.getSearchResult();
                },
                getSearchResult: function getSearchResult(pagerChange) {

                    var search = [];
                    var that = this;

                    window.jQuery("#pagerSearch").html('');

                    that.getNumberOfResults();

                    var keyword = $('#keyword').val();
                    if (keyword != "") {
                        search.push("k:" + keyword);
                    }

                    var tags = [];
                    $('.active').each(function () {
                        var tag = $(this).attr('Id');
                        if (tag) {
                            tags.push(tag);
                            search.push("t:" + $(this).attr('title'));
                        }
                    });

                    dataLayer[0].Search = search;

                    var month = $("#searchMonth option:selected").val();
                    var year = $("#searchYear option:selected").val();

                    var skip = 0;
                    if (pagerChange == false || pagerChange == undefined) {
                        $('#pager_currentPage').val(0);
                    }

                    if($('#pager_numberOfItems').val() > parseInt($("#pager_itemsPerPage").val())){
                        skip = parseInt($("#pager_currentPage").val()) * parseInt($("#pager_itemsPerPage").val());
                    }

                    var bSearchOn = (keyword.length > 0) || (tags.length > 0) || (month.length > 0) || (year.length > 0);

                    var take = parseInt($("#pager_itemsPerPage").val());

                    if (!bSearchOn) {
                        if (skip == 0) {
                            take = take + 1; //take 8 + highlighted item
                        } else {
                            skip = skip + 1;
                        }
                    }

                    var url = '/restapi/csr/' + that.currentLanguage + '/search?IndexName=csr-search&skip=' + skip + '&take=' + take + '&keyword=' + encodeURIComponent(keyword) + '&tags=' + tags + '&month=' + month + '&year=' + year;

                    that.searchResultListContainer.empty();
                    that.searchHighlightContainer.empty();

                    $('#pager').hide();

                    that.toolbox.addSpinnerToContainer("spinner-list", that.searchResultListContainer);

                    $.ajax({
                        url: url,
                        type: 'get',
                        contentType: 'application/json',
                        success: function (result) {
                            if (result && result.ResultCode !== 500) {
                                that.toolbox.removeSpinner("spinner-list");
                                $('#pager').show();
                                if (result && result.ResultCode !== 500 && result.SearchResults.ListCSRArticles.length !== 0) {
                                    var template = $('#handlebar-articleSearchResulItem');
                                    $.each(result.SearchResults.ListCSRArticles, function (key, val) {

                                        var d = new Date(val.PublicationDate.match(/\d+/)[0] * 1);

                                        var data = {
                                            id: val.Id,
                                            publicationDate: d.getDate() + '.' + parseInt(d.getMonth() + 1) + '.' + d.getFullYear(),
                                            displayDate: val.DisplayDateString,
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
                                        if ((key == 0) && (!bSearchOn) && (skip == 0)) {
                                            that.toolbox.addItemToContainer(template, data, that.searchHighlightContainer);
                                            that.toolbox.bindCardList();
                                        } else {
                                            that.toolbox.addItemToContainer(template, data, that.searchResultListContainer);
                                            that.toolbox.bindCardList();
                                        }
                                    });
                                    window.BNPtoolbox.csrArticleSearchResultList.setPager();
                                } else {
                                    var template = $("#handlebar-resultEmpty");
                                    var data = [];
                                    that.toolbox.addItemToContainer(template, data, that.searchResultListContainer);
                                }
                                window.BNPtoolbox.revealOnScroll();
                            }
                        }
                    });
                    //return false;
                },
                getNumberOfResults: function getNumberOfResults() {
                    var that = this;
                    var keyword = $('#keyword').val();
                    var tags = [];
                    $('.active').each(function () {
                        var tag = $(this).attr('Id');
                        if (tag) {
                            tags.push(tag);
                        }
                    });
                    var month = $("#searchMonth option:selected").val();
                    var year = $("#searchYear option:selected").val();
                    var url = '/restapi/csr/' + that.currentLanguage + '/count?IndexName=csr-search&keyword=' + encodeURIComponent(keyword) + '&tags=' + tags + '&month=' + month + '&year=' + year;
                    $.ajax({
                        url: url,
                        type: 'get',
                        contentType: 'application/json',
                        async: false,
                        success: function (result) {
                            if (result && result.ResultCode !== 500) {
                                $('#resultCount').text(result.NumberOfResults);
                                $('#pager_numberOfItems').val(result.NumberOfResults);
                            }
                        }
                    });
                },
                setPager: function setPager() {
                    var currentPage = parseInt($("#pager_currentPage").val());
                    var itemsPerPage = parseInt($("#pager_itemsPerPage").val());
                    var numberOfItems = parseInt($("#pager_numberOfItems").val());
                    var itemsRemaining = (numberOfItems - (currentPage * itemsPerPage));
                    var pager = '';
                    if (numberOfItems > 0) {
                        if (numberOfItems > itemsPerPage) {
                            if (currentPage > 0) {
                                pager += '<li class=\"pagination__item pagination__nav\">';
                                pager += '<a class=\"link\" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.getPreviousArticles();\">' + $('#previousLabel').val() + '</a>';
                                pager += '</li>';
                            }
                            if (itemsRemaining <= itemsPerPage && currentPage > 1) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.goToArticlePageNumber(' + (currentPage - 2) + ')\">' + (currentPage - 1) + '</a></li>';

                            if (currentPage > 0) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.goToArticlePageNumber(' + (currentPage - 1) + ')\">' + currentPage + '</a></li>';

                            pager += '<li class=\"pagination__item--current pagination__number\"><a class=\"link sf_PagerCurrent\" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.goToArticlePageNumber(' + currentPage + ')\">' + (currentPage + 1) + '</a></li>';

                            if (itemsRemaining > itemsPerPage) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.goToArticlePageNumber(' + (currentPage + 1) + ')\">' + (currentPage + 2) + '</a></li>';
                            if (currentPage === 0 && numberOfItems > (2 * itemsPerPage)) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.goToArticlePageNumber(' + (currentPage + 2) + ')\">' + (currentPage + 3) + '</a></li>';

                            if (itemsRemaining > itemsPerPage) {
                                pager += '<li class=\"pagination__item pagination__nav\">';
                                pager += '<a class=\"link\" href=\"javascript:window.BNPtoolbox.csrArticleSearchResultList.getNextArticles();\">' + $('#nextLabel').val() + '</a>';
                                pager += '</li>';
                            }
                        }
                    }
                    window.jQuery("#pagerSearch").html(pager);
                },
                getPreviousArticles: function GetPreviousArticles() {
                    var headerHeroHeight = $(".headerHeroFull").height(),
                        scrollPager = headerHeroHeight;

                    $("#pager_currentPage").val(parseInt($("#pager_currentPage").val()) - 1);
                    var pagerChange = true;
                    this.getSearchResult(pagerChange);
                    $("html, body").animate({
                        scrollTop: scrollPager
                    }, 600);
                    //return false;
                },
                getNextArticles: function GetNextArticles() {
                    var headerHeroHeight = $(".headerHeroFull").height(),
                        scrollPager = headerHeroHeight;
                        
                    $("#pager_currentPage").val(parseInt($("#pager_currentPage").val()) + 1);
                    var pagerChange = true;
                    this.getSearchResult(pagerChange);
                    $("html, body").animate({
                        scrollTop: scrollPager
                    }, 600);
                    //return false;
                },
                goToArticlePageNumber: function GoToArticlePageNumber(number) {
                    var headerHeroHeight = $(".headerHeroFull").height(),
                        scrollPager = headerHeroHeight;
                        
                    $("#pager_currentPage").val(parseInt(number));
                    var pagerChange = true;
                    this.getSearchResult(pagerChange);
                    $("html, body").animate({
                        scrollTop: scrollPager
                    }, 600);
                    //return false;
                }
                
            }
            window.BNPtoolbox.csrArticleSearchResultList.initialize();
        } else {
        }
    });
})(jQuery);
