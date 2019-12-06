'use strict';
const btns = document.getElementsByClassName('btn');
const url = 'https://sv51qzcvzb.execute-api.ap-northeast-1.amazonaws.com/dev/BB-devCampStep3-Okinawa-LT-func';

const postRecord = function(VAL) {
  return axios.post(url, {answer: VAL});
};

for (let i = 0; i < btns.length; i++) {
  btns[i].onmouseup = function() {
    console.log(this.textContent);

    return postRecord(this.textContent)
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
        icon: "error",
      });
    })
  }
}