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

		var self = this;

		$("#editor_close").on("click", function (){
			window.history.back();
		});

		// ONCE ARTICLE DATA LOADED (IF NEEDED)
		$(document).on("dataloaded", function(){
			
			self.loadArticles();

		});

	},

	showEditor: function () {

		console.log("Editor.showEditor");

		// GET ANY SAVED BOOKS
		this.loadArticleCheck();

		// RENDER
		$("#intro_wrapper").fadeOut(1000);
		$("#article_wrapper").fadeOut(1000);
		$("#editor_wrapper").fadeIn(1000);

	},

	template: _.template( $('#editor_article_template').html() ),

	loadArticleCheck: function () {

		console.log("Editor.loadArticleCheck");

		if ( App.articles === "" ) {
			console.log( 56, "Articles not loaded." );
			// LOAD ARTICLE DATA
			App.loadArticleData();
		} else {
			console.log(60);
			this.loadArticles();
		}

	},

	loadArticles: function () {

		console.log("Editor.loadArticles");

		var self = this,
			articles = this.savedArticles,
			articleData = App.articles;

		console.log( 73, articles, articleData );

		// IF NO ARTICLES
		if ( articles.length < 1 ) {
			$("#editor_articles").append("You currently have no saved articles.");
			return;
		}

		// LOOP THROUGH SAVED ARTICLES
		_.each( this.savedArticles, function( id ) {
		    	
			self.data = "test";

			console.log( 88, self.data );

			// GET DATA FROM ARTICLE DATA

			$("#editor_articles").append( self.template( self.data ) );

		});		

		// BEFORE / AFTER APPEND ??
		// $( "#editor_articles" ).sortable();
		// $( "#editor_articles" ).disableSelection();

		// $( "#editor_articles" ).append( this.template );

		// GET INFO FROM APP.ARTICLE_DATA



	}

}