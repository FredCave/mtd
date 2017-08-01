var app = app || {};

var ArticleInner = {
	
    footnotesVisible: false, 

    init: function ( wrapper ) {

        console.log("ArticleInner.init");

        this.bindEvents( wrapper );
        this.prep( wrapper );

    },

    bindEvents: function ( wrapper ) {

        console.log("ArticleInner.bindEvents");
   
        var self = this;

        wrapper.off("click");

        // IMAGES LIGHTBOX
        // Lightbox.init( $(".current_article img") );
  
        // INTERNAL LINKS
        wrapper.on("click", ".internal_link", function(e) {

            // IF IN FOOTNOTES OPEN IN NEW TAB
            if ( $(this).parents(".article_footnotes").length ) {
                $(this).attr("target","_blank");
            } else {
                e.preventDefault();
                Articles.internalLink( $(this) );                
            }

        });

        // ANCHOR LINKS
        wrapper.on("click", ".anchor_link", function(e) {
            e.preventDefault();
            Articles.anchorLink( $(this) );
        });       

        // ONCE ARTICLE IS LOADED
        $("#split_wrapper").off("split_loaded");
        $("#split_wrapper").on("split_loaded", function(){
            _.defer( function(){
                Articles.splitAnim();                
            });
        });
   
        // CLOSE SATELLITE VIEW
        $("#split_wrapper").off("click");
        $("#split_wrapper").on("click", ".split_close", function(){
            // RESET SPLIT
            Articles.splitReset();
        });

        // SPLIT TO FULL
        $(".current_article").on("click", ".split_close", function() {
            Articles.splitToFull();
        }); 

        // ADD TO BOOK
        wrapper.on("click", ".add_to_book", function(e){
            e.preventDefault();
            Articles.addToBook();
        });

        // DOWNLOAD PDF
        wrapper.on("click", ".download_pdf", function(e){

            // e.preventDefault();
            // var thisHref = "_generate/?art=" + Articles.currentArticle;
            var article = ArticleLinks[Articles.currentArticle];
            console.log( 79, article );
            $(this).attr({
                "target" : "_blank",
                "href" : TEMPLATE + "/pdfs/" + article
            });

            // console.log( 60, thisHref );
            // $(this).attr("href", thisHref);
        });

        // FOOTNOTES 
        wrapper.on( "click", ".footnote_link", function() {
            if ( !self.footnotesVisible ) {
                self.viewFootnotes();
                self.footnotesVisible = true;
            } else {
                self.closeFootnotes();
                self.footnotesVisible = false;
            }

        });

        $("#mobile_notes").off("click");
        $("#mobile_notes").on( "click", function() {
            self.viewFootnotes();
            self.footnotesVisible = true;
        });

        wrapper.on("click", ".footnotes_close", function(){
            // console.log( 80, "Close footnotes." );
            self.closeFootnotes();
            self.footnotesVisible = false;
        });  

        // RUNNING TITLE SHOW/HIDE
        $("#article_scroll_wrapper").off("scroll");
        $("#article_scroll_wrapper").on("scroll", _.throttle( function(){
            var scroll = $(this).scrollTop();
            Articles.titleCheck( scroll );
        }, 500 ));

        $(window).on("resize",  _.throttle( function(){
            // RESIZE IFRAMES
            $("iframe").each( function(){
                self.resizeVideo( $(this) );
            });
            // IMAGE CHECK FOR TEMPLATE 3
            self.hiddenCheck();
        }, 1000 ));

    }, 

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

        console.log("ArticleInner.prep");

        if ( wrapper.hasClass("prepped") ) {
            return;
        }

        // CHECK IF FOOTNOTES IN ARTICLE
        this.mobileNotesCheck();

        wrapper.addClass("prepped");

        var self = this;

        // PREP VIDEOS
        this.videosPrep( wrapper );

        // STOP FOOTNOTE LINKS FROM WRAPPING
        wrapper.find(".footnote_link").each( function(){
            $(this).before("<span class='non_breaking'>&nbsp;</span>");
        });

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

        // ADD GLYPHS TO CAPTIONS + UNWRAP
        wrapper.find(".caption, .caption_vertical").each( function(){

            if ( $(this).parent("p").length ) {
                $(this).unwrap();
            }
            $(this).prepend("<span class='glyph'><img src='" + TEMPLATE + "/assets/img/stix_arrow.svg' /></span> ");

        });

        // ADD GLYPHS TO WINGDING TEXTS
        wrapper.find(".after_wingdings").each( function(){

            $(this).prepend("<span class='wingdings'><img src='" + TEMPLATE + "/assets/img/wingding_glyph.svg' /></span> ");

        });

        // IF ARTICLE 3: EXTRACT IMAGE
        wrapper.find(".article_template_3").each( function(){

            // IF ALIGN TO MARKERS DEFINED
            if ( $(this).find(".align_to").length ) {

                // LOOP THROUGH ANCHORS IN TEXT
                $(this).find(".align_to").each( function (){

                    var imgClass = $(this).attr("data-align");

                    // TAKE INTO ACCOUNT PARAGRAPH TAGS
                    var img = $("." + imgClass);
                    if ( img.parent("p").length ) {
                        img = img.parent("p");
                    } else if ( img.parent("span").length ) {
                        img = img.parent("span");
                    }

                    // WRAP IMG + CAPTION
                    if ( img.next(".caption")  ) {
                        var caption = img.next(".caption"),
                            toWrap = img.add( caption );
                        toWrap.wrapAll("<div id='" + imgClass + "' class='img_align'></div>");
                    } else {
                        img = img.wrap("<div id='" + imgClass + "' class='img_align'></div>");
                    }

                    // WRAP ANCHOR 
                    $(this).wrap("<div class='anchor'></div>");
                    $(this).parent(".anchor").append( $( "#" + imgClass ) );

                });

                // WRAP TEXT ELEMENTS IN WRAPPER
                $(this).wrapInner( "<div class='text_wrapper'></div>");

            } else {

                var imgWrapper = $("<div class='image_wrapper'></div>");
            
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
                    
                    img.addClass("hidden").hide();
                    caption.hide();

                    imgWrapper.append( html );

                });
        
                // WRAP TEXT ELEMENTS IN WRAPPER
                $(this).wrapInner( "<div class='text_wrapper'></div>");
                $(this).append(imgWrapper);

                // END OF v1

            }

            self.hiddenCheck();

        });


    },

    hiddenCheck: function () {

        console.log("ArticleInner.hiddenCheck");

        if ( $(window).width() > 768 ) {
            $(".current_article").find(".hidden").hide(); 
        } else {
            $(".current_article").find(".hidden").show(); 
        }

    },

    mobileNotesCheck: function () {

        console.log("ArticleInner.mobileNotesCheck");

        if ( $(".article_footnotes_wrapper").length && $(window).width() > 768 ) {
            $("#mobile_notes").fadeIn( 1000 );
        } else {
            $("#mobile_notes").fadeOut( 1000 );
        }

    },

    footnotesVisibleOnPage: function ( scroll ) {

        console.log("ArticleInner.footnotesOnPageCheck");     
        
        // GET SCROLL POSITION
        var scrollBottom = $("#article_scroll_wrapper").scrollTop() + $(window).height();

        // GET FOOTNOTES POSITION  
        var current = $(".current_article"), 
            footnotesTop = current.find(".top_wrapper").outerHeight() + 
                    parseInt( current.find(".top_wrapper").css("margin-top") ) +
                    parseInt( current.find(".title_wrapper").css("margin-bottom") ) +
                    current.find(".article_inner_wrapper").outerHeight() + 
                    parseInt( current.find(".article_inner_wrapper").css("margin-bottom") );

        if ( scrollBottom < footnotesTop ) {
            // console.log( scrollBottom, footnotesTop, "Foonotes not visible.");
            return false;
        } else {
            // console.log( scrollBottom, footnotesTop, "Foonotes visible.");
            return true;
        }
    },

    viewFootnotes: function () {

        console.log("ArticleInner.viewFootnotes");

        var self = this;

        // CHECK IF NOTES ALREADY OPEN OR ORIGINAL NOTES VISIBLE ON PAGE
        if ( this.footnotesVisible || this.footnotesVisibleOnPage() ) {
            return;
        }

        // HIDE FOOTNOTES ON PAGE
        $(".article_footnotes_wrapper").css({
            "opacity" : 0
        });

        // CLONE TO NEW WRAPPER
        $(".article_footnotes_clone").empty();
        $(".article_footnotes_wrapper").clone().appendTo(".article_footnotes_clone");

        // SHOW CLOSE BUTTON
        var clone = $(".article_footnotes_clone");
        clone.find(".footnotes_close").show();

        var notesH = $(".article_footnotes_wrapper").height(),
            halfWin = $(window).height() / 2,
            newTop, newH, 
            bgColour = $(".current_article").css("background-color");

        // IF MOBILE
        if ( $(window).width() < 768 ) {
            halfWin = $(window).height();
        }

        // SET INITIAL HEIGHT
        clone.find(".article_footnotes_wrapper").css({
            "opacity"           : 1, 
            "box-shadow"        : "0px 0px 30px rgba(0, 0, 0, 0.5)", 
            "position"          : "fixed",
            "top"               : $(window).height() * 1.1,
            "margin-top"        : 0, 
            "background-color"  : bgColour
        });
        clone.find(".scroll_wrapper").css({
            "overflow"          : "auto",
            "height"            : halfWin
        });

        newTop = halfWin;
        newH = halfWin;

        if ( $(window).width() < 768 ) {
            newTop = 60;
            newH = halfWin;
        }

        setTimeout( function(){
            // ANIMATE
            clone.find(".article_footnotes_wrapper").css({
                "top"       : newTop,
                "height"    : newH
            });
        }, 50 );

    },

    closeFootnotes: function () {

        console.log("ArticleInner.closeFootnotes");

        var self = this;

        $(".article_footnotes_wrapper").css({
            "opacity" : ""
        });

        // ANIMATE OUT
        var clone = $(".article_footnotes_clone");
        clone.find(".article_footnotes_wrapper").css({
            "top"       : $(window).height() * 1.1,
        });

        setTimeout( function(){

            // RESET ALL VALUES
            clone.find(".article_footnotes_wrapper").css({
                "box-shadow"        : "", 
                "position"          : "",
                "top"               : "",
                "height"            : "", 
                "margin-top"        : "", 
                "background-color"  : ""
            });
            clone.find(".scroll_wrapper").css({
                "overflow"          : "",
                "height"            : ""
            });

            // HIDE CLOSE BUTTON
            clone.find(".footnotes_close").hide();
            // AFTER ANIMATION
            setTimeout( function(){
                clone.empty();
                self.footnotesVisible = false;
            }, 250 );

        }, 1000 );

    }, 

    videosPrep: function ( wrapper ) {

        console.log("ArticleInner.videosPrep");

        var self = this;

        wrapper.find("iframe").each( function(){

            var iframe = $(this);

            if ( !$(this).hasClass("prepped") ) {

                $(this).addClass("prepped");

                var dataSrc = $(this).attr("data-src");
                $(this).attr( "src", dataSrc );

                // CREATE PLAYER OBJECT
                var player = new Vimeo.Player( $(this)[0] );
                
                // BIND EVENTS
                player.on('play', function() {
                    // console.log('Video playing.');
                });
                // ON END
                player.on( 'ended', function() {
                    // console.log( 'Video ended.', $(player.element).prev() );
                    $(player.element).prev(".video_play_wrapper").fadeIn();
                });

                var src;
                // ADD PREVIEW IMAGE
                if ( $(this).prev(".preview_image").length ) {          
                    var width = $(this).width(), 
                        preview = $(this).prev(".preview_image"), 
                        src = self.getPreviewSrc( preview );
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

        console.log("ArticleInner.getPreviewSrc");

        var width = preview.width(), 
            src;

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

        return src;

    },

	resizeVideo: function ( video ) {

        console.log("Article.resizeVideo");

        var ratio = video.attr("width") / video.attr("height"), 
            thisH; 

        // console.log( 241, $(".article_inner_wrapper").width() );

        // IF IN TEMPLATE 6
        if ( video.parents(".article_template_6").length ) {

            // GET RATIO
            thisH = $(".article_inner_wrapper").width() / ratio;
            // console.log( 246, video.parents(".article_template_6").width(), thisH );
            video.css({
                "height" : thisH
            }).prev(".video_play_wrapper").css({
                "height" : thisH   
            });

        } else if ( video.parents(".article_template_5").length ) {

            // GET RATIO
            thisH = ( $(".article_inner_wrapper").width() / 2 - 36 ) / ratio;
            // console.log( 257, thisH );
            video.css({
                "height" : thisH
            }).prev(".video_play_wrapper").css({
                "height" : thisH   
            });              

        }

        var image = video.parents(".iframe_wrapper").prev(".preview_image");

        // console.log( 290, video );

        if ( image.length ) {
            var imageSrc = this.getPreviewSrc( image );
            video.prev(".video_play_wrapper").css({
                "background-image" : "url(" + imageSrc + ")"
            });
        }

    }, 

    //    articleFivePrep: function () {

    //     console.log("ArticleInner.articleFivePrep");

    //     var self = this;

    //     // $(".article_template_5").each( function () {

    //     //     // PIN VIDEOS
    //     //     var imgInview = new Waypoint.Inview({
    //     //         element: $('.fix_wrapper')[0], 
    //     //         context: $(".current_article"), 
    //     //         entered: function( direction ) {
    //     //             // END FIX
    //     //             self.videoUnfix( direction );
    //     //         },
    //     //         exit: function( direction ) {
    //     //             // START FIX
    //     //             self.videoFix();
    //     //         },
    //     //     });

    //     // });

    // },

    // videoFix: function () {

    //     console.log("ArticleInner.videoFix");

    //     // GET PARENT WIDTH
    //     var parentW = $(".mtd_column").width();

    //     $(".iframe_wrapper").css({
    //         "position" : "fixed",
    //         "width" : parentW,
    //         "top" : 0
    //     });

    // },

    // videoUnfix: function ( direction ) {

    //     console.log("ArticleInner.videoUnfix");

    //     var top, bottom;

    //     if ( direction === "up" ) {
    //         top = "";
    //         bottom = "";
    //         $(".iframe_wrapper").css({
    //             "position" : "",
    //             "top" : top,
    //             "bottom" : bottom
    //         });

    //     } else {
    //         // ???
    //     }

    // },

}