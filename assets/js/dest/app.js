var app = app || {};

$(document).on( "ready", function (){

	console.log("Ready");

	// new app.AppView();
    var appRouter = new app.MainRouter();
    Backbone.history.start({});

});