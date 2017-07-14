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

	}
}

$(document).on( "ready", function (){

	console.log("Ready");

    var appRouter = new app.MainRouter();
    Backbone.history.start({});

    console.log( 45, Backbone.history.fragment );

    App.init();

});