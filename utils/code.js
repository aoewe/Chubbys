var CryptoJS = require("crypto-js")
const key = 'sdE=0-Q34s=SZS!33e!SSAEF';
const iv = ('20210907');
function decode(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.DES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

function encode(data) { //加密
   if(!data) return {};
  // data.timestamp= Date.parse(new Date())
  var parseKey = CryptoJS.enc.Utf8.parse(key);
  var parseIV = CryptoJS.enc.Utf8.parse(iv);
  var encrypted =  CryptoJS.DES.encrypt(JSON.stringify(data), parseKey, {
    iv: parseIV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
   return { param: encrypted.toString() }; //返回的是hex格式的密文,encrypted.toString()返回base64格式
}
module.exports= {
  decode,
  encode
}