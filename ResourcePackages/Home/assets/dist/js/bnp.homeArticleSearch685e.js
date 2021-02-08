// var noConflictjQuery = noConflictjQuery || jQuery.noConflict();
(function ($) {
    $(function () {
        'use strict';
        if (window.BNPtoolbox) {
            window.BNPtoolbox.homeArticleSearch = {

                // ========= PUBLIC ==========
                // ===========================

                initialize: function initialize() {
                    this.setInitVariable();
                    this.getHomeArticleSearch();
                    this.bindLoadMore();
                },

                // ========= PRIVATE =========
                // ===========================

                // General variables, NOT page specific
                setInitVariable: function setInitVariable() {
                    // Toolbox ref
                    this.toolbox = window.BNPtoolbox;
                    this.currentLanguage = $('#currentLanguage').val();
                    this.articleListContainer = $(".mainContentLeft");
                    this.homeArticleSearchContainer = $('.home-articleCardsListContainer');
                    this.loadMoreContainer = $('.loadMoreContainer');
                    this.maxLoadMore = parseInt($('#maxLoadMore').val());
                    this.maxColumns = parseInt($('#maxColumns').val());
                    this.maxRows = parseInt($('#maxRows').val());
                    this.maxCards = parseInt($('#maxCards').val());
                    this.articles = [];
                },
                getHomeArticleSearch: function getHomeArticleSearch(skip, take){
                    
                    var that = this;

                    skip = (typeof skip !== 'undefined') ? skip : 0;
                    take = (typeof take !== 'undefined') ? take : that.maxCards;

                    if ($('#handlebar-homeArticleSearchResulItem').length){

                        var url = '/restapi/home/' + that.currentLanguage + '/search?IndexName=home-search&skip='+ skip +'&take=' + take;

                        $.ajax({
                            url: url,
                            type: 'get',
                            contentType: 'application/json',
                            success: function (result) {
                                if (result && result.ResultCode !== 500) {

                                    $.each(result.SearchResults.ListHomeArticles, function (key, val) {

                                        var data = {
                                            id: val.Id,
                                            publicationDate: val.PublicationDate,
                                            publicationDateString : val.PublicationDateString,
                                            url: val.Url,
                                            title: val.Title,
                                            articleTypeLabel: val.ArticleTypeLabel,
                                            articleLabelColor: (val.ArticleLabelColor ? val.ArticleLabelColor : '#93bd0e'),
                                            picture: val.CardPictureUrl,
                                            cardClass: (val.CardPictureUrl ? "" : "no-picture"),
                                            socialMediaSharingMessage: val.Title.replace(/'/g, ''),
                                            socialUri: val.Url
                                        }

                                        that.articles.push(data);
                                    });

                                    that.setHomeArticleSearch();
                                }
                            }
                        });
                    }
                },
                setHomeArticleSearch: function setHomeArticleSearch(skip, take){
                    var that = this;

                    skip = (typeof skip !== 'undefined') ? skip : 0;
                    take = (typeof take !== 'undefined') ? take : that.maxColumns * that.maxRows;

                    var template = $('#handlebar-homeArticleSearchResulItem');

                    // Display spinner during the loading
                    // Template of the spinner
                    var spinnerTpl = '<div id="spinner" class="bnp-spinner"><div class="dot bounce1"></div><div class="dot bounce2"></div><div class="dot bounce3"></div></div>';
                    $(spinnerTpl).prependTo(that.loadMoreContainer);
                    var spinner = $("#spinner");

                    for (var i = skip; i < skip + take; i++) {
                        spinner.remove();
                        //Add item to the dom using handelbar
                        that.toolbox.addItemToContainer(template, that.articles[i], that.homeArticleSearchContainer);
                        that.toolbox.bindCardList();
                    }
                },
                bindLoadMore: function bindLoadMore() {
                    var that = this;

                    var buttonReadMore = $(".btnLoadMore"),
                        nbCards = that.maxColumns * that.maxRows,
                        nbLoadMore = 0;

                    // Create dom element in the contentList using spinnerTpl

                    buttonReadMore.on("click", function () {
                        var loadMoreContainerPos = that.loadMoreContainer.offset().top;

                        that.setHomeArticleSearch(nbCards, that.maxColumns);
                        nbCards = nbCards + that.maxColumns;
                        nbLoadMore++; 

                        setTimeout(function () { 
                            $('html, body').animate({ scrollTop: loadMoreContainerPos - 100 }, 800);
                        }, 800);

                        if (nbLoadMore >= that.maxLoadMore){
                            buttonReadMore.hide();
                        }
                    });
                }
            };
            window.BNPtoolbox.homeArticleSearch.initialize();
        } else {
            //console.log("BNPtoolbox doesn't exist!");
        }
    });
})(jQuery);
