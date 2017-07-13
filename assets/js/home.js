var Home = {
	
	init: function ( section ) {

		console.log("Home.init");

		this.section = section;

		// PIN NAV
		this.sticky = new Waypoint.Sticky({
			element: $("#intro_nav")[0],
			handler: function(direction) {
		    	// BUG FIX
		    	// CHECK IF PAGE HAS SCROLLED
		    	if ( $(window).scrollTop() === 0 ) {
		    		$("#intro_nav").removeClass("stuck");
		    	}
			},
		});

		console.log( 28, this.sticky );

		if ( section === "" ) {
			// IF NO HASH: PLAY VIDEO
			$("#introvid")[0].play();
		} else {
			this.hideVideo();
		}

		// LOAD INTRO SECTIONS
		this.loadIntroSections();
		
	},

	bindEvents: function () {

		// BOUND AFTER AJAX LOAD

		console.log("Home.bindEvents");

		var self = this;

		$("#intro_nav a").on("click", function(){

			self.hideVideo();

		});

		$("#introvid").on("ended", function(){

			self.hideVideo();

		});

		$("#contents_list li").on( "mouseover", function(){
			
			// GET ID
			var thisId = $(this).attr("data-id");

			// SHOW IMAGE
			$("#contents_image").find("#preview-" + thisId).css("opacity","1");

		});

		$("#contents_list li").on( "mouseout", function(){

			// HIDE IMAGE
			$("#contents_image li").css("opacity","0");

		});

		$(window).on( "resize", _.throttle( function() {

			self.contentsHeight();

		}, 500 ) );

	},

	hideVideo: function () {

		console.log("Home.hideVideo");

		$("#introvid")[0].volume = 0;
		$("#introvid")[0].pause();

		$("#video_section").css({
			"height" : 		0,
			"min-height" :  0
		});

		// STOP NAV STICKINESS
		console.log( 91, this.sticky );
		this.sticky.destroy();

		$("#intro_nav").css({
			"position" : "fixed",
			"top" : 0
		});

		// FORCE RECALC OF INVIEW POINTS
		
		setTimeout( function(){
			Waypoint.refreshAll()
			$(window).trigger('resize');
		}, 1100 );

	},

	loadIntroSections: function () {

		console.log("Home.loadIntroSections");

		AjaxCalls.introSection();

	},

	ajaxSuccess: function () {

		console.log("Home.ajaxSuccess");

		var self = this;

		this.bindEvents();

		// NAVIGATE TO SECTION
		this.navTo( this.section );

		this.navColourInit();

		this.htmlPrep();

		this.contentsImgInit();

		setTimeout( function (){

			// SET CONTENTS HEIGHT HERE
			self.contentsHeight();

		}, 500 );

		// LOAD CONTENTS IMAGES
		setTimeout( function (){

			self.loadContentsImgs();
			
		}, 2000 );

	},

	navTo: function ( section ) {

		console.log("Home.navTo", section);

		if ( section.length ) {

			console.log( 111, $('[data-anchor="'+ section +'"]') );

			var targetTop = $('[data-anchor="'+ section +'"]').offset().top;

			$("html,body").animate({
				scrollTop: targetTop
			}, 1000 );
		}

	},

	navColourInit: function () {

		console.log("Home.navColourInit");

		var self = this;

		// COLOPHON WAYPOINT
		var inview_foreword = new Waypoint.Inview({
			element: $('#foreword_wrapper')[0],
			enter: function( direction ) {
				// ON UP: COLOPHON ENTERS THE SCREEN
				if ( direction === "up" ) {
					self.navForeword("enter");
					// self.navColourChange("#fff9c2");
				}
			},
			entered: function( direction ) {
				// ON UP: COLOPHON EXITS THE SCREEN
				if ( direction === "up" ) {
					self.navForeword("exit");
					// self.navColourChange("#424242");
					console.log("Exit up.");
				}
			},
			exit: function( direction ) {
				// ON DOWN: COLOPHON ENTERS THE SCREEN
				if ( direction === "down" ) {
					self.navForeword("enter");
					// self.navColourChange("#fff9c2");
				}
			},
			exited: function( direction ) {
				// ON DOWN: COLOPHON EXITS THE SCREEN
				if ( direction === "down" ) {
					// self.navForeword("exit");
					// self.navColourChange("#424242");
					console.log("Exit down.");
				}
			}
		});

		// CONTENTS WAYPOINT
		var inview_contents = new Waypoint.Inview({
			element: $('#contents_wrapper')[0],
			enter: function( direction ) {
				// ON UP: CONTENTS ENTERS THE SCREEN
				if ( direction === "up" ) {
					self.navContents("enter");
					// self.navColourChange("#424242");
				}
			},
			entered: function( direction ) {
				// ON UP: CONTENTS EXITS THE SCREEN
				if ( direction === "up" ) {
					self.navContents("exit");
					// self.navColourChange("white");
				}
			},
			exit: function( direction ) {
				// ON DOWN: CONTENTS ENTERS THE SCREEN
				if ( direction === "down" ) {
					self.navContents("enter");
					// self.navColourChange("#424242");
				}
			},
			exited: function( direction ) {
				// ON DOWN: CONTENTS EXITS THE SCREEN
				if ( direction === "down" ) {
					self.navContents("exit");
					// self.navColourChange("white");
				}
			}
		});

		// COLOPHON WAYPOINT
		var inview_colophon = new Waypoint.Inview({
			element: $('#colophon_wrapper')[0],
			enter: function( direction ) {
				// ON UP: COLOPHON ENTERS THE SCREEN
				if ( direction === "up" ) {
					self.navColophon("enter");
					// self.navColourChange("#fff9c2");
				}
			},
			entered: function( direction ) {
				// ON UP: COLOPHON EXITS THE SCREEN
				if ( direction === "up" ) {
					self.navColophon("exit");
					// self.navColourChange("#424242");
				}
			},
			exit: function( direction ) {
				// ON DOWN: COLOPHON ENTERS THE SCREEN
				if ( direction === "down" ) {
					self.navColophon("enter");
					// self.navColourChange("#fff9c2");
				}
			},
			exited: function( direction ) {
				// ON DOWN: COLOPHON EXITS THE SCREEN
				if ( direction === "down" ) {
					self.navColophon("exit");
					// self.navColourChange("#424242");
				}
			}
		});

	},

	navForeword: function ( direction ) {

		console.log("Home.navForeword", direction );

		var bgColour, textColour;
		if ( direction === "enter" ) {
			bgColour = "#fffef8";
			textColour = "#212121";
		} else if (  direction === "exit" ) {
			bgColour = "";
			textColour = "";
		}
		$("#intro_nav").css({
			"background-color" 	: bgColour,
			"box-shadow" 		: "0px 2px 6px " + bgColour	
		});
		$("#intro_nav ul li:first-child a").css({
			"color"	: textColour
		});

	},

	navContents: function ( direction ) {

		console.log("Home.navContents");

		var bgColour, textColour;
		if ( direction === "enter" ) {
			bgColour = "#424242";
			textColour = "white";
		} else if (  direction === "exit" ) {
			textColour = "";
		}
		$("#intro_nav").css({
			"background-color" 	: bgColour,
			"box-shadow" 		: "0px 2px 6px " + bgColour	
		});	
		$("#intro_nav ul li a").css({
			"color"	: ""
		});	
		$("#intro_nav ul li:nth-child(2) a").css({
			"color"	: textColour
		});	

	},

	navColophon: function ( direction ) {

		console.log("Home.navColophon");

		var bgColour, textColour;
		if ( direction === "enter" ) {
			bgColour = "#fff9c2";
			textColour = "#212121";
		} else if (  direction === "exit" ) {
			textColour = "";
		}
		$("#intro_nav").css({
			"background-color" 	: bgColour,
			"box-shadow" 		: "0px 2px 6px " + bgColour	
		});	
		$("#intro_nav ul li:nth-child(3) a").css({
			"color"	: textColour
		});	

	},	

	// navColourChange: function ( colour ) {

	// 	console.log("Home.navColour");

	// 	var textColour = ( colour == "#424242" ? "#fff" : "#212121" );

	// 	$("#intro_nav").css({
	// 		"background-color" : colour
	// 	});
	// 	$("#intro_nav a").css({
	// 		// "color" : textColour
	// 	});

	// },

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

		var inview = new Waypoint.Inview({
			element: $('#contents_image_wrapper')[0],
			entered: function( direction ) {
				// END FIX
				self.contentsImgUnfix();
			},
			exit: function( direction ) {
				// START FIX
				self.contentsImgFix();
			}
		});

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

	contentsImgUnfix: function () {

		console.log("Home.contentsImgUnfix");

		// GET CURRENT TOP POSITION

		var currTop = $("#contents_image").offset().top - $("#contents_image_wrapper").offset().top; 

		$("#contents_image").css({
			"position" : "",
			"top" : currTop
		});

	},

	contentsHeight: function () {

		console.log("Home.contentsHeight");

		var leftH = 0,
			rightH = 0;

		// LOOP THROUGH SUB-SECTIONS
		$(".contents_sub_section").each( function(i) {

			// FIRST 3 
			if ( i < 3 ) {

				leftH += $(this).outerHeight() + 40;
				// console.log( 465, $(this).outerHeight() );

			// LAST 3 
			} else {

				rightH += $(this).outerHeight() + 40;

			}

			console.log( i, $(this).outerHeight() );

		});

		console.log( 314, leftH, rightH );

		var totalH = Math.max( leftH, rightH );

		$("#contents_wrapper #contents_list").css( "height", totalH + 76 );

	},

	htmlPrep: function () {

		console.log("Home.htmlPrep");

		// ADD GLYPHS TO WINGDING TEXTS
        $("#contents_list li").each( function(){

            console.log( 169, "Glyph added." );
            $(this).find(".contents_category").prepend("<span class='wingdings'><img src='" + TEMPLATE + "/assets/img/wingding_glyph_white.svg' /></span> ");

        });

	}

}