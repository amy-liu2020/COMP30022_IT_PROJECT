const CryptoJS = require('crypto-js');

function encrypt(word) {
  const key = CryptoJS.enc.Utf8.parse('aeHxz123456EkT27');
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function decrypt(word) {

  const key = CryptoJS.enc.Utf8.parse('aeHxz123456EkT27');
  const srcs = CryptoJS.enc.Utf8.stringify(word);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  console.log(decrypt);
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

module.exports = {
  encrypt,
  decrypt
};