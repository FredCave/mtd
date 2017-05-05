var app = app || {};

app.MainRouter = Backbone.Router.extend({

    articleWrapper: false,

    currentArticle: "",

	routes: {

        "test-one"      : "articleShow",

        "test-two"      : "articleShow",

        "test-three"    : "articleShow",

        "foreword"      : "introNav",

        "contents"      : "introNav",

        "colophon"      : "introNav",

        "make-book"     : "bookEditor", 

        "*other"        : "showHome"

    },

    introNav: function () {

        console.log("MainRouter.introNav");

        if ( !$("#intro_nav").length ) {
            new app.AppView();
        }

    },

    showHome: function () {

    	console.log("MainRouter.showHome");

        if ( !$("#intro_nav").length ) {
            new app.AppView();
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

    bindWrapperEvents: function () {

        console.log("MainRouter.bindWrapperEvents");

        var self = this;

        $("#articles").off();
        $("#articles").on("click", "#nav_close", function(){

            self.articleClose();

        });

    },

    articleShow: function ( ) {

        console.log("MainRouter.articleShow");

        var article = Backbone.history.fragment,
            artId = this.getId( article ),
            wrapperTemplate = _.template( $('#article_wrapper_template').html() );

        // CHECK IF WRAPPER EXISTS
        if ( !this.articleWrapper ) {
            console.log("Article wrapper appended.");
            $("#articles").append( wrapperTemplate() );
            this.bindWrapperEvents();
            this.articleWrapper = true;
        }

        // IF URL ARTICLE IS NOT LOADED IN CURRENT
        if ( artId !== this.currentArticle ) {
            new app.ArticleView({id:artId});
            this.currentArticle = artId;
        } else {
            // FADE IN ARTICLES
            $("#articles").fadeIn(1000);
        }

    },

    articleClose: function () {

        console.log("MainRouter.articleClose");

        $("#articles").fadeOut(1000);

    },

    bookEditor: function () {

        console.log("MainRouter.bookEditor");

        var appModel = new app.AppModel;
        new app.EditorView({model:appModel});

    }

});