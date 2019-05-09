$(document).on('turbolinks:load', function () {
  $(function () {
    function buildHtml(message) {
      var image = ""
      message.image ? image = `<img class="lower-message__image" src="${message.image}">` : image = ""
      var new_message = `
                      <div class= "message" data-message-id="${message.id}">
                        <div class="message-info" data-id="${message.id}">
                          <div class="message-info__user">
                            ${message.user_name}
                          </div>
                          <div class="message-info__date">
                            ${message.date}
                          </div>
                        </div>
                        <div>
                          <p class="message__text">
                            ${message.content}
                          </p>
                          ${image}
                        </div>
                      </div>
                      `;
      return new_message;
    }

    function scrollBottom(){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    };

    $('#new_message').on('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function (message) {//成功時処理、引数にformDataが入ってる
        var html = buildHtml(message);// 非同期でメッセージを追加
        $('.messages').append(html);// 実際に追加する
        $('#new_message')[0].reset(); //フォームデータリセット
        scrollBottom();
        $('.new-message__submit-btn').prop('disabled', false);//送信ボタンを有効にする
      })
      .fail(function () {
        alert('メッセージを入力してください。');
        $('.new-message__submit-btn').prop('disabled', false);
      })
    });
    //自動更新
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        var last_message_id = $(".message").last().data('message-id')
        var groupId = location.pathname.split('/')[2]
        $.ajax({
          url:      `/groups/${groupId}/api/messages`,
          type:     'GET',
          dataType: 'json',
          data:     {id: last_message_id }
        })
        .done(function(messages) {
          var insertHTML = ''; //追加するHTMLの入れ物
          messages.forEach(function(message){ //配列の中身を一つずつ取り出す,map()でも良い？
            if(message.id > last_message_id){ //ブラウザ上のidとDBのidを比較
              insertHTML = buildHtml(message);//関数buildHTMLに配列の中身を一つずつ代入
              $('.messages').append(insertHTML);//message送信時と同じ
              scrollBottom();
            };
          });
        })
        .fail(function(){
          alert('error');
        });
      };
    };
    setInterval(reloadMessages, 5000);
  });
});
