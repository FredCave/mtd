<?php get_header(); ?>

	<!-- INTRO -->

	<div id="intro_scroll_wrapper" class="top_level_wrapper">

	    <!-- VIDEO -->
	    <section id="video_section" class="" data-anchor="video">
	        <video muted id="introvid" playsinline poster="<?php bloginfo('template_url'); ?>/assets/img/video_fallback.jpg">
	            <source src="<?php bloginfo('template_url'); ?>/assets/vid/mind_the_dance.mp4" type="video/mp4">
	        </video>
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
			    <span id="intro_nav_right"><a href="#make-book">Editor</a></span>
			</div>
		</div>

		<div id="intro_sections">
			<?php /*
			AJAX LOADED HERE
			STRUCTURE: 
			<!-- FOREWORD -->
			<section id="intro_foreword" class="intro_section"></section>
			<!-- CONTENTS -->
			<section id="intro_contents" class="intro_section"></section>
			<!-- COLOPHON -->
			<section id="intro_colophon" class="intro_section"></section>
			*/ ?>
		</div>

	</div>

	<!-- ARTICLES -->

	<div id="article_scroll_wrapper" class="top_level_wrapper">

		<div id="article_wrapper">

		    <div id="article_nav">
		        <div id="nav_close">
		        	<a href="#contents">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_close.svg" />
		        	</a>
		        </div>
		        <div id="nav_left" class="nav_arrow">
		        	<a href="" data-title="">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_arrow_left.svg" />		        		
		        	</a>
		        </div>
		        <div id="nav_title"><span></span></div>
		        <div id="nav_right" class="nav_arrow">
		        	<a href="" data-title="">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_arrow_right.svg" />		        				        		
		        	</a>
		        </div>
		        <div id="nav_book_editor">
		        	<a href="#make-book">
		        		<img src="<?php bloginfo('template_url'); ?>/assets/img/nav_book_2.svg" />		        				        				        	
		        	</a>
		        </div>
		    </div>

		    <?php /* <div id="article_wrapper_1" class="prev_article article white"></div> */ ?>

		    <div id="article_wrapper_2" class="current_article article white"></div> 

		    <?php /* <div id="article_wrapper_3" class="next_article article white"></div> */ ?>

		    <div id="split_wrapper" class="article"></div>

	    </div>

	</div>

	<!-- EDITOR -->

	<div id="editor_scroll_wrapper" class="top_level_wrapper">
		<?php include("includes/editor.php"); ?>
	</div>

	<!-- LOADING -->	

	<div id="loading" class=""></div>

<?php get_footer(); ?>