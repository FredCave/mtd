var app = app || {};

var ArticlePrep = {
	
//     imageSizes: function () {

//         console.log("Article.imageSizes");

//         $(".article_current").find("img").each( function(){

//             // GET RATIO
//             if ( $(this).attr("height") > $(this).attr("width") ) {

//                 $(this).addClass("portrait");

//             }

//         });

//     },

    prep: function ( wrapper ) {

        console.log("ArticlePrep.prep");

        // PREP VIDEOS
        this.videosPrep();

        // IF ARTICLE 5: 
        if ( wrapper.find(".article_template_5").length ) {
            this.articleFivePrep();
        }

        // ADD TARGET=_BLANK TO EXTERNAL LINKS
        wrapper.find("a").each( function(){

            if ( !$(this).parents(".article_button").length ) {
                if ( $(this).attr("href").indexOf("http") > -1 && $(this).attr("href").indexOf("mindthedance") === -1 ) {
                    $(this).attr( "target", "_blank" ).addClass("external_link");
                } else if ( $(this).attr("href").substring(0,1) === "#" ) {
                    // INTERNAL HASH ANCHORS
                    $(this).addClass("anchor_link");
                } else {
                    // EXCEPTION: PDFs
                    if ( $(this).attr("href").indexOf(".pdf") > -1 ) {
                        $(this).attr( "target", "_blank" ).addClass("external_link");    
                    } else {
                        // SPLIT SCREEN LINKS
                        $(this).addClass("internal_link");
                    }
                }
            }

        });

        // REMOVE TOP MARGIN FROM IMAGE IF FIRST ELEM IN ARTICLE
        wrapper.find(".template").each( function(i){
            var firstChild = $(this).children().eq(0);
            if ( firstChild.is("img") ) {
                $(this).children().eq(0).css("margin-top","0");
            } else if ( firstChild.is("p") ) {
                if ( firstChild.children().eq(0).is("img") ) {
                    firstChild.children().eq(0).css("margin-top","0");
                }
            }
        });

        // ADD GLYPHS TO CAPTIONS + UNWRAP
        wrapper.find(".caption, .caption_vertical").each( function(){

            if ( $(this).parent("p").length ) {
                $(this).unwrap();
            }
            $(this).prepend("<span class='glyph'>&#10230;</span> ");

        });

        // ADD GLYPHS TO WINGDING TEXTS
        wrapper.find(".after_wingdings").each( function(){

            $(this).prepend("<span class='wingdings'><img src='" + TEMPLATE + "/assets/img/wingding_glyph.svg' /></span> ");

        });

        // IF ARTICLE 3: EXTRACT IMAGE
        wrapper.find(".article_template_3").each( function(){

            // IF CONTAINS IMAGES
            if ( $(this).find("img").length ) {

                // v2 //

                // LOOP THROUGH IMAGES
                // $(this).find("img").each( function(){

                //     // FIND PRECEDING PARAGRAPH:
                //     var img = $(this).parent("p"),
                //         hook = img.prev(),
                //         caption = null;
                //     // IF CAPTION
                //     if ( img.next(".caption").length ) {
                //         caption = img.next(".caption");
                //     }
          
                //     // APPEND IMAGE WRAPPER DIV TO PARAGRAPH
                //     hook.addClass("image_hook_text");
                //     img.append(caption).addClass("image_wrapper");

                //     hook.add(img).wrapAll("<div class='image_hook'></div>");


                // });

                // WRAP TEXT ELEMENTS IN WRAPPER
                // $(this).wrapInner( "<div class='text_wrapper'></div>");

                // END OF v2 //

                // v1 //                

                var newWrapper = $("<div class='image_wrapper'></div>");
                // LOOP THROUGH IMAGES
                $(this).find("img").each( function(){

                    var img = $(this);

                    if ( $(this).parent("p").length ) {
                        img = $(this).parent("p");
                    } else if ( $(this).parent("span").length ) {
                        img = $(this).parent("span");
                    }
                    var caption = img.next(".caption");

                    // GET OUTER HTML IN VARIABLE
                    var html = img[0].outerHTML;
                    if ( caption.length ) {
                        html += caption[0].outerHTML;
                    }
                    
                    img.hide();
                    caption.hide();

                    newWrapper.append( html );

                });
        
            }

            // WRAP TEXT ELEMENTS IN WRAPPER
            $(this).wrapInner( "<div class='text_wrapper'></div>");
            $(this).append(newWrapper);

            // END OF v1 //

        });


    },

    videosPrep: function () {

        console.log("Article.videosPrep");

        var self = this;

        $("iframe").each( function(){

            var iframe = $(this);

            if ( !$(this).hasClass("prepped") ) {

                $(this).addClass("prepped");

                // CREATE PLAYER OBJECT
                var player = new Vimeo.Player( $(this)[0] );
                player.on('play', function() {
                    console.log('played the video!');
                });

                var src;

                // ADD PREVIEW IMAGE
                if ( $(this).prev(".preview_image").length ) {
                    
                    var width = $(this).width(), 
                        preview = $(this).prev(".preview_image");
                
                    var src = self.getPreviewSrc( preview );

                    console.log( 190, src );

                }

                // WRAP IFRAME FOR PINNING
                $(this).wrap("<div class='iframe_wrapper'></div>");

                // ADD PLAY BUTTON
                var id = Math.ceil( Math.random() * 99 ),
                    playHtml = $("<div id='video_" + id + "' class='video_play_wrapper'><img src='" + TEMPLATE + "/assets/img/video_play.svg' /></div>");
                $( playHtml ).insertBefore( $(this) );

                // ADD IMAGE TO WRAPPER
                if ( src !== undefined ) {
                    $("#video_" + id).css({
                        "background-image" : "url(" + src + ")"
                    });
                }
                // RESIZE WRAPPER
                $("#video_" + id).css({
                    "height"    : $(this).height(),
                    "width"     : "100%"
                });

                // BIND BUTTON CLICK EVENT
                $("#video_" + id + " img").on("click", function(){

                    player.play();
                    $(this).parent(".video_play_wrapper").fadeOut();

                });

                // RESIZE IFRAME
                _.defer( function(){
                    self.resizeVideo( iframe );                       
                });

            }

        });

    }, 

    getPreviewSrc: function ( preview ) {

        console.log("Article.getPreviewSrc");

        var width = preview.width(), 
            src;

        console.log( 237, preview );  

        if ( width < 300 ) {
            src = preview.attr("data-thm");
        } else if ( width >= 300 && width < 600 ) {
            src = preview.attr("data-med");
        } else if ( width >= 600 && width < 900 ) {
            src = preview.attr("data-lrg");
        } else if ( width >= 900 && width < 1200 ) {
            src = preview.attr("data-xlg");
        } else if ( width >= 1200 ) {
            src = preview.attr("data-ulg");
        }

        console.log( 254, src );

        return src;

    },

	resizeVideo: function ( video ) {

        console.log("Article.resizeVideo");

        var ratio = video.attr("width") / video.attr("height"), 
            thisH; 

        console.log( 241, $(".article_inner_wrapper").width() );

        // IF IN TEMPLATE 6
        if ( video.parents(".article_template_6").length ) {

            // GET RATIO
            thisH = $(".article_inner_wrapper").width() / ratio;
            console.log( 246, video.parents(".article_template_6").width(), thisH );
            video.css({
                "height" : thisH
            }).prev(".video_play_wrapper").css({
                "height" : thisH   
            });

        } else if ( video.parents(".article_template_5").length ) {

            // GET RATIO
            thisH = ( $(".article_inner_wrapper").width() / 2 - 36 ) / ratio;
            console.log( 257, thisH );
            video.css({
                "height" : thisH
            }).prev(".video_play_wrapper").css({
                "height" : thisH   
            });              

        }

        var image = video.parents(".iframe_wrapper").prev(".preview_image");

        console.log( 290, video );

        if ( image.length ) {
            var imageSrc = this.getPreviewSrc( image );
            video.prev(".video_play_wrapper").css({
                "background-image" : "url(" + imageSrc + ")"
            });
        }



    }, 

       articleFivePrep: function () {

        console.log("Article.articleFivePrep");

        var self = this;

        // $(".article_template_5").each( function () {

        //     // PIN VIDEOS
        //     var imgInview = new Waypoint.Inview({
        //         element: $('.fix_wrapper')[0], 
        //         context: $(".current_article"), 
        //         entered: function( direction ) {
        //             // END FIX
        //             self.videoUnfix( direction );
        //         },
        //         exit: function( direction ) {
        //             // START FIX
        //             self.videoFix();
        //         },
        //     });

        // });

    },

    videoFix: function () {

        console.log("Home.videoFix");

        // GET PARENT WIDTH
        var parentW = $(".mtd_column").width();

        $(".iframe_wrapper").css({
            "position" : "fixed",
            "width" : parentW,
            "top" : 0
        });

    },

    videoUnfix: function ( direction ) {

        console.log("Home.videoUnfix");

        var top, bottom;

        if ( direction === "up" ) {
            top = "";
            bottom = "";
            $(".iframe_wrapper").css({
                "position" : "",
                "top" : top,
                "bottom" : bottom
            });

        } else {
            // ???
        }

    },

}