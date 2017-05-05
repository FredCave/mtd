var app = app || {};

app.ArticleCollection = Backbone.Collection.extend({
	
	url: ROOT + "/wp-json/custom/v1/all-articles",

	initialize: function () {
		
		this.fetch();
	
	}

});