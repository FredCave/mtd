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

    // wrapperManager: function ( section ) {

    //     console.log("MainRouter.wrapperManager", section);

    //     if ( section === "intro" ) {

    //         HomeNav.scrollBlocked = false;
    //         $(".current_article").removeClass("prepped");

    //         $("#intro_scroll_wrapper").css({
    //             "display"   : "block", 
    //             "opacity" : "1"
    //         });            

    //         // $(".article_element").css({
    //         //     "opacity" : "0",
    //         // });

    //         setTimeout( function(){
                    
    //             // $(".article_element").css({
    //             //     "display"   : "none", 
    //             //     "z-index"   : ""    
    //             // });

    //             // $("#editor_scroll_wrapper").css({
    //             //     "display"   : "none", 
    //             //     "z-index"   : ""    
    //             // });

    //             if ( !Home.pageLoaded ) {
    //                 HomeNav.colourManager();
    //             }

    //         }, 500 );

    //         // IF INTRO ANIMATION ALREADY INIT: RESTART LOOP
    //         if ( Home.animationInit ) {
    //             Home.introAnimation( true );
    //         }

    //     } else if ( section === "article" ) {

    //         // HomeNav.scrollBlocked = true;

    //         // $("html").css("background-color","#fffef8");

    //         // $("#article_nav").css({
    //         //     "background-color"  : "transparent",
    //         //     "box-shadow"        : "none"
    //         // });

    //         // $(".article_element").css({
    //         //     "display"   : "block", 
    //         //     "z-index"   : "999"
    //         // });

    //         // setTimeout( function(){
                
    //         //     $(".article_element").css({
    //         //         "opacity" : "1" 
    //         //     });

    //         //     $(".top_level_wrapper").not("#article_scroll_wrapper").css({
    //         //         "opacity" : "0"
    //         //     });

    //         //     $("#editor_scroll_wrapper").css({
    //         //         "display"   : "none", 
    //         //         "z-index"   : ""    
    //         //     });

    //         //     // SET NAV COLOUR
    //         //     Articles.colourManager();

    //         // }, 500 );

    //         // // STOP INTRO ANIMATION
    //         // console.log( 112, Home.interval );
    //         // clearInterval( Home.interval );

    //     } else if ( section === "editor" ) {

    //         // HomeNav.scrollBlocked = true;
    //         // $(".current_article").removeClass("prepped");

    //         // $("html").css("background-color","#fffef8");

    //         // $("#editor_scroll_wrapper").css({
    //         //     "display"   : "block", 
    //         //     "z-index"   : "999",
    //         //     "opacity"   : "1"
    //         // }).siblings(".top_level_wrapper").fadeOut(1000);

    //         // $(".article_element").fadeOut(1000);

    //         // // STOP INTRO ANIMATION
    //         // clearInterval( Home.interval );

    //     }

    // },

    showIntro: function () {

        console.log("MainRouter.showIntro");

        var section = Backbone.history.fragment;

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

        // ALLOW NEW CURRENT ARTICLE TO BE PREPPED
        $(".current_article").removeClass("prepped");

        HomeNav.scrollBlocked = false;

        // UNFIX INTRO
        var offset = Math.abs( parseInt( $("#intro_sections").css("top") ) );
        if ( isNaN( offset ) ) {
            offset = 0;
        }

        console.log( 172, offset );


        // SHOW INTRO BUT DON'T UNFIX YET
        $("#intro_scroll_wrapper").css({
            "display"   : "block", 
            "opacity"   : "1"
        });   
        $("#intro_scroll_wrapper").css({
            "position"  : "",
            "height"    : ""
        });

        // JOIN???

        $("#intro_sections").css({
            "position"  : "",
            "top"       : "",
            "width"     : ""
        }); 

        $("html,body").animate({
            scrollTop : offset
        }, 1 ); 


        // FADE OUT ARTICLE
        console.log(166);
        
        $("#article_nav").animate({
            "opacity" : "0"                
        }, 1000 );

        $("#article_scroll_wrapper").animate({
            "opacity" : "0"                
        }, 1000, function(){
           
            // AFTER FADE OUT
            $(".article_element").css({
                "display"   : "",
                "z-index"   : ""                
            });

            $("#editor_scroll_wrapper").animate({
                "opacity" : 0
            }, 1000, function (){

                $(this).css({
                    "display"   : "none", 
                    "z-index"   : ""    
                });

            });

            if ( !Home.pageLoaded ) {
                HomeNav.colourManager();
            }

            // IF INTRO ANIMATION ALREADY INIT: RESTART LOOP
            if ( Home.animationInit ) {
                Home.introAnimation( true );
            }

            _.defer( function(){
                Home.init();                 
            });

            // RESET HASHCHECK
            HomeNav.introHidden = false;

        });

    },

    showArticle: function ( id ) {

        console.log("MainRouter.showArticle", id);

        // STOP INTRO ANIMATION
        clearInterval( Home.interval );

        // STOP HASHCHECK
        HomeNav.introHidden = true;

        // FADE IN WHITE BG (FIXED) + NAV
        console.log( 80, "Fade in article wrapper." );
        $(".current_article").empty();

        $("#editor_scroll_wrapper").css({
            "z-index" : ""
        });
        
        $("#article_scroll_wrapper").css({
            "display"   : "block",
            "z-index"   : 9999
        }).animate({
            "opacity" : "1"  
        }, 1000, function (){

           
            _.defer( function(){
            
                // LOAD ARTICLE
                Articles.loadArticle( id ); 

                // SET NAV COLOUR
                Articles.colourManager();
                   
            });

            $("#article_nav").css({
                "display"   : "block",
                "z-index"   : 9999
            }).animate({
                "opacity" : "1"                
            }, 1000 );

            // FIX INTRO WRAPPER LEVEL WITH TOP OF CONTENTS
            var forewordH = $("#intro_foreword").height();
            $("#intro_scroll_wrapper").css({
                "position"  : "fixed",
                "height"    : "100vh"
            });
            $("#intro_sections").css({
                "position" : "absolute",
                "top" : 60 - forewordH,
                "width" : "100%"
            });

            $("#editor_scroll_wrapper").animate({
                "opacity" : 0
            }, 1000, function (){
                $(this).css({
                    "display"   : "none", 
                    // "z-index"   : ""    
                });
            });

            // ARTICLE SCROLL WRAPPER ABSOLUTE
            $("#article_scroll_wrapper").css({
                "position"  : "absolute",
                "height"    : "auto"
            });

        });

    },

    showEditor: function () {

        console.log("MainRouter.showEditor");

        // STOP INTRO ANIMATION
        clearInterval( Home.interval );

        // STOP HASHCHECK
        HomeNav.introHidden = true;

        $("html").css("background-color","#fffef8");

        // FIRST FIXED 
        $("#editor_scroll_wrapper").css({
            "position" : "fixed",
            "display"   : "block", 
            "z-index"   : "9999",            
        }).animate({
            "opacity" : 1
        }, 1000, function (){

            // FIX OTHER WRAPPERS
            var forewordH = $("#intro_foreword").height();
            $("#intro_scroll_wrapper").css({
                "position"  : "fixed",
                "height"    : "100vh"
            });
            $("#intro_sections").css({
                "position" : "absolute",
                "top" : 60 - forewordH,
                "width" : "100%"
            });


        });

        Editor.init();

    }

});