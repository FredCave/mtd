AjaxCalls = {

	responseTrim: function ( data ) {

		// IF LAST CHARACTER IS 1 OR 0 – REMOVE
        var lastChar = parseInt( data.slice(-1) );
        if ( lastChar === 1 || lastChar === 0 ) {
            data = data.slice(0, -1);
        } 
        return data;

	},

	introSection: function () {

		console.log("AjaxCalls.introSection");

		var self = this;

		$.ajax({
		    url: myAjax.ajaxurl,
		    data: {
		        "action" : "intro"
		    },
		    success:function(data) {

		    	data = self.responseTrim( data );

		        $("#intro_sections").append( data );

		        _.defer( function () {
		        	Home.ajaxSuccess();
		        } );

		    },
		    error: function(errorThrown){
		        console.log(errorThrown);
		    }
		}); 

	},

	loadArticleData: function () {

		console.log("AjaxCalls.loadArticleData");

		var self = this;

		$.ajax({
		    url: myAjax.ajaxurl,
		    data: {
		        "action" : "articledata"
		    },
		    dataType: "json",
		    success:function(data) {

		    	// SAVE ARTICLE DATA TO APP OBJECT
		    	App.articles = data;

		    	console.log( 60, App.articles );

		    	$(document).trigger("dataloaded");

		    },
		    error: function(errorThrown){
		        console.log(errorThrown);
		    }
		}); 		

	},

	loadArticle: function ( article_id ) {

		console.log("AjaxCalls.loadArticle", article_id);

		var self = this;

		$.ajax({
		    url: myAjax.ajaxurl,
		    data: {
		        "action" : "article",
		        "id" : article_id
		    },
		    // dataType: "json",
		    success:function(data) {

		    	data = self.responseTrim( data );

		    	Article.ajaxSuccess( data );

		    },
		    error: function(errorThrown){
		        console.log(errorThrown);
		    }
		}); 		

	}

}