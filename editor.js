///////////////////

  function EDITOR () { 

      var txt = {

        headline: 'Let\'s get our hands dirty!',
        subline: FRAGMENT( 'We have build this little editor to give you a short introduction to the elements that are available in carton and how they affect the DOM. For a deeper understanding please visit our ', A( { href: 'https://github.com/cartonmarkup/cssCarton/blob/master/README.md' }, 'documentation on GitHub' ), '.' )
      }

      var css = {

        white: {
          backgroundColor: '#FFFFFF',
          paddingTop: row +  row / 2,  paddingBottom: 3*row,
          paddingRight: gutter, paddingLeft: gutter
        },

        headline: {
          fontFamily: 'Source Sans Pro', fontWeight: '100', fontSize: 48,	color: '#676767', 
          lineHeight: row * 4

        },

        subline: {
          fontFamily: 'Source Sans Pro', fontWeight: '300', fontSize: 14, color: '#A7A4A4', lineHeight: 18, 
          marginBottom: row * 2,
          '_a': { color: '#A7A4A4', textDecoration: 'underline', fontStyle: 'italic' },
          '_a:hover': { color: '#669AD5', textDecoration: 'underline' }
        },

        editor: { 
          backgroundColor: '#EEEEEE',
          borderTopRightRadius: row/2,
          borderBottomRightRadius: row/2,
          borderTopLeftRadius: row/2,
          borderBottomLeftRadius: row/2
        },

        html: { width: '30%', zIndex: '10' },

        htmlMobile: {  width: '15%', overflow: 'hidden'  },

        stage: { marginLeft: '30%', width: '40%', overflow: 'hidden', zIndex: '20' },

        stageMobile: { marginLeft: '15%', width: '70%', overflow: 'hidden' },

        css: { width: '30%', overflow: 'hidden', zIndex: '10' }, 

        cssMobile:{ width: '15%', overflow: 'hidden' },
      }


      with ( css )

      return (
        
        STRETCH( [ white ], [ white, { paddingTop: row,  paddingRight: 0, paddingLeft: 0} ]
          ,
          CELL( [ '100%', 'auto', 768, 'center' ]
            ,
            STRETCH( [ 'h1', headline ], [ headline, { fontSize: 24, lineHeight: row * 2 + row / 2 } ], txt.headline )
            ,
            STRETCH( [ 'h2', subline ], [ subline, { paddingRight: gutter, paddingLeft: gutter, marginBottom: row } ], txt.subline )
          )
          ,
          CELL( [ '100%' ],

            CELL( [ '100%', 'auto', 966, 'center' ]
              ,
              TOOLBAR()
            )
            , 
            CELL( [ '100%', 'auto', 966, 'left' ]
              ,
              JQUERY( jQEditor, false
                ,  
                STICKER( [ 0, 'auto', 0, 0, html ], [  0, 'auto', 0, 0, htmlMobile ], { id: 'html' }  
                  ,
                  JQUERY(
                    false
                    ,
                    function () {
                     
                      var that = this;
                      var $this = $( this );
                      
                      surface.on( 'highlight', function ( key ) {
                        //var $grid = $( '#simpleGrid' );
                        //$this.html('')
                        //$( HTMLCODE( document.getElementById('simpleGrid') ) ).appendTo( $this );
                        
                      
                      });
                      
                    }
                    ,
                    FIT( [ editor, { marginRight: column / 2 } ], [ editor, { marginRight: column / 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } ] )
                  )
                )
                ,
                STRETCH( [ stage, editor ], [ stageMobile, editor ], { id: 'stage' }
                  ,
                  CELL( [ '100%' ]
                    ,
                    GRID()
                  )
                )
                ,
                STICKER( [  0, 0, 0, 'auto', css ],[  0, 0, 0, 'auto', cssMobile ], { id: 'css' }  
                  ,
                  JQUERY(
                    false
                    ,
                    jQCreateCssStyles
                    ,
                    FIT( [ editor, { marginLeft: column / 2 } ], [ editor, { marginLeft: column / 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 } ] )
                  )
                )
              )
            )
          )       
        )
      )
  }
//////////////////

function HTMLCODE ( node, deep ) { 
  deep = deep || 0;
  var classAttr = 'Bla'//node.getAttribute('class')
  //var $node = $(node)
  var css = {
    markup: {
      fontFamily: 'Source Code Pro', 
      fontSize: 11,
      lineHeight: row,
      color: '#5A5A5A',
      fontFamily: 'Source Code Pro', 
      fontWeight: '400',
      '_strong': {fontWeight: '900' }
    }
  }
  
  //var children = node.childNodes
  //console.log(children  )
  with ( css )
  return (
  
    CELL( [ 'ul', '100%', 'left', { marginLeft: deep*5} ]
      , 
      STRETCH( [ 'li', markup ], '<div class="', STRONG_( node.getAttribute( 'class' ) ) ,'">' )
      ,
      EACH( node.childNodes,
        function ( child ) {
          if ( ! child.nodeType  ) return TEXT('')
          return HTMLCODE(child, deep + 1)//TEXT('ABC')
        }
      )
      ,
      STRETCH( ['li', markup ], '</div>' )
    ) 
  )
}


  
//////////////////

  function CSSCODE ( cssKlass ) {
    var css = {
      cssCode:{
       
        '_.selector': { 
          fontFamily: 'Source Code Pro', 
          fontSize: 12,
          lineHeight: row,
           color: '#5A5A5A',
           fontWeight: '900'
        },
        
        '_.styleActive': {
          fontFamily: 'Source Code Pro', 
          fontSize: 12,
          lineHeight: row,
           color: '#5A5A5A',
           fontFamily: 'Source Code Pro', 
           fontWeight: '400',
           fontFamily: 'Source Code Pro', 
           fontSize: 12,
           lineHeight: row,
         },
        
        '_.style': {
          fontFamily: 'Source Code Pro', 
          fontSize: 12,
          lineHeight: row,
           color: '#9D9D9D',
           fontFamily: 'Source Code Pro', 
           fontWeight: '400',
        },
        
        '_.value': {
          fontFamily: 'Source Code Pro', 
          fontSize: 12,
          lineHeight: row,
          color: '#598ABF',
          backgroundColor: '#404040',
          borderRadius: gutter/4,
          paddingRight: gutter/4,
          paddingLeft: gutter/4,
          paddingBottom: gutter/8,
          fontWeight: '900',
          cursor: 'pointer'
         
        }
      }
    }
    
    with ( css )
    
    return ( 
      FRAGMENT(
        CELL( [ 'ul', '100%', cssCode, 'center' ]
          ,
          EACH( cssKlass, function ( Klass ) {
            return FRAGMENT(
              
              STRETCH( [ 'li' ], { 'class': 'selector'}, Klass.selector + ' {' )
                ,
                EACH( [ Klass.editableStyles || {} , Klass.notEditableStyles || {} ], function ( styles, i ) {
                  
                  var active = ( i == 0 );
                  
                  return EACH( styles, function ( value, key ) {
                    
                    return FRAGMENT(
                
                      STRETCH( [ 'li' ], { 'class': active ? 'styleActive' : 'style' }
                        ,
                        key, ':'
                        , 
                        ON( false, 'mouseenter mouseleave', jQShowHideValueBubble
                          ,
                          ( active ? A_( { 'class': 'value' }, value ) : value + ';' )
                        )
                      )
                    )//FRAGMENT
                  })//EACH
                })//EACH
              ,
              STRETCH( [ 'li' ], {'class': 'selector'}, '}' )
            )//FARGMENT
          })//EACH
        )
        ,
        JQUERY(
          jQChangeValueBubble
          ,
          STICKER( [ 0,0, 'left', { opacity: '0' } ], { id: 'bubble' }
            ,
            BUBBLE( 
              ON( jQChangeToHigherValue, { is: 'minus'}, BTN_ADD_RM ( 'minus' ) ) 
              ,
              ON( jQChangeToHigherValue, { is: 'plus'}, BTN_ADD_RM ( 'plus' ) )
            )
          )
        )
      )
    )
  }

//////////////////

  function BUBBLE ( ) {
    
    var css = {
      bubble: {
        backgroundImage: 'url(img/bg_bubble)',
        backgroundSize: '85px 50px',
        paddingLeft: 15,
        paddingTop: 7,
        width: 73,
        height: 43,
      }
    }
    
    with ( css )
    
    return STRETCH( [ bubble, 'left' ], CELL( FRAGMENT.apply( null, arguments ) ) ) 
  }
  
//////////////////
  
  function BTN_ADD_RM ( state ) {
    
    var css = {
      btn: {
        width: 30, height: 30,
        marginRight: 2,
        backgroundColor: '#404040',
        borderRadius: 100,
        cursor: 'pointer',
        zIndex: '5'
       
      },
      plus: { 
        width: 14, height: 14,
        marginTop: -7, marginLeft: -7,
        transition: 'transform 100ms',
        backgroundImage: 'url(img/bg_btn_plus.png)', backgroundSize: '30px 60px',
        backgroundPosition: '0 -14px',
        backgroundSize: '14px 28px',
        '_:hover': { backgroundPosition: '0 0' }
        
      },
      minus: {
        width: 14, height: 14,
        marginTop: -7, marginLeft: -7,
        transition: 'transform 100ms',
        backgroundImage: 'url(img/bg_btn_minus.png)', backgroundSize: '30px 60px',
        backgroundPosition: '0 -14px',
        backgroundSize: '14px 28px',
        '_:hover': { backgroundPosition: '0 0' }
      }
    }
    
    with ( css )
    return ( SLIM( [ btn ], STICKER( [ 'span', '50%', '50%', css[ state ] ] ) ) );
    
  }


//////////////////

  function TOOLBAR () { 

    var css = {

      toolbar: {
        minHeight: 38,
        borderRadius: 9,
        paddingTop: 8, paddingBottom: 6, paddingLeft: 2 * gutter, paddingRight: 2 * gutter,
        marginBottom: 2*row,
        backgroundImage: 'linear-gradient(top, #595959 0%, #434343 100%)',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.50)',

        '_.btn': {
          borderRadius: 4, 
          backgroundColor: 'rgba(0,0,0,0.15)', 
          lineHeight: 38, fontFamily: 'Source Sans Pro', fontWeight: '600', fontSize: 17, color: '#7C7C7C',
          paddingLeft: 12, paddingRight: 12, marginRight: 6, cursor: 'pointer'
        },

        '_.btn_active': { color: "#588ACA" },

        '_.btn_disabled': { color: "#6A6A6A", cursor: 'default' },

        '_.btn_hover:not(.btn_active)': { color: "#B2B2B2", cursor: 'pointer' },

        '_.lbl': {
          lineHeight: 36, fontFamily: 'Source Sans Pro', fontWeight: '600', fontSize: '15px', color: '#B2B2B2',
          marginRight: 12
        },

        '_.divider': {
          width: 6, height: 30,
          marginTop: 2, marginRight: 12, marginLeft: 6,
          borderRadius: 3, border: 0,
          backgroundColor: 'rgba(0,0,0,0.15)',
        },

        '_i': {
          width: 18, height: 17,
          marginTop: 10,
          backgroundImage: 'url(img/btn_ico_alignments.png)', backgroundSize: '54px 72px', backgroundPosition: '0 -19px'
        },

        '_.ico_align_left': { backgroundPosition: '0 -19px' },
        '_.btn_hover .ico_align_left': {  backgroundPosition: '0 -37px' },
        '_.btn_active .ico_align_left': {  backgroundPosition: '0 0' },
        '_.btn_disabled .ico_align_left': {  backgroundPosition: '0 -55px' },


        '_.ico_align_center': { backgroundPosition: '-18px -19px' },
        '_.btn_hover .ico_align_center': {  backgroundPosition: '-18px -37px' },
        '_.btn_active .ico_align_center': {  backgroundPosition: '-18px 0' },
        '_.btn_disabled .ico_align_center': {  backgroundPosition: '-18px -55px' },


        '_.ico_align_right': { backgroundPosition: '-36px -19px' },
        '_.btn_hover .ico_align_right': { backgroundPosition: '-36px -37px' },
        '_.btn_active .ico_align_right': { backgroundPosition: '-36px 0' },
        '_.btn_disabled .ico_align_right': {  backgroundPosition: '-36px -55px' },
      }
    }

    with ( css )

    return (
      
      SLIM( [ 'nav', toolbar ], [ toolbar, { paddingRight: 49, paddingLeft: 8, '_.divider': {  marginRight: 6,  marginLeft: 0 }, '_.btn': { fontSize: 14, paddingLeft: 9, paddingRight: 8, } } ]
        ,
        SLIM( [ 'span' ],[ { display: 'none'} ], { 'class': 'lbl' }, 'Show:' )
        ,
        JQUERY( jQHtmlCssBtn
          ,
          SLIM( [ 'a' ], { 'class': 'btn btn_active html' }, 'HTML' )
          ,
          FACTORY( 'a', { type: ['slim', 'sticker' ], 'class': 'btn btn_active css', styles: [ {}, { right: 2, top: 8 } ]   }, 'CSS' )
        )
        ,
        SLIM( [ 'hr' ], { 'class': 'divider' }  )
        ,
        SLIM( [ 'span' ],[ { display: 'none'} ], { 'class': 'lbl' }, 'Alignment:' )
        ,
        JQUERY( jQAlignmentBtn, true
          ,
          SLIM( [ 'a' ], { 'class': 'btn btn_disabled alignLeft' }, SLIM( [ 'i' ], { 'class': 'ico_align_left' } ) )
          ,
          SLIM( [ 'a' ], { 'class': 'btn btn_disabled alignCenter' }, SLIM( [ 'i' ], { 'class': 'ico_align_center' } ) )
          ,
          SLIM( [ 'a' ],{ 'class': 'btn  btn_disabled alignRight' }, SLIM( [ 'i' ], { 'class': 'ico_align_right' } ) )
        )
        ,
        SLIM( [ 'hr' ], { 'class': 'divider', styles: [ { display:'none' }, { display: 'inline-block' } ] } )
      )
    )
  }

//////////////////

  function GRID () {

    var css = { 

      stage: { 
        paddingLeft: gutter, 
        paddingRight: gutter, 
        paddingTop: row, 
        paddingBottom: row * 3,
        
        '_.hidden': { display: 'none'},
        '_.highlightCell': { backgroundColor: '#E0E9F1' },
        '_.highlightStyleable': { 
          transition: 'box-shadow 0.3s',
          boxShadow: '0px 0px 0 4px #659BCC',
          '_.btnRemove': {  opacity: '1' }
        },
        '_.lightable': { cursor: 'pointer' },
        '_.btnRemove': {
          width: 28,
          height: 28,
          opacity: '0',
          backgroundImage: 'url(img/bg_btn_rm.png)',
          backgroundSize: '28px 28px'
        },
      },

      gridOutlines: {
        outline: '1px dashed #B3B3B3', outlineOffset: -4 
      },

      nestedGridOutlines: { 
        outline: '1px dashed #B4736E', outlineOffset: -4 
      },

      chooseSampleGrid: {
        '_.btn':  { 
          width: 47, height: 60, 
          paddingLeft: gutter / 3, paddingRight: gutter / 3 , paddingTop: row / 3, 
          borderRadius: row / 3, paddingBottom: row / 3, 
          backgroundColor: '#F6F6F6', 
          marginTop: row, marginLeft: gutter / 2, marginRight: gutter / 2, marginBottom: 2 * row, 
          backgroundRepeat: 'no-repeat', backgroundPosition: row / 3 + 'px ' + row / 3  + 'px', backgroundSize: '47px 60px', 
          cursor: 'pointer' 
        },
        '_.btn_active': { backgroundColor: '#E0E9F1' }
      },

      btnTxt: {
        fontFamily: 'Source Sans Pro', fontWeight: '100', fontSize: 12,	color: '#6B6C6B', 
        lineHeight: 16,
        marginLeft: -column,
        width: column * 2
      }
    }

    with ( css )

    return ( 

      STRETCH( [ stage ]
        ,
        JQUERY( jQGrid, true
          ,
          // simple grid

          CELL( [ '100%' ], { id: 'simpleGrid' }
            ,
            CELL( [ '100%','auto','auto','auto', 'auto', 10*row, 'left', gridOutlines ], { 'class': 'lightable' }, addBtn )
            ,
            CELL( [ '50%', 'auto','auto','auto', 'auto', 10*row, 'left', gridOutlines ], { 'class': 'lightable' }, addBtn )
            ,
            CELL( [ '50%', 'auto','auto','auto', 'auto', 10*row, 'left',gridOutlines ], { 'class': 'lightable' }, addBtn )
            ,
            CELL( [ '100%','auto','auto','auto', 'auto', 10*row, 'left', gridOutlines ], { 'class': 'lightable' }, addBtn )
          )
          ,
          // subgrid 

          CELL( [ '100%' ], { id: 'subGrid', 'class': 'hidden' }
            ,
            CELL( [ '50%', 30*row ] 
              ,
              CELL( [ '100%', 'left', 15*row, gridOutlines ], { 'class': 'lightable' }, addBtn )
              ,
              CELL( [ '100%', 'left', 15*row, gridOutlines ], { 'class': 'lightable' }, addBtn )
            )
            ,
            CELL( [ '50%', 'left', 30*row, gridOutlines ], { 'class': 'lightable' }, addBtn )
          )
          ,
          // nested

          CELL( [ '100%' ], { id: 'nestedGrid', 'class': 'hidden' }
            ,
            STRETCH( [ { backgroundColor: '#E4C9C7', padding: 4, boxShadow: '2px 2px 4px rgba(0,0,0,0.1)' } ]
              ,
              CELL( [ '100%', 'left', 10*row, nestedGridOutlines ], { 'class': 'lightable' }  )
              ,
              CELL( [ '100%', 'left', 10*row, nestedGridOutlines ], { 'class': 'lightable' }  )
            )
          )
        )
        ,

        CELL( [ 'nav', '100%', 'center', chooseSampleGrid ]
          ,
          JQUERY( jQGridSwitcher, true
            ,
            EACH( [ 
              { txt: 'Grid with a subgrid', 'class': 'subGrid', src: 'url(img/bg_grid_preview_subgrid.png)' }, 
              { txt: 'Simple Grid', 'class': 'simpleGrid', src: 'url(img/bg_grid_preview_simple.png)' },
              { txt: 'Grid with a subgrid inside a Styleable', 'class': 'nestedGrid' , src: 'url(img/bg_grid_preview_nested.png)' }
  
            ], function ( key, i ) {
  
              return (
                SLIM( [ 'a', { backgroundImage: key.src } ], { 'class': i === 1 ? 'btn btn_active ' + key.class : 'btn ' + key.class }
                  , 
                  STICKER( [ 81, '50%', 'span', btnTxt, 'center' ], key.txt ) 
                )
              )
            })
          )
        )
      )
    )
  }  

  //////////////////

  function addBtn () {
    
    function rotate ( deg ) {
      var rot = 'rotate(' + deg + 'deg)';
      
      return {
        '-webkit-transform':rot,
        '-moz-transform':rot, 
        '-ms-transform':rot,
        '-o-transform':rot
      } 
    }

    var settings = { 
      radiusH: 114,
      radiusW: 114,
      list: [ 'fit', 'chopped','sticker','fixed', 'slim', 'stretch' ],
      onShow: function () { 
        
        $( this ).find( 'span' ).css( rotate( 45 ) ); 
        surface.set( 'highlight', false );
      },
      onHide: function () { $( this ).find( 'span' ).css( rotate( 0 ) ) },
      select: function ( selected ) { STYLEABLE( $( selected ).text(), $( btn ).parent() ) }
    }

    with ( css )
    
    var btn = STICKER( [ 'a', 'auto', row/2, gutter/2, 'auto', 'center', { width: 32, height: 32 } ],  BTN_ADD_RM( 'plus' )  );

    return EXPLODE( settings, 
      ON( 'click',
        function () { $( this ).find( 'span' ).css( rotate( 45 ) ); }
        ,
        btn 
      ) 
    );
  }

  //////////////////////////////
 
  function STYLEABLE ( type, $target ) {
    
    var touch = 'ontouchend' in document ? 'touchend' : 'click';
    var $active = false;
    var keep;
    
    ////////////////////////////////////
    
    var css = {
      btn: {
        fontFamily: 'Source Sans Pro', fontWeight: '300', fontSize: 13, 
        color: '#6D6D6D', 
        backgroundColor: '#EDEDED', 
        borderRadius: 8, lineHeight: row, paddingLeft: gutter/2, paddingRight: gutter/2, 
        marginTop: row/4, marginBottom: row/2, marginLeft: row/2, marginRight: row/2,
        zIndex: '0',
        '_strong': { fontWeight: 'bold'}
      },
      
      btnFixSticker: {
        color: '#EDEDED',
        backgroundColor: '#6D6D6D' 
      },
    
      stretch: { 
        borderRadius: 8, 
        backgroundColor: '#D4D4D4', 
        borderStyle: 'solid',
        borderColor: '#B2B2B2',
        borderWidth: '4px',
        marginTop: 9, 
        marginLeft: 9, 
        marginBottom: 9, 
        marginRight: 9
      },
      
      chopped: { 
        lineHeight: 140, 
        borderRadius: 8, 
        backgroundColor: '#D4D4D4', 
        border: '4px solid #B2B2B2',
        marginBottom: 9, 
        fontSize: 140,
        marginRight: 9
      },
  
      slim: { 
        //height: 100, 
        borderRadius: 8, 
        backgroundColor: '#D4D4D4', 
        border: '4px solid #B2B2B2', 
        marginTop: 9,
        marginLeft: 9,
        marginBottom: 9,
        marginRight: 9,
        paddingTop: 9
        
      },
      
      fit: { 
        backgroundColor: '#FDFE9D', 
        boxShadow: '0px 2px 4px rgba(0,0,0,0.50)',
        marginTop: 9,
        marginLeft: 9,
        marginBottom: 9,
        marginRight: 9 
      },
  
      sticker: { 
        borderRadius: 8, 
        border: '3px dashed #B2B2B2', 
        top: -10,
        right: -10,
        left: 'auto',
        bottom: 'auto',
        backgroundColor: 'none',
        
      },
      
      fixed: {     
        borderRadius: 8, 
        border: '3px dashed #B2B2B2', 
        top: -10,
        right: -10,
        left: 'auto',
        bottom: 'auto',
        backgroundColor: 'none'
      }
    };
    
    ////////////////////////////////////
    
    var pictures = {
      slim: [ { src: 'img/img_slim.png', css: { } }  ],
      stretch: [ { src: 'img/img_slim.png', css: {} } ],
      chopped: [ { src: 'img/img_slim.png', css: { } }, { src: 'img/img_slim.png', css: {}} ],
      sticker: [ { src: 'img/img_sticker.png', css:{} } ],
      fixed: [ { src: 'img/img_fixed.png', css:{} } ],
      fit:  [ { src: 'img/img_slim.png', css:{} } ],
    }
    
    ////////////////////////////////////
    
    var changeSetup = { 
  
      list: [ 'fit', 'chopped','sticker','fixed', 'slim', 'stretch' ], 
      highlight: type,
      radiusH: 90, 
      radiusW: 120,
  
      onHide: function () {
        $( this ).html( keep );
        keep = undefined;
        $active = false;
      },
  
      onShow: function () {
        if( ! keep ) keep = $( this ).html();
        
        $active = $(this).parent();
        $( this ).html( FRAGMENT( STRONG_('Don\'t') ) );
      },
  
      select: function ( selected ) {
        var type = $( selected ).text();
        
        carton.update( $active[ 0 ], { type: type, styles: css[ type ] }, true );            
        changeSetup.highlight = type;
        keep = FRAGMENT( STRONG_( type ), ' ', 'styleable' );
        
        // update content
        
        $active
          .find( 'img' )
            .each(function () { 
              carton.remove( { dom: this } );
              $( this ).remove();
            })
            .end()
          .append( content( type ) )
          ;
         
        // update btn styles 
        
        carton.update( $active.find( 'a.btnChangeType' )[ 0 ] , { styles: setupChangeBtn( type ) } );
        surface.set( 'highlight', $active[ 0 ] );
      }
    }
    
    ////////////////////////////////////
    
    $( FACTORY( 'div', { type: type, styles: css[type], align: 'center', 'class': 'lightable'  }
        ,
        ON( touch, false, jQRemoveBtn
          ,
          STICKER( [ 'a', -18, -18, 'auto', 'auto' ], { 'class': 'btnRemove' }  )
        )
        , 
        EXPLODE( changeSetup
          ,
          ON( 'mouseenter mouseleave'
            , 
            function ( e ) {  
              
              if ( $active !== false ) return;
              
              var $this = $( this );
              
              if ( e.type === 'mouseenter' && keep === undefined ) {
                keep = $( this ).html();  
                $this.html( FRAGMENT( STRONG_( 'Change' ), ' type' ) ) 
              } 
            
              if ( e.type === 'mouseleave' ){
                $this.html( keep );
                keep = undefined;
              }
            }
            ,
            SLIM( [ 'a', setupChangeBtn( type ) ], { 'class': 'btnChangeType' }, STRONG_( type ), ' ', 'styleable' )
          )
        )
        ,
        BR()
        ,
        content( type )
      ) 
    )
    .css( 'opacity', 0.2 )
    .appendTo( $target )
    .animate( { 'opacity': 1 } )
    ;
    
    ////////////////////////////////////
    
    function setupChangeBtn( type ) {
      return ( type !== 'sticker' && type !== 'fixed' ) ? css.btn : $.extend( true, true, css.btn, css.btnFixSticker );
    }
    
    ////////////////////////////////////
    
    function content ( type ) {
      return EACH( pictures[ type ], function (key) { return IMG( [ key.css ], { src: key.src } ) })
    }
    
    ////////////////////////////////////
  }
  

