var Articles = {
	
	firstTime: true,

	currentArticle: "",

	init: function () {

		console.log("Articles.init");

		this.bindWrapperEvents();

		// TITLE, PREV + NEXT STORED IN APP.ARTICLEDATA OBJECT
		this.articleDataCheck();

	},

	bindWrapperEvents: function () {

		console.log("Articles.bindWrapperEvents");

		var self = this;

        // ONCE ARTICLE DATA LOADED (IF NEEDED)
        $(document).on("dataloaded", function(){
            
            console.log( 27, "Article data loaded." );
            self.loadTitle( self.currentArticle );

        });

        // NAV ARROWS CLICK
        $(".nav_arrow a").on("click", function(e){
            
            // e.preventDefault();
            self.navClick( $(this) );

        });

        $(window).on("resize",  _.throttle( function(){
            // RESIZE IFRAMES
            $("iframe").each( function(){
                self.resizeVideo( $(this) );
            });
        }, 1000 ));

	},

	loadArticle: function ( id, split ) {

		console.log("Articles.loadArticle", id);

		// IF NOT DONE: INIT ARTICLES
		if ( this.firstTime ) {
			this.init();
			this.firstTime = false;
		}

        // HIDE CURRENT CONTENT
        $(".current_article").fadeOut(200, function(){
            $(".current_article").empty();
        });

        // IF SPLIT
        if ( split ) {
            AjaxCalls.loadArticle( id, "split" );
        // CHECK IF REQUESTED ID IS IN NEXT OR PREV        
  //       } else if ( $(".next_article").attr("data-id") === id ) {
		// 	this.animArticle( id, "next" );
		// } else if ( $(".prev_article").attr("data-id") === id ) {
		// 	this.animArticle( id, "prev" );
		} else {
			// LOAD ARTICLE
			AjaxCalls.loadArticle( id );
			this.currentArticle = id;
		}

	},

    ajaxSuccess: function ( data, id, target ) {

        console.log("Articles.ajaxSuccess", id, target);

        // LOAD DATA INTO WRAPPER

        var self = this,
        	wrapper;

        // LOAD DATA
        if ( target === "split" ) {
            wrapper = $("#split_wrapper");
        } else {
			wrapper = $(".current_article");
        }

        // console.log( 187, data );

        wrapper.html( data ).attr("data-id",id);

		this.colourManager();

        // PREP + BIND EVENTS
        ArticleInner.init( wrapper );

        // SHOW ARTICLE CONTENT
        $(".current_article").fadeIn( 1000 );
        // CHECK IF ARTICLE DATA
        // UPDATE TITLE + NAV LINKS
        this.currentArticle = id;
        this.articleDataCheck();

        // IF INIT FROM ARTICLE
		if ( !Home.pageLoaded ) {
			Home.hideLoading();	
		}	

        // IF SPLIT: TRIGGER LOADED EVENT
        if ( target === "split" ) {
            $("#split_wrapper").trigger("split_loaded");
        }

    },

    navClick: function ( click ) {

        console.log("Articles.navClick");

        var self = this;

        // STOP RUNNING TITLE FROM APPEARING ON NAV 
        $("#nav_title").css("opacity","0");
        $("#nav_title span").css("opacity","0");
        setTimeout( function(){
           console.log( 57, "Run title check." );
           self.titleCheck();
        }, 1500 );                

    },

    articleDataCheck: function () {

        console.log("Articles.articleDataCheck");

        if ( App.articles === "" ) {
            // LOAD ARTICLE DATA
            App.loadArticleData();
        } else {
            this.loadTitle( this.currentArticle );
        }

    },  

    loadTitle: function ( id ) {

        console.log("Articles.loadTitle", id );

        var articles = App.articles,
        	self = this;

        $.each( articles, function ( i ) {
            if ( $(this)[0].ID === parseInt(id) ) {
                $("#nav_title span").text( $(this)[0].title );
                document.title = "Mind The Dance – " + $(this)[0].title;
                return; 
            }
        });

		// AFTER DEFER: LOAD NEXT + PREV
		_.delay( function(){
			self.loadNextPrev( id );
		}, 250 );

    },

    loadNextPrev: function ( id ) {

        console.log("Articles.loadNextPrev", id );

		var articles = App.articles,
			arrayPos;

        console.log( 253, App.articles, id );

        // GET ARTICLE'S POSITION IN ARRAY
        var thisIndex = _.findIndex( articles, function( index ) { 
        	// console.log( 257, index );
            return index.ID === parseInt(id);
        });
        var nextPos = thisIndex + 1;
        if ( nextPos >= articles.length ) {
            nextPos = 0;
        }
        var prevPos = thisIndex - 1;
        if ( prevPos < 0 ) {
            prevPos = articles.length - 1;
        }

        // console.log( 247, articles[ thisIndex ], articles[ nextPos ], articles[ prevPos ] );

        // // PREPARE NAV LINKS
        $("#nav_right a").attr({
            "href"          : "#article/" + articles[ nextPos ].ID + "/" + articles[ nextPos ].slug,
            "data-title"    : articles[ nextPos ].title
        });
        $("#nav_left a").attr({
            "href"          : "#article/" + articles[ prevPos ].ID + "/" + articles[ prevPos ].slug,
            "data-title"    : articles[ prevPos ].title
        });

        // LOAD NEXT ARTICLE
        // AjaxCalls.loadArticle( articles[ nextPos ].ID, "next" );
        // _.defer( function(){
        // 	// LOAD PREV ARTICLE
        // 	AjaxCalls.loadArticle( articles[ prevPos ].ID, "prev" );      	
        // });

    },

	colourManager: function () {

		console.log("Articles.colourManager");

        var colour,
            self = this;

        function colourCheck () {

            console.log( 234, "colourCheck" );

            // GET COLOUR FROM ARTICLE DATA  
            _.each( App.articles, function( article ){
                // console.log( 237, self.currentArticle, article.ID );
                if ( parseInt(self.currentArticle) === article.ID ) {
                    colour = article.serif;
                    return;
                }
            });            

            if ( colour === "grey" ) {
                $(".current_article").addClass("grey");
                $("#article_nav").addClass("grey").css({
                    "background-color"  : "#eee",
                    "box-shadow"        : "0px 2px 6px #eee"                 
                });
                $("html").css("background-color", "#eee");
            } else if ( colour === "white" ) {
                $(".current_article").removeClass("grey");
                $("#article_nav").removeClass("grey").css({
                    "background-color"  : "#fffef8",
                    "box-shadow"        : "0px 2px 6px #fffef8"                
                }); 
                $("html").css("background-color", "#fffef8");       
            }

        }

        if ( App.articles.length ) {
            colourCheck();
        } else {
            // LOAD ARTICLE DATA
            App.loadArticleData();
            $(document).on( "dataloaded", function(){
                console.log( 263, "Data loaded." );
                colourCheck();   
            });
        }

	},

    splitAnim: function () {

        console.log("Articles.splitAnim");

        $("#split_wrapper").css({
            "left" : "50%", 
            "width" : "50%"
        });

        $(".current_article").css({ 
            "width" : "50%"
        });

        // HIDE NAV BAR
        $("#article_nav").css({
            "top" : -80
        });

        // SHOW CLOSE BUTTON(S)
        if ( !$("#split_wrapper").hasClass("satellite") ) {
            $(".current_article").append("<div class='split_close'></div>");
        } 
        $("#split_wrapper").append("<div class='split_close'></div>");
        setTimeout( function(){
            $(".split_close").css("opacity","1");
        }, 1500 );

    },

    splitReset: function () {

        console.log("Articles.splitReset");

        $(".split_close").css({
            "position" : "absolute",
            "left" : 36
        });

        $("#split_wrapper").css({
            "left" : "", 
            "width" : ""
        });

        $(".current_article").css({ 
            "width" : ""
        });       

        // REMOVE BUTTONS
        setTimeout( function(){
            $(".split_close").remove();
        }, 1500 );

        // RESET ARTICLE NAV
        $("#article_nav").css({
            "top" : ""
        });      

    },

    splitToFull: function () {

        console.log("Articles.splitToFull");

        var self = this;

        // UPDATE URL
        Backbone.history.navigate( $("#split_wrapper").attr("data-hash") , false );

        $("#split_wrapper").css({
            "left" : "0%", 
            "width" : "100%"
        });  

        $("#split_wrapper .split_close").css({
            "position" : "absolute",
            "left" : 36
        }); 
        // ONCE FULL : SWITCH CLASSES
        setTimeout( function(){

            // REMOVE BUTTONS
            setTimeout( function(){
                $(".split_close").remove();
            }, 1500 );

            // RESET ARTICLE NAV
            $("#article_nav").css({
                "top" : ""
            });  

            // GET ID OF CURRENT
            var currId = $(".current_article").attr("id");
            $(".current_article").addClass("temp_article").removeClass("current_article").css({
                "left" : "",
                "width" : ""
            });
            $("#split_wrapper").addClass("current_article").attr("id",currId);
            $(".temp_article").removeClass("temp_article").attr("id","split_wrapper");

            self.loadTitle(currId);

        }, 2000 );

    }, 

    internalLink: function ( click ) {

        console.log("Articles.internalLink");

        // GET ID
        var hash = click[0].hash,
            clickId = parseInt( hash.split("/")[1] );
        
        // CHECK IF SATELLITE
        if ( $.inArray( clickId, App.satellites ) > -1 ) {
            $("#split_wrapper").addClass("satellite");
        } else {
            // STORE HASH IN SPLIT WRAPPER
            $("#split_wrapper").attr("data-hash",hash);            
        }

        // LOAD IN SPLIT WRAPPER
        this.loadArticle( clickId, true );

    }, 

    anchorLink: function ( click ) {

        console.log("Articles.anchorLink");

        var anchor = click.attr("href"),
            target = $(anchor).position().top + $(".article_inner_wrapper").position().top;

        $(".current_article").animate({
            scrollTop : target
        }, 500 );

    }, 

    addToBook: function () {

        console.log("Articles.addToBook");

        var currId = parseInt(this.currentArticle),
            saved = this.getStorageArticles();

        // console.log( 463, saved );

        // CHECK IF THIS ID ALREADY IN SAVED BOOKS ARRAY
        if ( $.inArray( currId, Editor.savedArticles ) === -1 ) {
            
            // GET NUMBER OF ARTICLES ALREADY IN ARRAY
            var savedLength = Editor.savedArticles.length;
            // savedLength++;
            console.log( 466, savedLength );
            // SHOW UPDATED NUMBER 
            $(".current_article").find(".added_indicator").text( "+ " + ( savedLength + 1 ) ).fadeIn( 500 );
            
            // SAVE TO LOCAL STORAGE
            this.saveToStorage( currId );

            setTimeout( function(){
                $(".current_article").find(".added_indicator").fadeOut( 2000 );
            }, 1000 );

        } else {
            console.log("Already saved.");
        }

    },

    saveToStorage: function ( id ) {

        console.log("Articles.saveToStorage");

        console.log( 492, Editor.savedArticles );

        Editor.savedArticles.push( id );
        
        // GET EXISTING ITEMS
        // var articles = {};
        // articles.push( JSON.parse( this.getStorageArticles() ) );
        // console.log( 498, $.type( articles ), articles );
        // // PUSH AND THEN SAVE
        // // articles.push( id );
        // // localStorage.setItem( articles );  

    },

    getStorageArticles: function () {

        console.log("Articles.getStorageArticles");

        return localStorage.articles;

    },

    titleCheck: function ( scroll ) {

        console.log("Articles.titleCheck", scroll );

        var limit = $(".current_article .top_wrapper").outerHeight() + parseInt ( $(".current_article").css("padding-top") ) - 100 ;
       
        // IF PARENT HIDDEN (AFTER NAV CLICK)
        if ( parseInt( $("#nav_title").css("opacity") ) === 0 && scroll !== 0 ) {     
            setTimeout( function(){
                $("#nav_title").css("opacity","1"); 
            }, 1000 );
        }

        if ( scroll > limit ) {
            $("#nav_title span").css("opacity","1");
        } else {
            $("#nav_title span").css("opacity","0");
        }

    }

}
