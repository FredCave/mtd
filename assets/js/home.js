var Home = {
	
	pageLoaded: false, 

	videoHidden: false,

	imgsLoaded: false,  

	interval: "", 

	animationInit: false, 

	init: function ( section ) {

		console.log("Home.init", section);

		var self = this;

		// INIT SNAP TO
		HomeNav.init();

		// INIT NAV PINNING USING WAYPOINTS
		this.pinNav();

		this.bindEvents();

		// 	PLAY VIDEO
		if ( $("#introvid").length && $(window).width() > 768 ) {
			var src = $("#introvid").find("source").attr("data-src");
			$("#introvid").find("source").attr( "src", src );
			var video = $("#introvid").get(0);
	        video.load();
	        video.play();		
		} else {
			this.hideVideo();
		}

		// FADE IN PAGE
		_.delay( function(){
		
			self.hideLoading();
			
			// + LOAD CONTENTS IMAGES
			_.delay( function(){
				self.addWingdings();
				self.loadContentsImgs();
			}, 500 );

		}, 500 );

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

		$(window).on( "resize", _.throttle( function(e){

			self.resizeImgs();

		}, 1000 ));

		// SAFARI BUG FIX
		$(window).on( "scroll", _.throttle( function(e){

			if ( $(window).scrollTop() < $(window).height() ) {
				$("#contents_image_wrapper").hide();
			} else {
				$("#contents_image_wrapper").show();				
			}

		}, 250 ));

	},

	hideLoading: function () {

		console.log("Home.hideLoading");

		$("#loading").fadeOut( 1000 );

		this.pageLoaded = true;

	},

	pinNav: function () {

		console.log("Home.pinNav");

		this.sticky = new Waypoint.Sticky({
			element: $("#intro_nav")[0],
			// context: $("#intro_scroll_wrapper"),  
			handler: function (direction) {
		    	// BUG FIX
		    	// CHECK IF PAGE HAS SCROLLED
		    	// if ( $(window).scrollTop() === 0 ) {
		    	// 	$("#intro_nav").removeClass("stuck");
		    	// }
			},
		});

	},

	introAnimation: function( restart ) {

		console.log("Home.introAnimation");

		var self = this,
			winH = $(window).height();

		// RESTART LOOP IF ALREADY INIT
		if ( restart ) {
			clearInterval( this.interval );
			startLoop();
		}

		if ( !this.animationInit ) {

			var delay = 1000;
			_.delay( sceneOne, delay * 1 );
			_.delay( sceneTwo, delay * 2 );
			_.delay( sceneThree, delay * 3 );
			_.delay( sceneFour, delay * 4 );
			_.delay( sceneFive, delay * 5 );
			_.delay( sceneSix, delay * 6 );

			this.animationInit = true;

		}

		function sceneOne () {
			$("#animation_wrapper").append("<h1>Mind The Dance</h1><h2 class='hidden'>A Guide to Documenting<br> Contemporary Dance Teaching</h2>");
		}

		function sceneTwo () {
			$("#animation_wrapper").find("h2").removeClass("hidden");
		}

		function sceneThree () {
			$("#animation_wrapper").find("h2").html("A Movement for Documenting<br> Contemporary Dance Teaching");
		}

		function sceneFour () {
			$("#animation_wrapper").find("h2").html("A Movement for Documenting<br> Movement Teaching");
		}

		function sceneFive () {
			$("#animation_wrapper").css({"top": winH / 4 });
			startLoop();
		}

		function sceneSix () {
			$(".foreword_text").css({
				"opacity" 		: 1,
				"margin-top" 	: ( winH / 2 ) - 96
			}, 500 );
		}

		function startLoop () {
			var step = 1;
			self.interval = setInterval( function(){
				console.log( "loop", step );
				if ( step === 1 ) {
					$("#animation_wrapper").find("h2").html("A Guide to Documenting<br> Movement Teaching");	
				} else if ( step === 2 ) {
					$("#animation_wrapper").find("h2").html("A Guide to Documenting<br> Contemporary Dance Teaching");
				} else if ( step === 3 ) {
					$("#animation_wrapper").find("h2").html("A Movement for Documenting<br> Contemporary Dance Teaching");
				} else if ( step === 4 ) {
					$("#animation_wrapper").find("h2").html("A Movement for Documenting<br> Movement Teaching");
				}
				step++;
				if ( step >= 5 ) {
					step = 1;
				}
			}, 2000 );
		}

	},

	hideVideo: function () {

		console.log("Home.hideVideo");

		var self = this;

		// PAUSE VIDEO
		if ( $("#introvid").length ) {
			$("#introvid")[0].volume = 0;
			$("#introvid")[0].pause();
		}

		// REDUCE HEIGHT OF WRAPPER
		var videoH = $("#video_section").height(),
			currentPos = $(window).scrollTop();
		
		$("#video_section").css({
			"height" : 		0,
			"min-height" :  0
		});
		// SCROLL DOWN BY SAME AMOUNT AS VIDEO HEIGHT
		$("html,body").animate({
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

			$("#introvid").remove();

		}, 1100 );

		// STOP FROM RUNNING ONCE VIDEO IS HIDDEN
		this.videoHidden = true;

		_.defer( function(){
			self.introAnimation();
		});

	},

	loadContentsImgs: function () {

		console.log("Home.loadContentsImgs");

		var articles = App.articles, 
			self = this;

		function loadImgs () {

			if ( self.imgsLoaded ) {
				console.log( 165, "Imgs already loaded." );
				return;
			}

			console.log("Home.loadContentsImgs.loadImgs");

			var html = "<ul>",
				img,
				wrapperH = $("#contents_image").height();
			// LOOP THROUGH ARTICLES
			_.each( articles, function( art ) {				
				var src;
				// IF IMAGE EXISTS
				if ( art.image ) {
					// GET ALL DATA-SRCs
					var dataTmb = art.image.sizes.thumbnail,
						dataMed = art.image.sizes.medium, 
						dataMlg = art.image.sizes.medium_large, 
						dataLrg = art.image.sizes.large, 
						dataXlg = art.image.sizes.extralarge;

					// GET IMG SIZE FOR SRC
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
					img = "<img ";
					img += "data-tmb='" + dataTmb + "' ";
					img += "data-med='" + dataMed + "' ";
					img += "data-mlg='" + dataMlg + "' ";
					img += "data-lrg='" + dataLrg + "' ";
					img += "data-xlg='" + dataXlg + "' ";
					img += "src='" + src + "' />";
					html += "<li id='preview-" + art.ID + "' >" + img + "</li>";
				}
			});
			html += "</ul>";

			$("#contents_image").append( html );
			$("#contents_image_wrapper").fadeIn();

			self.imgsLoaded = true;

			self.contentsImgInit();

		}

		if ( articles.length ) {
			loadImgs();
		} else {	
			console.log("Articles not loaded.");
			App.loadArticleData();
			$(document).on( "dataloaded", function(){
				console.log( 220, "Data loaded." );
				articles = App.articles;
				loadImgs();
			});
		}

	},

	contentsImgInit: function () {

		console.log("Home.contentsImgInit");

		var self = this;

		var imgInview = new Waypoint.Inview({
			element: $('#contents_image_wrapper')[0], 
			// context: $(window), 
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
		var parentW = $("#contents_list").width();

		console.log( 365, $("#contents_list").width() );

		$("#contents_image").css({
			"position" : "fixed",
			"width" : parentW,
			"top" : "",
			"margin-left" : ""
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
			bottom = 71;
		}

		$("#contents_image").css({
			"position" : "",
			"top" : top,
			"bottom" : bottom,
			"margin-left" : ""
		});

	},

	resizeImgs: function () {

		console.log("Home.resizeImgs");

		$("#contents_image img").each( function(){

			// GET IMG HEIGHT
			var imgH = $("#contents_image").height(),
				src;

			if ( imgH <= 300 ) { // THUMB
				src = $(this).attr("data-tmb");
			} else if ( imgH > 300 && imgH <= 600 ) { // MEDIUM
				src = $(this).attr("data-med");
			} else if ( imgH > 600 && imgH <= 900 ) { // MEDIUM-LARGE
				src = $(this).attr("data-mlg");
			} else if ( imgH > 900 && imgH <= 1200 ) { //  LARGE
				src = $(this).attr("data-lrg");
			} else { // EXTRA-LARGE
				src = $(this).attr("data-xlg");
			}

			// UPDATE SRC + WIDTH
			$(this).attr( "src", src );

		});

		// RESIZE WRAPPER
		console.log( 313, $("#contents_list").width() );
		$("#contents_image").css({
			"width" : $("#contents_list").width()
		})

	},

	addWingdings: function () {

		console.log("Home.addWingdings");

		if ( $("#contents_list").find(".wingdings").length ) {
			return;
		}
		// ADD GLYPHS TO WINGDING TEXTS
        $("#contents_list li").each( function(){
            $(this).find(".contents_category").prepend("<span class='wingdings'><img src='" + TEMPLATE + "/assets/img/wingding_glyph_white.svg' /></span> ");
        });

	}

}