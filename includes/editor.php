<div id="editor_wrapper">

	<!-- VIDEO – OUTSIDE OF CONTENT WRAPPER -->
	<div id="editor_video_wrapper" class="">

		<video id="editor_video" playsinline>
	        <source src="" data-src="<?php bloginfo('template_url'); ?>/assets/media/mtd_bookeditor.mp4" type="video/mp4">
	    </video>
	
		<div id="editor_play">
			<img src="<?php bloginfo('template_url'); ?>/assets/img/video_play.svg" />
 		</div>

	</div>
	
	<div id="" class="editor_column_wrapper">

		<!-- TOP BAR -->
		<div id="editor_top_bar">
			<div id="editor_close">
				<a href="">
					<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_close_.svg" />
				</a>
			</div>
		</div>

		<div class="editor_column">

			<div id="editor_instructions">
				<?php mtd_get_editor_text(); ?>
			</div>

			<div id="editor_button_wrapper">
				<div id="editor_button">
					<a target="_blank" href="">
						<img src="<?php bloginfo('template_url'); ?>/assets/img/mtd_generate.svg" />
					</a>
				</div>
			</div>

			<div id="editor_no_articles"><p>You currently have no saved articles.</p></div>

			<!-- SELECTED ARTICLES -->

			<ul id="editor_articles_wrapper"></ul>			
			<ul id="editor_articles"></ul>
			

		</div>

	</div><!-- END OF .CONTENT_WRAPPER -->
	
</div>

<?php /* // data.full_title !== "" ? data.full_title : data.title */ ?>

<script id="editor_article_template" type="text/template">

	<div id="editor-item-<%= data.ID %>" data-id="<%= data.ID %>" class="editor_article">

		<div class="editor_article_close">
			<img src="<?php bloginfo('template_url'); ?>/assets/img/editor_article_close.svg" />
		</div>

		<p class="editor_article_title"><%= data.title %></p>
		<p class="editor_article_author"><%= data.author %></p>

	</div>

</script>
