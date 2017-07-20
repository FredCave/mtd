<?php 
	
    $data = array();
	$articles_query = new WP_Query( array( 
        'post_type'         => 'articles',
        'order'             => 'ASC',
        'cat'               => 17, 
        'posts_per_page'    => 99
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post();

            $data[] = get_the_ID();

        endwhile;
        wp_reset_postdata();
    endif; 

    return json_encode($data);

?>