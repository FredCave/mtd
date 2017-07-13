<?php get_header(); ?>

	<div id="video"></div>

	<div id="intro" class="nav_section">
		
		<div id="intro_wrapper">
		    
		    <!-- VIDEO -->
		    <section id="video_section" class="" data-anchor="video">
		        <video id="introvid" playsinline poster="<?php bloginfo('template_url'); ?>/assets/img/video_fallback.jpg">
		            <source src="<?php bloginfo('template_url'); ?>/assets/vid/mind_the_dance.mp4" type="video/mp4">
		        </video>
		    </section>

			<!-- NAV -->				
			<div id="intro_nav_wrapper">
				<div id="intro_nav">
				    <span id="intro_nav_left"><a href="">Mind the Dance</a></span>
				    <ul>
				        <li><a href="#foreword">Foreword</a></li>
				        <li><a href="#contents">Contents</a></li>
				        <li><a href="#colophon">Colophon</a></li>
				    </ul>
				    <span id="intro_nav_right"><a href="#make-book">Editor</a></span>
				</div>
			</div>

			<div id="intro_sections">
				<!-- AJAX HERE -->
			</div>

		</div><!-- END OF #INTRO_WRAPPER -->

	</div>

	<div id="articles" class="nav_section">
		
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

		    <div id="article_prev"></div>

		    <div id="article_current" class="article"></div>

		    <div id="article_next"></div>

	    </div>

	</div>

	<div id="editor" class="nav_section">
		<?php include("includes/editor.php"); ?>
	</div>

<?php get_footer(); ?>