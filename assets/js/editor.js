var Editor = {
	
	savedArticles: [19,34,35,47,48,45],

	init: function () {

		console.log("Editor.init");

		this.bindEvents();

		// GET ANY SAVED BOOKS
		this.loadArticleCheck();

	},

	bindEvents: function () {

		console.log("Editor.bindEvents");

		var self = this;

		$("#editor").on( "click", "#editor_close", function (){
			
			console.log("Editor close.");
			window.history.back();

		});

		$("#generate_book a").on( "click", function(e) {

			// e.preventDefault();

			console.log("Generate book");

			var thisHref = "generate/?art=" + self.savedArticles;
            $(this).attr("href", thisHref);

		});

		// ONCE ARTICLE DATA LOADED (IF NEEDED)
		$(document).on("dataloaded", function(){
			
			self.loadArticles();

		});

	},

	template: _.template( $('#editor_article_template').html(), {variable: 'data'} ),

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

			// GET DATA FROM ARTICLE DATA		    				
			_.each( articleData, function( art ) {

				self.data = art;

				if ( art.ID === id ) {

					console.log( 79, art );

					$("#editor_articles").append( self.template( self.data ) );

				}

			});

		});		

		$( "#editor_articles" ).sortable({
			cursor: "move",
			placeholder: "sortable-placeholder",
			stop: function( event, ui ) {
				
				// UPDATE ARTICLE ORDER
				self.updateOrder( $( "#editor_articles" ).sortable('toArray') );

			}
		}).disableSelection();

	},

	updateOrder: function ( array ) {

		console.log("Editor.updateOrder");

		var self = this;

		// CLEAR EXISTING ARRAY
		this.savedArticles = [];

		// LOOP THROUGH INPUT ARRAY
		_.each( array, function( art ) {

			// GET ID + APPEND TO ARRAY
			self.savedArticles.push( art.split("-")[2] );

		});

		console.log( 119, this.savedArticles );

	}

}