var HomeNav = {

	winH: $(window).height(), 

	scrolling: false, 

	scrollBlocked: false, 

	introHidden: false, 

	eventsBound: false, 

	init: function () {

		console.log("HomeNav.init");

		this.bindEvents();

	},

	bindEvents: function () {

		if ( this.eventsBound ) {
			return;
		}

		this.eventsBound = true;

		console.log("HomeNav.bindEvents");

		var self = this;

		// INIT SLIDING SECTIONS IF NOT MOBILE
		if ( $(window).width() > 768 ) {
			$("#intro_scroll_wrapper").sectionsnap();
		}

		// NAV LINKS CLICK
		// $(".intro_nav").off("click");
		$(".intro_nav").on( "click", function(e) {
			
			e.preventDefault();
			self.scrollTo( $(this).attr("data-link") );

		});

		// $(window).off("resize");
		$(window).on( "resize", _.throttle( function(e){

			self.winH = $(window).height();

		}, 750 ));

		// $(window).off("scroll");
		$(window).on( "scroll", _.throttle( function(e){

			if ( !self.scrollBlocked ) {
				self.hashCheck();
			} else {
				e.preventDefault();
			}

		}, 250 ));

	},

	hashCheck: function () {

		console.log( 71, this.introHidden );

		// PREVENT DURING SCROLLTO ANIMATION
		if ( this.scrolling || this.introHidden ) {
			return;
		}

		console.log("HomeNav.hashCheck");

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

	mobileNav: function ( section ) {

		// PREVENT ONCE INTRO HIDDEN
		if ( this.introHidden ) {
			return;
		}

		console.log( "HomeNav.mobileNav", section );

		if ( section === "init" ) {
			console.log(111);
			$("#intro_nav_mobile").css("opacity","1");
		} else {
			console.log(114);
			if ( section === "contents" ) {
				console.log(116);
				$("#intro_nav_mobile").css("color","white");
			} else {
				console.log(119);
				$("#intro_nav_mobile").css("color","");
			}
			$("#intro_nav_mobile").text( section );
		}

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

		// INCLUDE MOBILE NAV UPDATE
		this.mobileNav( section );

		// IF NOT FIRST TIME
		if ( section === undefined && Home.videoHidden ) {
			section = "foreword";
		}

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