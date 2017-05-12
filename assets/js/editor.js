var Editor = {
	
	savedArticles: [],

	init: function () {

		console.log("Editor.init");

		this.bindEvents();

		// SHOW EDITOR
		this.showEditor();

	},

	bindEvents: function () {

		console.log("Editor.bindEvents");

		$("#editor_close").on("click", function (){
			window.history.back();
		});

	},

	showEditor: function () {

		console.log("Editor.showEditor");

		// GET ANY SAVED BOOKS
		this.loadArticles();

		// RENDER
		$("#article_wrapper").fadeOut(1000);
		$("#editor_wrapper").fadeIn(1000);

	},

	loadArticles: function () {

		console.log("Editor.loadArticles");

		_.each( this.savedArticles, function( id ) {
		    
		    $("#editor_articles").append(id);
		    
		});

	}

}