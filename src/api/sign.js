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
    data,
    uid,
    accountKey
  }) {
    let signArr = [
      `cid=${cid}`
    ]
    for (let item in data) {
      let str = item + '=' + data[item]
      signArr.push(str)
    }
    // let str = 'cid=007001;password=jjj;type={id:1,\nname:ppp\n};username=heoing' + accountKey
    // if (uid) {
    //   signArr.push(`uid=${uid}`);
    // }
    // console.log(`${signArr.join(';')}${accountKey}`)
    // return CryptoApi.md5Sign(`${signArr.join(';')}${accountKey}`)
    console.log(`${signArr.join(';')}${accountKey}`)
    return CryptoApi.md5Sign(`${signArr.join(';')}${accountKey}`)
  },

  getQ(body = {}, key) {
    return CryptoApi.aesEncrypt(body || {}, key)
  }
}

export {
  SignApi
}
