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

        $("#nav_close").off("click");
        $("#nav_close").on("click", function(){

            self.articleClose();

        });

        $("#article_current").off("click");
        $("#article_current").on("click", ".add_to_book", function(e){

            console.log(54);

            e.preventDefault();
            self.addToBook();

        });

        $("#article_current").on("click", ".download_pdf", function(e){

            var thisHref = "generate/?art=" + self.currentArticle;
            $(this).attr("href", thisHref);

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
            if ( $(this)[0].ID === parseInt(id) ) {
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
            if ( $(this)[0].ID === parseInt(id) ) {
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
            "href"          : "#article/" + articles[ nextPos ].ID + "/" + articles[ nextPos ].slug,
            "data-title"    : articles[ nextPos ].title
        });

        // PREV
        var prevPos = arrayPos - 1;
        if ( prevPos < 0 ) {
            prevPos = articles.length - 1;
        }

        $("#nav_left a").attr({
            "href"          : "#article/" + articles[ nextPos ].ID + "/" + articles[ prevPos ].slug,
            "data-title"    : articles[ prevPos ].title
        });

    },

    addToBook: function () {

        console.log("Article.addToBook");

        console.log( Editor.savedArticles, $.inArray( parseInt(this.currentArticle), Editor.savedArticles ) );

        // CHECK IF THIS ID ALREADY IN SAVED BOOKS ARRAY
        if ( $.inArray( parseInt(this.currentArticle), Editor.savedArticles ) === -1 ) {
            Editor.savedArticles.push( parseInt(this.currentArticle) );
        } else {
            console.log("Already saved.");
        }

    },

    downloadPdf: function () {

        console.log("Article.downloadPdf");

    },   

    articleClose: function () {

        console.log("Article.articleClose");

        $("#article_wrapper").fadeOut(1000);
        this.wrapperVisible = false;

    }

}
