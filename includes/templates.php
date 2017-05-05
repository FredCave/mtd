<?php /*******************************************

    INTRO 

**********************************************/ ?>

<script id="intro_template" type="text/template">

    <!-- NAV -->
    <div id="intro_nav">
        <ul>
            <li><a href="#foreword">Foreword</a></li>
            <li><a href="#contents">Contents</a></li>
            <li><a href="#colophon">Colophon</a></li>
        </ul>
    </div>

    <div id="fullpage">

        <!-- FOREWORD -->
        <section id="" class="intro_section" data-anchor="foreword">

        </section>

        <!-- CONTENTS -->
        <section id="" class="intro_section" data-anchor="contents">
            <ul id="contents_list">
            </ul>
        </section>

        <!-- AUTHORS / COLOPHON -->
        <section id="" class="intro_section" data-anchor="colophon">

        </section>

        </div><!-- END OF #FULL_PAGE -->

</script>

<script id="contents_template" type="text/template">

    <%
    var data = this.collection.models;
    console.log( 44, data ); 
    _.each ( data, function(art) { %>
        <li>
            <a href="#<%= art.attributes.slug %>">
                <%= art.attributes.full_title || art.attributes.title %>
                <%= art.attributes.category %>
                <img data-thm="<%= art.attributes.image_thumb %>" 
                    data-med="<%= art.attributes.image_medium %>" 
                    data-lrg="<%= art.attributes.image_large %>" 
                    data-xlg="<%= art.attributes.image_extra %>" />
            </a>
        </li>
    <% }); %>

</script>

<?php /*******************************************

    ARTICLES

**********************************************/ ?>

<script id="article_wrapper_template" type="text/template">

    <div id="article_nav">
        <div id="nav_close"><a href="#contents">X</a></div>
        <div id="nav_left"><</div>
        <div id="nav_title"></div>
        <div id="nav_right">></div>
        <div id="nav_book_editor"><a href="#make-book">Book</a></div>
    </div>

    <div id="article_prev"></div>

    <div id="article_current"></div>

    <div id="article_next"></div>

</script>

<script id="article_template" type="text/template">

    <% data = this.model.attributes[0]; %>
    <h1><%= data.title %></h1>

</script>


<?php /*******************************************

    EDITOR

**********************************************/ ?>

<script id="editor_template" type="text/template">



</script>
