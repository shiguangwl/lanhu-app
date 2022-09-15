<template>
  <div class="recharge">
      <!-- <Header title="充值中心"></Header> -->
      <div class="order-food">
          <div class="back" @click="jumpRouter">
              <img src="../../assets/orderfood/back.png" alt="">
          </div>
          <div class="title">充值中心</div>
      </div>
      <div class="rec-wrap">
          <div class="lable">自定义充值</div>
          <div class="rec-input">
              <span class="sign">¥</span>
              <input v-model="amount" type="number" placeholder="请输入充值金额" @input="search">
          </div>
          <div class="rec-fund">
              <ul class="rec-list">
                  <li class="rec-item" :class="{active:num==index}" @click="handerDen(index,item.num)" v-for="(item,index) in fundlist" :key="index">
                      <span class="mark">¥</span>
                      <span class="num">{{item.num}}</span>
                  </li>
              </ul>
          </div>

      </div>

      <div class="radio-wrap">
          <van-checkbox v-model="checked" icon-size="16px">
              
          </van-checkbox>
          <div class="agree">勾选代表您同意</div>
          <div class="treaty">《充值协议》</div>
      </div>

      <div class="submit">
          <button :disabled="isClick" @click="handlerRec()">充值</button>
      </div>

  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            fundlist:[
                {
                    id:1,
                    num:"100"
                },
                {
                    id:2,
                    num:"200"
                },
                {
                    id:3,
                    num:"300"
                },
                {
                    id:4,
                    num:"400"
                },
                {
                    id:5,
                    num:"500"
                },
                {
                    id:6,
                    num:"600"
                },
            ],
            checked:false,
            num:-1,
            amount:"",
        }
    },
    methods:{
        jumpRouter(){
            this.$router.push('/index')
        },
        //点击面额
        handerDen(index,num){
            this.num=index
            this.amount=num
        },
        //点击充值按钮
        handlerRec(){
            let paramsdata={
                method:'app.apprecharge.cardTrial',
                user_id:sessionStorage.getItem('user_id'),
                cardType_id:sessionStorage.getItem('cardType_id'),
                card_id:sessionStorage.getItem('card_id'),
                payAmount:this.amount,
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                // console.log(res,'充值试算')
                let recdata=JSON.stringify(res.data)
                this.$router.push('/paymentRec?recdata='+recdata)
            })
        },
        search(){
            this.num=-1
        },
    },
    computed:{
        isClick(){
            if(this.checked==false || this.amount=="") return true
            else return false
        }
    }
}
</script>

<style lang="less" scoped>
.recharge{
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .order-food{
        position: relative;
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #FF5D62;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .back{
            position: absolute;
            left: 16px;
            img{
                width: 9px;
                vertical-align: middle;
            }
        }
        .title{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            font-weight: 500;
            color: #FFFFFF;
        }
    }
    .rec-wrap{
        width: 100%;
        // height: 242px;
        background: #FFFFFF;
        box-sizing: border-box;
        padding: 0 16px;
        .lable{
            font-size: 14px;
            font-weight: 400;
            color: #5D5D5D;
            padding: 18px 0 15px;
        }
        .rec-input{
            display: flex;
            align-items: center;
            padding-bottom: 7px;
            border-bottom: 1px dashed #E2E2E2;
            .sign{
                font-size: 20px;
                font-weight: 400;
                color: #242424;
                padding-right: 13px;
                padding-bottom: 2px;
            }
            input{
                font-size: 20px;
                font-weight: 400;
                // color: #959595;
                border: 0;
                box-sizing: border-box;
                // &:placeholder-shown{
                //     font-size: 18px;
                // }
            }
        }
        .rec-fund{
            margin-top: 16px;
            padding-bottom: 4px;
            .rec-list{
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                .active{
                    background: #ff0000;
                    color: #ff0000;
                    opacity: 1;
                    border: 1px solid #ff0000;
                }
                .rec-item{
                    width: 32%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 106px;
                    height: 60px;
                    margin-bottom: 12px;
                    background: rgba(226,226,226,0.3000);
                    border-radius: 8px 8px 8px 8px;
                    opacity: 0.6;
                    box-sizing: border-box;
                    .mark{
                        font-size: 12px;
                        padding-right: 3px;
                    }
                    .num{
                        font-size: 24px;
                    }
                }
            }
        }
    }
    .radio-wrap{
        display: flex;
        align-items: center;
        padding: 0 16px;
        margin-top: 14px;
        .agree{
            font-size: 12px;
            font-weight: 400;
            color: #5D5D5D;
            padding-left: 6px;
        }
        .treaty{
            font-size: 12px;
            font-weight: 400;
            color: #FF5D62;
        }
    }
    .submit{
        margin: 24px 16px 0;
        button{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            opacity: 1;
            border: 0;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
        }
        button[disabled]{
            opacity: 0.6;
        }
    }
}
</style>