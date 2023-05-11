$(document).ready(function(){
  
  var _window = $(window);
  var _html = $('html');
  var _body = $('body');
  var _header = $('.header');

	var ww = _window.width();
  var wwNew;
  var hh = _header.outerHeight();
  var _menu = _header.find('.menu');
  var _sidebar = $('.sidebar');
  _menu.find('li').has('ul').addClass('hasChild'); // 找出_menu中有次選單的li
  _menu.clone().prependTo(_sidebar); // 複製「主選單」到行動版側欄
  var _sidebarMenu = _sidebar.find('.menu');
  $('.topNav').clone().appendTo(_sidebar);

  var _sidebarCtrl = $('.sidebarCtrl');

  var _goCenter =$('.goCenter');
  var _goTop = $('.goTop');
  var _footer = $('.footer');

  // 製作行動版側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');
  var _sidebarMask = $('.sidebarMask');
  

  // RWD 螢幕寬度斷點 ---------- //
  const wwSlim =  420;
  const wwMedium = 800;
  const wwNormal =  1000;
  const wwMaximum =  1360;
  // RWD 螢幕寬度斷點 ---------- //
  
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  _html.removeClass('no-js');


  // 主選單 ////////////////////////////////////////
  // 寬版主選單 ////////////////////////////
  var _hasChild = _menu.find('.hasChild');
  var _hasChildA = _hasChild.children('a');
  var _topItem = _menu.children('ul').children('li');
  var liA = _menu.find('li>a');

  _hasChild.each(function(){
    let _this = $(this);
    let _thisSubMenu = _this.children('ul');
    let _xBotton;

    _this.hover(
      function(){
        let offset1 = _window.scrollTop() + _window.height();
        let offset2;
        let translate = '';
        let dd = 0;
        let disB = 0;

        _this.addClass('here');

        if ( _this.is(_topItem) ) {
          if ( _this.offset().left + _thisSubMenu.innerWidth() > _window.innerWidth()) {
            _thisSubMenu.css( {'left': 'auto', 'right': 0} );
          } else {
            _thisSubMenu.css('left', 0);
          }
        } else {
          if ( _this.offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
            _thisSubMenu.css( 'left', -1*(_thisSubMenu.innerWidth()) );
          } else {
            _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
          }
        }

        _thisSubMenu.stop(true, true).slideDown(300, function(){
          offset2 = parseInt(_thisSubMenu.offset().top + _thisSubMenu.innerHeight());
          const itemHeight = _thisSubMenu.find('li:first-child').innerHeight();

          if (offset2 > offset1) {
            if (_thisSubMenu.innerHeight() <= _window.height()) {
              translate = 'translateY(' + String( offset1 - offset2 ) + 'px)';
            } else {
              translate = 'translateY(' + String( _window.scrollTop() - _thisSubMenu.offset().top ) + 'px)';

              // 加入控制 button -------------------------------------
              _this.append('<button class="xButton" type="button"></button>');
              _xBotton = _this.find('.xButton');
              _xBotton.css('left', _thisSubMenu.offset().left + _thisSubMenu.width());

              // disB = 選單高度 - 視窗高度
              disB =  _thisSubMenu.innerHeight() - _window.height();
            }
            _thisSubMenu.css('transform', translate );

            _xBotton.click(function(){
              if ( dd + disB > 0) {
                dd = dd - itemHeight;
                if (dd + disB < itemHeight) { dd = dd - disB%itemHeight;}
                _thisSubMenu.stop(true, false).animate({'margin-top': dd}, 200);
              }
            })
          };
        });
      },
      function(){
        _this.removeClass('here').find('.xButton').remove();
        _thisSubMenu.stop(true, false).slideUp(200, function(){
          $(this).removeAttr('style');
        });
      }
    );
    
  })
  
  // 鍵盤操作 
  _hasChildA.focus(function(){
    let _this = $(this);
    let _thisSubMenu = $(this).next('ul');

    if ( _this.parent().is(_topItem) ) {
      _thisSubMenu.show();
    } else {
      if (_this.parent().offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
        _thisSubMenu.css('left', -1*(_thisSubMenu.innerWidth()) );
      } else {
        _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
      }
      _thisSubMenu.show();
    }
    _this.parent().addClass('here');
  })

  liA.focus(function(){
    $(this).parent('li').siblings().removeClass('here').find('ul').hide();
  })


	// 離開 _menu 隱藏所有次選單
	$('*').focus(function () {
		if ($(this).parents('.menu').length == 0) {
			_menu.find('.hasChild').removeClass('here').find('ul').removeAttr('style');
		}
	})



  // 行動版側欄顯示、隱藏 ////////////////////
  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('show')) {
      _sidebar.removeClass('show');
      _sidebarCtrl.removeClass('closeIt');
      _body.removeClass('noScroll');
      _sidebarMask.fadeOut(500, function(){
        _sidebar.removeAttr('style');
      });
    } else {
      _sidebar.show(0, function(){
        _sidebar.addClass('show');
      });
      _sidebarCtrl.addClass('closeIt');
      _body.addClass('noScroll')
      _sidebarMask.fadeIn(500);
    }
  });
  _sidebarMask.click(function(){
    _sidebar.removeClass('show');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(500);
  });

  // 鍵盤操作：在_sidebarCtrl 按 Tab 鍵進入側欄主選單
  _sidebarCtrl.keydown( function(e) {
    if ( _sidebar.hasClass('show') && e.code === "Tab" ) {
      _sidebarMenu.find('.first>a').focus();
      e.preventDefault();
    } else {
      // $('.main').find('.accesskey').focus();
    }
  });



  // 行動版主選單第二層之後的顯示、隱藏 ////////////////////
  var _sidebarHasChild = _sidebarMenu.find('.hasChild>a');
  _sidebarHasChild.click(function(e){
    e.preventDefault();

    let _this = $(this);
    let _parentLi = _this.parent();
    let _subMenu = _this.next('ul');

    if (_subMenu.is(':hidden')) {
      _subMenu.stop(true, false).slideDown();
      _parentLi.addClass('closeIt').siblings().removeClass('closeIt').find('ul:visible').slideUp().parent().removeClass('closeIt');
    } else {
      _subMenu.stop(true, false).slideUp().find('ul:visible').slideUp();
      _subMenu.find('.closeIt').removeClass('closeIt');
      _parentLi.removeClass('closeIt');
    }
    
  });



  // 版頭區查詢顯示、隱藏 ////////////////////
  var _searchCtrl = $('.searchCtrl');
  var _search = _header.find('.search');
  var searchCtrlText = _searchCtrl.text();
  var searchCtrlAltText = _searchCtrl.attr('data-altText');
  _searchCtrl.click( function(){
    _search.hasClass('show') ? hideSearch() : showSearch();
  });
  function showSearch() {
    _search.show(100, function(){
      _search.addClass('show');
      _searchCtrl.text(searchCtrlAltText);
    })
    _search.find('input[type="text"]').focus();
  }
  function hideSearch() {
    _search.removeClass('show');
    _searchCtrl.text(searchCtrlText);
    setTimeout( function(){ 
      _search.removeAttr('style');
    }, 600);
  }
  _search.find('li').last().find('a').blur( function(){
    _searchCtrl.focus();
  })


  // 固定版頭 ////////////////////
  var fixHeadThreshold;

  ww >= wwNormal ? fixHeadThreshold = hh - _menu.outerHeight() : fixHeadThreshold = 0;

  _window.scroll( function() {

    // 固定版頭
    if (_window.scrollTop() > fixHeadThreshold ) {
			_header.addClass('fixed');
			_body.offset({ top: hh });
      _goCenter.hide();
		} else {
			_header.removeClass('fixed');
			_body.removeAttr('style');
      _goCenter.removeAttr('style');
		}

    // goTop button 顯示、隱藏
    _window.scrollTop() > 300 ? _goTop.addClass('show') : _goTop.removeClass('show');

  });


  // 改變瀏覽器（viewport）寬度時 ////////////////////
	_window.resize(function () {

    // 取得新的 window 寬度
    wwNew = _window.width();

    // 由小螢幕到寬螢幕
    if (ww < wwNormal && wwNew >= wwNormal) {

      // 清除（reset）側欄開啟時的相關設定
      if (_sidebar.hasClass('show')) { 
        _sidebar.removeClass('show');
        _sidebarCtrl.removeClass('closeIt');
        _sidebarMask.hide();
        _body.removeClass('noScroll');
      }

      // 清除（reset）固定版頭時的相關設定
      _body.removeAttr('style');
      _header.removeClass('fixed');

      // 清除（reset）版頭查詢區的相關設定
      _search.removeClass('show').removeAttr('style');

      // 重新計算固定版頭所需的向下捲動距離
      hh = _header.outerHeight();
      fixHeadThreshold = hh - _menu.outerHeight();
      
      // 觸發 window scroll 事件以判斷是否要固定版頭
      _window.trigger('scroll'); 

    }

    // 由寬螢幕到小螢幕
    if (ww >= wwNormal && wwNew < wwNormal) {
      hh = _header.outerHeight();
      fixHeadThreshold = 0;
      _body.removeAttr('style');
      _window.trigger('scroll');
    }

    ww = wwNew;

	});


  // fatfooter 開合 //////////////////////////////
  var _fatFootCtrl = $('.fatFootCtrl');
  var _footSiteTree = $('.fatFooter').find('.siteTree>ul>li>ul');
  var fatFootCtrlText1 = _fatFootCtrl.text();
  var fatFootCtrlText2 = _fatFootCtrl.attr('data-altText');

  _fatFootCtrl.click(function(){
    if ( _footSiteTree.is(':visible')) {
      _footSiteTree.stop(true,false).slideUp();
      $(this).addClass('closed').text(fatFootCtrlText2);
    } else {
      _footSiteTree.stop(true,false).slideDown();
      $(this).removeClass('closed').text(fatFootCtrlText1);
    }
  })


	// 向上捲動箭頭 //////////////////////////////
	_goTop.click(function () {
		_html.stop(true, false).animate({ scrollTop: 0 }, 800, function () {
      _goCenter.is(':visible') ? _goCenter.focus() : _sidebarCtrl.focus();
		});
	});
	_header.find('.accesskey').focus(function () {
		_html.stop(true, false).animate({ scrollTop: 0 }, 800);
	})

})