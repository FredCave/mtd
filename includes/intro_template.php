<?php 
// INTRO FOREWORD

function mtd_foreword () {

    $articles_query = new WP_Query( array( 
        'name' => 'foreword' 
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
            <div>
                <?php the_title(); ?>
            </div>
        <?php endwhile;
        wp_reset_postdata();
    endif; 

}

// GET CONTENTS LIST

function mtd_contents_list () {

    $articles_query = new WP_Query( array( 
        'post_type' => 'articles' 
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
            <li>
            <?php 
            global $post;
            $image = get_field("article_preview_image");
            $cats = get_the_category();
            foreach ( $cats as $cat ) {
                $article_cat = $cat->cat_name;
            } ?>
                <a href="#<?php echo $post->post_name; ?>"><?php the_title(); ?></a>
                <?php echo $article_cat; ?>
            </li>
        <?php endwhile;
        wp_reset_postdata();
    endif;

}

// INTRO COLOPHON

function mtd_colophon () {

    $articles_query = new WP_Query( array( 
        'name' => 'colophon' 
    ) );    
    if ( $articles_query->have_posts() ) :
        while ( $articles_query->have_posts() ) : $articles_query->the_post(); ?>
            <div>
                <?php the_title(); ?>
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
    <!-- FOREWORD -->
    <section id="" class="intro_section" data-anchor="foreword">
            <?php mtd_foreword(); ?>
    </section>

    <!-- CONTENTS -->
    <section id="" class="intro_section" data-anchor="contents">
        <ul id="contents_list">
            <?php mtd_contents_list(); ?>
        </ul>
    </section>

    <!-- AUTHORS / COLOPHON -->
    <section id="" class="intro_section" data-anchor="colophon">
        <?php mtd_colophon(); ?>
    </section>

</div><!-- END OF #INTRO_WRAPPER -->