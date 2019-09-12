'use strict';
const { CryptoApi } = require('./crypto.js')

const SignApi = {
  // getSign ({
  //   cid,
  //   data,
  //   uid,
  //   accountKey
  // }) {
  //   const signArr = [
  //     `cid=${cid}`
  //   ]
  // }
  getSign({
    cid,
    q,
    uid,
    accountKey
  }) {
    let signArr = [
      `cid=${cid}`,
      `q=${q}`
    ]
    console.log('sign入参:' + `${signArr.join(';')}${accountKey}`)
    return CryptoApi.md5Sign(`${signArr.join(';')}${accountKey}`)
  },

  getQ(body = {}, key) {
    return CryptoApi.aesEncrypt(body || {}, key)
  }
}

export {
  SignApi
}
