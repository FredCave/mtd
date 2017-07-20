var app = app || {};

var HomeNav = {

	scrollDetect: true, 

	scrollTop: 0, 

	winH: $(window).height(),  

	sections: [ "#video_section", "#intro_foreword", "#intro_contents", "#intro_colophon" ],
	
	currentSection: 0, 

	winBottom: 0,

	lastNumber: 0,

	delta: 0,
				
	sensitivity: 10,

	limits: [], 

	init: function () {

		console.log("HomeNav.init");

		this.setLimits();

		this.bindEvents();

	},

	bindEvents: function () {

		console.log("HomeNav.bindEvents");

		var self = this;

		$(window).on( "resize", _.throttle( function(){

			self.setLimits();
			self.winH = $(window).height();

		}, 500));

		// UPDATE SCROLL VALUE
		$("#intro_scroll_wrapper").on( "scroll", _.throttle( function(){
		
			self.scrollTop = $(this).scrollTop();
		
		}, 250 ));

		$("#intro_scroll_wrapper").on( "mousewheel", _.throttle( function(e){

			if ( !self.scrollDetect ) {
				e.preventDefault();
			} else {
				self.wheelManager();				
			}

		}, 750 ));

		// NAV LINKS CLICK
		$(".intro_nav").on( "click", function(e) {
			
			e.preventDefault();
			self.scrollTo( $(this).attr("data-link") );

		});

	},

	wheelManager: function () {

		console.log("HomeNav.wheelManager");
			
		var self = this;

		this.scrollTop = $(this).scrollTop();

		// GET SCROLL DIRECTION
		this.delta = this.scrollTop - this.lastNumber;
	
		var winBottom = this.scrollTop + this.winH;

		// IF SCROLLING DOWN 
		if ( this.delta > this.sensitivity ) {

			// GET BOTTOM LIMIT OF CURRENT SECTION
			var bottomLimit = this.limits[this.currentSection].bottom;
			
			console.log( "Down", winBottom, this.limits[this.currentSection].bottom + 100 );

			console.log( 96, this.limits[this.currentSection + 1] );

			if ( winBottom > bottomLimit + 80 && this.limits[this.currentSection + 1] !== undefined ) {

				// PAUSE SCROLL DETECTION
				this.scrollDetect = false;

				var target = this.limits[this.currentSection + 1].top;

				// UPDATE TOP BAR COLOUR
				this.topBarColour( this.limits[this.currentSection + 1].id );

				// ANIMATE
				$("#intro_scroll_wrapper").animate({
					scrollTop : target
				}, 750, function(){
					// self.setLimits();
					self.currentSection++;
					self.scrollDetect = true;
					// IF VIDEO NOT YET HIDDEN
					console.log( 110, "Current section: ", self.currentSection );
					if ( !Home.videoHidden ) {
						Home.hideVideo();
					}				
				});

			}

		// ELSE IF SCROLLING UP 
		} else if ( this.delta < 0 - this.sensitivity ) {

			// GET TOP LIMIT OF CURRENT SECTION
			var topLimit = this.limits[this.currentSection].top;
			
			console.log( "Up", this.scrollTop, topLimit - 100 );

			if ( this.scrollTop < topLimit - 80 ) {

				// PAUSE SCROLL DETECTION
				this.scrollDetect = false;

				// TARGET IS BOTTOM OF PREVIOUS SECTION
				var target = this.limits[this.currentSection - 1].bottom - this.winH;

				// UPDATE TOP BAR COLOUR
				self.topBarColour( this.limits[this.currentSection - 1].id );

				// ANIMATE
				$("#intro_scroll_wrapper").animate({
					scrollTop : target
				}, 750, function(){
					// self.setLimits();
					self.currentSection--;
					self.scrollDetect = true;
					console.log( 146, "Current section: ", self.currentSection );				
				});

			}

		}

		this.lastNumber = this.scrollTop;
		
	}, 

	scrollTo: function ( section ) {

		console.log("HomeNav.scrollTo", section);

		var self = this;

		// UPDATE CURRENT SECTION
		var index = 0;
		_.each( this.sections, function ( _section ) {
			if ( _section.indexOf(section) > -1 ) {
				self.currentSection = index;
				console.log( 168, "Current section: ", self.currentSection );
			}
			index++;
		});

		if ( $('#intro_'+ section).length ) {

			var target = $('#intro_'+ section), 
				targetTop = target.offset().top + self.scrollTop;

			// UPDATE TOP BAR COLOUR
			self.topBarColour( '#intro_'+ section );

			// ANIMATE
			$("#intro_scroll_wrapper").animate({
				scrollTop: targetTop
			}, 750, function () {
				_.defer( function(){
					// self.setLimits();
					if ( !Home.videoHidden ) {
						Home.hideVideo();
					}
					if ( !Home.pageLoaded ) {
						Home.hideLoading();
					}				
				});
			} );

		}

	},

	setLimits: function () {

		console.log("HomeNav.setLimits");

		// RECORD LIMITS FOR EACH SECTION
		var limits = [],
			section,
			self = this;

		$("#intro_scroll_wrapper section").each( function(){
			section = {};
			section.id = "#" + $(this).attr("id");
			section.top = $(this).offset().top + self.scrollTop;
			section.bottom = section.top + $(this).height();
			limits.push( section );
		});		

		this.limits = limits;
		console.log( 221, limits[3].top,  limits[3].bottom );

	},

	topBarColour: function ( section ) {

		console.log("HomeNav.topBarColour", section);

// 		// SECTION === ID

// 		var sectionColour = $(section).css("background-color")
// 		$("#intro_nav").css({
// 			"background-color" 	: sectionColour,
// 			"box-shadow"		: "0px 2px 6px " + sectionColour
// 		});

	}

}