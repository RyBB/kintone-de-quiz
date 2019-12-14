'use strict';
const btns = document.getElementsByClassName('btn');
const url = 'https://sv51qzcvzb.execute-api.ap-northeast-1.amazonaws.com/dev/BB-devCampStep3-Okinawa-LT-func';

const postRecord = function(ANS, DEVICE) {
  return axios.post(url, {answer: ANS, device: DEVICE});
};

for (let i = 0; i < btns.length; i++) {
  btns[i].onmouseup = function() {
    const device = window.navigator.userAgent;
    console.log(device);

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