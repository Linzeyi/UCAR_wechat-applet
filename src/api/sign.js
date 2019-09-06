'use strict';
const { CryptoApi } = require('./crypto.js')

const SignApi = {
  getSign({
    cid,
    q,
    uid,
    accountKey
  }) {
    const signArr = [
      `cid=${cid}`,
      `q=${q}`
    ];
    if (uid) {
      signArr.push(`uid=${uid}`);
    }

    return CryptoApi.md5Sign(`${signArr.join(';')}${accountKey}`)
  },

  getQ(body = {}, key) {
    return CryptoApi.aesEncrypt(body || {}, key)
  }
}

export {
  SignApi
}
