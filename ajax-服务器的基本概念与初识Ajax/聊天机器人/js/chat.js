$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()


    // 发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        let text = $('#ipt').val().trim()
        if(text.length <= 0) {
            return $('#ipt').val('')
        }

        // 如果用户输入了内容，则将内容追加到页面上显示
        $('#talk_list').append(`
        <li class="right_word">
        <img src="img/person02.png" /> <span>${text}</span>
        </li>
        `)
        $('#ipt').val('')
        // 垂直滚动条
        resetui()
        // 发起请求 获取机器人发送的聊天内容
        getMsg(text)
    })

    // 获取聊天机器人发送的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res)
                if(res.message === 'success') {
                    // 接受聊天消息
                    let msg = res.data.info.text
                    $('#talk_list').append(`
                        <li class="left_word">
                            <img src="img/person01.png" /> <span>${msg}</span>
                        </li>
                    `)
                    // 重置滚动条位置
                    resetui()
                    // 调用getVoice函数，文本转换成语音
                    getVoice(msg)
                }
            }
        })
    }

    // 将机器人的聊天内容转换为语音
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // console.log(res)
                if(res.status === 200) {
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }


    // 回车键发送消息
    $('#ipt').on('keyup', function (e) {
        e.keyCode
        if(e.keyCode === 13) {
            $('#btnSend').click()
        }
    })
  })