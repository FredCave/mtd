<?php get_header(); ?>

	<div id="video"></div>

	<div id="intro"></div>

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