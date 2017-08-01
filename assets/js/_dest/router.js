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

            HomeNav.scrollBlocked = false;
            $(".current_article").removeClass("prepped");

            $("#intro_scroll_wrapper").css({
                "display"   : "block", 
                "opacity" : "1"
            });            

            $(".article_element").css({
                "opacity" : "0",
            });

            setTimeout( function(){
                    
                $(".article_element").css({
                    "display"   : "none", 
                    "z-index"   : ""    
                });

                $("#editor_scroll_wrapper").css({
                    "display"   : "none", 
                    "z-index"   : ""    
                });

                if ( !Home.pageLoaded ) {
                    HomeNav.colourManager();
                }

            }, 500 );

            // IF INTRO ANIMATION ALREADY INIT: RESTART LOOP
            console.log( 72, Home.animationInit );
            if ( Home.animationInit ) {
                Home.introAnimation( true );
            }

        } else if ( section === "article" ) {

            HomeNav.scrollBlocked = true;

            $("html").css("background-color","#fffef8");

            $("#article_nav").css({
                "background-color"  : "transparent",
                "box-shadow"        : "none"
            });

            $(".article_element").css({
                "display"   : "block", 
                "z-index"   : "999"
            });

            setTimeout( function(){
                
                $(".article_element").css({
                    "opacity" : "1" 
                });

                $(".top_level_wrapper").not("#article_scroll_wrapper").css({
                    "opacity" : "0"
                });

                $("#editor_scroll_wrapper").css({
                    "display"   : "none", 
                    "z-index"   : ""    
                });

                // SET NAV COLOUR
                Articles.colourManager();

            }, 500 );

            // STOP INTRO ANIMATION
            console.log( 112, Home.interval );
            clearInterval( Home.interval );

        } else if ( section === "editor" ) {

            HomeNav.scrollBlocked = true;
            $(".current_article").removeClass("prepped");

            $("html").css("background-color","#fffef8");

            $("#editor_scroll_wrapper").css({
                "display"   : "block", 
                "z-index"   : "999",
                "opacity"   : "1"
            }).siblings(".top_level_wrapper").fadeOut(1000);

            $(".article_element").fadeOut(1000);

            // STOP INTRO ANIMATION
            clearInterval( Home.interval );

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
            $("html,body").animate({
                scrollTop : 0
            }, 10 );
        } else {
            console.log( 113, "Don't clear hash." ); 
            Backbone.history.navigate( section, {trigger: true} );   
        }

        _.delay( function(){
            Home.init();            
        }, 250 );

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