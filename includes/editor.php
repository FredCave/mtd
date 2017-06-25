<div id="editor_wrapper">

	<!-- TOP BAR -->
	<div id="editor_top_bar">
		<div id="editor_close">
			<a href="">
				<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_close.svg" />
			</a>
		</div>
	</div>
	
	<div id="" class="content_wrapper">

		<div class="mtd_column">

			<div id="editor_instructions">
				<?php mtd_get_editor_text(); ?>
			</div>

			<div id="editor_button_wrapper">
				<div id="editor_button">
					<a target="_blank" href="">
						<img src="<?php bloginfo('template_url'); ?>/assets/img/generate_pdf.svg" />
					</a>
				</div>
			</div>

			<!-- SELECTED ARTICLES -->
			<ul id="editor_articles">

			</ul>
		</div>

	</div><!-- END OF .CONTENT_WRAPPER -->

	<!-- VIDEO – OUTSIDE OF CONTENT WRAPPER -->
	<div id="editor_video" class="">
	</div>
	
</div>

<script id="editor_article_template" type="text/template">

	<div id="editor-item-<%= data.ID %>" class="editor_article">

		<div class="editor_article_close">
			<img src="<?php bloginfo('template_url'); ?>/assets/img/editor_article_close.svg" />
		</div>

		<p><%= data.full_title !== "" ? data.full_title : data.title %></p>
		<p><%= data.author %></p>

	</div>

</script>
