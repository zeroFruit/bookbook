
localStorage.setItem('url', 'http://ec2-13-124-78-253.ap-northeast-2.compute.amazonaws.com:8080');

/*
  서버에서 키워드 자료들을 받아옵니다.
*/
$(document).ready(function() {
  $.ajax({
    url: `${localStorage.getItem('url')}/keywords`,
    method: 'GET',
    error: ajaxErrorHandler,
    success: ajaxSuccHandler
  });
});

const ajaxSuccHandler = function (response) {
  finishLoading();
  initWordCloud(response.data);
}

const ajaxErrorHandler = function (xhr, ajaxOptions, thrownError) {
  console.log('thronwError', thrownError);
  console.log('ajaxOpts', ajaxOptions);

  if (ajaxOptions === 'error') {
    // error handling
  }
}

/*
  Loader
*/
const finishLoading = function () {
  $('#loader').css('display', 'none');
  $('#wrapper').css('display', 'block');
}

/*
  책 추천 버튼 #rec-btn
*/
$('#rec-btn').on('click', function(event) {
  if($(this).hasClass('haswords')) {
    $('#rec-form').submit();
  } else {
    alert("단어가 부족합니다." + localStorage.getItem('words'));
  }
});
