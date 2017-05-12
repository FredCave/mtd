var app = app || {};

app.MainRouter = Backbone.Router.extend({

    introLoaded: false,

    articleWrapper: false,

    currentArticle: "",

	routes: {

        "article/:id/:title"    : "showArticle",

        "foreword"          : "introNav",

        "contents"          : "introNav",

        "colophon"          : "introNav",

        "make-book"         : "showEditor", 

        "*other"            : "showHome"

    },

    showHome: function () {

        console.log("MainRouter.showHome");

        if ( !this.introLoaded ) {
            Home.init();
            this.introLoaded = true;
        }

    },

    introNav: function () {

        console.log("MainRouter.introNav");

        var section = Backbone.history.fragment;

        if ( !this.introLoaded ) {
            Home.init( section );
            this.introLoaded = true;
        } else {
            // NAVIGATE TO SECTION
            Home.navTo( section );
        }

    },

    showArticle: function ( id ) {

        console.log("MainRouter.showArticle", id);
        
        Article.init( id );

    },

    showEditor: function () {

        console.log("MainRouter.showEditor");

        Editor.init();

    }

});