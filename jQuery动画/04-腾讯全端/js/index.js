// 自调用函数(自执行函数)
;(function () {
  // 顶部高亮
  $(window).scroll(function () {
    let top = $('html').scrollTop()
    if(top === 0) {
      $('.header').removeClass('scrolled')
    } else {
      $('.header').addClass('scrolled')
    }
  })

  // 返回顶部
  $(window).scroll(function () {
    let top = $('html').scrollTop()
    if(top > 200) {
      // $('.gotop').css('display', 'block')
      $('.gotop').stop().slideDown(1000)
      
      
    } else {
      // $('.gotop').css('display', 'none')
      $('.gotop').stop().slideUp(1000)
      
    }
  }) 
  $('.gotop').click(function () {
    // $('html').scrollTop(0)
    $('html').animate({
      scrollTop: 0
    })
  })
})()