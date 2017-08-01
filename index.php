<?php get_header(); ?>

	<div id="mobile_screen">
		<img src="<?php bloginfo('template_url'); ?>/assets/img/mobile_text.png" />
	</div>

	<!-- INTRO -->

	<div id="intro_scroll_wrapper" class="top_level_wrapper">

	    <!-- VIDEO -->
		<section id="video_section" class="" data-anchor="video">
	        <video id="introvid" playsinline>
	            <source src="" data-src="<?php bloginfo('template_url'); ?>/assets/media/mtd_front.mp4" type="video/mp4">
	        </video>
			<div class="scroll_target"></div>
	    </section> 

		<!-- NAV -->				
		<div id="intro_nav_wrapper">
			<div id="intro_nav">
			    <span id="intro_nav_left"><a href="">Mind the Dance</a></span>
			    <ul>
			        <li><a href="" data-link="foreword" class="intro_nav">Foreword</a></li>
			        <li><a href="" data-link="contents" class="intro_nav">Contents</a></li>
			        <li><a href="" data-link="colophon" class="intro_nav">Colophon</a></li>
			    </ul>
			    <span id="intro_nav_right"><a href="#make-book"><img src="<?php bloginfo('template_url'); ?>/assets/img/nav_book_2.svg" /></a></span>
			</div>
		</div>

		<div id="intro_sections">

			<?php include( "includes/intro_template.php" ); ?>
			
		</div>

	</div>

	<!-- ARTICLES -->

	<div id="article_scroll_wrapper" class="top_level_wrapper article_element">

		<div id="article_wrapper">
	
		    <?php /* <div id="article_wrapper_1" class="prev_article article white"></div> */ ?>

		    <div id="article_wrapper" class="current_article article white"></div> 

		    <?php /* <div id="article_wrapper_3" class="next_article article white"></div> */ ?>

		    <div id="split_wrapper" class="article"></div>

	    </div>

	</div>

	<div id="article_nav" class="article_element">

				<div id="article_nav_grey"></div>
				<div id="article_nav_white"></div>

		        <div id="nav_close">
		        	<a href="#contents">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_close_.svg" />
		        	</a>
		        </div>
		        <div id="nav_left" class="nav_arrow">
		        	<a href="" data-title="">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_arrow_left_.svg" />		        		
		        	</a>
		        </div>
		        <div id="nav_title"><span></span></div>
		        <div id="nav_right" class="nav_arrow">
		        	<a href="" data-title="">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_arrow_right_.svg" />		        				        		
		        	</a>
		        </div>
		        <div id="nav_book_editor">
		        	<a href="#make-book">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_book_.svg" />		        				        				        	
		        	</a>
		        	<div class="added_indicator"></div>
		        </div>
		        <div id="mobile_notes">Notes</div>
	</div>

	<!-- EDITOR -->

	<div id="editor_scroll_wrapper" class="top_level_wrapper">
		<?php include("includes/editor.php"); ?>
	</div>

	<!-- LOADING -->	

	<div id="loading" class=""></div>

<?php get_footer(); ?>