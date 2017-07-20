var app = app || {};

var ScrollSnap = {

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

		console.log("ScrollSnap.init");

		this.setLimits();

		this.bindEvents();

	},

	bindEvents: function () {

		console.log("ScrollSnap.bindEvents");

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
				self.scrollManager();				
			}

		}, 500 ));

	},

	scrollManager: function () {

		console.log("ScrollSnap.scrollManager");
			
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

			if ( winBottom > bottomLimit + 100 && this.currentSection < 4 ) {

				// PAUSE SCROLL DETECTION
				this.scrollDetect = false;

				var target = this.limits[this.currentSection + 1].top;
				console.log( 94, this.limits[this.currentSection + 1].id, this.limits[this.currentSection + 1].top );

				$("#intro_scroll_wrapper").animate({
					scrollTop : target
				}, 750, function(){
					self.currentSection++;
					self.scrollDetect = true;				
				});

			}

		// ELSE IF SCROLLING UP 
		} else if ( this.delta < 0 - this.sensitivity ) {

			// GET TOP LIMIT OF CURRENT SECTION
			var topLimit = this.limits[this.currentSection].top;
			
			console.log( "Up", this.scrollTop, topLimit - 100 );

			if ( this.scrollTop < topLimit - 100 ) {

				// PAUSE SCROLL DETECTION
				this.scrollDetect = false;

				// TARGET IS BOTTOM OF PREVIOUS SECTION
				var target = this.limits[this.currentSection - 1].bottom - this.winH;

				$("#intro_scroll_wrapper").animate({
					scrollTop : target
				}, 750, function(){
					self.currentSection--;
					self.scrollDetect = true;				
				});

			}

		}

		this.lastNumber = this.scrollTop;
		
	}, 

	setLimits: function () {

		console.log("HomeNav.setLimits");

		// RECORD LIMITS FOR EACH SECTION
		var limits = [],
			section;

		$("#intro_scroll_wrapper section").each( function(){
			section = {};
			section.id = "#" + $(this).attr("id");
			section.top = $(this).offset().top;
			section.bottom = $(this).offset().top + $(this).height();
			limits.push( section );
		});		

		this.limits = limits;
		console.log( 151, limits );

	},

}