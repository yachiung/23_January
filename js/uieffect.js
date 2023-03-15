$(document).ready(function(){
  var _window = $(window);


  var _sidebarCtrl = $('.sidebarCtrl');

  _sidebarCtrl.click(function(){
    _this = $(this);
    if (_this.hasClass('closeIt')) {
      _this.removeClass('closeIt')
    } else {
      _this.addClass('closeIt');
    }
  })

  var _searchCtrl = $('.searchCtrl');
  var _siteSearch = $('.search');

  _searchCtrl.click( function(){
    _siteSearch.hasClass('show') ? _siteSearch.removeClass('show') :  _siteSearch.addClass('show');
    // _searchCtrl.hasClass('closeIt')  ? _searchCtrl.removeClass('closeIt') : _searchCtrl.addClass('closeIt');

  })

})