'use strict';
const btns = document.getElementsByClassName('vote-btn');
const url = 'https://gyem8jkda8.execute-api.ap-northeast-1.amazonaws.com/dev/BB-devCamp-Step3-LT-WebVote-func';

const postRecord = function(ANS, DEVICE) {
  return axios.post(url, {answer: ANS, device: DEVICE});
};

for (let i = 0; i < btns.length; i++) {
  btns[i].onmouseup = function() {
    const device = window.navigator.userAgent;
    return postRecord(this.textContent, device)
      .then(() => {
        swal({
          title: 'kintoneへ登録しました！',
          text: `【${this.textContent}】`,
          icon: 'success',
        });
      }).catch(err => {
        swal({
          title: '登録に失敗しました！',
          text: `【${err.message}】`,
          icon: 'error',
        });
      });
  };
}