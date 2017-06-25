<?php 
	
    $data = array();
	$articles_query = new WP_Query( array( 
        'post_type'         => 'articles',
        'order'             => 'ASC',
        'cat'               => '-17', 
        'posts_per_page'    => 99
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post();

            global $post;

            $article = new stdClass;

            $article->ID            = get_the_ID();
            $article->slug          = $post->post_name;
            $article->title         = get_the_title();
            $article->full_title    = get_field("article_full_title");
            $article->author        = get_field("article_author");
            $article->image         = get_field("article_preview_image");
            $article->serif         = get_field("article_bg_color");
            
            $data[] = $article;

        endwhile;
        wp_reset_postdata();
    endif; 

    return json_encode($data);

?>