;(function () {
  // 默认隐藏返回顶部
  $('.gotop').hide()

  // 页面滚动事件
  $(window).scroll(function () {
    let top = $('html').scrollTop()
    if(top > 200) {
      $('.gotop').stop().fadeIn()
    } else {
      $('.gotop').stop().fadeOut()
    }
  })

  // 点击返回顶部事件
  $('.gotop').click(function () {
    $('html').animate({
      scrollTop: 0
    })
  })

  // 意见反馈点击展开
  $('.suggest').click(function () {
    $('.sugform').slideDown()
  }) 
  // 意见反馈点击收起
  $('.close').click(function () {
    $('.sugform').slideUp()
  }) 

  // 自动轮播
  function autoPlay () {
    let $last = $('.wblist').last()
    let $wbdesc = $('.wbdesc')
    $wbdesc.prepend($last)
    let height = $last.outerHeight(true)
    $wbdesc.css('top', -height)
    $wbdesc.delay(2000).animate({ top: 0 }, function () {
      autoPlay()
    })
  }
  autoPlay()
})()
