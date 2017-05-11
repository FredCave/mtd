<?php 
	
	$articles_query = new WP_Query( array( 
        'post_type' => 'articles',
        'p'			=>  intval ( $id )
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>

			<h1><?php the_title(); ?></h1>
			<p>Test</p>

        <?php endwhile;
        wp_reset_postdata();
    endif; 

?>