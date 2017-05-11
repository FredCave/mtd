var Article = {
	
    wrapperVisible: false,

    currentArticle: "",

	init: function ( artId ) {

		console.log("Article.init", artId);

        this.bindEvents();

        // FADE OUT EDITOR
        $("#editor_wrapper").fadeOut(1000);

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

            // TITLE, PREV + NEXT STORED IN APP OBJECT
            this.loadTitle( artId );

            this.loadPrevNext( artId );

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

    loadTitle: function ( id ) {

        console.log("Article.loadTitle");

        // IF ARTICLE DATA NOT YET LOADED, EG. NAVIGATION STRAIGHT TO ARTICLE:
        // CALL AJAX HERE
        if ( App.articles === "" ) {
            console.log("Article data not loaded");
            return;
        }

        var articles = App.articles;
        $.each( articles, function ( i ) {
            if ( $(this)[0].ID === id ) {
                $("#nav_title").text( $(this)[0].title );
            }
        });

    },

    loadPrevNext: function ( id ) {

        console.log("Article.loadPrevNext");

        // IF ARTICLE DATA NOT YET LOADED, EG. NAVIGATION STRAIGHT TO ARTICLE:
        // CALL AJAX HERE
        if ( App.articles === "" ) {
            console.log("Article data not loaded");
            return;
        }

        var articles = App.articles,
            arrayPos;
        // GET ARTICLE'S POSITION IN ARRAY
        $.each( articles, function ( i ) {
            if ( $(this)[0].ID === id ) {
                arrayPos = i;
            }
            i++;
        });

        // NEXT
        var nextPos = arrayPos + 1;
        if ( nextPos >= articles.length ) {
            nextPos = 0;
        }

        $("#nav_right a").attr({
            "href"          : "#" + articles[ nextPos ].slug,
            "data-title"    : articles[ nextPos ].title
        });

        // PREV
        var prevPos = arrayPos - 1;
        if ( prevPos < 0 ) {
            prevPos = articles.length - 1;
        }

        $("#nav_left a").attr({
            "href"          : "#" + articles[ prevPos ].slug,
            "data-title"    : articles[ prevPos ].title
        });

    },

    articleClose: function () {

        console.log("Article.articleClose");

        $("#article_wrapper").fadeOut(1000);
        this.wrapperVisible = false;

    }

}
