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

		var self = this;

		this.bindEvents();

		// GET CURRENT SECTION
		var hash = document.location.hash,
			index = 0;
		hash = hash.substring( 1, hash.length );

		_.each( this.sections, function( section ) {
			if ( section.indexOf(hash) > -1 ) {
				self.currentSection = index;
			}
			index++;				
		});
		// IF NO HASH
		if ( hash === "" ) {
			self.currentSection = 0;
		}

	},

	bindEvents: function () {

		console.log("HomeNav.bindEvents");

		var self = this;

		// INTRO NAV CLICK
		$(".intro_nav").on( "click", function(e) {
			
			e.preventDefault();
			self.navClick( $(this).attr("data-link") );

		});

	},

	navClick: function ( click ) {

		console.log("HomeNav.navClick", click);

		// IF ALREADY AT SECTION
		if ( click === this.section ) {
			// SCROLL TO TOP OF SECTION
			this.scrollTo( click );
		} else {
			// ELSE : CHANGE HASH
			Backbone.history.navigate( "#" + click, true );	
		}

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

				self.topBarColour( '#intro_'+ section );

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

	scrollToContents: function () {

		console.log("HomeNav.scrollToContents");

		// WHEN ARTICLES VISIBLE: INTRO SCROLLS TO CONTENTS
		if ( $('#intro_contents').length ) {
			var targetTop = $('#intro_contents').offset().top + self.scrollTop;

			$("#intro_scroll_wrapper").animate({
				scrollTop: targetTop
			}, 750 );
		}

	},

	topBarColour: function ( section ) {

		console.log("HomeNav.topBarColour", section);

		// SECTION === ID

		var sectionColour = $(section).css("background-color")
		$("#intro_nav").css({
			"background-color" 	: sectionColour,
			"box-shadow"		: "0px 2px 6px " + sectionColour
		});

	}

}