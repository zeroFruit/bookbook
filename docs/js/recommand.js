$(document).ready(function() {
  $.ajax({
    url: `${localStorage.getItem('url')}/books`,
    method: 'GET',
    data: {
      words: `${localStorage.getItem('words')}`
    },
    error: ajaxErrorHandler,
    success: ajaxSuccHandler
  })
});

const ajaxSuccHandler = function (response) {
  finishLoading();
  console.log(response.data);

  $('#book_image').attr('src', response.data.imgSrc);
  $('#book_header').text(response.data.title);
  $('#book_description').html(response.data.introContent);
}

const ajaxErrorHandler = function (xhr, ajaxOptions, thrownError) {
  console.log(thrownError);
  console.log(ajaxOptions);
}

/*
  Loader
*/
const finishLoading = function () {
  $('#result_loader').css('display', 'none');
  $('#result_wrapper').css('display', 'block');
}
