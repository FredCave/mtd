var app = app || {};

app.MainRouter = Backbone.Router.extend({

    initialize: function () {

        console.log("Router init");

    },

    introLoaded: false,

    // articleWrapper: false,

    editorLoaded: false,

    currentArticle: "",

	routes: {

        "article/:id/:title(/)" : "showArticle",

        "foreword"              : "showHome",

        "contents"              : "showHome",

        "colophon"              : "showHome",

        "make-book"             : "showEditor", 

        // "*other"            : "showHome"

        ""                      : "showHome"

    },

    navManager: function ( section ) {

        console.log("MainRouter.navManager", section);

        if ( section === "intro" ) {

            $("#intro").fadeIn(1000).siblings(".nav_section").fadeOut(1000);

        } else if ( section === "article" ) {

            $("#articles").fadeIn(1000).siblings(".nav_section").fadeOut(1000);

        } else if ( section === "editor" ) {

            $("#editor").fadeIn(1000).siblings(".nav_section").fadeOut(1000);

        }

    },

    showHome: function () {

        console.log("MainRouter.showHome");

        var section = Backbone.history.fragment;

        this.navManager("intro");

        if ( !this.introLoaded ) {

            if ( section !== "intro" ) {
                Home.init( section );                
            } else {
                Home.init(); 
            }

            this.introLoaded = true;

        } else {

            // NAVIGATE TO SECTION
            console.log( 36, section );

            Home.navTo( section );

        }

    },

    showArticle: function ( id ) {

        console.log("MainRouter.showArticle", id);
        
        this.navManager("article");

        Article.init( id );

    },

    showEditor: function () {

        console.log("MainRouter.showEditor");

        this.navManager("editor");

        if ( !this.editorLoaded ) {
            Editor.init();
            this.editorLoaded = true;
        } else {
            Editor.showSection();
        }

    }

});