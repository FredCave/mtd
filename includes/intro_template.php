<?php 
// INTRO FOREWORD

function mtd_foreword () {

    $articles_query = new WP_Query( array( 
        'name' => 'foreword' 
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
            
            <div id="foreword_wrapper" class="content_wrapper">

                <div class="intro_column_left mtd_column">
                    <h1 class="uppercase">Mind the Dance</h1>
                    <h1><br></h1>
                    <h1>A Guide to <br>
                    Documenting <br>
                    Contemporary Dance <br>
                    Teaching</h1>
                </div>

                <div class="intro_column_right mtd_column">
                    <?php the_content(); ?>
                </div>

            </div>

        <?php endwhile;
        wp_reset_postdata();
    endif; 

}

// GET CONTENTS LIST

function mtd_contents_list () {

    // GET CATEGORIES
    $cats = get_categories();
    $num = 1;

    foreach ( $cats as $cat ) {        
        if ( $cat->cat_name !== "Uncategorized" && $cat->cat_name !== "Satellite" ) { ?>
            
            <div class="contents_sub_section">
               
                <div class="contents_sub_section_header">

                    <div class="contents_number">
                        <span><?php echo $num++ . "."; ?></span>
                    </div>
                    <h4 class="contents_sub_section_title"><?php echo $cat->cat_name; ?></h4>

                </div>

                <div class="contents_sub_section_contents">

                    <?php
                    $catId = $cat->term_id;
                    $articles_query = new WP_Query( array( 
                        'post_type' => 'articles',
                        'cat'       => $catId,
                        'orderby'   => 'menu_order'
                    ) );    
                    if ( $articles_query->have_posts() ) :
                        while ( $articles_query->have_posts() ) : $articles_query->the_post(); 
                            // WITH COMMAS
                            $articletags = strip_tags( get_the_tag_list('',', ','') );
                            // STRIP COMMAS FOR CLASSNAMES
                            ?>
                            <li data-id="<?php the_ID(); ?>" class="<?php echo strtolower ( str_replace( ",", "", $articletags ) ); ?>">
                            <?php 
                            global $post;
                            $image = get_field("article_preview_image");
                            ?>
                                <a href="#article/<?php the_ID(); ?>/<?php echo $post->post_name; ?>">
                                    <p class="contents_title">
                                        <?php if ( get_field("article_full_title") ) {
                                            the_field("article_full_title");
                                        } else {
                                            the_title();
                                        } ?>
                                    </p>
                                </a>
                                <p class="contents_author"><?php the_field("article_author"); ?></p>
                                <?php if ( $articletags !== "" ) : ?>
                                    <p class="contents_category"><?php echo $articletags; ?></p>
                                <?php endif; ?>

                            </li>
                        <?php endwhile;
                        wp_reset_postdata();
                    endif; ?>

                </div>

            </div><!-- END OF .CONTENTS_SUB_SECTION -->

        <?php
    // END OF CAT LOOP
        }
    } 

}

// INTRO COLOPHON

function mtd_colophon () {

    $articles_query = new WP_Query( array( 
        'name' => 'colophon' 
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
 
            <div id="colophon_wrapper" class="content_wrapper">
                
                <div class="intro_column_left mtd_column">
                    <div class="column_title"><span>Authors</span></div>
                    <div class="column_contents small_font">
                        <?php the_field("authors"); ?>
                    </div>
                </div>

                <div class="intro_column_right mtd_column">
                    <div class="column_title"><span>Colophon</span></div>
                    <div class="column_contents small_font">
                        <div class="sub_column">
                            <?php the_field("colophon_col_1"); ?>
                        </div>
                        <div class="sub_column">
                            <?php the_field("colophon_col_2"); ?>
                            <?php // LOGOS 
                            if ( have_rows("colophon_logos") ) { 
                                echo "<ul>";
                                while ( have_rows("colophon_logos") ) : the_row( );
                                    $logo = get_sub_field("colophon_logo");
                                    $logo_url = $logo["url"];
                                    $logo_url = str_replace( "png", "svg", $logo["url"] );     
                                    // IF EU LOGO
                                    if ( strpos( $logo_url, 'eu-1' ) !== false ) { ?>
                                        <li><img class="colophon_eu_logo colophon_logo" width="<?php echo $logo["width"]; ?>" height="<?php echo $logo["height"]; ?>" src="<?php echo $logo_url; ?>" /></li>
                                        <?php // GET EU TEXT  
                                        if ( get_field("colophon_eu_text") ) { ?>
                                            <div class="colophon_eu_text">
                                                <?php the_field("colophon_eu_text"); ?>
                                            </div>
                                        <?php } ?>
                                    <?php } else { ?>
                                        <li><img class="colophon_logo" width="<?php echo $logo["width"]; ?>" height="<?php echo $logo["height"]; ?>" src="<?php echo $logo_url; ?>" /></li>
                                    <?php }
                                endwhile;
                                echo "</ul>";
                            } ?>
                        </div>
                    </div>
                </div>

            </div>

        <?php endwhile;
        wp_reset_postdata();
    endif; 

}
?>

<!-- FOREWORD -->
<section id="" class="intro_section" data-anchor="foreword">
    <?php mtd_foreword(); ?>
</section>

<!-- CONTENTS -->
<section id="" class="intro_section grey_intro_section" data-anchor="contents">
    
    <div id="contents_wrapper" class="content_wrapper">

        <div class="intro_column_left mtd_column">
            
            <ul id="contents_list" class="intro_wrapper">
                <?php mtd_contents_list(); ?>
            </ul>

        </div>

        <div class="">
            <div id="contents_image_wrapper">
                <div id="contents_image"></div>
            </div>
        </div>

    </div>

</section>

<!-- AUTHORS / COLOPHON -->
<section id="" class="intro_section yellow_intro_section" data-anchor="colophon">
    <?php mtd_colophon(); ?>
</section>