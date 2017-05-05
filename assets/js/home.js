var Home = {
	
	init: function () {

		console.log("Home.init");

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

	}

}