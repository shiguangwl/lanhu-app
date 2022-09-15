<template>
  <div class="pay-rec">
      <Header title="支付确认"></Header>
      <div class="content">
          <div class="num-wrap">
              <div class="number">
                  <span class="sign">￥</span>
                  <span class="amount">{{recdata.totalFee}}</span>
              </div>
              <div class="text">预计到账金额{{recdata.payAmount}}元，管理费{{recdata.manageFee}}元</div>
              <div class="bage1"></div>
              <div class="bage2"></div>
          </div>
          <div class="info-wrap">
              <ul>
                  <li>
                      <span class="lable">所属企业</span>
                      <span class="company">{{recdata.company}}</span>
                  </li>
                  <li>
                      <span class="lable">持卡人</span>
                      <span class="name">{{recdata.userName}}</span>
                  </li>
                  <li>
                      <span class="lable">饭卡余额</span>
                      <span class="price">¥{{recdata.balance}}</span>
                  </li>
              </ul>
          </div>
      </div>
      <div class="tip">温馨提示：充值金额以实际到账为准！</div>
      <div class="footer-payment">
          <button @click="handlePay(recdata.totalFee)">支付</button>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            recdata:{},
        }
    },
    created(){
        //从充值页面传来的充值试算请求结果
        // console.log(JSON.parse(this.$route.query.recdata))
        this.recdata=JSON.parse(this.$route.query.recdata)
    },
    methods:{
        //点击支付按钮
        async handlePay(totalFee){
            // const data={
            //     body:'大唐智讯',
            //     out_trade_no: new Date().getTime().toString(),
            //     total_fee:totalFee
            // }
            //第一步：发送创建订单请求接口
            let orderdata={
                method:'app.apprecharge.rechargeH5',
                user_id:sessionStorage.getItem('user_id'),
                payChannel:'1',
                payAmount:totalFee
            }
            let Placeorder=await this.placeOrder(orderdata)
            let Payparame=Placeorder.data
            //第二步：调起通用支付接口
            let wxpay=await this.wxPays(Payparame)
        },
        //第一步
        placeOrder(orderdata){
            return new Promise((resolve,reject)=>{
                let sendData = {...orderdata, ...this.myFun.getDefaultParameters()}
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/',encrypSendData)
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
            })
        },
        //第二步
        wxPays(Payparame){
            let Paymentinfor={
                method:'meal.orderPay.pay',
                bs_id:Payparame.id,
                bs_type:2,
                pay_num: 'wxpay',
                type: 'WEB',
                company_id:sessionStorage.getItem('company_id'),
                open_id: null,
            }
            let sendData = {...Paymentinfor, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                console.log(res,'通用支付接口')
                this.onBridgeReady(res.data)
            })
        },
        //微信api
        onBridgeReady(data){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',data,(res)=>{
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        this.$toast('充值成功')
                        this.$router.push('/index')
                    } 
            }); 
        }

    }
}
</script>

<style lang="less" scoped>
.pay-rec{
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .content{
        width: 343px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        margin: 16px;
        .num-wrap{
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 35px;
            border-bottom: 1px dashed #EEEEEE;
            .number{
                margin-top: 32px;
                .sign{}
                .amount{
                    font-size: 42px;
                    font-weight: 400;
                    color: #242424;
                }
            }
            .text{
                font-size: 13px;
                font-weight: 400;
                color: #5D5D5D;
                padding-top: 8px;
            }
            .bage1{
                position: absolute;
                left: 0;
                bottom: -6px;
                width: 6px;
                height: 12px;
                background: #EEEEEE;
                border-top-right-radius: 50%;
                border-bottom-right-radius: 50%;
            }
            .bage2{
                position: absolute;
                right: 0;
                bottom: -6px;
                width: 6px;
                height: 12px;
                background: #EEEEEE;
                border-top-left-radius: 50%;
                border-bottom-left-radius: 50%;
            }
        }
        .info-wrap{
            padding: 0 15px 4px;
            margin-top: 21px;
            ul{
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 13px;
                    font-weight: 400;
                    color: #242424;
                    margin-bottom: 14px;
                    .lable{
                        font-size: 13px;
                        font-weight: 400;
                        color: #5D5D5D;
                    }
                    .company{}
                    .name{}
                    .price{}
                }
            }
        }
    }
    .tip{
        font-size: 13px;
        font-weight: 400;
        color: #959595;
        margin: 16px;
    }
    .footer-payment{
        margin: 40px 16px 0;
        button{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
            border: 0;
        }
    }
}
</style>