var app = app || {};

app.MainRouter = Backbone.Router.extend({

    initialize: function () {

        console.log("Router init");

    },

    introLoaded: false,

    editorLoaded: false,

    currentArticle: "",

	routes: {

        "article/:id/:title(/)"     : "showArticle",

        "foreword"                  : "showIntro",

        "contents"                  : "showIntro",

        "colophon"                  : "showIntro",

        "make-book"                 : "showEditor", 

        "*other"                    : "showIntro", 

        ""                          : "showIntro"

    },

    wrapperManager: function ( section ) {

        console.log("MainRouter.wrapperManager", section);

        if ( section === "intro" ) {

            $("#intro_scroll_wrapper").fadeIn(1000).siblings(".top_level_wrapper").fadeOut(1000);
            // ARTICLES SCROLL TO TOP
            $("#article_scroll_wrapper").animate({
                scrollTop : 0
            }, 500 );

        } else if ( section === "article" ) {

            $("#article_scroll_wrapper").fadeIn(1000).siblings(".top_level_wrapper").fadeOut(1000);
            // INTRO SCROLL TO CONTENTS
            // HomeNav.scrollToContents();

        } else if ( section === "editor" ) {

            $("#editor_scroll_wrapper").fadeIn(1000).siblings(".top_level_wrapper").fadeOut(1000);

        }

    },

    showIntro: function () {

        console.log("MainRouter.showIntro");

        var section = Backbone.history.fragment;

        this.wrapperManager("intro");

        // IF SECTIONS LOADED
        if ( this.introLoaded ) {

            // NAVIGATE TO SECTION
            console.log( "MainRouter.showIntro", section );
            HomeNav.scrollTo( section );

        } else {

            if ( section !== "intro" ) {
                // LOAD AND THEN NAV TO
                Home.init( section );                
            } else {
                // LOAD AS NORMAL
                Home.init(); 
            }
            this.introLoaded = true;

        }

    },

    showArticle: function ( id ) {

        console.log("MainRouter.showArticle", id);
        
        this.wrapperManager("article");

        Article.callArticle( id );

    },

    showEditor: function () {

        console.log("MainRouter.showEditor");

        this.wrapperManager("editor");

        if ( !this.editorLoaded ) {
            Editor.init();
            this.editorLoaded = true;
        } else {
            Editor.showSection();
        }

    }

});