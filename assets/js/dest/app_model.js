var app = app || {};

app.AppModel = Backbone.Model.extend({
	
	url: ROOT + "/wp-json/custom/v1/all-articles"

});