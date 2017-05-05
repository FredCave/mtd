var app = app || {};

app.IntroView = Backbone.View.extend({

	el: "#intro",

	initialize: function () {

		console.log("IntroView.initialize");

		this.bindEvents();

		this.render();

		$('#fullpage').fullpage({
			sectionSelector: '.intro_section',
			anchors:['foreword', 'contents', 'colophon']
		});

	},

	bindEvents: function () {

		console.log("IntroView.bindEvents");

		// $("#intro").on("click", "#contents_list a", function(e){

		// 	e.preventDefault();
		// 	var clickId = $(this).attr("data-id");
		// 	new app.ArticleView({id:clickId});

		// });

	},

	template: _.template( $('#intro_template').html() ),

	render: function () {

		console.log("IntroView.render");

		this.$el.append( this.template() );

		return this;

	}

});