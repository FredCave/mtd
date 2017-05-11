var app = app || {};

var App = {

	articles: "",

	init: function () {

		console.log("App.init");

		this.loadArticleData();

	},

	loadArticleData: function () {

		console.log("App.loadArticleData");

		var articleData = AjaxCalls.loadArticleData();

		// HOW TO DO THIS WITHOUT SET TIMEOUT??????
		setTimeout( function(){

			console.log( 23, App.articles );

		}, 2000 );

	}

}

$(document).on( "ready", function (){

	console.log("Ready");

    var appRouter = new app.MainRouter();
    Backbone.history.start({});

    App.init();

});