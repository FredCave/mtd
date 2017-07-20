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
			
			AjaxCalls.loadArticleData();
			this.loadSatelliteData();
			this.articlesLoaded = true;

		}

	},

	loadSatelliteData: function () {

		console.log("App.loadSatelliteData");
		
		// LOAD SATELLITE IDs
		AjaxCalls.loadSatelliteData();

	}

}

$(document).on( "ready", function (){

	new app.MainRouter();
	Backbone.history.start({});

	App.init();

});