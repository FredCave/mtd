var Editor = {
	
	savedArticles: [],

	firstSort: true, 

	eventsBound: false, 

	init: function () {

		console.log("Editor.init");

		this.bindEvents();

		this.loadArticleCheck();

		this.playVideo();

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
			window.history.back();

		});

		$("#editor_play").on("click", function() {

			self.playVideo();

		});

		$("#editor_button a").on( "click", function(e) {

			// e.preventDefault();

			// console.log("Generate book");

			var thisHref = "_generate/?art=" + self.savedArticles;
            $(this).attr("href", thisHref);

		});

		$("#editor_articles").on("click", ".editor_article_close", function() {

			var click = $(this).parents(".editor_article");
			self.removeArticle( click );

		});

		// ONCE ARTICLE DATA LOADED (IF NEEDED)
		$(document).on("dataloaded", function(){
			
			console.log( 51, "Data loaded." );
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
			articles = Articles.getStorageArticles(),
			articleData = App.articles;

		console.log( 106, articles );

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
		_.each( articles, function( id ) {

			console.log( 104, id );

			// GET DATA FROM ARTICLE DATA		    				
			_.each( articleData, function( art ) {
				self.data = art;
				console.log( 126, art.ID, id );
				if ( art.ID === parseInt(id) ) {
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

	},

	removeArticle: function ( article ) {

		console.log("Editor.removeArticle");

		// REMOVE ELEMENT ON PAGE
		article.remove();

		// REMOVE FROM LOCAL STORAGE ARRAY
		var savedArticles = Articles.getStorageArticles();
		// FIND ELEMENT IN ARRAY
		var index = savedArticles.indexOf( article.attr("data-id") );
		console.log( 209, article.attr("data-id"), savedArticles, index );
		if ( index > -1 ) {
		    savedArticles.splice(index, 1);
		}
		// SAVE NEW ARRAY
		localStorage.setItem( "articles", savedArticles ); 

		// IF ARTICLES REMAINING
		if ( $("#editor_articles").children().length ) {
			this.updateOrder( $("#editor_articles").sortable('toArray') );
		} else {
			$("#editor_no_articles").fadeIn();			
			$("#editor_button_wrapper").fadeOut(); 
		}

	},

	playVideo: function () {

		console.log("Editor.playVideo");

		$("#editor_play").fadeOut();

		var videoWrapper = $("#editor_video");

		if ( videoWrapper.length ) {
			
			console.log( 222, videoWrapper.attr("src") );

			if ( videoWrapper.attr("src") === "" || videoWrapper.attr("src") === undefined ) {
				// IF NO SRC LOADED
				var src = videoWrapper.find("source").attr("data-src");
				videoWrapper.find("source").attr( "src", src );	
			} 

			var video = videoWrapper.get(0);
	        video.load();
	        video.play();		

			// WHEN VIDEO ENDS
			video.onended = function(){
				// SHOW PLAY BUTTON
				$("#editor_play").fadeIn(1000);
			}

		}

	}

}