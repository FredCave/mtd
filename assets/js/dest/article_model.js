var app = app || {};

app.ArticleModel = Backbone.Model.extend({

	urlRoot: ROOT + "/wp-json/custom/v1/article"

});