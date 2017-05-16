<div id="editor_wrapper">

	<!-- TOP BAR -->
	<div id="editor_top_bar">
		<div id="editor_close">X</div>
		<div id="editor_caption">Edit your selected articles</div>
	</div>

	<!-- SELECTED ARTICLES -->
	<ul id="editor_articles">

	</ul>
	
</div>

<script id="editor_article_template" type="text/template">

    <% articles = this.model.attributes.acf.home_background_image;
    _.each ( images, function( img ) { %>

        <li id="<%= img.image.ID %>" style="background-image:url('<%= img.image.src %>')"></li>

    <% }); %>

</script>
