var app = app || {};

app.AppView = Backbone.View.extend({

	initialize: function () {

		console.log("AppView.initialize");

		// IF NOT MOBILE: LOAD VIDEO
		new app.VideoView();

		// LOAD INTRO STRUCTURE
		new app.IntroView();

		// FETCH ALL ARTICLES
		this.loadContentsList();

	},

	bindEvents: function () {

		console.log("AppView.bindEvents");

		// $("html,body").on( "scroll", function(){
		// 	$("html,body").stop();
		// });

	},

	contentsTemplate: _.template( $('#contents_template').html() ),

	loadContentsList: function () {

		console.log("AppView.loadContentsList");

		var self = this;

		this.collection = new app.ArticleCollection();

		this.collection.fetch().then( function(){

			$("#contents_list").append( self.contentsTemplate( self.collection ) );

		});

		// this.model = new app.AppModel();
		// this.model.fetch().then( function(){

		// 	$("#contents_list").append( self.contentsTemplate( self.model ) );

		// });

	}

});