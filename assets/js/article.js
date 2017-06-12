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

        // NAV ARROWS CLICK
        $(".nav_arrow").on("click", function(e){
            
            // e.preventDefault();
            $(".article_inner_wrapper").fadeOut(100);

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

        console.log("Article.articleDataCheck");

        if ( App.articles === "" ) {
            console.log( 56, "Article data not loaded." );
            // LOAD ARTICLE DATA
            App.loadArticleData();
        } else {
            console.log(60, "Article data loaded.");
            this.loadTitle( this.currentArticle );
        }

    },  

    ajaxSuccess: function ( data ) {

        console.log("Article.ajaxSuccess");

        this.colourCheck( data );

        $("#article_current").html( data );

        this.imageSizes();
        this.htmlPrep();

        $("#article_current").find(".article_inner_wrapper").fadeIn(1000);

    },

    colourCheck: function ( data ) {

        console.log("Article.colourCheck");

        var bgColour = data.split("article_inner_wrapper")[1].split("\"")[0].trim();

        if ( bgColour === "grey" ) {
            $("#article_wrapper").addClass("grey");
            $("#article_nav").addClass("grey");
        } else {
            $("#article_wrapper").removeClass("grey");
            $("#article_nav").removeClass("grey");           
        }

    },

    imageSizes: function () {

        console.log("Article.imageSizes");

        $("#article_current").find("img").each( function(){

            console.log( 128, $(this).attr("height"), $(this).attr("width") );

            // GET RATIO
            if ( $(this).attr("height") > $(this).attr("width") ) {

                console.log( 131, "portrait", $(this) );
                $(this).addClass("portrait");

            }

        });

    },

    htmlPrep: function () {

        console.log("Article.htmlPrep");

        // ADD GLYPHS TO CAPTIONS + UNWRAP
        $("#article_current").find(".caption").each( function(){

            if ( $(this).parent("p").length ) {
                $(this).unwrap();
            }

            $(this).prepend("<span class='glyph'>&#10230;</span> ");
            console.log( 127, $(this).text() );

        });

        // IF ARTICLE 3: EXTRACT IMAGE
        $("#article_current").find(".article_template_3").each( function(){

            // IF CONTAINS IMAGES
            if ( $(this).find("img").length ) {

                var newWrapper = $("<div class='image_wrapper'></div>");
                $(this).find("img").appendTo( newWrapper );
                $(this).find(".caption").appendTo( newWrapper );
                
                // WRAP TEXT ELEMENTS IN WRAPPER
                $(this).wrapInner( "<div class='text_wrapper'></div>");
                $(this).append(newWrapper);

            }

        });


    },

    loadTitle: function ( id ) {

        console.log("Article.loadTitle", id );

        var articles = App.articles;

        console.log( 89, articles );

        $.each( articles, function ( i ) {
            if ( $(this)[0].ID === parseInt(id) ) {
                $("#nav_title span").text( $(this)[0].title );
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
