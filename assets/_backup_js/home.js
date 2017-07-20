var app = app || {};

var Home = {
	
	pageLoaded: false, 

	videoHidden: false,

	imgsLoaded: false,  

	init: function ( section ) {

		console.log("Home.init", section);

		var self = this;

		// INIT NAV PINNING USING WAYPOINTS
		this.pinNav();

		// IF STANDARD INIT 
		if ( section === "" ) {

			// IF MAIN HOME: PLAY VIDEO
			if ( $("#introvid").length ) {
				$("#introvid")[0].play();		
			}
			// FADE IN PAGE
			_.delay( function(){
				self.hideLoading();
				// LOAD INTRO SECTIONS
				AjaxCalls.introSection();
			}, 500 );

		} else {

			// RECORD CURRENT SECTION FOR USE AFTER AJAXSUCCESS
			this.section = section;
			// LOAD INTRO SECTIONS AND THEN FADE IN
			AjaxCalls.introSection();
		
		}

		HomeNav.init();

	},

	scrollTop: 0, 

	bindEvents: function () {

		// BOUND AFTER AJAX LOAD

		console.log("Home.bindEvents");

		var self = this;

		// WHEN VIDEO ENDED
		$("#introvid").on("ended", function(){
			self.hideVideo();
		});

		$("#contents_list li").on( "mouseover", function(){
			// GET ID
			var thisId = $(this).attr("data-id");
			// SHOW IMAGE
			$("#contents_image li").css("opacity","0");
			$("#contents_image").find("#preview-" + thisId).css("opacity","1");
		});

		$("#contents_list li").on( "mouseout", function(){
			// HIDE IMAGE
			// $("#contents_image li").css("opacity","0");
		});

	},

	hideLoading: function () {

		console.log("Home.hideLoading");

		HomeNav.init();

		$("#loading").fadeOut( 1000 );

		this.pageLoaded = true;

	},

	pinNav: function () {

		console.log("Home.pinNav");

		this.sticky = new Waypoint.Sticky({
			element: $("#intro_nav")[0],
			context: $("#intro_scroll_wrapper"),  
			handler: function (direction) {
		    	// BUG FIX
		    	// CHECK IF PAGE HAS SCROLLED
		    	// if ( $(window).scrollTop() === 0 ) {
		    	// 	$("#intro_nav").removeClass("stuck");
		    	// }
			},
		});

	},

	hideVideo: function () {

		console.log("Home.hideVideo");

		// PAUSE VIDEO
		if ( $("#introvid").length ) {
			$("#introvid")[0].volume = 0;
			$("#introvid")[0].pause();
		}

		// REDUCE HEIGHT OF WRAPPER
		var videoH = $("#video_section").height(),
			currentPos = $("#intro_scroll_wrapper").scrollTop();
		
		$("#video_section").css({
			"height" : 		0,
			"min-height" :  0
		});
		// SCROLL DOWN BY SAME AMOUNT AS VIDEO HEIGHT
		$("#intro_scroll_wrapper").animate({
			scrollTop: currentPos - videoH + 0 // 60 IS HEIGHT OF NAV
		}, 10 );

		// STOP NAV STICKINESS
		this.sticky.destroy();

		// FIX NAV PERMANENTLY
		$("#intro_nav").removeClass("stuck").css({
			"position" : "fixed",
			"top" : 0
		});

		// FORCE RECALC OF INVIEW POINTS
		setTimeout( function(){
		
			Waypoint.refreshAll()
			$(window).trigger('resize');

			HomeNav.setLimits();

		}, 1100 );

		// STOP FROM RUNNING ONCE VIDEO IS HIDDEN
		this.videoHidden = true;

	},

	ajaxSuccess: function () {

		console.log("Home.ajaxSuccess");

		var self = this;

		this.bindEvents();

		ScrollSnap.init();

		// NAVIGATE TO SECTION
		HomeNav.scrollTo( this.section );

		// this.htmlPrep();

		setTimeout( function(){

			// LOAD CONTENTS IMAGES
			self.loadContentsImgs();
			self.contentsImgInit();

			// // FADE IN
			// _.defer( function(){
			// 	if ( !Home.pageLoaded ) {
			// 		self.hideLoading();	
			// 	}		
			// });

		}, 1300 );

	},

	loadContentsImgs: function () {

		console.log("Home.loadContentsImgs");

		var articles = App.articles;
		if ( articles.length ) {
			var html = "<ul>",
				img,
				wrapperH = $("#contents_image").height();
			// LOOP THROUGH ARTICLES
			_.each( articles, function( art ) {				
				var src;
				// IF IMAGE EXISTS
				if ( art.image ) {
					// GET IMG SIZE
					if ( wrapperH <= 300 ) { // THUMB
						src = art.image.sizes.thumbnail;
					} else if ( wrapperH > 300 && wrapperH <= 600 ) { // MEDIUM
						src = art.image.sizes.medium;
					} else if ( wrapperH > 600 && wrapperH <= 900 ) { // MEDIUM-LARGE
						src = art.image.sizes.medium_large;
					} else if ( wrapperH > 900 && wrapperH <= 1200 ) { //  LARGE
						src = art.image.sizes.large;
					} else { // EXTRA-LARGE
						src = art.image.sizes.extralarge;
					}
					img = "<img src='" + src + "' />";
					html += "<li id='preview-" + art.ID + "' >" + img + "</li>";
				}
			});
			html += "</ul>";
			$("#contents_image").append( html );
			$("#contents_image_wrapper").fadeIn();
		} else {	
			console.log("Articles not loaded.");
		}

	},

	contentsImgInit: function () {

		console.log("Home.contentsImgInit");

		var self = this;

		var imgInview = new Waypoint.Inview({
			element: $('#contents_image_wrapper')[0], 
			context: $("#intro_scroll_wrapper"), 
			entered: function( direction ) {
				// END FIX
				self.contentsImgUnfix( direction );
			},
			exit: function( direction ) {
				// START FIX
				self.contentsImgFix();
			},
		});

		// SHOW RANDOM IMAGE
		var imgs = $('#contents_image ul').children().length,
			randIndex = Math.floor( Math.random() * imgs );
		$("#contents_image li").eq(randIndex).css("opacity","1");

	},

	contentsImgFix: function () {

		console.log("Home.contentsImgFix");

		// GET PARENT WIDTH
		var parentW = $("#contents_image_wrapper").width();

		$("#contents_image").css({
			"position" : "fixed",
			"width" : parentW,
			"top" : ""
		});

	},

	contentsImgUnfix: function ( direction ) {

		console.log("Home.contentsImgUnfix");

		var top, bottom;
		if ( direction === "up" ) {
			top = "";
			bottom = "";
		} else {
			// GET CURRENT TOP POSITION
			top = "initial";
			bottom = 60;
		}

		$("#contents_image").css({
			"position" : "",
			"top" : top,
			"bottom" : bottom
		});

	},

}