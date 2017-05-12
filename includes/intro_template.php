<?php 
// INTRO FOREWORD

function mtd_foreword () {

    $articles_query = new WP_Query( array( 
        'name' => 'foreword' 
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
            <div id="foreword_wrapper" class="intro_content">
                <?php the_title(); ?>
                <?php the_content(); ?>
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
        if ( $cat->cat_name !== "Uncategorized" ) {
            
            echo $num++ . ". ";
            echo $cat->cat_name;
            echo "<hr>";

            $catId = $cat->term_id;
            $articles_query = new WP_Query( array( 
                'post_type' => 'articles',
                'cat'       => $catId,
                'orderby'   => 'menu_order', 
                // 'order'     => 'DESC'
            ) );    
            if ( $articles_query->have_posts() ) :
                while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
                    <li>
                    <?php 
                    global $post;
                    $image = get_field("article_preview_image");
                    ?>
                        <a href="#article/<?php the_ID(); ?>/<?php echo $post->post_name; ?>">
                            <h1>
                            <?php if ( get_field("full_title") ) {
                                the_field("full_title");
                            } else {
                                the_title();
                            } ?>
                            </h1>
                        </a>
                        <?php $articletags = strip_tags(get_the_tag_list('',', ',''));
                        echo $articletags; ?>
                    </li>
                <?php endwhile;
                wp_reset_postdata();
            endif;

            echo "<hr>";

        // $num++;
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
            <div id="colophon_wrapper" class="intro_content fp-auto-height">
                <?php the_title(); ?>
                <?php the_content(); ?>
            </div>
        <?php endwhile;
        wp_reset_postdata();
    endif; 

}
?>

<!-- NAV -->
<div id="intro_nav">
    <ul>
        <li><a href="#foreword">Foreword</a></li>
        <li><a href="#contents">Contents</a></li>
        <li><a href="#colophon">Colophon</a></li>
    </ul>
</div>

<div id="intro_wrapper">
    <!-- VIDEO -->
    <section id="" class="intro_section" data-anchor="video">
        <img src="<?php bloginfo('template_url'); ?>/assets/img/home_video.png" />
    </section>

    <!-- FOREWORD -->
    <section id="" class="intro_section" data-anchor="foreword">
        <?php mtd_foreword(); ?>
    </section>

    <!-- CONTENTS -->
    <section id="" class="intro_section" data-anchor="contents">
        <ul id="contents_list" class="intro_wrapper">
            <?php mtd_contents_list(); ?>
        </ul>
    </section>

    <!-- AUTHORS / COLOPHON -->
    <section id="" class="intro_section" data-anchor="colophon">
        <?php mtd_colophon(); ?>
    </section>

</div><!-- END OF #INTRO_WRAPPER -->