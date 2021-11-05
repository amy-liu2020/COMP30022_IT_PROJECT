const crypto = require('crypto');

const key = '0123456789abcdef'
const iv = 'fedcba9876543210'

// encrypt message to cipher
function encrypt(str){
    try{
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
        return cipher.update(str, 'utf8', 'hex') + cipher.final('hex')
    }catch(err){
        console.log(err)
    }
}

// decrypt cipher to message
function decrypt(str){
    try{
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
        return decipher.update(str, 'hex', 'utf8') + decipher.final('utf8')
    }catch(err){
        console.log(err)
    }
}

module.exports = {
  encrypt,
  decrypt
};
