<template>
  <div class="login">
      <div class="header">
          <img src="../../assets/Login/login.png" alt="">
      </div>
      <div class="login-wrap">
          <div class="login-form">
            <form class="psd_login" @submit.prevent="handlerLogin">
              <div class="title">欢迎登录</div>
              <div class="form-username">
                  <img src="../../assets/Login/user.png" alt="">
                  <input v-model="formdata.account" placeholder="请输入用户名" type="text">
              </div>
              <div class="form-password">
                  <img src="../../assets/Login/pass.png" alt="">
                  <input v-model="password" placeholder="请输入密码" type="password">
              </div>
              <div class="submit">
                  <button>登录</button>
              </div>
              <div class="empty">由广州市大唐智讯电子技术有限公司提供技术支持</div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            publicKey:'',
            // password:'DATANGADMIN2019',
            // password:'zhang123',
            password:'',
            //企业列表参数
            companydata:{
                method: "base.company.list",
                count:1,
                currpage:1,
            },
            //登录参数
            formdata:{
                method: "sys.sys.loginIndex",
                // account:'gly',
                // account:'zhangbo',
                account:'',
                password:'',
                company_id:''
            },

        }
    },
    created() {
        this.getPublicKey()
    },
    methods:{
        // 获取系统初始化公钥
        getPublicKey() {
            this.$post('/gmCryption/getPublicKey').then(res=>{
                if(res.status == 0) {
                    // 获取公钥成功
                    this.publicKey = res.datas
                    sessionStorage.setItem('sysPublicKey', res.datas)
                    this.getCompanyid()
                } else if(res.status == -1) {
                    this.$toast('获取公钥异常')
                } else {
                    this.$toast('未知错误')  // 基本不会出现
                }
            })
        },
        //获取企业列表的企业id
        getCompanyid(){
            let sendData = {...this.companydata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData).then(res=>{
                if(res.status == 0) {
                    this.formdata.company_id=res.data[0].id
                    sessionStorage.setItem('company_id', res.data[0].id)
                    sessionStorage.setItem('company_name', res.data[0].name)
                }
            })
        },
        //点击登录按钮调接口
        handlerLogin(){
            if(!this.formdata.account){
                this.$toast('用户名不能为空')
            }else if(!this.password){
                this.$toast('密码不能为空')
                return
            }else{
                let pswd = Hex.utf8StrToBytes(this.password)
                let sm3 = new SM3Digest();
				sm3.update(pswd,0,pswd.length);//数据很多的话，可以分多次update
				let sm3Hash = sm3.doFinal();//得到的数据是个byte数组
				let sm3HashHex = Hex.encode(sm3Hash,0,sm3Hash.length);//编码成16进制可见字符
                this.formdata.password = sm3HashHex
                let sendData = {...this.formdata, ...this.myFun.getDefaultParameters()}
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/',encrypSendData).then(res=>{
                    if(res.status == 0) {
                        sessionStorage.setItem('token', res.data.token)
                        sessionStorage.setItem('user_id', res.data.id)
                        sessionStorage.setItem('card_id', res.data.card_id)
                        sessionStorage.setItem('img_url', res.data.img_url)
                        sessionStorage.setItem('user_name', res.data.user_name)
                        sessionStorage.setItem('job_number', res.data.job_number)
                        localStorage.setItem('tokenStartTime', new Date().getTime())
                        localStorage.setItem('expiresTime', res.data.expires_in)
                        this.$router.push({ path: 'index' })
                    } else if(res.status == 1) {
                        this.$toast('用户名或密码错误')
                    }
                })
            }

        },
    },

}
</script>

<style lang="less" scoped>
.login{
    position: relative;
    .header{
        img{
            width: 375px;
            height: 275px;
        }
    }
    .login-wrap{
        position: absolute;
        top: 211px;
        left: 23px;
        right: 22px;
        width: 330px;
        height: 346px;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.1600);
        border-radius: 15px 15px 15px 15px;
        box-sizing: border-box;
        .login-form{
            .psd_login{
                .title{
                    font-size: 20px;
                    font-weight: bold;
                    color: #242424;
                    padding: 30px 30px 44px;
                }
                .form-username{
                    display: flex;
                    align-items: center;
                    width: 290px;
                    height: 40px;
                    background: #F8F6F4;
                    border-radius: 6px 6px 6px 6px;
                    margin: 0 20px 20px 20px;
                    box-sizing: border-box;
                    padding-left: 15px;
                    img{
                        width: 17px;
                        height: 16px;
                        padding-right: 11px;
                    }
                    input{
                        flex: 1;
                        border: 0;
                        background: #F8F6F4;
                        font-size: 14px;
                        font-weight: 400;
                        color: #242424;
                        box-sizing: border-box;
                    }
                   
                }
                .form-password{
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding-left: 15px;
                    width: 290px;
                    height: 40px;
                    background: #F8F6F4;
                    border-radius: 6px 6px 6px 6px;
                    margin: 0 20px 40px 20px;
                    img{
                        width: 17px;
                        height: 16px;
                        padding-right: 11px;
                    }
                    input{
                        flex: 1;
                        border: 0;
                        background: #F8F6F4;
                        font-size: 14px;
                        font-weight: 400;
                        color: #242424;
                        box-sizing: border-box;
                    }
                }
                .submit{
                   text-align: center;
                    button{
                    width: 290px;
                    height: 40px;
                    background: linear-gradient(90deg, #FF5D62 0%, #FF7558 100%);
                    border-radius: 6px 6px 6px 6px;
                    font-size: 16px;
                    font-weight: 400;
                    color: #FFFFFF;
                    border: 0;
                    }
                }
                .empty{
                    font-size: 11px;
                    font-weight: 400;
                    color: #5D5D5D;
                    margin-top: 11px;
                    text-align: center;
                }
            }
        }
    }
}
</style>