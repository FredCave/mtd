var app = app || {};

var App = {

	articles: "",

	articlesLoaded: false,

	init: function () {

		console.log("App.init");

		// SCROLL TO TOP
		$("html,body").animate({
			scrollTop: 0 
		}, 10 );

		this.loadArticleData();

	},

	loadArticleData: function () {

		console.log("App.loadArticleData");

		// CHECK IF NOT YET LOADED
		if ( !this.articlesLoaded ) {
			
			this.articlesLoaded = true;
			AjaxCalls.loadArticleData();

		}

	}

}

$(document).on( "ready", function (){

    var appRouter = new app.MainRouter();
    Backbone.history.start({});

    App.init();

});