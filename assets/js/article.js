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

        // FOOTNOTES LINK
        $("#article_current").on("click", ".footnote_link", function(){

            self.viewFootnotes();

        });

        $(window).on("resize",  _.throttle( function(){
            self.resizeIframes();
        }, 1000 ));

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

            // GET RATIO
            if ( $(this).attr("height") > $(this).attr("width") ) {

                $(this).addClass("portrait");

            }

        });

    },

    htmlPrep: function () {

        console.log("Article.htmlPrep");

        // ADD TARGET=_BLANK TO EXTERNAL LINKS
        $("#article_current a").each( function(){

            if ( $(this).attr("href").indexOf("http") > -1 ) {
                $(this).attr( "target", "_blank" );
            }

        });

        // ADD GLYPHS TO CAPTIONS + UNWRAP
        $("#article_current").find(".caption, .caption_vertical").each( function(){

            if ( $(this).parent("p").length ) {
                $(this).unwrap();
            }

            $(this).prepend("<span class='glyph'>&#10230;</span> ");

        });

        // ADD GLYPHS TO WINGDING TEXTS
        $("#article_current").find(".after_wingdings").each( function(){

            console.log( 169, "Glyph added." );
            $(this).prepend("<span class='wingdings'><img src='" + TEMPLATE + "/assets/img/wingding_glyph.svg' /></span> ");

        });

        // IF ARTICLE 3: EXTRACT IMAGE
        $("#article_current").find(".article_template_3").each( function(){

            // IF CONTAINS IMAGES
            if ( $(this).find("img").length ) {

                var newWrapper = $("<div class='image_wrapper'></div>");
                $(this).find("img").appendTo( newWrapper );
                $(this).find(".caption").appendTo( newWrapper );
                
            }

            // WRAP TEXT ELEMENTS IN WRAPPER
            $(this).wrapInner( "<div class='text_wrapper'></div>");
            $(this).append(newWrapper);

        });

        // IF TEMPLATE 6: RESIZE IFRAME
        this.resizeIframes();

    },

    resizeIframes: function () {

        console.log("Article.resizeIframes");

        $("iframe").each( function(){

            var ratio = $(this).attr("width") / $(this).attr("height");

            // IF IN TEMPLATE 6
            if ( $(this).parents(".article_template_6").length ) {

                // GET RATIO
                var thisH = $(".article_inner_wrapper").width() / ratio;
                $(this).css({
                    "height" : thisH
                });

            } else if ( $(this).parents(".article_template_5").length ) {

                // GET RATIO
                var thisH = ( $(".article_inner_wrapper").width() / 2 - 36 ) / ratio;
                $(this).css({
                    "height" : thisH
                });
                console.log( 216, thisH );                

            }

        });

    }, 

    loadTitle: function ( id ) {

        console.log("Article.loadTitle", id );

        var articles = App.articles;

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
            "href"          : "#article/" + articles[ prevPos ].ID + "/" + articles[ prevPos ].slug,
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

    viewFootnotes: function () {

        console.log("Article.viewFootnotes");

        var target = $(".article_footnotes").offset().top;
        console.log( 314, target );

        $("html,body").animate({
            scrollTop : target - 72
        }, 1000 );

        // IF MOBILE – SCROLL UP


    }

}
