<div id="editor_wrapper">

	<!-- TOP BAR -->
	<div id="editor_top_bar">
		<div id="editor_close"><a href="">X</a></div>
		<div id="editor_caption">Edit your selected articles</div>
	</div>
	
	<div id="generate_book">
		<a target="_blank" href="">Generate Book</a>
	</div>

	<div id="" class="content_wrapper">

		<!-- VIDEO ??? -->
		<div class="mtd_column">
		</div>

		<div class="mtd_column">
			<!-- SELECTED ARTICLES -->
			<ul id="editor_articles">

			</ul>
		</div>

	</div><!-- END OF .CONTENT_WRAPPER -->
	
</div>

<script id="editor_article_template" type="text/template">

	<div id="editor-item-<%= data.ID %>" class="editor_article">

		<p><%= data.full_title !== "" ? data.full_title : data.title %></p>
		<p><%= data.author %></p>

	</div>

</script>
