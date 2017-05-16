var Editor = {
	
	savedArticles: [19,34,35,37,38,45],

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

	template: _.template( $('#editor_article_template').html() ),

	loadArticles: function () {

		console.log("Editor.loadArticles");

		// BEFORE / AFTER APPEND ??
		$( "#editor_articles" ).sortable();
		$( "#editor_articles" ).disableSelection();

		$( "#editor_articles" ).append( this.template );

		// GET INFO FROM APP.ARTICLE_DATA

		// _.each( this.savedArticles, function( id ) {
		    
		//     $("#editor_articles").append(id);

		// });

	}

}