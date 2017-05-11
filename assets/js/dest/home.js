var Home = {
	
	init: function ( section ) {

		console.log("Home.init");

		this.section = section;

		// LOAD VIDEO
		this.loadVideo();

		// LOAD INTRO SECTIONS
		this.loadIntroSections();

	},

	loadVideo: function () {

		console.log("Home.loadVideo");

		// ALREADY LOADED IN PHP

	},

	loadIntroSections: function () {

		console.log("Home.loadIntroSections");

		AjaxCalls.introSection();

	},

	ajaxSuccess: function () {

		console.log("Home.ajaxSuccess");

		// INIT FULL PAGE
        $('#intro_wrapper').fullpage({
			sectionSelector: '.intro_section',
			anchors:['foreword', 'contents', 'colophon']
		});

		// // NAVIGATE TO SECTION
		// this.navTo( this.section );

	},

	navTo: function ( section ) {

		console.log("Home.navTo");

		var targetTop = $('[data-anchor="'+ section +'"]').offset().top;
		$("html,body").animate({
			scrollTop: targetTop
		}, 1000 );
		console.log( 50, targetTop );

	}

}