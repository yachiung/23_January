$(document).ready(function(){

  var _window = $(window);

  var _tabset = $('.tabset');
  
  _tabset.each(function () { 
    let _thisTabset = $(this);
    let _tabItems = _thisTabset.find('.tabItems');
    let _tabButton = _tabItems.find('button');
    // let tabButtonLength = _tabButton.length;
    let _tabContentGroup = _thisTabset.find('.tabContentGroup');
    let _glidContent = _tabContentGroup.filter('.glide')
    let _tabContent = _thisTabset.find('.tabContent');
    const activeClass = 'active'; // 目前所在的頁籤項的 class name
    let _activeItem = _tabButton.filter('.' + activeClass );
    const baseSpeed = 500;

    _tabContent.eq( _activeItem.index() ).addClass('show');
    if ( _tabItems.hasClass('glide') ) {
      _tabItems.attr( "style", "--posX:" + _activeItem.position().left + "px; --width:" +  _activeItem.innerWidth() + "px" );
    }
    
    //  頁籤內容滑動效果
    if (_glidContent.length) { //如果 .tabContentGroup 有 class name "glide"
      _glidContent.wrapInner('<div class="glideBox"></div>');
      let _glideBox = _tabContentGroup.find('.glideBox');
      let j = _activeItem.index();
      let i;

      _glideBox.css( 'left', -100 * j + "%");

      _tabButton.focus( function() {
        i = $(this).index();
        _glideBox.animate({'left':  -100 * i + "%" }, baseSpeed * Math.abs(i - j), function (){
          j = i;
        });
      })
    }


    //點擊滑鼠或按 tab 鍵
    _tabButton.focus( function() {
      _activeItem = $(this);
      let tabIndex = _activeItem.index();
      tabSwitch(tabIndex);

      if ( _tabItems.hasClass('glide') ) {
        let posX = "--posX:" + _activeItem.position().left + "px; --width:" + _activeItem.innerWidth() + "px";
        _tabItems.attr("style", posX);
      }

    });


    // 頁籤切換基本動作
    function tabSwitch(tabNow) {
      _tabButton.eq(tabNow).addClass(activeClass).siblings().removeClass(activeClass);
      _tabContent.eq(tabNow).addClass('show').siblings().removeClass('show');
    }

    // *** 改變視窗寬度時 *** //

    _window.resize( function(){
      if ( _tabItems.hasClass('glide') ) {
        _tabItems.attr( "style", "--posX:" + _activeItem.position().left + "px; --width:" +  _activeItem.innerWidth() + "px" );
      }
    })





 

     
  });  






});