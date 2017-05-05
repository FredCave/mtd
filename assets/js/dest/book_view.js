var app = app || {};

app.EditorView = Backbone.View.extend({
	
	initialize: function () {

		console.log("EditorView.initialize");

		// ??????

		// WHERE ARE THE SELECTED ARTICLES STORED????

		this.bindEvents();

		this.render();

		this.collection = new app.ArticleCollection();

	},

	bindEvents: function () {

		console.log("EditorView.bindEvents");

	},

	template: _.template( $('#editor_template').html() ),

	render: function () {

		console.log("EditorView.render");

		// LOAD THE VIDEO
		this.loadVideo();

		// LOAD SAVED BOOKS
		this.loadSavedBooks();

	},

	loadVideo: function () {

		console.log("EditorView.loadVideo");

	},

	loadSavedBooks: function () {

		console.log("EditorView.loadSavedBooks");

	}

});