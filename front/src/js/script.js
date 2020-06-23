'use strict';
var btns = document.getElementsByClassName('vote-btn');
var url = 'https://gyem8jkda8.execute-api.ap-northeast-1.amazonaws.com/dev/BB-devCamp-Step3-LT-WebVote-func';

var postRecord = function(ANS, DEVICE) {
  return axios.post(url, {answer: ANS, device: DEVICE});
};

for (var i = 0; i < btns.length; i++) {
  btns[i].onmouseup = function() {
    var device = window.navigator.userAgent;
    return postRecord(this.textContent, device)
      .then(function() {
        swal({
          title: 'kintoneへ登録しました！',
          text: '【' + this.textContent + '】',
          icon: 'success',
        });
      }).catch(function(err) {
        swal({
          title: '登録に失敗しました！',
          text: '【' + err.message + '】',
          icon: 'error',
        });
      });
  };
}
