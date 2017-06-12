<?php 
	
	$articles_query = new WP_Query( array( 
        'post_type' => 'articles',
        'p'			=>  intval ( $id )
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>

            <div class="article_inner_wrapper <?php the_field("article_bg_color"); ?>">

                <!-- TITLE -->
    			<div class="title_wrapper">
                    <h1>
                        <?php if ( get_field("full_title") ) {
                            the_field("full_title");
                        } else {
                            the_title();
                        } ?>         
                    </h1>
                    <!-- AUTHOR -->
                    <p class="author_name"><?php the_field("article_author"); ?></p>
                </div>

                <!-- BOOK EDITOR BUTTONS -->
                
                <div class="editor_buttons">

                    <div class="article_button">
                        <a href="" class="add_to_book">
                            <img src="<?php bloginfo('template_url'); ?>/assets/img/button_add.svg" />
                        </a>
                    </div>

                    <div class="article_button">
                        <a target="_blank" href="" class="download_pdf">
                            <img src="<?php bloginfo('template_url'); ?>/assets/img/button_download.svg" />
                        </a>                
                    </div>

                </div>

                <!-- CONTENT -->

    			<?php 
                if ( have_rows("article_templates") ):
                    while ( have_rows("article_templates") ) : the_row(); ?>

                        <div class="template <?php echo get_row_layout() ?>">

                            <?php the_sub_field("content"); ?>

                        </div><!-- END OF .TEMPLATE -->

                    <?php 
                    endwhile;
                endif;
                ?>

            </div><!-- END OF .ARTICLE_WRAPPER -->

        <?php endwhile;
        wp_reset_postdata();
    endif; 

?>