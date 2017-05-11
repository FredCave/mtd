var app = app || {};

app.MainRouter = Backbone.Router.extend({

    introLoaded: false,

    articleWrapper: false,

    currentArticle: "",

	routes: {

        "a-path-for-the-documentation-of-teaching-practice" : "showArticle",

        "the-skin-is-the-most-external-layer-of-the-brain"  : "showArticle",

        "documentation-as-part-of-artistic-practice"        : "showArticle",

        "foreword"      : "introNav",

        "contents"      : "introNav",

        "colophon"      : "introNav",

        "make-book"     : "showEditor", 

        "*other"        : "showHome"

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

    getId: function ( slug ) {

        console.log( 45, slug );

        switch ( slug ) {
            case "a-path-for-the-documentation-of-teaching-practice" :
                id = 19;
                break;
            case "the-skin-is-the-most-external-layer-of-the-brain" :
                id = 34;
                break;
            case "documentation-as-part-of-artistic-practice" :
                id = 35;
                break;
        }

        return id;

    },

    showArticle: function ( ) {

        console.log("MainRouter.showArticle");
        
        var article = Backbone.history.fragment,
            artId = this.getId( article );

        Article.init( artId );

    },

    showEditor: function () {

        console.log("MainRouter.showEditor");

        Editor.init();

    }

});