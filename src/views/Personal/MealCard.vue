<template>
  <div class="meal-card">
      <Header title="饭卡码"></Header>
      <div class="info-wrap">
          <div class="name">{{infodata.user_name}}</div>
          <div class="code-wrap">
              <img v-lazy="QRImgUrl" alt="" class="code">
              <span class="mask" v-if="infodata.statusName == '挂失' || infodata.statusName == '退卡'"></span>
              <div class="company">{{infodata.company_name}}</div>
              <div class="refresh" @click="handleRef()">
                  <img src="../../assets/personal/refresh.png" alt="">
                  <span class="text">刷新二维码</span>
              </div>

          </div>
          <span class="bage1"></span>
          <span class="bage2"></span>
      </div>

      <div class="option-wrap">
          <ul>
              <li>
                  <div class="item1">
                      <span class="lable">工号</span>
                      <span class="text">{{infodata.job_number}}</span>
                  </div>
              </li>
              <li>
                  <div class="item2">
                      <span class="lable">卡类型</span>
                      <span class="text">{{infodata.cardtype_name}}</span>
                  </div>
              </li>
              <li>
                  <div class="item3">
                      <span class="lable">卡状态</span>
                      <span class="text">{{infodata.statusName}}</span>
                  </div>
              </li>
              <li>
                  <div class="item4">
                      <span class="lable">总余额</span>
                      <span class="text">¥{{infodata.remainingSum}}</span>
                  </div>
              </li>
          </ul>
      </div>

      <div class="footer-option">
          <div class="records" @click="handlerRec()">
              <span>消费记录</span>
              <img src="../../assets/personal/more.png" alt="">
          </div>
          <div class="loss" @click="handlerLoss()">
              <span>饭卡挂失</span>
          </div>
      </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            infodata:{},
            QRImgUrl:'',
            id:'',
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        //饭卡信息请求
        getdata(){
            let paramsdata={
                method:'card.meal.MyMealCard',
                user_id:sessionStorage.getItem('user_id')
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                // console.log(res)
                this.infodata=res.data
                this.id=res.data.id
                this.getQRcode(res.data.qr_number)
            })

        },
        getQRcode(QRlink){
            QRCode.toDataURL(
                QRlink,
                { errorCorrectionLevel: 'L', margin: 2, width: 128 },
                (err, url) => {
                    if (err) throw err
                    this.QRImgUrl = url
                }
            )
        },
        //点击刷新
        handleRef(){
            this.getdata()
        },
        //跳转到消费记录
        handlerRec(){
            this.$router.push('/consume')
        },
        //饭卡挂失
        handlerLoss(){
            this.$dialog.confirm({
                title:'确定要挂失饭卡吗？',
                message:'挂失后将无法继续使用'
            })
            .then(()=>{
                let paramsdata={
                    method:'card.meal.updateStatus',
                    id:this.id,
                    user_id:sessionStorage.getItem('user_id'),
                    company_id:sessionStorage.getItem('company_id'),
                    status:'2'
                }
                let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/',encrypSendData)
                .then(res=>{
                    // console.log(res)
                    if(res.status == 0){
                        this.getdata()
                    }
                })

            })
            .catch(()=>{
                console.log('取消')
            })
        },
    }
}
</script>

<style lang="less" scoped>
.meal-card{
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .info-wrap{
        position: relative;
        margin: 16px 16px 0;
        .name{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 343px;
            height: 40px;
            background: linear-gradient(90deg, #E19A4B 0%, #F3C89B 100%);
            border-radius: 10px 10px 0px 0px;
            opacity: 1;
            font-size: 14px;
            font-weight: bold;
            color: #FFF1DF;
        }
        .code-wrap{
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 343px;
            height: 330px;
            background: #fff;
            border-bottom: 1px dashed #eee;
            .code{
                width: 220px;
                height: 220px;
                margin-top: 21px;
            }
            .mask{
                position: absolute;
                top: 22px;
                width: 220px;
                height: 220px;
                background: #e4e4e4;
                opacity: 0.8;
            }
            .company{
                font-size: 14px;
                font-weight: bold;
                color: #242424;
                margin-top: 12px;
            }
            .refresh{
                display: flex;
                align-items: center;
                margin-top: 22px;
                img{
                    width: 12px;
                }
                .text{
                    font-size: 12px;
                    font-weight: 400;
                    color: #959595;
                    padding-left: 6px;
                }
            }
        }
        .bage1{
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 6px;
            height: 12px;
            background: #EEEEEE;
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
        }
        .bage2{
            position: absolute;
            bottom: -6px;
            right: 0;
            width: 6px;
            height: 12px;
            background: #EEEEEE;
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
        }
    }
    .option-wrap{
        margin: 0 16px;
        ul{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 343px;
            height: 76px;
            background: #fff;
            box-sizing: border-box;
            li{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 85px;
                height: 50px;
                .item1{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-right: 1px solid #eee;
                    width: 100%;
                    .lable{
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                        padding-bottom: 6px;
                    }
                    .text{
                        font-size: 12px;
                        font-weight: bold;
                        color: #242424;
                    }
                }
                .item2{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-right: 1px solid #eee;
                    width: 100%;
                    .lable{
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                        padding-bottom: 6px;
                    }
                    .text{
                        font-size: 12px;
                        font-weight: bold;
                        color: #242424;
                    }
                }
                .item3{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-right: 1px solid #eee;
                    width: 100%;
                    .lable{
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                        padding-bottom: 6px;
                    }
                    .text{
                        font-size: 12px;
                        font-weight: bold;
                        color: #242424;
                    }
                }
                .item4{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    .lable{
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                        padding-bottom: 6px;
                    }
                    .text{
                        font-size: 12px;
                        font-weight: bold;
                        color: #242424;
                    }
                }
            }
        }
    }
    .footer-option{
        width: 343px;
        height: 76px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        box-sizing: border-box;
        margin: 12px 16px 0;
        padding: 0 15px;
        .records{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 38px;
            border-bottom: 1px solid #E9E9E9;
            span{
                font-size: 16px;
                color: #242424;
            }
            img{
                width: 6px;
            }
        }
        .loss{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 38px;
            span{
                font-size: 16px;
                color: #242424;
            }
        }
    }
}
</style>