var Article = {
	
	firstTime: true,

	currentArticle: "",

	init: function () {

		console.log("Article.init");

		this.bindWrapperEvents();

		// TITLE, PREV + NEXT STORED IN APP.ARTICLEDATA OBJECT
		this.articleDataCheck();

	},

	bindWrapperEvents: function () {

		console.log("Article.bindWrapperEvents");

		var self = this;

        // ONCE ARTICLE DATA LOADED (IF NEEDED)
        $(document).on("dataloaded", function(){
            
            console.log( 27, "Article data loaded." );
            self.loadTitle( self.currentArticle );

        });

        // NAV ARROWS CLICK
        $(".nav_arrow a").on("click", function(e){
            
            console.log("Nav arrow click.");

            console.log( 36, document.location.hash, $(this).attr("href") );

            if ( $(this).hasClass("disabled") ) {
                e.preventDefault();
            // BUG FIX: IF LINK === CURRENT ARTICLE
            // } else if ( $(this).attr("href") === document.location.hash ) {
            //     e.preventDefault();
            //     console.log( 41, "Link same as current article." );
            //     // GET CURRENT ID
            //     self.loadNextPrev( self.currentArticle );
            } else {
                // SCROLL SIBLINGS TO TOP
                // $(".current_article").siblings().animate({
                //     scrollTop: 0
                // }, 100 );

                // STOP RUNNING TITLE FROM APPEARING ON NAV 
                $("#nav_title").css("opacity","0");
                $("#nav_title span").css("opacity","0");
                setTimeout( function(){
                   $("#nav_title").css("opacity","1"); 
                }, 1500 );                
            }

        });

        $(window).on("resize",  _.throttle( function(){
            // RESIZE IFRAMES
            $("iframe").each( function(){
                self.resizeVideo( $(this) );
            });
        }, 1000 ));

	},

    bindCurrentEvents: function () {

        console.log("Article.bindCurrentEvents");
   
        var self = this;

        $(".current_article").off("click");
        $("#split_wrapper").off("click");

        // INTERNAL LINKS
        $(".current_article").on("click", ".internal_link", function(e) {
            e.preventDefault();
            self.internalLink( $(this) );
        });

        // ANCHOR LINKS
        $(".current_article").on("click", ".anchor_link", function(e) {
            e.preventDefault();
            self.anchorLink( $(this) );
        });       

        // ONCE ARTICLE IS LOADED
        $("#split_wrapper").on("split_loaded", function(){
            self.splitAnim();
        });
   
        // CLOSE SATELLITE VIEW
        $("#split_wrapper").on("click", ".split_close", function(){
            // RESET SPLIT
            self.splitReset();
        });

        // SPLIT TO FULL
        $(".current_article").on("click", ".split_close", function() {
            self.splitToFull();
        }); 

        // ADD TO BOOK
        $(".current_article").on("click", ".add_to_book", function(e){
            e.preventDefault();
            self.addToBook();
        });

        // DOWNLOAD PDF
        $(".current_article").on("click", ".download_pdf", function(e){
            var thisHref = "_generate/?art=" + self.currentArticle;
            $(this).attr("href", thisHref);
        });

        // FOOTNOTES 
        $(".current_article").on("click", ".footnote_link", function(){
            self.viewFootnotes();
        });

        $(".current_article").on("click", ".footnotes_close", function(){
            self.closeFootnotes();
        });  

        // RUNNING TITLE SHOW/HIDE
        $(".current_article").on("scroll", _.throttle( function(){
            self.titleCheck( $(this).scrollTop() );
        }, 500 ));

    }, 

	callArticle: function ( id, split ) {

		console.log("Article.callArticle", id);

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

        console.log("Article.ajaxSuccess", id, target);

        // LOAD DATA INTO WRAPPER

        var self = this,
        	wrapper;

        // LOAD DATA
        if ( target === "split" ) {
            wrapper = $("#split_wrapper");
   //      } else if ( target === "next" ) {
			// wrapper = $(".next_article");
   //      } else if ( target === "prev" ) {
			// wrapper = $(".prev_article");
        } else {
			wrapper = $(".current_article");
        }

        // console.log( 187, data );

        wrapper.html( data ).attr("data-id",id);

		this.colourManager( data, target );

        ArticlePrep.prep( wrapper );
        // REBIND EVENTS
        // this.bindCurrentEvents();

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

    articleDataCheck: function () {

        console.log("Article.articleDataCheck");

        if ( App.articles === "" ) {
            // LOAD ARTICLE DATA
            App.loadArticleData();
        } else {
            this.loadTitle( this.currentArticle );
        }

    },  

    loadTitle: function ( id ) {

        console.log("Article.loadTitle", id );

        var articles = App.articles,
        	self = this;

        // $.each( articles, function ( i ) {
        //     if ( $(this)[0].ID === parseInt(id) ) {
        //         $("#nav_title span").text( $(this)[0].title );
        //         document.title = "Mind The Dance – " + $(this)[0].title;
        //     }
        // });

		// AFTER DEFER: LOAD NEXT + PREV
		_.defer( function(){
			self.loadNextPrev( id );
		}, 250 );

    },

    loadNextPrev: function ( id ) {

        console.log("Article.loadNextPrev", id );

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

	colourManager: function ( data, target ) {

		console.log("Article.colourManager", target);

		var bgColour = data.split("article_inner_wrapper")[1].split("\"")[0].trim(),
			wrapper;

        if ( target === "next" ) {
			wrapper = $(".next_article");
        } else if ( target === "prev" ) {
			wrapper = $(".prev_article");
        } else {
			wrapper = $(".current_article");
        }

        if ( bgColour === "grey" ) {
            wrapper.addClass("grey");
            if ( wrapper.hasClass("current_article") ) {
                $("#article_nav").addClass("grey").css({
                    "box-shadow": "0px 2px 6px #eee"                
                });
            }
        } else {
            wrapper.removeClass("grey");
            if ( wrapper.hasClass("current_article") ) {
                $("#article_nav").removeClass("grey").css({
                    "box-shadow": ""                
                }); 
            }         
        }

	},

	// animArticle: function ( id, direction ) {

	// 	console.log("Article.animArticle", direction);

 //        var self = this,
 //            target;

 //        if ( direction === "next" ) {
 //            target = "next_article";
 //        } else if ( direction === "prev" ) {
 //            target = "prev_article";
 //        }

 //        // TOP BAR COLOUR
 //        if ( $("."+target).hasClass("grey") ) {
 //            $("#article_nav").addClass("grey").css({
 //                "box-shadow": "0px 2px 6px #eee"                
 //            });
 //        } else {
 //            $("#article_nav").removeClass("grey").css({
 //                "box-shadow": ""                
 //            });          
 //        }

 //        // DISABLE LEFT/RIGHT NAV
 //        $(".nav_arrow a").addClass("disabled");

 //        var currZ = parseInt( $(".current_article").css("z-index") );

	// 	// ANIMATE WRAPPER
	// 	$("."+target).css({
 //            // "height" : "auto", 
 //            "left" : 0,
 //            "z-index" : currZ + 1
 //        }).siblings(".article").css({
 //            "left" : "", 
 //            // "z-index" : 9 
 //        });

	// 	// CHANGE CLASSES AFTER ANIMATION
	// 	setTimeout( function (){
	// 		$("."+target).addClass("temp_article").removeClass(target).siblings(".article").css({
 //                "z-index" : 9,
 //                "height" : "",      
 //            });
 //            $(".prepped").removeClass("prepped");
	// 		$(".current_article").removeClass("current_article").addClass(target);
	// 		$(".temp_article").addClass("current_article").removeClass("temp_article");
 //            // UPDATE TITLE BAR – THIS CALLS LOADNEXTPREV
 //            self.loadTitle(id);
 //            $(".nav_arrow a").removeClass("disabled");
	// 	}, 1200 );

	// }, 

    splitAnim: function () {

        console.log("Article.splitAnim");

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

        console.log("Article.splitReset");

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

        console.log("Article.splitToFull");

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

        console.log("Article.internalLink");

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
        this.callArticle( clickId, true );

    }, 

    anchorLink: function ( click ) {

        console.log("Article.anchorLink");

        var anchor = click.attr("href"),
            target = $(anchor).position().top + $(".article_inner_wrapper").position().top;

        $(".current_article").animate({
            scrollTop : target
        }, 500 );

    }, 

    addToBook: function () {

        console.log("Article.addToBook");

        // CHECK IF THIS ID ALREADY IN SAVED BOOKS ARRAY
        if ( $.inArray( parseInt(this.currentArticle), Editor.savedArticles ) === -1 ) {
            Editor.savedArticles.push( parseInt(this.currentArticle) );
        } else {
            console.log("Already saved.");
        }

    },

    viewFootnotes: function () {

        console.log("Article.viewFootnotes");

        // SHOW CLOSE BUTTON
        $(".current_article .footnotes_close").show();

        var notesH = $(".article_footnotes_wrapper").height(),
            halfWin = $(window).height() / 2,
            newTop, newH, 
            bgColour = $(".current_article").css("background-color");

        // SET INITIAL HEIGHT
        $(".article_footnotes_wrapper").css({
            "box-shadow"        : "0px 0px 30px rgba(0, 0, 0, 0.5)", 
            "position"          : "fixed",
            "top"               : $(window).height() * 1.1,
            "margin-top"        : 0, 
            "background-color"  : bgColour
        });
        $(".article_footnotes_wrapper .scroll_wrapper").css({
            "overflow"          : "auto",
            "height"            : halfWin
        });

        newTop = halfWin;
        newH = halfWin;

        setTimeout( function(){
            // ANIMATE
            $(".article_footnotes_wrapper").css({
                "top"       : newTop,
                "height"    : newH
            });
        }, 50 );

    },

    closeFootnotes: function () {

        console.log("Article.closeFootnotes");

        // ANIMATE OUT
        $(".article_footnotes_wrapper").css({
            "top"       : $(window).height() * 1.1,
        });

        setTimeout( function(){

            // RESET ALL VALUES
            $(".article_footnotes_wrapper").css({
                "box-shadow"        : "", 
                "position"          : "",
                "top"               : "",
                "height"            : "", 
                "margin-top"        : "", 
                "background-color"  : ""
            });
            $(".article_footnotes_wrapper .scroll_wrapper").css({
                "overflow"          : "",
                "height"            : ""
            });

            // HIDE CLOSE BUTTON
            $(".current_article .footnotes_close").hide();

        }, 1000 );

    }, 

    titleCheck: function ( scroll ) {

        console.log("Article.titleCheck", scroll );

        var limit = $(".current_article .top_wrapper").outerHeight() + parseInt ( $(".current_article").css("padding-top") ) - 100 ;
        if ( scroll > limit ) {
            $("#nav_title span").css("opacity","1");
        } else {
            $("#nav_title span").css("opacity","0");
        }

    }

}
