/********************************

	– SNAP TO ON SCROLL
		+ ON SECTION CHANGE: UPDATE URL

********************************/

var app = app || {};

var Home = {
	
	videoHidden: false, 

	sectionTopLimit: 0,

	sectionBottomLimit: 0, 

	sectionIndex: 0,

	winH: $(window).height(),  

	scrollDetect: true,

	init: function ( section ) {

		console.log("Home.init", section);

		this.section = section;

		this.pinNav();

		// IF INIT WITH SECTION
		if ( section === "" ) {
			// IF MAIN HOME: PLAY VIDEO
			if ( $("#introvid").length ) {
				$("#introvid")[0].play();		
			}
			this.setLimits();
		} else {
			this.navTo( section );
		}

		this.bindEvents();

	},

	bindEvents: function () {

		console.log("Home.bindEvents");

		var self = this;

		$(".intro_nav").on( "click", function(e) {
			e.preventDefault();
			console.log( 31, $(this).attr("data-link") );	
			document.location.hash = $(this).attr("data-link");		
		});

		var winTop, winBottom;

		$("#intro_scroll_wrapper").on("scroll", _.throttle( function(){
			
			if ( self.scrollDetect ) {

				winTop = $(this).scrollTop();
				winBottom = winTop + self.winH;

				// COMPARE TO CURRENT SECTION LIMITS – UPLOADED EACH TIME SECTION CHANGES

				console.log( winTop, winBottom, self.sectionTopLimit, self.sectionBottomLimit );

					// IF APPROACHING TOP
				// if ( winTop < self.sectionTopLimit ) {

				// 	var prev = $("#intro_scroll_wrapper section").eq( self.sectionIndex - 1 ).attr("id");
				// 	console.log( 63, "Scroll up.", prev, self.sectionIndex );
				// 	self.scrollDetect = true;
				// 	setTimeout( function(){
				// 		self.scrollDetect = true;
				// 	}, 1500 );
				// 	if ( self.scrollDetect ) {
				// 		document.location.hash = prev.split("_")[1];	
				// 	}

				// } else if ( winBottom > self.sectionBottomLimit ) {
				// 	// ELSE IF APPROACHING BOTTOM

				// 	var next = $("#intro_scroll_wrapper section").eq( self.sectionIndex + 1 ).attr("id");
				// 	console.log( 68, "Scroll bottom.", next, self.sectionIndex );
				// 	self.scrollDetect = false;
				// 	setTimeout( function(){
				// 		self.scrollDetect = true;
				// 	}, 1500 );
				// 	if ( self.scrollDetect ) {
				// 		document.location.hash = next.split("_")[1];	
				// 	}

				// }

			}
		
		}, 500 ));

		$(window).on("resize", _.throttle( function(){

			self.setLimits();

		}, 500));

	},

	setLimits: function () {

		console.log("Home.setLimits");

		// GET CURRENT POS
		var currentPos = $("#intro_scroll_wrapper").scrollTop(),
			winH = $(window).height();

		console.log( 73, currentPos );
		var currTop = 0, 
			currBottom = currTop + winH,
			top, bottom, 
			index = 0;

		// LOOP THROUGH SECTIONS
		$("#intro_scroll_wrapper section").each( function(){

			top = $(this).offset().top;
			bottom = top + $(this).height();

			if ( currentPos >= top && currentPos < bottom ) {

				console.log( 82, $(this).attr("id"), top, bottom );	
				currTop = top + currentPos;
				currBottom = bottom + currentPos;		
				self.sectionIndex = index;	

			}

			index++;

		});

		console.log( 117, "Saved currTop + currBottom", currTop, currBottom );

		this.sectionTopLimit = Math.ceil( currTop + ( winH / 4 ) );
		this.sectionBottomLimit = Math.ceil( currBottom + ( winH / 4 ) );

	},

	pinNav: function () {

		console.log("Home.pinNav");

		this.sticky = new Waypoint.Sticky({
			element: $("#intro_nav")[0],
			context: $("#intro_scroll_wrapper"),  
			handler: function(direction) {
		    	// BUG FIX
		    	// CHECK IF PAGE HAS SCROLLED
		    	// if ( $(window).scrollTop() === 0 ) {
		    	// 	$("#intro_nav").removeClass("stuck");
		    	// }
			},
		});

	},

	navTo: function ( section ) {

		console.log("Home.navTo", section);

		var self = this;

		if ( $('#intro_'+ section).length ) {

			var target = $('#intro_'+ section), 
				targetTop = target.offset().top;

			console.log( 111, target, targetTop );

			$("#intro_scroll_wrapper").animate({
				scrollTop: targetTop
			}, 1000, function () {
				setTimeout( function(){
					if ( !self.videoHidden ) {
						self.hideVideo();
					}
				}, 500 );
			} );

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

		// REDUCE HEIGHT OF WRAAPPER
		var videoH = $("#video_section").height(),
			currentPos = $("#intro_scroll_wrapper").scrollTop();
		
		console.log( 110, videoH, currentPos );

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

			console.log( 211, "Set limits." );
			self.setLimits();

		}, 1100 );

		this.videoHidden = true;

	}

}