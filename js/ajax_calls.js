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

		        $("#intro").append( data );

		        // INIT FULL PAGE
		        $('#intro_wrapper').fullpage({
					sectionSelector: '.intro_section',
					anchors:['foreword', 'contents', 'colophon']
				});

		    },
		    error: function(errorThrown){
		        console.log(errorThrown);
		    }
		}); 

	},

	loadArticle: function ( article_id ) {

		console.log("AjaxCalls.loadArticle");

		var self = this;

		$.ajax({
		    url: myAjax.ajaxurl,
		    data: {
		        "action" : "article",
		        "id" : article_id
		    },
		    dataType: "json",
		    success:function(data) {

		    	data = self.responseTrim( data );

		    	console.log( 61, data );

		    	// LOAD TITLE IN ARTICLE WRAPPER
		    	$("#nav_title").text( data[0] );

		    	// $("#article_current").html( data.html );

				console.log( 60, data );

		    },
		    error: function(errorThrown){
		        console.log(errorThrown);
		    }
		}); 		

	}

}