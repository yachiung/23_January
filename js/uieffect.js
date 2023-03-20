$(document).ready(function(){
  
  var _window = $(window);
  var _html = $('html');
  var _body = $('body');
  var _header = $('.header');

	var ww = _window.width();
  var wwNew;
  var hh = _header.outerHeight();
  var _menu = _header.find('.menu');

  var _sidebarCtrl = $('.sidebarCtrl');
  var _sidebar = $('.sidebar');

  var _goTop = $('.goTop');
  var _footer = $('.footer');

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


  // 主選單（寬螢幕版） ////////////////////
  // 找出_menu中有次選單的li
  _menu.find('li').has('ul').addClass('hasChild');
  var _hasChild = _menu.find('.hasChild');
  var _hasChildA = _hasChild.children('a');
  _hasChild.hover( 
    function(){
      $(this).children('ul').stop(true, false).fadeIn(200);
    },
    function(){
      $(this).find('ul').stop(true, false).fadeOut(200);
    }
  )


  // 複製「主選單」到行動版側欄 ////////////////////
  _menu.clone().prependTo(_sidebar);
  $('.topNav').clone().appendTo(_sidebar);


  // 行動版側欄顯示、隱藏 ////////////////////
  // 製作行動版側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');
  var _sidebarMask = $('.sidebarMask');
  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('show')) {
      _sidebar.removeClass('show');
      _sidebarCtrl.removeClass('closeIt');
      _body.removeClass('noScroll');
      _sidebarMask.fadeOut(400);
    } else {
      _sidebar.addClass('show');
      _sidebarCtrl.addClass('closeIt');
      _body.addClass('noScroll')
      _sidebarMask.fadeIn(400);
    }
  });
  _sidebarMask.click(function(){
    _sidebar.removeClass('show');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(400);
  });


  // 行動版主選單第二層之後的顯示、隱藏 ////////////////////
  var _sidebarMenu = _sidebar.find('.menu');
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
  var _search = $('.search');
  _searchCtrl.click( function(){
    _search.hasClass('show') ? _search.removeClass('show') :  _search.addClass('show');
  });


  // 固定版頭 ////////////////////
  var fixHeadThreshold;

  ww >= wwNormal ? fixHeadThreshold = hh - _menu.outerHeight() : fixHeadThreshold = 0;

  _window.scroll( function() {

    // 固定版頭
    if (_window.scrollTop() > fixHeadThreshold ) {
			_header.addClass('fixed');
			_body.offset({ top: hh });
		} else {
			_header.removeClass('fixed');
			_body.removeAttr('style');
		}

    // goTop button 顯示、隱藏
    _window.scrollTop() > 200 ? _goTop.addClass('show') : _goTop.removeClass('show');

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
			if ($('.goCenter').is(':visible')) {
				$('.goCenter').focus();
			} else {
				_sidebarCtrl.focus();
			}
		});
	});
	_header.find('.accesskey').focus(function () {
		_html.stop(true, false).animate({ scrollTop: 0 }, 800);
	})

})