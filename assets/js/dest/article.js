var Article = {
	
    wrapperVisible: false,

    currentArticle: "",

	init: function ( artId ) {

		console.log("Article.init", artId);

        this.bindEvents();

        if ( !this.wrapperVisible ) {
            // SHOW WRAPPER 
            $("#article_wrapper").fadeIn( 1000 );
            this.wrapperVisible = true;
        }

        // IF URL ARTICLE IS NOT LOADED IN CURRENT
        if ( artId !== this.currentArticle ) {
            // LOAD ARTICLE
            AjaxCalls.loadArticle( artId );
            this.currentArticle = artId;

           

            // SET TIMEOUT: LOAD PREV + NEXT


        } else {
            // FADE IN ARTICLES
            $("#article_wrapper").fadeIn(1000);
        }

	},

    bindEvents: function () {

        console.log("Article.bindEvents");

        var self = this;

        $("#nav_close").on("click", function(){

            self.articleClose();

        });

    },

    articleClose: function () {

        console.log("Article.articleClose");

        $("#article_wrapper").fadeOut(1000);

    }

}
