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
            
            // console.log( 27, "Article data loaded." );
            self.loadTitle( self.currentArticle );

        });

        // NAV ARROWS CLICK
        $(".nav_arrow a").on("click", function(e){
            
            // e.preventDefault();
            self.navClick( $(this) );

        });

	},

	loadArticle: function ( id, split ) {

		console.log("Articles.loadArticle", id);

        var self = this;

		// IF NOT DONE: INIT ARTICLES
		if ( this.firstTime ) {
			this.init();
			this.firstTime = false;
		}

        // IF NOT SPLIT: HIDE CURRENT CONTENT
        if ( !split ) {
            
            $(".current_article").fadeOut( 200, function(){
                $(".current_article").empty();
                // SCROLL TO TOP
                $("#article_scroll_wrapper").animate({
                    scrollTop : 0
                }, 100, function(){

                    // LOAD ARTICLE
                    AjaxCalls.loadArticle( id );
                    self.currentArticle = id;

                });
            });


        } else {
            
            AjaxCalls.loadArticle( id, "split" );

		} 

	},

    ajaxSuccess: function ( data, id, target ) {

        console.log("Articles.ajaxSuccess", id, target);

        var self = this,
        	wrapper;

        // LOAD DATA INTO WRAPPER
        if ( target === "split" ) {
            wrapper = $("#split_wrapper");
            this.splitColourManager( id );
        } else {
			wrapper = $(".current_article");
            this.colourManager();
        }

        console.log( 86, "wrapper:", wrapper );

        wrapper.html( data ).attr("data-id",id);
		
        // PREP + BIND EVENTS
        ArticleInner.init( wrapper );

        // IF INIT FROM ARTICLE
		if ( !Home.pageLoaded ) {
			Home.hideLoading();	
		}	

        // IF SPLIT: TRIGGER LOADED EVENT
        if ( target === "split" ) {
            $("#split_wrapper").trigger("split_loaded");
        } else {
            // SHOW ARTICLE CONTENT
            $(".current_article").fadeIn( 1000 );
            // CHECK IF ARTICLE DATA & UPDATE TITLE + NAV LINKS
            this.currentArticle = id;
            this.articleDataCheck();           
        }

    },

    navClick: function ( click ) {

        console.log("Articles.navClick");

        var self = this;

        $(".current_article").removeClass("prepped");

        // STOP RUNNING TITLE FROM APPEARING ON NAV 
        $("#nav_title").css("opacity","0");
        $("#nav_title span").css("opacity","0");
        setTimeout( function(){
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

        // PREPARE NAV LINKS
        $("#nav_right a").attr({
            "href"          : "#article/" + articles[ nextPos ].ID + "/" + articles[ nextPos ].slug,
            "data-title"    : articles[ nextPos ].title
        });
        $("#nav_left a").attr({
            "href"          : "#article/" + articles[ prevPos ].ID + "/" + articles[ prevPos ].slug,
            "data-title"    : articles[ prevPos ].title
        });

    },

	colourManager: function ( wrapper ) {

		console.log("Articles.colourManager", wrapper );

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
                $("#article_nav_grey").css({"opacity":"1"});
                $("#article_nav_white").css({"opacity":"0"});
                $("html").css("background-color", "#eee");

            } else if ( colour === "white" ) {
                $(".current_article").removeClass("grey");
                $("#article_nav_grey").css({"opacity":"0"});
                $("#article_nav_white").css({"opacity":"1"});
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

    splitColourManager: function ( id ) {

        console.log("Articles.splitColourManager");

        var colour;

        // IF NORMAL ARTICLE:
        // GET COLOUR FROM ARTICLE DATA  
        _.each( App.articles, function( article ){
            if ( parseInt(id) === article.ID ) {
                colour = article.serif;
                return;
            }
        }); 

        console.log( 275, colour );

        if ( colour === undefined ) {
            colour = "white";
        }

        if ( colour === "grey" ) {
            $("#split_wrapper").addClass("grey");
        } else {
            $("#split_wrapper").removeClass("grey");           
        }

    },

    splitAnim: function () {

        console.log("Articles.splitAnim");

        // HIDE NAV BAR
        $("#article_nav").css({
            "top" : -80
        });

        // SCROLL TO TOP: THEN ANIMATE
        $("#split_wrapper").animate({
            scrollTop: 0
        }, 150, function (){
            _.defer( function(){
                $("#split_wrapper").addClass("mobile").css({
                    "left" : "50%", 
                    "width" : "50%"
                });                
            });
        });

        _.delay( function(){
            $(".current_article").css({ 
                "width" : "50%"
            });          
        }, 150 );

        _.delay( function(){
            $(".current_article").addClass("mobile"); 
        }, 500 );

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
        _.delay( function(){
            $("#split_wrapper").removeClass("mobile prepped").attr("data-id","");
        }, 500 );

        _.defer( function(){
            $(".current_article").removeClass("mobile").css({ 
                "width" : ""
            });               
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
        Backbone.history.navigate( $("#split_wrapper").attr("data-hash") , {trigger:false} );

        $("#split_wrapper").css({
            "left" : "0%", 
            "width" : "100%"
        });  

        $("#split_wrapper .split_close").css({
            "position" : "absolute",
            "left" : 36
        }); 

        this.colourManager();

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

        // console.log( 389, clickId, $("#split_wrapper").attr("data-id") );

        // CHECK IF NOT ALREADY LOADED
        if ( clickId === parseInt( $("#split_wrapper").attr("data-id") ) ) {
            // console.log( 391, "Already loaded." );
            return;
        }

        // console.log( 378, hash );
        
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

        console.log("Articles.anchorLink", click);

        var anchor = click.attr("href"),
            target = $(anchor).position().top + $(".article_inner_wrapper").position().top - 80;

        // console.log( 398, anchor, target );

        $("#article_scroll_wrapper").animate({
            scrollTop : target
        }, 500 );

    }, 

    addToBook: function () {

        console.log("Articles.addToBook");

        var currId = parseInt(this.currentArticle),
            saved = this.getStorageArticles();

        console.log( 463, saved );

        // CHECK IF THIS ID ALREADY IN SAVED BOOKS ARRAY
        if ( $.inArray( currId.toString(), saved ) === -1 ) {
            
            // GET NUMBER OF ARTICLES ALREADY IN ARRAY
            var savedLength = Editor.savedArticles.length;
            // console.log( 466, $(".added_indicator"), savedLength );
            // SHOW UPDATED NUMBER 
            $(".added_indicator").text( "+ " + ( savedLength + 1 ) ).fadeIn( 500 );
            
            // SAVE TO LOCAL STORAGE
            this.saveToStorage( currId );

            setTimeout( function(){
                $(".added_indicator").fadeOut( 2000 );
            }, 2000 );

        } else {
            
            console.log("Already saved.");

        }

    },

    saveToStorage: function ( id ) {

        console.log("Articles.saveToStorage");

        // Editor.savedArticles.push( id );
        
        // GET EXISTING ITEMS AS ARRAY
        var articles = this.getStorageArticles();
        // PUSH AND THEN SAVE TO LOCAL STORAGE
        articles.push( id );
        localStorage.setItem( "articles", articles ); 

    },

    getStorageArticles: function () {

        console.log("Articles.getStorageArticles");

        var artString = localStorage.articles;

        return artString.split(",");

    },

    titleCheck: function ( scroll ) {

        // console.log("Articles.titleCheck", scroll );

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
