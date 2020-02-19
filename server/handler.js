'use strict';
// Node.jsからkintone REST APIを実行する方法として 「kintone REST API Client」 を利用
// https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client

const { KintoneRestAPIClient } = require('@kintone/rest-api-client');

const client = new KintoneRestAPIClient({
  baseUrl: process.env.KINTONE_URL,
  auth: {
    apiToken: process.env.KINTONE_APITOKEN,
  }
});

// ハンドラー （メイン処理）
module.exports.main = async event => {
  const body = JSON.parse(event.body);

  return client.record.addRecord({
    app: process.env.KINTONE_APPID,
    record: {
      answer: {
        value: body.answer
      },
      device: {
        value: body.device
      }
    }
  }).then(resp => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'success'
    };
  }).catch(err => {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'error'
    };
  });
};
