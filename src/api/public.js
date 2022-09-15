import sm4 from '../utils/sm4'
export default {
    // 默认传给后端的必传参数
    getDefaultParameters() {
      let obj = {
        stime: Date.now(),                     //  时间戳,单位:毫秒
        noncestr: this.getRandomString(8),     // 随机字符串，数字+字母混合组成，长度8位
        is_terminal: '1',                      // 是否为终端，固定入参：“1”
        ip_address: returnCitySN["cip"],       // IP地址，用于后台白名单管控
        token: sessionStorage.getItem('token')  // token
      }
      return obj
    },
    // 随机字符串，数字+字母混合组成，长度8位  参数说明 ： 长度 n 可以油用户自定义
    getRandomString(n) {
        let str = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let res = "";
        for(let i = 0; i < n ; i ++) {
            let id = Math.ceil(Math.random()*35);
            res += str[id];
        }
        return res;
    },
    // 加密前端发送数据
    encryptByMessage(message) {
        let sm4 = new SM4();
        let sm4key = sm4.generateKey().toUpperCase();
        //sm2加密
        let sm2 = new SM2();
        let publicKey = sessionStorage.getItem('sysPublicKey');
        //函数输入输出都是16进制数据
        let key = sm2.encrypt(publicKey, Hex.utf8StrToHex(sm4key));   
        let cipher = sm4.encrypt_ecb(Hex.decode(sm4key), Hex.utf8StrToBytes(message));
        let data = Hex.encode(cipher, 0, cipher.length);
        let res = {key: key, data: data};
        return res
    }
}