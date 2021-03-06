// var Article = {
	
//     // wrapperVisible: false,

//     currentArticle: "",

// 	init: function ( artId ) {

// 		console.log("Article.init", artId);

//         this.bindEvents();

//         // IF URL ARTICLE IS NOT LOADED IN CURRENT
//         if ( artId !== this.currentArticle ) {
            
//             // LOAD ARTICLE
//             AjaxCalls.loadArticle( artId );
//             this.currentArticle = artId;

//             // TITLE, PREV + NEXT STORED IN APP.ARTICLEDATA OBJECT
//             this.articleDataCheck();

//         } 

// 	},

//     bindEvents: function () {

//         console.log("Article.bindEvents");

//         var self = this;

//         // ONCE ARTICLE DATA LOADED (IF NEEDED)
//         $(document).on("dataloaded", function(){
            
//             self.loadTitle( self.currentArticle );

//         });

//         // NAV ARROWS CLICK
//         $(".nav_arrow").on("click", function(e){
            
//             // e.preventDefault();
//             $("#article_current div").fadeOut(100);
//             // STOP RUNNING TITLE FROM APPEARING ON NAV 
//             $("#nav_title").css("opacity","0");
//             setTimeout( function(){
//                $("#nav_title").css("opacity","1"); 
//             }, 1000 );

//         });

//         $("#nav_close").off("click");
//         $("#nav_close").on("click", function(){

//             // self.articleClose();

//             // GO BACK TO CONTENTS
//             app.MainRouter.navigate('contents');

//         });

//         // ADD TO BOOK
//         $("#article_current").off("click");
//         $("#article_current").on("click", ".add_to_book", function(e){

//             e.preventDefault();
//             self.addToBook();

//         });

//         // DOWNLOAD PDF
//         $("#article_current").on("click", ".download_pdf", function(e){

//             var thisHref = "_generate/?art=" + self.currentArticle;
            
//             console.log( 77, thisHref );

//             $(this).attr("href", thisHref);

//         });

//         // FOOTNOTES LINK
//         $("#article_current").on("click", ".footnote_link", function(){

//             self.viewFootnotes();

//         });

//         $(window).on("resize",  _.throttle( function(){
//             self.resizeIframes();
//         }, 1000 ));

//         // RUNNING TITLE SHOW/HIDE
//         $(window).on("scroll", _.throttle( function(){

//             self.titleCheck( $(window).scrollTop() );

//         }, 500 ));

//     },

//     articleDataCheck: function () {

//         console.log("Article.articleDataCheck");

//         if ( App.articles === "" ) {
//             console.log( 56, "Article data not loaded." );
//             // LOAD ARTICLE DATA
//             App.loadArticleData();
//         } else {
//             console.log(60, "Article data loaded.");
//             this.loadTitle( this.currentArticle );
//         }

//     },  

//     ajaxSuccess: function ( data ) {

//         console.log("Article.ajaxSuccess");

//         this.colourCheck( data );

//         $("#article_current").html( data );

//         this.imageSizes();
//         this.htmlPrep();

//         $("#article_current").find(".article_inner_wrapper").fadeIn(1000);

//     },

//     colourCheck: function ( data ) {

//         console.log("Article.colourCheck");

//         var bgColour = data.split("article_inner_wrapper")[1].split("\"")[0].trim();

//         if ( bgColour === "grey" ) {
//             $("#article_wrapper").addClass("grey");
//             $("#article_nav").addClass("grey").css({
//                 "box-shadow": "0px 2px 6px #eee"                
//             });
//         } else {
//             $("#article_wrapper").removeClass("grey");
//             $("#article_nav").removeClass("grey").css({
//                 "box-shadow": ""                
//             });          
//         }

//     },

//     imageSizes: function () {

//         console.log("Article.imageSizes");

//         $("#article_current").find("img").each( function(){

//             // GET RATIO
//             if ( $(this).attr("height") > $(this).attr("width") ) {

//                 $(this).addClass("portrait");

//             }

//         });

//     },

//     htmlPrep: function () {

//         console.log("Article.htmlPrep");

//         // ADD TARGET=_BLANK TO EXTERNAL LINKS
//         $("#article_current a").each( function(){

//             if ( $(this).attr("href").indexOf("http") > -1 && $(this).attr("href").indexOf("mindthedance") === -1 ) {
//                 $(this).attr( "target", "_blank" ).addClass("external_link");
//             } else {

//                 // TEMP HACK: IF SATELLITE
//                 var href = $(this).attr("href");
//                 console.log( 180, href );
//                 if ( href.indexOf("article") > -1 && href.indexOf("articles") === -1 ) {
//                     var thisId = href.split("article/")[1].split("/")[0];
//                     console.log( 179, thisId );
//                     if ( thisId === 184 ) {
//                         $(this).attr( "target", "_blank" );
//                     }                    
//                 }

//             }

//         });

//         // ADD GLYPHS TO CAPTIONS + UNWRAP
//         $("#article_current").find(".caption, .caption_vertical").each( function(){

//             if ( $(this).parent("p").length ) {
//                 $(this).unwrap();
//             }

//             $(this).prepend("<span class='glyph'>&#10230;</span> ");

//         });

//         // ADD GLYPHS TO WINGDING TEXTS
//         $("#article_current").find(".after_wingdings").each( function(){

//             console.log( 169, "Glyph added." );
//             $(this).prepend("<span class='wingdings'><img src='" + TEMPLATE + "/assets/img/wingding_glyph.svg' /></span> ");

//         });

//         // IF ARTICLE 3: EXTRACT IMAGE
//         $("#article_current").find(".article_template_3").each( function(){

//             // IF CONTAINS IMAGES
//             if ( $(this).find("img").length ) {

//                 // v2 //

//                 // LOOP THROUGH IMAGES
//                 // $(this).find("img").each( function(){

//                 //     // FIND PRECEDING PARAGRAPH:
//                 //     var img = $(this).parent("p"),
//                 //         hook = img.prev(),
//                 //         caption = null;
//                 //     // IF CAPTION
//                 //     if ( img.next(".caption").length ) {
//                 //         caption = img.next(".caption");
//                 //     }
          
//                 //     // APPEND IMAGE WRAPPER DIV TO PARAGRAPH
//                 //     hook.addClass("image_hook_text");
//                 //     img.append(caption).addClass("image_wrapper");

//                 //     hook.add(img).wrapAll("<div class='image_hook'></div>");


//                 // });

//                 // WRAP TEXT ELEMENTS IN WRAPPER
//                 // $(this).wrapInner( "<div class='text_wrapper'></div>");

//                 // END OF v2 //

//                 // v1 //                

//                 var newWrapper = $("<div class='image_wrapper'></div>");
//                 // LOOP THROUGH IMAGES
//                 $(this).find("img").each( function(){

//                     var img = $(this);

//                     if ( $(this).parent("p").length ) {
//                         img = $(this).parent("p");
//                     } else if ( $(this).parent("span").length ) {
//                         img = $(this).parent("span");
//                     }
//                     var caption = img.next(".caption");

//                     // GET OUTER HTML IN VARIABLE
//                     var html = img[0].outerHTML;
//                     console.log( 227, caption.length );
//                     if ( caption.length ) {
//                         html += caption[0].outerHTML;
//                     }
                    
//                     img.hide();
//                     caption.hide();

//                     newWrapper.append( html );

//                     console.log( 228, html );

//                 });
        
//             }

//             // WRAP TEXT ELEMENTS IN WRAPPER
//             $(this).wrapInner( "<div class='text_wrapper'></div>");
//             $(this).append(newWrapper);

//             // END OF v1 //

//         });

//         // IF TEMPLATE 6: RESIZE IFRAME
//         this.resizeIframes();

//         // IF MORE THAN ONE TEMPLATE
//         if ( $("#article_current").find(".template").length > 1 ) {
//             // LOOP THROUGH TEMPLATES
//             $("#article_current").find(".template").each( function(i){
//                 // IF NOT FIRST
//                 if ( i > 0 ) {
//                     // IF FIRST ELEMENT IS IMG
//                     if ( $(this).children().eq(0).is("img") ) {
//                         // REMOVE TOP MARGIN
//                         $(this).children().eq(0).css("margin-top","0");
//                     }   
//                 }
//             });
//         }

//     },

//     resizeIframes: function () {

//         console.log("Article.resizeIframes");

//         $("iframe").each( function(){

//             var ratio = $(this).attr("width") / $(this).attr("height");
//             var thisH; 

//             // IF IN TEMPLATE 6
//             if ( $(this).parents(".article_template_6").length ) {

//                 // GET RATIO
//                 thisH = $(".article_inner_wrapper").width() / ratio;
//                 $(this).css({
//                     "height" : thisH
//                 });

//             } else if ( $(this).parents(".article_template_5").length ) {

//                 // GET RATIO
//                 thisH = ( $(".article_inner_wrapper").width() / 2 - 36 ) / ratio;
//                 $(this).css({
//                     "height" : thisH
//                 });
//                 console.log( 216, thisH );                

//             }

//             // CREATE PLAYER OBJECT
//             var player = new Vimeo.Player( $(this)[0] );
//             console.log( 280, player );
//             player.on('play', function() {
//                 console.log('played the video!');
//             });

//             // ADD PLAY BUTTON
//             var id = Math.ceil( Math.random() * 99 ),
//                 playHtml = $("<div id='video_" + id + "' class='video_play_wrapper'><img src='" + TEMPLATE + "/assets/img/video_play.svg' /></div>");
//             $( playHtml ).insertBefore( $(this) );

//             $("#video_" + id).css({
//                 "height"    : thisH,
//                 "width"     : "100%"
//             })

//             // BIND BUTTON CLICK EVENT
//             $("#video_" + id + " img").on("click", function(){

//                 player.play();
//                 $(this).parent(".video_play_wrapper").fadeOut();

//             });

//         });

//     }, 

//     loadTitle: function ( id ) {

//         console.log("Article.loadTitle", id );

//         var articles = App.articles;

//         $.each( articles, function ( i ) {
//             if ( $(this)[0].ID === parseInt(id) ) {
//                 $("#nav_title span").text( $(this)[0].title );
//                 document.title = "Mind The Dance – " + $(this)[0].title;
//             }
//         });

//         this.loadPrevNext( id );

//     },

//     loadPrevNext: function ( id ) {

//         console.log("Article.loadPrevNext", id );

//         var articles = App.articles,
//             arrayPos;
//         // GET ARTICLE'S POSITION IN ARRAY
//         $.each( articles, function ( i ) {
//             if ( $(this)[0].ID === parseInt(id) ) {
//                 arrayPos = i;
//             }
//             i++;
//         });

//         // NEXT
//         var nextPos = arrayPos + 1;
//         if ( nextPos >= articles.length ) {
//             nextPos = 0;
//         }

//         $("#nav_right a").attr({
//             "href"          : "#article/" + articles[ nextPos ].ID + "/" + articles[ nextPos ].slug,
//             "data-title"    : articles[ nextPos ].title
//         });

//         // PREV
//         var prevPos = arrayPos - 1;
//         if ( prevPos < 0 ) {
//             prevPos = articles.length - 1;
//         }

//         $("#nav_left a").attr({
//             "href"          : "#article/" + articles[ prevPos ].ID + "/" + articles[ prevPos ].slug,
//             "data-title"    : articles[ prevPos ].title
//         });

//     },

//     addToBook: function () {

//         console.log("Article.addToBook");

//         // CHECK IF THIS ID ALREADY IN SAVED BOOKS ARRAY
//         if ( $.inArray( parseInt(this.currentArticle), Editor.savedArticles ) === -1 ) {
//             Editor.savedArticles.push( parseInt(this.currentArticle) );
//         } else {
//             console.log("Already saved.");
//         }

//     },

//     downloadPdf: function () {

//         console.log("Article.downloadPdf");

//     },   

//     viewFootnotes: function () {

//         console.log("Article.viewFootnotes");

//         var target = $(".article_footnotes").offset().top;
//         console.log( 314, target );

//         $("html,body").animate({
//             scrollTop : target - 72
//         }, 1000 );

//         // IF MOBILE – SCROLL UP


//     },

//     titleCheck: function ( scroll ) {

//         console.log("Article.titleCheck", scroll );

//         var limit = $("#article_current .top_wrapper").outerHeight() + parseInt ( $("#article_current").css("padding-top") ) - 100 ;
//         if ( scroll > limit ) {
//             $("#nav_title span").css("opacity","1");
//         } else {
//             $("#nav_title span").css("opacity","0");
//         }

//     }

// }
