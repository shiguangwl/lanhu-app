<template>
  <div class="personal">
      <Header title="个人中心"></Header>
      <div class="personal-info">
          <div class="setting">
              <img src="../../assets/personal/background.png" alt="">
          </div>
          <div class="user-info" @click="handlerInfo()">
              <div class="photo">
                  <img :src="information.imgUrl" alt="" v-if="information.imgUrl" class="head">
                  <img src="../../assets/personal/info.png" alt="" v-else class="head">
              </div>
              <div class="info-msg">
                  <span class="name">{{information.user_name}}</span>
                  <span class="company">{{information.company_name}}</span>
              </div>
          </div>
          <div class="card-code" @click="handlerMeal()">
              <img src="../../assets/personal/fan-card.png" alt="">
          </div>
          <div class="meal" @click="handlerMeal()">
              <img src="../../assets/personal/fa-code.png" alt="">
              <span class="text">饭卡码</span>
          </div>
      </div>
      <div class="personal-content">
          <ul class="personal-list">
              <li class="personal-item">
                  <div class="opt-item" @click="handlerFace()">
                      <div class="opt-left">
                          <img src="../../assets/personal/item1.png" alt="">
                          <span class="label">人脸采集</span>
                      </div>
                      <div class="opt-right">
                          <img src="../../assets/personal/more.png" alt="">
                      </div>
                  </div>
                  <div class="opt-item" @click="handlerPass()">
                      <div class="opt-left">
                          <img src="../../assets/personal/item2.png" alt="">
                          <span class="label">密码管理</span>
                      </div>
                      <div class="opt-right">
                          <img src="../../assets/personal/more.png" alt="">
                      </div>
                  </div>
                  <div class="opt-item" @click="handlerAddr()">
                      <div class="opt-left">
                          <img src="../../assets/personal/item3.png" alt="">
                          <span class="label">地址管理</span>
                      </div>
                      <div class="opt-right">
                          <img src="../../assets/personal/more.png" alt="">
                      </div>
                  </div>
              </li>
              <li class="personal-item">
                  <div class="opt-item" @click="handleOrder()">
                      <div class="opt-left">
                          <img src="../../assets/personal/item4.png" alt="">
                          <span class="label">我的订单</span>
                      </div>
                      <div class="opt-right">
                          <img src="../../assets/personal/more.png" alt="">
                      </div>
                  </div>
                  <div class="opt-item" @click="handlerRec()">
                      <div class="opt-left">
                          <img src="../../assets/personal/item5.png" alt="">
                          <span class="label">消费记录</span>
                      </div>
                      <div class="opt-right">
                          <img src="../../assets/personal/more.png" alt="">
                      </div>
                  </div>
                  <div class="opt-item">
                      <div class="opt-left">
                          <img src="../../assets/personal/item6.png" alt="">
                          <span class="label">绑定记录</span>
                      </div>
                      <div class="opt-right">
                          <img src="../../assets/personal/more.png" alt="">
                      </div>
                  </div>
              </li>
          </ul>
      </div>
      <div class="footer-button">
          <button @click="btnQuit">退出登录</button>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            information:{
                user_name:sessionStorage.getItem('user_name'),
                company_name:sessionStorage.getItem('company_name'),
                imgUrl:sessionStorage.getItem('img_url')
            },
            //退出登录请求参数
            quitdata:{
                method:'sys.sys.exitLogin',
                company_id:sessionStorage.getItem('company_id'),
                user_id:sessionStorage.getItem('user_id'),
                wx:'1',
                type:'H5'
            },
        }
    },
    methods:{
        btnQuit(){
            this.$dialog.confirm({
                message:'是否要退出登录?'
            })
            .then(()=>{
                let sendData = {...this.quitdata, ...this.myFun.getDefaultParameters()}
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/',encrypSendData)
                .then(res=>{
                    // console.log(res)
                    if(res.status == 0){
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                    }
                })
            })
            .catch(()=>{
                //取消
            })
        },
        //跳转到个人信息
        handlerInfo(){
            this.$router.push('/information')
        },
        //跳转到人脸采集
        handlerFace(){
            this.$router.push('/collection')
        },
        //跳转到密码管理
        handlerPass(){
            this.$router.push('/lastpass')
        },
        //跳转到地址管理
        handlerAddr(){
            this.$router.push('/address')
        },
        //跳转到我的订单
        handleOrder(){
            this.$router.push('/order')
        },
        //跳转到消费记录
        handlerRec(){
            this.$router.push('/consume')
        },
        //跳转到饭卡码
        handlerMeal(){
            this.$router.push('/mealcard')
        },
    }
}
</script>

<style lang="less" scoped>
.personal{
    width: 100%;
    min-height: 100%;
    background: #F6F6F6;
    .personal-info{
        position: relative;
        .setting{
            img{
                width: 100%;
                height: 145px;
            }
        }
        .user-info{
            position: absolute;
            top: 30px;
            left: 16px;
            display: flex;
            align-items: center;
            .photo{
                .head{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
            }
            .info-msg{
                display: flex;
                flex-direction: column;
                padding-left: 10px;
                .name{
                    font-size: 16px;
                    font-weight: 400;
                    color: #FFFFFF;
                }
                .company{
                    font-size: 12px;
                    font-weight: 400;
                    color: #FFFFFF;
                    padding-top: 10px;
                }
            }
        }
        .card-code{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 345px;
                height: 45px;
            }
        }
        .meal{
            position: absolute;
            bottom: 11px;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 14px;
                height: 14px;
                padding-right: 5px;
                vertical-align: middle;
            }
            .text{
                vertical-align: middle;
                font-size: 14px;
                font-weight: 400;
                color: #FFF1DF;
            }
        }
    }
    .personal-content{
        .personal-list{
            .personal-item{
                padding: 0 15px;
                background: #fff;
                box-sizing: border-box;
                margin-top: 12px;
                .opt-item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 42px;
                    box-sizing: border-box;
                    border-bottom: 1px dashed #eee;
                    &:nth-child(3){
                        border-bottom: 0;
                    }
                    .opt-left{
                        display: flex;
                        img{
                            width: 14px;
                            vertical-align: middle;
                        }
                        .label{
                            font-size: 14px;
                            font-weight: 400;
                            color: #242424;
                            padding-left: 10px;
                        }
                    }
                    .opt-right{
                        img{
                            width: 6px;
                            vertical-align: middle;
                        }
                    }
                }
              
            }
        }
    }
    .footer-button{
        margin-top: 22px;
        text-align: center;
        button{
            width: 343px;
            height: 42px;
            background: #FFFFFF;
            border-radius: 10px 10px 10px 10px;
            border: 0;
            font-size: 14px;
            font-weight: bold;
            color: #242424;
        }
    }
}
</style>