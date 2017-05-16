<?php get_header(); ?>

	<div id="video"></div>

	<div id="intro">
		
		<div id="intro_wrapper">
		    
		    <!-- VIDEO (WITH NAV INSIDE) -->
		    <section id="" class="intro_section" data-anchor="video">
	
				<!-- NAV -->				
				<div id="intro_nav">
				    <span id="intro_nav_left">Mind the Dance</span>
				    <ul>
				        <li><a href="#foreword">Foreword</a></li>
				        <li><a href="#contents">Contents</a></li>
				        <li><a href="#colophon">Colophon</a></li>
				    </ul>
				    <span id="intro_nav_right"><a href="#make-book">Editor</a></span>
				</div>
				
		        <video id="introvid" playsinline autoplay poster="<?php bloginfo('template_url'); ?>/assets/img/video_fallback.jpg">
		            <source src="<?php bloginfo('template_url'); ?>/assets/vid/mind_the_dance.mp4" type="video/mp4">
		        </video>
		    </section>

			<div id="intro_sections">
				<!-- AJAX HERE -->
			</div>

		</div><!-- END OF #INTRO_WRAPPER -->

	</div>

	<div id="articles">
		
		<div id="article_wrapper">

		    <div id="article_nav">
		        <div id="nav_close"><a href="#contents">X</a></div>
		        <div id="nav_left"><a href="" data-title=""><</a></div>
		        <div id="nav_title"></div>
		        <div id="nav_right"><a href="" data-title="">></a></div>
		        <div id="nav_book_editor"><a href="#make-book">Book</a></div>
		    </div>

		    <div id="article_prev"></div>

		    <div id="article_current"></div>

		    <div id="article_next"></div>

	    </div>

	</div>

	<div id="editor">
		<?php include("includes/editor.php"); ?>
	</div>

<?php get_footer(); ?>