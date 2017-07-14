// var Lightbox = {

// 	lightboxVisible: false,

// 	init: function () {

// 		console.log("Lightbox.init");

// 		this.bindEvents();

// 	},

// 	bindEvents: function () {

// 		console.log("Lightbox.bindEvents");

// 		var self = this;

// 		$(".image").on("click", function(){

// 			self.lightboxInit( $(this) );

// 		});

// 	},

// 	lightboxInit: function ( img ) {

// 		console.log("Lightbox.lightboxInit");

// 		this.lightboxVisible = true;

// 		// SHOW WRAPPER
// 		$("#lightbox_wrapper").fadeIn(1000);

// 		// ADD CLICKED IMG TO WRAPPER
// 		img.clone().css({
// 			"width"		: "",
// 			"height"	: "",
// 			"position"	: "",
// 			"opacity"	: 0
// 		}).appendTo( $("#lightbox_inner_wrapper") );
// 		// RESIZE SRC
// 		this.imgCalc( $("#lightbox_inner_wrapper img") );
// 		// FADE IN
// 		$("#lightbox_inner_wrapper img").css("opacity","1");

// 	}

// }