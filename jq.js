  
  var surface = atom();
  
  surface.set( 'panelHtml', $( window ).width() > 640 );
  surface.set( 'panelCss',  $( window ).width() > 640 );
  surface.set( 'alignment', false );
  surface.set( 'highlight', false );
  surface.set( 'lastHighlight', false );
  surface.set( 'timeout', false );
  surface.set( 'changeValueOf', false );
  
  //////////////////////////////////////
  
  function jQHtmlCssBtn (  $toggleItems ) {
    var touch = 'ontouchend' in document ? 'touchend' : 'click';
    var $this = $( this );
    var key = $this.text() === 'HTML' ? 'panelHtml' : 'panelCss'; 
    
    // change btn status
    
    surface.on( key, function ( k ) { 
      
      $this.toggleClass( 'btn_active', k ); 
    });
    
    $this.toggleClass( 'btn_active', surface.get( key ) ); 
    
    // setup panel
    
    $this.on( touch , function () { 
      
      surface.set( key, ( surface.get( key ) === true ? false : true ) ); 
    });
  }
  
  //////////////////////////////////////
  
  function jQEditor ( $panels ) {
    var $window = $( window );
    var $css = $panels.filter( '#css' );
    var $stage = $panels.filter( '#stage' );
    var $html = $panels.filter( '#html' );
    
    function ani ( sW, hW, cW ) {
      var wW = $window.width();
    
      $stage.stop().animate( { width: sW, marginLeft: hW }, { duration: 200, queue: false } );
      $html.stop().animate( { width: hW, opacity: hW === 0 ? 0 : 1 }, { duration: 200, queue: false } ); 
      $css.stop().animate( { width: cW,  opacity: cW === 0 ? 0 : 1 }, { duration: 200, queue: false } ); 
      
      if ( cW === 0 && wW <= 640 ) $stage.find('> *').andSelf().css( { 'border-top-right-radius': 0, 'border-top-right-radius': 0} )
      else $stage.find( '> *' ).andSelf().css({ 'border-top-right-radius': row / 2, 'border-top-right-radius': row / 2 })
    
      if ( hW === 0 && wW <= 640 ) $stage.find('> *').andSelf().css({ 'border-top-left-radius': 0, 'border-top-left-radius': 0})
      else $stage.find( '> *' ).andSelf().css( { 'border-top-left-radius': row / 2, 'border-top-left-radius': row / 2 } );
    }
    
    // html
    
    surface.on( 'panelHtml', function ( html ) {
      var css = surface.get( 'panelCss' );
      
      if ( $window.width() > 640 ) {
        
        if ( html ) ani( css ? '40%' : '70%', '30%', css ? '30%' : 0  );
        else ani( css ? '70%' : '100%', 0, css ? '30%' : 0 );
      } 
      
      // mobile
      
      else {
        
        if ( html ) {
         
          ani( '15%', '85%', 0 );
          surface.set( 'panelCss', false );
        }
        else { 
          
          ani( '70%', '15%', '15%' );
        }
      }
    });
    
    // css
    
    surface.on( 'panelCss', function ( css ) { 
      var html = surface.get( 'panelHtml' );
      
      if ( $window.width() > 640 ) {
      
        if ( css )  ani( html ? '40%' : '70%', html ? '30%' : 0, '30%' );
        else ani( html ? '70%' : '100%',  html ? '30%' : 0, 0 );
        
      }
      
      // mobile
       
      else {
      
        if ( css ) { 
          surface.set( 'panelHtml', false );
          ani( '15%', 0, '85%' ); 
        }
        else { 
          ani( '70%', '15%', '15%' );
        }
      }
    });
    
    // adjust on resize/orientationchnage
    
    $window.on( 'resize orientationchange', function () {  
      
      if ( $window.width() > 640 ) {
        
        surface.set({ panelHtml: true, panelCss: true  });
      }
      
      // mobile
      
      else {
        
        surface.set({ panelHtml: false, panelCss: false  });
      }
    });
  }
  
  //////////////////////////////////////
  
  function jQAlignmentBtn ( $alignItems ) {
    var touch = 'ontouchend' in document ? 'touchend' : 'click';
    
    surface.on( 'alignment', function ( toAlign ) { 
      
      if ( toAlign === false ) {
        
        $alignItems = $alignItems || $( 'nav a.alignLeft, nav a.alignCenter, nav a.alignRight' );
        $alignItems.off( touch + '.align' ).removeClass( 'btn_active' ).addClass( 'btn_disabled' );
      
        return;
      } 
      
      var alignment = carton.get( { dom: toAlign } )[ 0 ].align;
        
      $alignItems
        .removeClass( 'btn_disabled btn_active' )
        .off( touch + '.align' )
        .on(  touch + '.align', function () {
      
          var $this = $( this );
          var alignment = $this.attr('class').match(/align(.*)[ ||$]/)[ 1 ].toLowerCase();
      
          $alignItems.removeClass( 'btn_active' );
          $this.addClass( 'btn_active' );
      
          carton.set({ dom: toAlign }, { align: alignment } );
        })
        .filter( function () { return $( this ).attr( 'class' ).toLowerCase().indexOf( alignment ) > -1  } )
          .addClass( 'btn_active' );
    });
  }
  
  //////////////////////////////////////
  
  function jQGrid ( $node ) {
   
    var touch = 'ontouchend' in document ? 'touchend' : 'click';
    var $grids = $node.filter( '#simpleGrid, #subGrid, #nestedGrid' );
    var $document = $( document );
    var block = false;
    ///////////////////////////////////
    
    surface.set( 'grids', $grids );
    surface.set( 'selectedGrid', $node.filter( ':not(.hidden)' ) );
    surface.set( 'lastGrid', $node.filter( ':not(.hidden)' ) );
    surface.on( 'selectedGrid', function ( selected ) {
      
      $last = $( surface.get( 'lastGrid' ) );
      $selected  = $( selected );
      
      $last.stop().fadeOut( 'slow', function () {
        $selected.stop().fadeIn( 'slow' );
       })
      
      surface.set( 'lastGrid', selected ); 
    });
    
    
    ///////////////////////////////////
  
    // make properties of an grid editable
  
    surface.on( 'highlight', function ( highlight ) {
      var $disable = $( surface.get( 'lastHighlight' ) );
      var $enable = $( highlight );
      var highlightClass;
      
      if ( $disable ) {
        
        
        $disable.removeClass( 'highlightStyleable highlightCell' );
         surface.set( 'alignment',false );
        $document.off( '.highlight' );
      }
       
      if ( highlight !== false ) {
        
        highlightClass = carton.get( { dom: highlight } )[ 0 ].type === 'cell' ? 'highlightCell' : 'highlightStyleable';
        
        $enable.addClass( highlightClass );
        surface.set('lastHighlight', highlight );
        surface.set( 'alignment', highlight );
       
        
        // on click outside 
        
        $document
          .on( touch + '.highlight', function ( e ) { 
            if ( block === true ) return;
            if ( e.target === highlight ) return;
            if ( $( e.target ).is( '#bubble, nav a.alignLeft, nav a.alignCenter, nav a.alignRight, nav a.html, nav a.css, nav a.alignLeft *, nav a.alignCenter *, nav a.alignRight *, nav a.html *, nav a.css *' ) ) return;
            surface.set( 'highlight', false );
          })
          
          // helps that tochmoves dosn't disable the selected grid 

          .add( $grids )
            .on( 'touchmove', function () { 
              block = true; 
              setTimeout( function () { block = false; }, 50 );
            })
            ;
      }
        
    });
   
    // select an grid to edit
  
    $grids.on( touch, '.lightable', function ( e ) {
      
      e.stopPropagation();
      
      // prevent highlighting another lightable on touchmove
      
      if ( block === true ) { 
        return;  
      }
  
      e.preventDefault();
      surface.set( 'highlight', this );
    });
  }
  
  ///////////////////////////////////
  
  function jQRemoveBtn () {
    var rm = surface.get( 'highlight' );
    var $rm = $( rm )
    
    $rm.fadeOut( 300, function () {
      $rm.remove();
      carton.remove( { dom: rm } );
      surface.set( 'highlight', false );
    });
  }
  
  ///////////////////////////////////
  
  function jQGridSwitcher ( $gridItems )  {
    
    // switch grid
    
    var touch = 'ontouchend' in document ? 'touchend' : 'click';
    
    $gridItems.on( touch, function () { 
    
      var $this = $( this );
      var thisClass = $this.attr( 'class' )
      var $nextGrid = surface.get('grids').filter( function () { return thisClass.indexOf( $( this ).attr( 'id' ) ) > -1 } )
      
      $gridItems.removeClass( 'btn_active' );
      $this.addClass( 'btn_active' );
      surface.set( 'selectedGrid', $nextGrid[ 0 ] );
    });
  }
  ///////////////////////////////////
  
  function jQCreateCssStyles () {
    var $this = $( this );
    
    surface.on( 'highlight', function ( key ) {
       
       // prevents factory from polluting with cartons that doesn't exist anymore
       // ugly !!! Factory needs kind of a mutate fanction
       
       var rm = $this.find( '*' );
       var i = rm.length
       while ( i-- ) {  carton.remove( { dom: rm[ 0 ] } ); } 
       
       
       $this.html( '' );
      
        if ( key === false ) { return; }
       
        var factory = carton.get( { dom: key } )[ 0 ]; 
        var custom = { selector: '.' + factory.id, editableStyles: {} };
        var isCell = factory.type === 'cell';
        var editableStyles = 'margin-top,margin-bottom,margin-left,margin-right,padding-top,padding-bottom,padding-left,padding-right,border-width,top,left,right,bottom'
        var styles;
        var style;
        var i = 0;
        var l;
        
        custom.notEditableStyles = help.mix({}, factory.styles, { exclude: editableStyles })
        editableStyles = editableStyles.split( ',' ); 
        
      
        l = editableStyles.length;
        
        for ( ;i < l; i = i + 1 ) {
          
          style = editableStyles[ i ];
          
          if ( factory.styles[ style ] ) { 
            
            custom.editableStyles[ style ] = factory.styles[ style ];
          }
        }
        
        styles = [ 
          custom,
          { selector: '.' + factory.type + '_', notEditableStyles: carton.setup.settings[ factory.type ] },
          { selector: '.align' + help.capitaliseFirstLetter(factory.align) + '_', notEditableStyles:  { 'text-align': factory.align } }  
        ];
        
        $( CSSCODE( styles ) ).appendTo( $this );
      
    });
  }
  
  ///////////////////////////////////
  
  function jQChangeValueBubble () {
    var $this = $( this );
    
    $this.on( 'mouseenter mouseleave', function ( e ) {
      if ( e.type == 'mouseenter' ) window.clearTimeout( surface.get( 'timeout' ) );
      if ( e.type == 'mouseleave' ) surface.set( 'changeValueOf', false );
    });
    
    surface.on( 'changeValueOf', function ( value ) {
       
      if ( value === false ) {
        $this.stop().animate({ opacity: 0 });
        return;
      } 
       
      var $value = $( value );
      var top = $value.parent().position().top - 13;
      var left = $value.position().left + $value.outerWidth();
       
      $this
        .css({ top: top , left: left })
        .stop()
        .animate({ opacity: 1 })
    });
  }

  ///////////////////////////////////
  
  function jQShowHideValueBubble ( e ) {
    var $this = $( this );
  
    if ( e.type === 'mouseenter' ) {
      window.clearTimeout( surface.get( 'timeout' ) );
      surface.set( 'changeValueOf', this );
    } 
  
    if ( e.type === 'mouseleave' ) {
      surface.set( 'timeout', window.setTimeout(  function () { surface.set( 'changeValueOf', false ) }, 400 ))
    } 
  }
  
  ////////////////////////////////////
  
  function jQChangeToHigherValue ( e ) { e.stopPropagation() 
    var changeValueOf = surface.get( 'changeValueOf' )
    var $changeValueOf = $( changeValueOf );
    var highlighted = surface.get( 'highlight' );
    var keyValue = $changeValueOf.parent().text().replace( /;|px/g,'' ).split(':');
    var update = {};
    var min = keyValue[ 0 ] === 'border-width' ? 0 : -30;
    var needsAuto = 'top,left,bottom,right'.split(',')
    var max = 30;
    var newValue;    
    
    if ( keyValue[ 1 ] !== 'auto' ) keyValue[ 1 ] = parseInt( keyValue[ 1 ] );
    
  
    
    if ( e.data.is === 'plus' ) {
      
      if ( keyValue[ 1 ] === 'auto' ) {
        
        keyValue[ 1 ] === min;
      }
      else if ( keyValue[ 1 ] + 1 >  max  && help.has(needsAuto, keyValue[ 0 ] ) ) {
        
        newValue = 'auto'
      } 
      else {
        newValue = (  keyValue[ 1 ] < max ? keyValue[ 1 ] + 1 : min )+'px'
      }
    } 
    
    else {
      
      if ( keyValue[ 1 ] === 'auto' ) { 
        
        keyValue[ 1 ] === max;
      }
      else if ( keyValue[ 1 ] - 1 <  min  && help.has(needsAuto, keyValue[ 0 ] ) ) {
        
        newValue = 'auto'
      } 
      else {
        
        newValue =  ( keyValue[ 1 ] > min ? keyValue[ 1 ] - 1 : max ) +'px';
      }
    }
    
    update[ keyValue[ 0 ] ] = newValue;
    carton.set({ dom:highlighted}, { styles: update }); 
    
    $changeValueOf.text( newValue  );
  }
