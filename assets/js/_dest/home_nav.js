var HomeNav = {

	winH: $(window).height(), 

	scrolling: false, 

	scrollBlocked: false, 

	init: function () {

		console.log("HomeNav.init");

		this.bindEvents();

		// IF NOT SFARI
		var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.user;

		if ( !isSafari ) {
			$("#intro_scroll_wrapper").sectionsnap();
		}

	},

	bindEvents: function () {

		console.log("HomeNav.bindEvents");

		var self = this;

		// NAV LINKS CLICK
		$(".intro_nav").on( "click", function(e) {
			
			e.preventDefault();
			self.scrollTo( $(this).attr("data-link") );

		});

		$(window).on( "resize", _.throttle( function(e){

			self.winH = $(window).height();

		}, 750 ));

		$(window).on( "scroll", _.throttle( function(e){

			if ( !self.scrollBlocked ) {
				self.hashCheck();
			} else {
				e.preventDefault();
			}

		}, 250 ));

		// $("html").on( "scroll", _.throttle( function(e){

		// 	console.log( 42, "HTML scrolling.");

		// }, 100 ));	

		// $("body").on( "scroll", _.throttle( function(e){

		// 	console.log( 42, "Body scrolling.");

		// }, 100 ));	

	},

	hashCheck: function () {

		// console.log("HomeNav.hashCheck");

		// PREVENT DURING SCROLLTO ANIMATION
		if ( this.scrolling ) {
			return;
		}

		// GET CURRENT HASH
		var currHash = document.location.hash.substr(1),
			self = this;

		// GET CURRENT POSITION
		var winTop = $(window).scrollTop();
		$("#intro_scroll_wrapper").find("section").each( function(){

			var thisTop = $(this).offset().top - 60, // 60 IS HEIGHT OF TOP BAR
				thisBottom = thisTop + $(this).height();
			if ( winTop > thisTop && winTop < thisBottom ) {
				// IF CURRENT HASH !== VISIBLE SECTION
				var thisSection = $(this).attr("data-anchor");
				console.log( 90, "hashCheck", thisSection );
				if ( currHash !== thisSection && thisSection !== "video" ) {
					Backbone.history.navigate( thisSection, {trigger: false} );

					// IF FOREWORD AND VIDEO NOT YET HIDDEN
					if ( thisSection === "foreword" && !Home.videoHidden ) {
						Home.hideVideo();
					}

					self.colourManager( thisSection );
				}
			}

		});

	},

	scrollTo: function ( section ) {

		console.log("HomeNav.scrollTo", section);

		var self = this;

		if ( $('#intro_'+ section).length ) {

			var target = $('#intro_'+ section), 
				targetTop = target.offset().top;

			this.scrolling = true;

			// ANIMATE
			$("html,body").animate({
				scrollTop: targetTop
			}, 750, function () {
				_.defer( function(){
					if ( !Home.videoHidden ) {
						Home.hideVideo();
					}
					if ( !Home.pageLoaded ) {
						Home.hideLoading();
					}			
					// CALC COLOUR AT END OF ANIMATION
					self.scrolling = false;	
					self.colourManager( section );
				});
			} );

		}

	},

	colourManager: function ( section ) {

		console.log("HomeNav.colourManager", section);

		// IF NOT FIRST TIME
		if ( section === undefined && Home.videoHidden ) {
			section = "foreword";
		}

		console.log( 120, section );

		if ( section !== "video" ) {
			var bgColour = $("#intro_" + section).css("background-color");
			$("#intro_nav").css({
				"background-color" 	: bgColour,
				"box-shadow"		: "0px 2px 6px " + bgColour
			});
			$("html").css({
				"background-color"	: bgColour
			});
		} else {
			$("#intro_nav").css({
				"background-color" 	: "",
				"box-shadow"		: ""
			});
			$("html").css({
				"background-color"	: "black"
			});			
		}

	}

}