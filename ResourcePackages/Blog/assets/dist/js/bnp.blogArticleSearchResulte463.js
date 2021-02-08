(function ($) {
    $(function () {

        'use strict';
        if (window.BNPtoolbox) {
            window.BNPtoolbox.blogArticleSearchResultList = {
                initialize: function initialize() {
                    this.setInitVariable();
                    this.getSearchResult();
                },
                setInitVariable: function setInitVariable() {
                    this.toolbox = window.BNPtoolbox;
                    this.searchResultListContainer = $("#searchResultList");
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
                backtoCorrectPageResult: function backtoCorrectPageResult() {

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
                    var authors = [];
                    $('#authorCheckBoxes input:checked').each(function () {
                        var author = $(this).attr('value');
                        if (author) {
                            authors.push(author);
                            search.push("a:" + $(this).attr('title'));
                        }
                    });
                    var tags = [];
                    $('.active').each(function () {
                        var tag = $(this).attr('value');
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
                    var url = '/restapi/blog/' + that.currentLanguage + '/search?IndexName=blog-search&skip=' + skip + '&take=' + parseInt($("#pager_itemsPerPage").val()) + '&keyword=' + encodeURIComponent(keyword) + '&tags=' + tags + '&authors=' + authors + '&month=' + month + '&year=' + year;
                    that.searchResultListContainer.empty();
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
                                if (result && result.ResultCode !== 500 && result.SearchResults.ListBlogArticles.length !== 0) {
                                    var template = $('#handlebar-articleSearchResulItem');
                                    $.each(result.SearchResults.ListBlogArticles, function (key, val) {
                                        var d = new Date(val.PublicationDate.match(/\d+/)[0] * 1);

                                        var data = {
                                            id: val.Id,
                                            publicationDate: d.getDate() + '.' + parseInt(d.getMonth() + 1) + '.' + d.getFullYear(),
                                            url: val.Url,
                                            title: val.Title,
                                            header: val.Header,
                                            summary: val.Summary,
                                            content: val.Content,
                                            picture: val.Picture.Url,
                                            tag: (val.BookTag) ? val.BookTag.Title : val.MainTag.Title,
                                            book: (val.BookTag) ? "book" : "",
                                            authorTitle: val.Author.Title,
                                            authorFunction: val.Author.Function,
                                            authorPicture: val.Author.Picture.Url,
                                            authorUrl: val.Author.Url,
                                            socialTitle: val.Title.replace(/'/g, ''),
                                            socialUri: val.Url.replace(/'/g, '')
                                        };
                                        that.toolbox.addItemToContainer(template, data, that.searchResultListContainer);
                                    });
                                    window.BNPtoolbox.blogArticleSearchResultList.setPager();
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
                    var authors = [];
                    $('#authorCheckBoxes input:checked').each(function () {
                        var author = $(this).attr('value');
                        if (author) {
                            authors.push(author);
                        }
                    });
                    var tags = [];
                    $('.active').each(function () {
                        var tag = $(this).attr('value');
                        if (tag) {
                            tags.push(tag);
                        }
                    });
                    var month = $("#searchMonth option:selected").val();
                    var year = $("#searchYear option:selected").val();
                    var url = '/restapi/blog/' + that.currentLanguage + '/count?IndexName=blog-search&keyword=' + encodeURIComponent(keyword) + '&tags=' + tags + '&authors=' + authors + '&month=' + month + '&year=' + year;
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
                                pager += '<a class=\"link\" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.getPreviousArticles();\">' + $('#previousLabel').val() + '</a>';
                                pager += '</li>';
                            }
                            if (itemsRemaining <= itemsPerPage && currentPage > 1) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.goToArticlePageNumber(' + (currentPage - 2) + ')\">' + (currentPage - 1) + '</a></li>';

                            if (currentPage > 0) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.goToArticlePageNumber(' + (currentPage - 1) + ')\">' + currentPage + '</a></li>';

                            pager += '<li class=\"pagination__item--current pagination__number\"><a class=\"link sf_PagerCurrent\" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.goToArticlePageNumber(' + currentPage + ')\">' + (currentPage + 1) + '</a></li>';

                            if (itemsRemaining > itemsPerPage) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.goToArticlePageNumber(' + (currentPage + 1) + ')\">' + (currentPage + 2) + '</a></li>';
                            if (currentPage === 0 && numberOfItems > (2 * itemsPerPage)) pager += '<li class=\"pagination__item pagination__number\"><a class="link" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.goToArticlePageNumber(' + (currentPage + 2) + ')\">' + (currentPage + 3) + '</a></li>';

                            if (itemsRemaining > itemsPerPage) {
                                pager += '<li class=\"pagination__item pagination__nav\">';
                                pager += '<a class=\"link\" href=\"javascript:window.BNPtoolbox.blogArticleSearchResultList.getNextArticles();\">' + $('#nextLabel').val() + '</a>';
                                pager += '</li>';
                            }
                        }
                    }
                    window.jQuery("#pagerSearch").html(pager);

                    console.log('current page ' + currentPage)

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

                    console.log($("#pager_currentPage").val());
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

                    console.log('go to artice page number ' + $("#pager_currentPage").val());
                },
                setSubscription: function setSubscription() {

                    var that = this;

                    var language = that.currentLanguage;
                    var email = $("#txt_newsletter_email").val();
                    var firstname = $("#txt_newsletter_firstname").val();
                    var lastname = $("#txt_newsletter_name").val();
                    var notification_email = $("#txt_newsletter_notification_email").val();

                    var parameters = JSON.stringify({ "Language": language, "Email": email, "FirstName": firstname, "LastName": lastname, "NotificationEmail": notification_email });

                    var url = '/restapi/blog/setsubscription';
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: parameters,
                        contentType: 'application/json',
                        success: function (result) {
                            if (result && result.ResultCode !== 500) {
                                $('.newsletterBox').addClass('sent');
                            }
                        }
                    });
                } 
            }
            window.BNPtoolbox.blogArticleSearchResultList.initialize();
            // window.BNPtoolbox.bindCardList();
        } else {
        }
    });
})(jQuery);
