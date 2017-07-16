/********************************

	– SNAP TO ON SCROLL
		+ ON SECTION CHANGE: UPDATE URL

********************************/

var app = app || {};

var HomeNav = {

	section: "", 

	sectionTopLimit: 0,

	sectionBottomLimit: 0, 

	winH: $(window).height(),  

	scrollTop: 0, 

	scrollDetect: false,
	
	init: function () {

		console.log("HomeNav.init");

		this.bindEvents();

		this.setLimits();

		// START SCROLL DETECT
		this.scrollDetect = true;

	},

	bindEvents: function () {

		console.log("HomeNav.bindEvents");

		var self = this;

		// INTRO NAV CLICK
		$(".intro_nav").on( "click", function(e) {
			
			e.preventDefault();
			self.navClick( $(this).attr("data-link") );

		});

		var winBottom,
			lastNumber,
			scrollingDown;

		$("#intro_scroll_wrapper").on("mousewheel", _.throttle( function(){
			
			self.scrollTop = $(this).scrollTop();

			if ( self.scrollDetect ) {

				// GET SCROLL DIRECTION
				self.scrollTop >= lastNumber ? scrollingDown = true : scrollingDown = false;
				lastNumber = self.scrollTop;

				winBottom = self.scrollTop + self.winH;

				// console.log( 67, self.scrollTop );

				// IF SCROLLING UP && APPROACHING TOP
				// if ( !scrollingDown && self.scrollTop < self.sectionTopLimit ) {

				// 	// IF PREV EXISTS
				// 	if ( $("#intro_" + self.section ).prev().length ) {

				// 		// PAUSE NAVIGATING
				// 		self.scrollDetect = false;
				// 		var prev = $("#intro_" + self.section ).prev().attr("id");
				// 		// UPDATE URL + STORED SECTION
				// 		Backbone.history.navigate( "#" + prev.split("_")[1], false );
						
				// 		// SCROLL TO BOTTOM OF PREV SECTION
				// 		// CURRENT TOP - WINH
				// 		var currentTop = $("#intro_" + self.section ).offset().top + self.scrollTop;
						
				// 		$("#intro_scroll_wrapper").animate({
				// 			scrollTop: currentTop - self.winH
				// 		}, 500, function(){
				// 			// UPDATE LIMITS WITH NEW SECTION
				// 			self.setLimits();
				// 		} );
				// 		// RESET LASTNUMBER
				// 		lastNumber = 0;

				// 		self.section = prev.split("_")[1];
				// 		setTimeout( function(){
				// 			// RESET NAVIGATING
				// 			self.scrollDetect = true;
				// 		}, 1000 );

				// 	}

				// // ELSE IF SCROLLING DOWN && APPROACHING BOTTOM
				// } else if ( scrollingDown && winBottom > self.sectionBottomLimit ) {
					
				// 	console.log( 105, self.section );

				// 	// IF NEXT EXISTS
				// 	if ( $("#intro_" + self.section ).next().length || self.section === undefined ) {

				// 		// PAUSE NAVIGATING
				// 		self.scrollDetect = false;
				// 		var next;
				// 		// IF ON VIDEO SECTION
				// 		if ( self.section === undefined ) {
				// 			next = "foreword";
				// 		} else {
				// 			next = $("#intro_" + self.section ).next().attr("id").split("_")[1];
				// 		}
				// 		Backbone.history.navigate( "#" + next, true );						
				// 		setTimeout( function(){
				// 			// RESET NAVIGATING
				// 			self.scrollDetect = true;
				// 		}, 1000 );
				// 	}

				// }

			}
		
		}, 250 ));

		// UPDATE SCROLL VALUE
		$("#intro_scroll_wrapper").on("scroll", _.throttle( function(){
			self.scrollTop = $(this).scrollTop();
		}, 250 ));

		$(window).on("resize", _.throttle( function(){

			self.setLimits();

		}, 500));


	},

	navClick: function ( click ) {

		console.log("HomeNav.navClick", click);

		console.log( 148, this.section );

		// IF ALREADY AT SECTION
		if ( click === this.section ) {
			console.log( 150, click );
			// SCROLL TO TOP OF SECTION
			this.scrollTo( click );
		} else {
			// ELSE : CHANGE HASH
			Backbone.history.navigate( "#" + click, true );	
		}

	},

	setLimits: function () {

		console.log("HomeNav.setLimits");

		var target, sectionTop, sectionBottom,
			proximity = 5,
			adjust;

		if ( this.section === undefined || this.section === ""  ) {
			this.section = "video_section"; 
			target = "#video_section";
			adjust = 0;
		} else {
			target = "#intro_" + this.section;
			adjust = 1;
		}

		sectionTop = $(target).offset().top + this.scrollTop;
		sectionBottom = sectionTop + $(target).height();

		this.sectionTopLimit = Math.floor( sectionTop + ( this.winH / proximity ) );
		this.sectionBottomLimit = Math.floor( sectionBottom + ( this.winH / proximity ) );

	},

	scrollTo: function ( section ) {

		console.log("HomeNav.scrollTo", section);

		var self = this;

		// STORE CURRENT SECTION
		this.section = section;

		if ( $('#intro_'+ section).length ) {

			// FIXES MYSTERY CONTENTS HEIGHT BUG
			setTimeout( function(){

				var target = $('#intro_'+ section), 
					targetTop = target.offset().top + self.scrollTop;

				$("#intro_scroll_wrapper").animate({
					scrollTop: targetTop
				}, 750, function () {
					setTimeout( function(){
						if ( !Home.videoHidden ) {
							Home.hideVideo();
						}
						self.setLimits();
					}, 250 );
					if ( !Home.pageLoaded ) {
						Home.hideLoading();
					}
				} );

			}, 250 );

		}

	},

}