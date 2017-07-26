var Editor = {
	
	savedArticles: [],

	firstSort: true, 

	eventsBound: false, 

	init: function () {

		console.log("Editor.init");

		this.bindEvents();

		this.loadArticleCheck();

	},

	bindEvents: function () {

		console.log("Editor.bindEvents");

		if ( this.eventsBound ) {
			return;
		}

		var self = this;

		$("#editor_close").on( "click", function (e) {
			
			e.preventDefault();
			console.log("Editor close.");
			Backbone.history.navigate( "contents", {trigger: true} );

		});

		$("#editor_button a").on( "click", function(e) {

			// e.preventDefault();

			console.log("Generate book");

			var thisHref = "_generate/?art=" + self.savedArticles;
            $(this).attr("href", thisHref);

		});

		// ONCE ARTICLE DATA LOADED (IF NEEDED)
		$(document).on("dataloaded", function(){
			
			self.loadArticles();

		});

		$(window).on( "resize", _.throttle( function(){

			self.updateWrapperHeight();

		}, 1000 ));

		this.eventsBound = true;

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

		// IF NO ARTICLES
		if ( articles.length < 1 ) {
			$("#editor_no_articles").fadeIn();			
			$("#editor_button_wrapper").hide(); 
		} else {
			$("#editor_no_articles").hide();
			$("#editor_button_wrapper").fadeIn();  		
		}

		$("#editor_articles").empty();
		// LOOP THROUGH SAVED ARTICLES
		_.each( this.savedArticles, function( id ) {

			// GET DATA FROM ARTICLE DATA		    				
			_.each( articleData, function( art ) {
				self.data = art;
				if ( art.ID === id ) {
					$("#editor_articles").append( self.template( self.data ) );
				}
			});

		});		

		// SET HEIGHT OF WRAPPER
		this.updateWrapperHeight();

		// IF INIT FROM EDITOR
		if ( !Home.pageLoaded ) {
			Home.hideLoading();	
		}

		$( "#editor_articles" ).sortable({
			cursor: "move",
			placeholder: "sortable-placeholder",
			containment: "#editor_articles_wrapper", 
			start: function( event, ui ) {
				// FIX PLACEHOLDER HEIGHT
				ui.placeholder.height( ui.item.height() );
				// FIRST SORT BUG FIX
				if ( self.firstSort ){  
					ui.item.css({
						"margin-top" : 0 - $("#editor_scroll_wrapper").scrollTop()
					});
				}
    		}, 
			stop: function( event, ui ) {
				// FIRST SORT BUG FIX
				if ( self.firstSort ){  
					ui.item.css({
						"margin-top" : ""
					});
					self.firstSort = false;
				}				
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

		// console.log( 119, this.savedArticles );

	},

	updateWrapperHeight: function () {

		console.log("Editor.updateWrapperHeight");

		$("#editor_articles_wrapper").height( $("#editor_articles").height() + 64 );

	}

}