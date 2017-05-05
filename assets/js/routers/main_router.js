var app = app || {};

app.MainRouter = Backbone.Router.extend({

    introLoaded: false,

    articleWrapper: false,

    currentArticle: "",

	routes: {

        "test-one"      : "showArticle",

        "test-two"      : "showArticle",

        "test-three"    : "showArticle",

        "foreword"      : "introNav",

        "contents"      : "introNav",

        "colophon"      : "introNav",

        "make-book"     : "bookEditor", 

        "*other"        : "showHome"

    },

    introNav: function () {

        console.log("MainRouter.introNav");

        if ( !this.introLoaded ) {
            Home.init();
            this.introLoaded = true;
        }

    },

    getId: function ( slug ) {

        console.log( 45, slug );

        switch ( slug ) {
            case "test-one" :
                id = 19;
                break;
            case "test-two" :
                id = 34;
                break;
            case "test-three" :
                id = 35;
                break;
        }

        return id;

    },

    showHome: function () {

        console.log("MainRouter.showHome");

        if ( !this.introLoaded ) {
            Home.init();
            this.introLoaded = true;
        }

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