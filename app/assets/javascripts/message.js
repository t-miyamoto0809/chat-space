$(document).on('turbolinks:load', function () {
  $(function () {
    function buildHtml(message) {
      var image = ""
      message.image ? image = `<img src="${message.image}" class='lower-message__image' >` : image = ""
      var new_message = `
                      <div class= "message" data-id="${message.id}">
                        <div class="message-info">
                          <p class="message-info__user">
                            ${message.user_name}
                          </p>
                          <p class="message-info__date">
                            ${message.date}
                          </p>
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
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('#new_message')[0].reset(); //フォームデータリセット
        $('.new-message__submit-btn').prop('disabled', false);//送信ボタンを有効にする
      })
      .fail(function () {
        alert('メッセージを入力してください。');
        $('.new-message__submit-btn').prop('disabled', false);
      })
    })
  });
});
