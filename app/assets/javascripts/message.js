$(function(){
  function buildHTML(message){
    var insertImage = '';
    // if(message.image){
    //   insertImage = `<img src = "${message.image}">`;
    // }
    var insertImage = message.image == null ? "" : `<img src="${message.image}">`;
    var html = `<div class="message" data_id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${ message.name }
                    </div>
                    <div class="message__upper-info__date">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="message__text">
                      <p class="message__text__content">
                        ${ message.content }
                      </p>
                      ${ insertImage }
                  </div>
                </div>`
    return html;
  }
function scroll_view(){
  $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight}, '1000');
}

var updataTime = 5000;
setInterval(autoUpdata, updataTime);

function autoUpdata(){
  if ($('.message')[0]){
    var message_id = $('.message').last().attr('data_id');
  }else{
    var message_id = 0;
  }
  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: { message_id: message_id }
  })
  .done(function(data){
    $.each(data, function(i, data){
      $('.messages').append(buildHTML(data));
    });
    scroll_view();
  })
  .fail(function(){
    alert('自動更新に失敗しました');
  });
};

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').val('');
      scroll_view();
      $('#text__field').val('');
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  })
});


