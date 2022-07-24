;(function () {
  // 删除
  function count() {
    $('.todo-count strong').text($('#todoList li').length)
  }

  // 新增
  $('#addTodo').keyup(function (e) {
    if(e.keyCode === 13) {
      let value = $(this).val()
      if(value !== '') {
        $('#todoList').append(`
          <li style = "display: none">
            <div class="view">
              <label>${value}</label>
              <button class="destroy"></button>
            </div>
          </li>         
        `)
        $('#todoList li').last().slideDown(function () {
          count()
          // $('.todo-count strong').text($('#todoList li').length)
        })
        $(tihs).val('')
      }
    }
  })
  // 删除
  $('#todoList').on('click', '.destroy', function () {
    let $li = $(this).parent().parent()
    $li.fadeOut(function () {
      $(this).remove()
      count()
      // $('.todo-count strong').text($('#todoList li').length)
    })
  })

  // 合计

})()
