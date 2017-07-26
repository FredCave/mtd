<?php 
	
	$articles_query = new WP_Query( array( 
        'post_type' => 'articles',
        'p'			=>  intval ( $id )
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); 

            // GET ANY DOWNLOAD FILES
            if ( get_field("downloads") ) {
                $dl_array = array();
                $downloads = get_field("downloads");
                foreach ( $downloads as $dl ) {
                    array_push( $dl_array, $dl["file"] );
                }
                // IF MY PERSONAL TECHING MAP
                if ( get_the_ID() === 48 ) {
                    // ONE FILE
                    $pattern_array = array("*download_file_1*","*download_img_1*");
                    $images = array( get_bloginfo('template_url') . "/assets/img/download_map.svg" );
                    $replacement_array = array_merge( $dl_array, $images );   
                } elseif ( get_the_ID() === 49 ) {
                    // THREE FILES
                    $pattern_array = array("*download_file_1*","*download_file_2*","*download_file_3*","*download_img_1*","*download_img_2*","*download_img_3*");
                    $images = array( 
                        get_bloginfo('template_url') . "/assets/img/download_linear.svg", 
                        get_bloginfo('template_url') . "/assets/img/download_detailed.svg", 
                        get_bloginfo('template_url') . "/assets/img/download_ducks.svg"
                    );
                    $replacement_array = array_merge( $dl_array, $images );                      
                }

            } ?>

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
                        <div class="added_indicator"></div>
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
                                    <div class="fix_wrapper">
                                        <?php 
                                        // PREVIEW IMAGE OBJECT
                                        $image = get_sub_field("video_image");
                                        mtd_video_preview( $image );
                                        the_sub_field("video"); 
                                        ?>
                                    </div>
                                </div>
                            </div>

                        <?php elseif ( get_row_layout() === "article_template_6" ) : ?>
                            
                            <div class="template <?php echo get_row_layout() ?>">
                                <?php 
                                // PREVIEW IMAGE OBJECT
                                $image = get_sub_field("video_image");
                                mtd_video_preview( $image );
                                // MAIN VIDEO: TO BE LAZYLOADED
                                $video = get_sub_field("video");
                                echo str_replace( "src=", "data-src=", $video );
                                
                                // CAPTION
                                if ( get_sub_field("video_caption") ) { ?>
                                    <div class="caption"><?php the_sub_field("video_caption"); ?></div>
                                <?php } ?>
                            </div>                         
                            
                        <?php else : ?>

                            <div class="template <?php echo get_row_layout() ?> <?php the_sub_field("article_template_serif"); ?>">
                                <?php  
                                $content = get_sub_field("content"); 
                                echo str_replace( "<pagebreak>", "", $content );
                                // IF DOWNLOADS FIELD HAS CONTENT
                                if ( get_field("downloads") ) {
                                    echo preg_replace( $pattern_array, $replacement_array, $content );                                        
                                } else {
                                    echo $content;
                                }
                                ?>
                            </div>

                        <?php endif;

                    endwhile;
                endif;
                ?>

            </div><!-- END OF .ARTICLE_INNER_WRAPPER -->

            <!-- FOOTNOTES -->
            <?php if ( get_field("article_footnotes") ): ?>
                <div class="article_footnotes_wrapper">
                    <div class="footnotes_close">
                        <img src="<?php bloginfo( 'template_url' ); ?>/assets/img/footnotes_close.svg" />
                    </div>
                    <div class="scroll_wrapper">
                        <div class="article_footnotes">
                            <?php the_field("article_footnotes"); ?>
                        </div>
                    </div>
                </div>
                <div class="article_footnotes_clone"></div>
            <?php endif; ?>

        <?php endwhile;
        wp_reset_postdata();
    endif; 

?>