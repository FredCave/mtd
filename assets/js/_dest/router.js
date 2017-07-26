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

            $("#intro_scroll_wrapper").css({
                "display"   : "block", 
                "opacity" : "1"
            });            

            $("#article_scroll_wrapper").css({
                "opacity" : "0",
            });

            setTimeout( function(){
                    
                $("#article_scroll_wrapper").css({
                    "display"   : "none", 
                    "z-index"   : ""    
                });

                if ( !Home.pageLoaded ) {
                    HomeNav.colourManager();
                }

            }, 500 );

        } else if ( section === "article" ) {

            $("html").css("background-color","#fffef8");

            $("#article_nav").css({
                "background-color"  : "transparent",
                "box-shadow"        : "none"
            });

            $("#article_scroll_wrapper").css({
                "display"   : "block", 
                "z-index"   : "999"
            });

            setTimeout( function(){
                $("#article_scroll_wrapper").css({
                    "opacity" : "1" 
                }).siblings(".top_level_wrapper").css({
                    "opacity" : "0"
                });

                // SET NAV COLOUR
                Articles.colourManager();

            }, 500 );

        } else if ( section === "editor" ) {

            $("html").css("background-color","#fffef8");

            $("#editor_scroll_wrapper").fadeIn(1000).siblings(".top_level_wrapper").fadeOut(1000);

        }

    },

    showIntro: function () {

        console.log("MainRouter.showIntro");

        var section = Backbone.history.fragment;

        this.wrapperManager("intro");

        console.log( 105, Home.pageLoaded );

        if ( !Home.pageLoaded ) {
            console.log( 108, "Clear hash." );
            // CLEAR HASH
            Backbone.history.navigate( "", {trigger: false} );  
        } else {
            console.log( 113, "Don't clear hash." );   
        }

        Home.init();

    },

    showArticle: function ( id ) {

        console.log("MainRouter.showArticle", id);

        Articles.currentArticle = id;
        
        this.wrapperManager("article");

        Articles.loadArticle( id );

    },

    showEditor: function () {

        console.log("MainRouter.showEditor");

        this.wrapperManager("editor");

        Editor.init();

    }

});