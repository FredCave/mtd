var app = app || {};

app.ArticleView = Backbone.View.extend({

	el: "#article_current",

	initialize: function () {

		console.log("ArticleView.initialize");

		var self = this;

		this.model = new app.ArticleModel({id:this.id});
		this.model.fetch().then( function(){

			console.log( 16, self.model );
			self.render();

		});

	}, 

	template: _.template( $('#article_template').html() ),

	render: function () {

		console.log("ArticleView.render");

		var self = this;

		// GET TITLE
		$("#nav_title").text( this.model.attributes[0].title );

		this.$el.empty().append( this.template( this.model ) ); 

		// LOAD PREV + NEXT
		_.defer( function(){ self.loadNextPrev() });

		// FADE IN
		$("#articles").fadeIn(1000);

	},

	loadNextPrev: function () {

		console.log("ArticleView.loadNextPrev");

		console.log( 47, this.model );

	}

});