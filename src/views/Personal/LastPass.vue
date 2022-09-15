<template>
  <div class="lastpass">
      <Header title="密码管理"></Header>
      <div class="form-wrap">
        <van-form @submit="onSubmit">
          <div class="field-wrap">
            <van-field
              clearable
              label-width="60"
              v-model="formdata.password"
              name="原密码"
              label="原密码"
              placeholder="请输入原始密码"
            />
            <van-field
              clearable
              label-width="60"
              v-model="formdata.password1"
              name="新密码"
              label="新密码"
              placeholder="请输入新密码"
            />
            <van-field
              clearable
              label-width="60"
              v-model="formdata.password2"
              name="确认密码"
              label="确认密码"
              placeholder="请输入确认密码"
            />
          </div>
          <div class="footer">
            <button :disabled="isClick" native-type="submit">保存密码</button>
          </div>
        </van-form>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
      return{
        formdata:{
          method:'sys.user.changePwd',
          password:'',
          password1:'',
          password2:'',
          user_id:sessionStorage.getItem('user_id'),
        },
      }
    },
    methods:{
      onSubmit(){
        if(this.formdata.password1!=this.formdata.password2){
          this.$toast('新密码和确认密码不一致')
        }else{
          let sendData = {...this.formdata, ...this.myFun.getDefaultParameters()}
          let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
          this.$post('/router/rest/',encrypSendData)
          .then(res=>{
            if(res.status == 0){
              this.$toast('修改成功')
              this.$router.push('/login')
            }else if(res.status == 1){
              this.$toast(res.msg)
            }
          })
          .catch(err=>{
          })
        }
      },
    },
    computed:{
      isClick(){
        if(this.formdata.password=="" || this.formdata.password1=="" || this.formdata.password2 == "") return true
        else return false
      }
    },
}
</script>

<style lang="less" scoped>
.lastpass{
  width: 100%;
  min-height: 100%;
  background: #F6F6F6;
  .form-wrap{
    margin: 16px;
    .van-form{
      .field-wrap{
        width: 343px;
        height: 126px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
      }
      .footer{
        margin-top: 24px;
        button{
          width: 343px;
          height: 40px;
          background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
          border-radius: 6px 6px 6px 6px;
          opacity: 1;
          font-size: 16px;
          font-weight: 400;
          color: #FFFFFF;
          border: 0;
        }
        button[disabled]{
          opacity: 0.6;
        }
      }
    }
  }
}
</style>