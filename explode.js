 /////////////////
 
 function EXPLODE () {
 
 var settings = arguments[ 0 ];
 
 var css = {  
   
   frame: {
     width: settings.radiusW, 
     height: settings.radiusH,
     zIndex: '20',
 
     '_.item': {
       transition: 'transform 0.3s color 0.3s',
       backgroundColor: '#fff',
       opacity: '0',
       borderRadius: row / 2,
       boxShadow: '0px 1px 4px 0 rgba(0,0,0,0.30)',
       fontFamily: 'Source Sans Pro', fontWeight: '300',
       fontSize: 12, color: '#616161',
       fontStyle: 'italic', lineHeight: 28,
       cursor: 'pointer'
     },
 
     '_.itemActive': {
       backgroundColor: '#4F4F4F',
       color: '#fff'
     }
   },
 
   item: {
     width: 52,
     height: 30,
   }
 }
 
 /////////////////////////////////////
 
 with ( css ) 
   
 arguments[ 0 ] = function ( $node ) {
   var $document = $( document );
   var $window = $( window );
   var isTouch = 'ontouchend' in document;
   var finger = isTouch ? 'touchstart' : 'click';
   var itemsTop = frame.height / 2 - item.height / 2;
   var itemsLeft = frame.width / 2 - item.width / 2;
   var visible = false;  
 
   ///////////////////////        
 
   function rotate ( deg ) {
     var rot = 'rotate(' + deg + 'deg)';
 
     return {
 
       'backgroundPosition': deg === 0 ? '0 0' : '0 -30px', 
       '-webkit-transform':rot,
       '-moz-transform':rot, 
       '-ms-transform':rot,
       '-o-transform':rot
     } 
   }
 
   ///////////////////////
 
   function explode ( opt ) {
     var list = [];
     var l = opt.fields;
     var i = 0;
     var angle = opt.angle;
     var step =  ( 2 * Math.PI ) / opt.fields;  
 
     for ( i; i < l; i = i + 1 ) {
 
       list.push({ 
         x: Math.round( opt.width / 2  + opt.radiusW * Math.cos( angle ) - opt.fieldWidth / 2 ),
         y: Math.round( opt.height / 2 + opt.radiusH * Math.sin( angle ) - opt.fieldHeight / 2 ) 
       });
 
       angle += step;
     }
 
     return list;
   }  
 
   ///////////////////////
 
   function show () {
     
     if ( visible ) return;
     
     var that = this;
     var $frame = $( '.frame' );
     
     if ( help.isFunction( settings.onShow ) ) { 
     
       settings.onShow.call( this );
     }
     
     $frame.find( '.item' )
       .each( function ( i ) {
           var xy = explode( { radiusH: frame.height / 2,  radiusW: frame.width / 2, fields: 6, width: frame.width, height: frame.height, fieldWidth: item.width, fieldHeight: item.height, angle: 0 } );
           var x = xy[ i ].x;
           var y = xy[ i ].y;
 
           $( this )
             .stop()
             .animate( 
               { left: x, top: y, opacity: 1 },
               { complete: function () {
 
                   var $this = $( this );
 
                   $this 
                       .on(  isTouch ?  'touchstart touchend' : 'mouseenter mouseleave', function ( e ) { 
                         e.stopPropagation();
                         if ( e.type === 'mouseenter'  ) { 
                           $this.css( rotate( -4 ) )
                           return;
                         }
                         
 
                         $this.css( rotate( 0 ) )
                       })
                       ;
 
 
                   $this.on( finger, function ( e ) {
                     e.preventDefault();
                     e.stopPropagation();
                     $this.addClass( 'itemActive' );
                     hide.call( that );
                     if ( help.isFunction( settings.select ) ) settings.select.call(that, this)
                   });  
 
                   visible = true
                 }, 
                 duration: 300,
                 step: function () { $frame.css( adjust.call( that ) ) }
               }   
             ) // animate
             ;
         })
         ;
 
     if ( isTouch ) {
       return;  
     } 
 
     $document.on( 'click.btnAdd', function () { hide.call( that ); } );
     $window.on( 'scroll.btnAdd', function () { $frame.css( adjust.call( that ) ); });
 
   }
 
       ///////////////////////
 
       function hide ( fast ) {
         if ( ! visible ) return; 
 
         fast = 100;
        var $frame = $( '.frame' );
         var that = this;
 
         $frame.find( '.item' )
           .animate(
             { left: itemsLeft, top: itemsTop, opacity: '0' },
             { duration: fast,
               fail: function() { $('h1').text('FAIL') },
               step: function () { $( '.frame' ).css( adjust.call( that ) ) },
               complete: function () { 
 
                 $( this ).remove(); 
 
                 if ( ! $( '.item' ).length ) {
                   $( '.frame' ).remove(); 
                   if ( help.isFunction( settings.onHide ) ) settings.onHide.call( that );
                   $window.off( '.btnAdd' );
                   $document.off( '.btnAdd' );
                   visible = false;
                 }
               }
             }
           ); // animate
       } 
 
       ///////////////////////    
 
       function adjust () {
         var off = $( this ).offset();
         var scrollTop = 0//$document.scrollTop();
         var scrollLeft = 0//$document.scrollLeft();  
         var height = $node.outerHeight()          
         var width = $node.outerWidth()
         var frameTop = off.top - scrollTop - frame.height / 2  + height / 2;
         var frameLeft = off.left - scrollLeft - frame.width / 2 + width  / 2;
         return { top: frameTop, left: frameLeft }
       }
 
       ///////////////////////
 
       $node
         .on( finger, function ( e ) { 
           e.stopPropagation()
           var that = this;
 
           // hide
           
           if ( visible ) {
             hide.call( this );
             return;
           }
 
           // show
 
           $( STICKER( [ adjust.call( this ), frame ], { 'class': 'frame' }
                ,  
                EACH( settings.list, function ( key ) { 
                  return STICKER( [ 'a', 'center', itemsTop, itemsLeft, item ], { 'class': ( settings.highlight && key === settings.highlight ? 'item itemActive' : 'item' ) }, key )
                })
              )   
           )
           .appendTo( 'body' )
           .find( '.item' )
             .on( 'touchend', function ( e ) { e.stopPropagation() } )
             ;
           
           show.call( this );
         });
     } // JQUERY
 
   
      
   return JQUERY.apply( null, arguments )
 
 }