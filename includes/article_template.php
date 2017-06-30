<?php 
	
	$articles_query = new WP_Query( array( 
        'post_type' => 'articles',
        'p'			=>  intval ( $id )
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>

            <div class="top_wrapper">

                <!-- TITLE -->
                <div class="title_wrapper <?php the_field("article_bg_color"); ?>">
                    <h1>
                        <?php if ( get_field("article_full_title") ) {
                            the_field("article_full_title");
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

            </div><!-- END OF .TOP_WRAPPER -->

            <div class="article_inner_wrapper <?php the_field("article_bg_color"); ?>">

                <!-- CONTENT -->

    			<?php
                if ( have_rows("article_templates") ):
                    while ( have_rows("article_templates") ) : the_row(); ?>

                        <?php if ( get_row_layout() === "article_template_5" ) : ?>

                            <div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>">
                                <div class="mtd_column">
                                    <?php the_sub_field("content"); ?>
                                </div>
                                <div class="mtd_column">
                                    <?php the_sub_field("video"); ?>
                                </div>
                            </div>

                        <?php elseif ( get_row_layout() === "article_template_6" ) : ?>

                            <div class="template <?php echo get_row_layout() ?>">
                                <?php the_sub_field("video"); ?>
                                <?php if ( get_sub_field("video_caption") ) { ?>
                                    <div class="caption"><?php the_sub_field("video_caption"); ?></div>
                                <?php } ?>
                            </div>                         

                        <?php else : ?>
    
                            <div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>">
                                <?php the_sub_field("content"); ?>
                            </div>

                        <?php endif;

                    endwhile;
                endif;
                ?>

            </div><!-- END OF .ARTICLE_WRAPPER -->

            <!-- FOOTNOTES -->
            <?php if ( get_field("article_footnotes") ): ?>
                <div class="article_footnotes">
                    <?php the_field("article_footnotes"); ?>
                </div><!-- END OF .TEMPLATE -->
            <?php endif; ?>

        <?php endwhile;
        wp_reset_postdata();
    endif; 

?>