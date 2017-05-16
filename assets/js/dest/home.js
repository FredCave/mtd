var Home = {
	
	init: function ( section ) {

		console.log("Home.init");

		this.section = section;

		this.bindEvents();

		// PIN NAV


		// LOAD VIDEO
		this.loadVideo();

		// LOAD INTRO SECTIONS
		this.loadIntroSections();

	},

	bindEvents: function () {

		console.log("Home.bindEvents");

		var self = this;

		$("#introvid").on("ended", function(){

			// SCROLL DOWN TO FOREWORD
			// ANIMATION BEFORE?

		});

		// FIX NAV TO TOP
		// $(window).on("scroll", _.throttle(function(){
		// 	self.fixNav();
		// }, 100 ));

	},

	fixNav: function () {

		console.log("Home.fixNav");

		// var winScroll = $(window).scrollTop(),
		// 	navTop = $("#intro_nav_wrapper").offset().top;

		// if ( winScroll >= navTop ) {

		// 	$("#intro_nav")

		// }

		// console.log( 44, winScroll, navTop );

	},

	loadVideo: function () {

		console.log("Home.loadVideo");

		// ALREADY LOADED IN PHP

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

		// CONTENTS LAYOUT
		// $('#contents_list').masonry({
		// 	itemSelector: '.contents_sub_section',
		// 	// gutter: 34
		// });

		// NAVIGATE TO SECTION
		this.navTo( this.section );

	},

	navTo: function ( section ) {

		console.log( "Home.navTo", section );

		if ( section !== undefined ) {
			var targetTop = $('[data-anchor="'+ section +'"]').offset().top;
			$("html,body").animate({
				scrollTop: targetTop
			}, 1000 );
		}

	}

}