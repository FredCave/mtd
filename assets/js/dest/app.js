var app = app || {};

$(document).on( "ready", function (){

	console.log("Ready");

    var appRouter = new app.MainRouter();
    Backbone.history.start({});

});