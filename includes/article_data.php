<?php 
	
    $data = array();
	$articles_query = new WP_Query( array( 
        'post_type'         => 'articles',
        'order'             => 'ASC',
        'posts_per_page'    => 99
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post();

            global $post;

            $article = new stdClass;

            $article->ID            = get_the_ID();
            $article->slug          = $post->post_name;
            $article->title         = get_the_title();
            $article->full_title    = get_field("full_title");
            
            $data[] = $article;

        endwhile;
        wp_reset_postdata();
    endif; 

    return json_encode($data);

?>