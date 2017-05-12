<?php 
	
	$articles_query = new WP_Query( array( 
        'post_type' => 'articles',
        'p'			=>  intval ( $id )
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>

            <!-- TITLE -->
			<h1><?php the_field("article_full_title"); ?></h1>

            <!-- AUTHOR -->
            <p><?php the_field("article_author"); ?></p>

            <!-- BOOK EDITOR BUTTONS -->
            <div class="article_button">
                <a href="" class="add_to_book">
                    Add to Book
                </a>
            </div>

            <div class="article_button">
                <a target="_blank" href="" class="download_pdf">
                    Download PDF
                </a>                
            </div>

            <!-- CONTENT -->

			<p>Test</p>

        <?php endwhile;
        wp_reset_postdata();
    endif; 

?>