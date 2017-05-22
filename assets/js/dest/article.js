var Article = {
	
    // wrapperVisible: false,

    currentArticle: "",

	init: function ( artId ) {

		console.log("Article.init", artId);

        this.bindEvents();

        // IF URL ARTICLE IS NOT LOADED IN CURRENT
        if ( artId !== this.currentArticle ) {
            
            // LOAD ARTICLE
            AjaxCalls.loadArticle( artId );
            this.currentArticle = artId;

            // TITLE, PREV + NEXT STORED IN APP.ARTICLEDATA OBJECT
            this.articleDataCheck();

        } 

	},

    bindEvents: function () {

        console.log("Article.bindEvents");

        var self = this;

        // ONCE ARTICLE DATA LOADED (IF NEEDED)
        $(document).on("dataloaded", function(){
            
            self.loadTitle( self.currentArticle );
            console.log( 37, "Dataloaded event", self.currentArticle );

        });

        $("#nav_close").off("click");
        $("#nav_close").on("click", function(){

            // self.articleClose();

            // GO BACK TO CONTENTS
            app.MainRouter.navigate('contents');

        });

        $("#article_current").off("click");
        $("#article_current").on("click", ".add_to_book", function(e){

            e.preventDefault();
            self.addToBook();

        });

        $("#article_current").on("click", ".download_pdf", function(e){

            var thisHref = "generate/?art=" + self.currentArticle;
            $(this).attr("href", thisHref);

        });

    },

    articleDataCheck: function () {

        console.log("Editor.articleDataCheck");

        if ( App.articles === "" ) {
            console.log( 56, "Article data not loaded." );
            // LOAD ARTICLE DATA
            App.loadArticleData();
        } else {
            console.log(60, "Article data loaded.");
            this.loadTitle( this.currentArticle );
        }

    },  

    loadTitle: function ( id ) {

        console.log("Article.loadTitle", id );

        var articles = App.articles;

        console.log( 89, articles );

        $.each( articles, function ( i ) {
            if ( $(this)[0].ID === parseInt(id) ) {
                $("#nav_title").text( $(this)[0].title );
            }
        });

        this.loadPrevNext( id );

    },

    loadPrevNext: function ( id ) {

        console.log("Article.loadPrevNext", id );

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

    // articleClose: function () {

    //     console.log("Article.articleClose");

    //     $("#article_wrapper").fadeOut(1000);
    //     this.wrapperVisible = false;

    // }

}
