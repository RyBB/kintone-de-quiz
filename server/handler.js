'use strict';

// Node.jsからkintone REST APIを実行する方法として 「kintone js sdk」 を利用
// https://developer.cybozu.io/hc/ja/articles/360025484571-kintone-JS-SDK
const kintone = require('@kintone/kintone-js-sdk');

// Lambdaの環境変数 （サブドメイン, アプリID, APIトークン）
const common = {
  domain: process.env.KINTONE_DOMAIN,
  app: process.env.KINTONE_APPID,
  token: process.env.KINTONE_APITOKEN,
};

// 回答アプリのフィールドコード
const fieldCode = 'answer';

// kintone js sdkのコネクション
const kintoneAuth = (new kintone.Auth()).setApiToken({apiToken: common.token});
const connection = new kintone.Connection({domain: common.domain, auth: kintoneAuth});
const kintoneRecord = new kintone.Record({connection});

// kintoneへレコード登録する関数
const postRecord = VAL => {
  const app = common.app;
  const record = {
    [fieldCode]: {
      value: VAL
    }
  };
  return kintoneRecord.addRecord({app, record});
};

// ハンドラー （メイン処理）
module.exports.main = async event => {
  try {
    const body = JSON.parse(event.body);
    const answer = body.answer;
    await postRecord(answer);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'success '
    };
  } catch(e) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'error '
    };
  }
};
