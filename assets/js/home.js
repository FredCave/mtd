var Home = {
	
	init: function ( section ) {

		console.log("Home.init");

		this.section = section;

		// PIN NAV
		var sticky = new Waypoint.Sticky({
			element: $("#intro_nav")[0],
			handler: function(direction) {
		    	// BUG FIX
		    	// CHECK IF PAGE HAS SCROLLED
		    	if ( $(window).scrollTop() === 0 ) {
		    		$("#intro_nav").removeClass("stuck");
		    	}
			},
		});

		// LOAD INTRO SECTIONS
		this.loadIntroSections();
		
	},

	bindEvents: function () {

		// BOUND AFTER AJAX LOAD

		console.log("Home.bindEvents");

		var self = this;

		// $("#introvid").on("ended", function(){

		// 	// SCROLL DOWN TO FOREWORD
		// 	// ANIMATION BEFORE?

		// });

		$("#contents_list li").on( "mouseover", function(){
			
			// GET ID
			var thisId = $(this).attr("data-id");
			console.log( 40, thisId );

			// SHOW IMAGE
			$("#contents_image").find("#preview-" + thisId).css("opacity","1");

		});

		$("#contents_list li").on( "mouseout", function(){

			// HIDE IMAGE
			$("#contents_image li").css("opacity","0");

		});

	},

	onVideoEnd: function () {

		console.log("Home.onVideoEnd");

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

		// SET CONTENTS HEIGHT HERE
		this.contentsHeight();

		this.contentsImgInit();

		// LOAD CONTENTS IMAGES
		setTimeout( function (){
			self.loadContentsImgs();
		}, 2000 );

	},

	navTo: function ( section ) {

		console.log("Home.navTo", section);

		if ( section.length ) {
			var targetTop = $('[data-anchor="'+ section +'"]').offset().top;
			console.log( 122, targetTop );
			$("html,body").animate({
				scrollTop: targetTop
			}, 1000 );
		}

	},

	navColourInit: function () {

		console.log("Home.navColourInit");

		var self = this;

		// CONTENTS WAYPOINT
		var inview = new Waypoint.Inview({
			element: $('#contents_wrapper')[0],
			enter: function( direction ) {
				// ON UP: CONTENTS ENTERS THE SCREEN
				if ( direction === "up" ) {
					self.navColourChange("#424242");
				}
			},
			entered: function( direction ) {
				// ON UP: CONTENTS EXITS THE SCREEN
				if ( direction === "up" ) {
					self.navColourChange("white");
				}
			},
			exit: function( direction ) {
				// ON DOWN: CONTENTS ENTERS THE SCREEN
				if ( direction === "down" ) {
					self.navColourChange("#424242");
				}
			},
			exited: function( direction ) {
				// ON DOWN: CONTENTS EXITS THE SCREEN
				if ( direction === "down" ) {
					self.navColourChange("white");
				}
			}
		});

		// COLOPHON WAYPOINT
		var inview = new Waypoint.Inview({
			element: $('#colophon_wrapper')[0],
			enter: function( direction ) {
				// ON UP: CONTENTS ENTERS THE SCREEN
				if ( direction === "up" ) {
					self.navColourChange("#fffab4");
				}
			},
			entered: function( direction ) {
				// ON UP: CONTENTS EXITS THE SCREEN
				if ( direction === "up" ) {
					self.navColourChange("#424242");
				}
			},
			exit: function( direction ) {
				// ON DOWN: CONTENTS ENTERS THE SCREEN
				if ( direction === "down" ) {
					self.navColourChange("#fffab4");
				}
			},
			exited: function( direction ) {
				// ON DOWN: CONTENTS EXITS THE SCREEN
				if ( direction === "down" ) {
					self.navColourChange("#424242");
				}
			}
		});

	},

	navColourChange: function ( colour ) {

		console.log("Home.navColour");

		console.log( 183, colour );

		var textColour = ( colour == "#424242" ? "#fff" : "#212121" );

		$("#intro_nav").css({
			"background-color" : colour
		});
		$("#intro_nav a").css({
			"color" : textColour
		});

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
				
				// console.log( 169, art );
				
				var src;

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

			});

			html += "</ul>";

			$("#contents_image").append( html );

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
		var parentW = $("#contents_image").width();

		$("#contents_image").css({
			"position" : "fixed",
			"width" : parentW,
			"top" : ""
		});

		console.log( 174 );

	},

	contentsImgUnfix: function () {

		console.log("Home.contentsImgUnfix");

		// GET CURRENT TOP POSITION

		var currTop = $("#contents_image").offset().top - $("#contents_image_wrapper").offset().top; 

		console.log( 186, currTop );

		$("#contents_image").css({
			"position" : "",
			"top" : currTop
		});

	},

	contentsHeight: function () {

		console.log("Home.contentsHeight");

		var totalH = 0;

		// LOOP THROUGH SUB-SECTIONS
		$(".contents_sub_section").each( function(i) {

			if ( i % 2 === 0 ) {
				totalH += $(this).height() + 36;
			}

		});

		console.log( 314, totalH );
		$("#contents_wrapper #contents_list").css( "height", totalH + 28 );

	}

}