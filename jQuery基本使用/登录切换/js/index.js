;(function () {
  // 1. 账号 & 安全切换
  $('.label').click(function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')

    let id = $(this).attr('data-label')
    $(id).css('display', 'block')
    $(id).siblings().css('display', 'none')
  })

  // 2.安全 & 手机切换

  $('.icon').click(function () {
    let isActive = $(this).hasClass('active')
    if(isActive === false) {
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
  
      let id = $(this).attr('data-label')
      $(id).css('display', 'block')
      $(id).siblings().css('display', 'none')
    } else {
      $('.label').last().trigger('click')
    }
  })
})()
