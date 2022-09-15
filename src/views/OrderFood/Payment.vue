<template>
  <div class="payment">
      <Header title="扣款确认"></Header>
      <div class="content">
          <div class="num-wrap">
              <div class="number">
                  <span class="sign">￥</span>
                  <span class="amount">{{parseFloat(this.totalPrice - this.discountPrice).toFixed(2)}}</span>
              </div>
              <div class="money">￥{{parseFloat(this.totalPrice).toFixed(2)}}</div>
              <div class="text">支付 - {{canteenName}}</div>
              <div class="bage1"></div>
              <div class="bage2"></div>
          </div>
          <div class="info-wrap">
              <ul>
                  <li>
                      <span class="lable">所属企业</span>
                      <span class="company">{{companyName}}</span>
                  </li>
                  <li>
                      <span class="lable">持卡人</span>
                      <span class="name">{{username}}</span>
                  </li>
                  <li>
                      <span class="lable">工号</span>
                      <span class="price">{{jobNumber}}</span>
                  </li>
                  <li>
                      <span class="lable">账户余额</span>
                      <span class="price">¥{{balance}}</span>
                  </li>
              </ul>
          </div>
      </div>
      <div class="mode-wrap">
          <ul class="mode-list">
              <li v-for="(item,index) in optionTab" :key="index" class="mode-item" @click="handleMode(index)">
                  <div class="leble">
                      <img :src="item.icon" alt="" class="icon">
                      <span class="text">{{item.lable}}</span>
                  </div>
                  <img src="../../assets/orderfood/dui.png" alt="" v-if="selectActive == index" class="dui">
              </li>
          </ul>
      </div>
      <div class="footer-payment">
          <button @click="btnPay()">确认扣款</button>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import {mapState} from 'vuex'
export default {
    components:{Header},
    data(){
        return{
            optionTab:[
                {
                    icon:require('../../assets/orderfood/fanka.png'),
                    lable:'饭卡支付',
                },
                {
                    icon:require('../../assets/orderfood/weixin.png'),
                    lable:'微信支付',
                }
            ],
            selectActive:0,
            // 企业名称
            companyName:sessionStorage.getItem('company_name'),
            //持卡人
            username:sessionStorage.getItem('user_name'),
            //工号
            jobNumber:sessionStorage.getItem('job_number'),
            //总价格
            totalPrice:0,
            //优惠价格
            discountPrice:0,
            //食堂名称
            canteenName:'',
            //食堂id
            canteenId:'',
            //外卖配送支付参数
            paydata:{
                method:'app.appPlaceOrder.appPlaceOrder',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                canteen_id:'',
                cardtype_id:sessionStorage.getItem('cardType_id'),
                card_id:sessionStorage.getItem('card_id'),
                pay_num:'card',
                bs_type:'0',
                meal_way:'',
                orderingAddressdetail:'',
                orderingPhonedetail:'',
                orderingRemarkdetail:'',
                placeOrder:null
            },
            //自提支付参数
            liftdata:{
                method:'app.appPlaceOrder.appPlaceOrder',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                canteen_id:'',
                cardtype_id:sessionStorage.getItem('cardType_id'),
                card_id:sessionStorage.getItem('card_id'),
                pay_num:'card',
                bs_type:'0',
                meal_way:'',
                orderingPhonedetail:'',
                orderingRemarkdetail:'',
                placeOrder:null
            },
            //餐柜支付参数
            buffetdata:{
                method:'app.appPlaceOrder.appPlaceOrder',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                canteen_id:'',
                cardtype_id:sessionStorage.getItem('cardType_id'),
                card_id:sessionStorage.getItem('card_id'),
                pay_num:'card',
                bs_type:'0',
                meal_way:'',
                orderingPhonedetail:'',
                orderingRemarkdetail:'',
                placeOrder:null,
                sideboard_id:'',
                host_id:'',
                place:'',
                host_name:'',
                name:'',
            },
            //堂食支付参数
            halldata:{
                method:'app.appPlaceOrder.appPlaceOrder',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                canteen_id:'',
                cardtype_id:sessionStorage.getItem('cardType_id'),
                card_id:sessionStorage.getItem('card_id'),
                pay_num:'card',
                bs_type:'0',
                meal_way:'',
                orderingPhonedetail:'',
                orderingRemarkdetail:'',
                placeOrder:null
            },
            chooseAddr:{},//地址对象
            balance:0,//饭卡余额,
            timer: null
        }
    },
    created(){
        this.paydata.canteen_id=this.canteenId
        this.liftdata.canteen_id=this.canteenId
        this.buffetdata.canteen_id=this.canteenId
        this.halldata.canteen_id=this.canteenId
        //餐柜参数
        if(this.paymentParams.idention =="3"){
            let buffet=this.buffet
            this.buffetdata.sideboard_id=buffet.sideboard_id
            this.buffetdata.host_id=buffet.host_id
            this.buffetdata.place=buffet.place
            this.buffetdata.host_name=buffet.host_name
            this.buffetdata.name=buffet.name
        }
        //饭卡余额
        this.getBalance()
    },
    methods:{
        //饭卡余额
        getBalance(){
            let data={
                method:'card.meal.getMoneyByUserId',
                user_id:sessionStorage.getItem('user_id'),
            }
            let sendData = { ...data, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res=>{
                this.balance=res.msg
            })
        },
        //选择支付方式
        handleMode(index){
            this.selectActive=index
            if(index == 0){
                this.paydata.pay_num='card'
                this.liftdata.pay_num='card'
                this.buffetdata.pay_num='card'
                this.halldata.pay_num='card'
            }
            if(index == 1){
                this.paydata.pay_num='wxpay'
                this.liftdata.pay_num='wxpay'
                this.buffetdata.pay_num='wxpay'
                this.halldata.pay_num='wxpay'
            }
        },
        //支付
        btnPay(){
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                if(this.paymentParams.idention == "1"){
                    this.paydata.meal_way='give'
                    this.payCard1()
                }else if(this.paymentParams.idention == "2"){
                    this.liftdata.meal_way='one'
                    this.payCard2()
                }else if(this.paymentParams.idention == "3"){
                    this.buffetdata.meal_way='one'
                    this.payCard3()
                }else{
                    this.halldata.meal_way='meal'
                    this.payCard4()
                }
            }, 1000);
        },
        //配送饭卡支付
        payCard1(){
            let sendData = { ...this.paydata, ...this.myFun.getDefaultParameters()}
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res=>{
                console.log(res)
                if(res.status == 0){
                    let totalPrice=parseFloat(this.totalPrice - this.discountPrice).toFixed(2)
                    this.$store.dispatch('setResultPrice',totalPrice)
                    this.$router.push('/payResult')
                }else if(res.status == 1){
                    if(res.msg == '余额不足，请充值'){
                        this.$dialog.confirm({
                            title: '饭卡余额不足',
                            message:'请充值后进行支付'
                        })
                        .then(res=>{
                            this.$router.push('/recharge')
                        })
                        .catch(err=>{

                        })
                    }else{
                        this.$toast(res.msg)
                    }
                }
            })
        },
        //食堂自提饭卡支付
        payCard2(){
            let sendData = { ...this.liftdata, ...this.myFun.getDefaultParameters()}
            console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res=>{
                console.log(res)
                if(res.status == 0){
                    let totalPrice=parseFloat(this.totalPrice - this.discountPrice).toFixed(2)
                    this.$store.dispatch('setResultPrice',totalPrice)
                    this.$router.push('/payResult')
                }else if(res.status == 1){
                    this.$toast(res.msg)
                }
            })
        },
        //餐柜自提饭卡支付
        payCard3(){
            let sendData = { ...this.buffetdata, ...this.myFun.getDefaultParameters()}
            console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res=>{
                console.log(res)
                if(res.status == 0){
                    let totalPrice=parseFloat(this.totalPrice - this.discountPrice).toFixed(2)
                    this.$store.dispatch('setResultPrice',totalPrice)
                    this.$router.push('/payResult')
                }else if(res.status == 1){
                    this.$toast(res.msg)
                }
            })
        },
        //堂食饭卡支付
        payCard4(){
            let sendData = { ...this.halldata, ...this.myFun.getDefaultParameters()}
            console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res=>{
                console.log(res)
                if(res.status == 0){
                    let totalPrice=parseFloat(this.totalPrice - this.discountPrice).toFixed(2)
                    this.$store.dispatch('setResultPrice',totalPrice)
                    this.$router.push('/payResult')
                }else if(res.status == 1){
                    this.$toast(res.msg)
                }
            })
        },
    },
    computed:{
        ...mapState(['remark','placeOrder','paymentParams','buffet']),
    },
    watch:{
        "$store.state.placeOrder":{
            handler(newVal){
                if(newVal){
                    this.paydata.placeOrder=newVal
                    this.liftdata.placeOrder=newVal
                    this.buffetdata.placeOrder=newVal
                    this.halldata.placeOrder=newVal
                }
            },
            deep: true,
            immediate: true,
        },
        "$store.state.chooseAddr":{
            handler(newVal){
                if(newVal){
                    this.paydata.orderingAddressdetail=newVal.firstlevel +newVal.senodlevel +newVal.threelevel +newVal.details
                    this.paydata.orderingPhonedetail=newVal.phone
                    this.liftdata.orderingPhonedetail=newVal.phone
                    this.buffetdata.orderingPhonedetail=newVal.phone
                    this.halldata.orderingPhonedetail=newVal.phone
                }
            },
            deep: true,
            immediate: true,
        },
        "$store.state.remark":{
            handler(newVal){
                if(newVal){
                    this.paydata.orderingRemarkdetail=newVal
                    this.liftdata.orderingRemarkdetail='(食堂自提)'+newVal
                    this.buffetdata.orderingRemarkdetail=newVal
                    this.halldata.orderingRemarkdetail=newVal
                }
            },
            deep: true,
            immediate: true,
        },
        "$store.state.paymentParams":{
            handler(newVal){
                if(newVal){
                    this.totalPrice=newVal.totalPrice
                    this.discountPrice=newVal.discountPrice
                    this.canteenName=newVal.canteenName
                    this.canteenId=newVal.canteenId
                }
            },
            deep: true,
            immediate: true,
        },
    }
}
</script>

<style lang="less" scoped>
.payment{
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .content{
        width: 343px;
        height: 287px;
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
                    color: #242424;
                    font-family: DIN-Regular, DIN;
                }
            }
            .money{
                font-size: 12px;
                font-family: DIN-Regular, DIN;
                color: #5D5D5D;
                padding-top: 8px;
                text-decoration:line-through;
            }
            .text{
                font-size: 12px;
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
            padding: 0 15px;
            margin-top: 21px;
            ul{
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12px;
                    font-weight: 400;
                    color: #242424;
                    margin-bottom: 12px;
                    .lable{
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                    }
                }
            }
        }
    }
    .mode-wrap{
        width: 343px;
        height: 104px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        box-sizing: border-box;
        margin: 0 16px;
        .mode-list{
            padding: 0 15px;
            .mode-item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 52px;
                border-bottom: 1px dashed #eee;
                .leble{
                    display: flex;
                    align-items: center;
                    .icon{
                        width: 20px;
                        height: 20px;
                    }
                    .text{
                        font-size: 16px;
                        color: #242424;
                        padding-left: 8px;
                    }
                }
                .dui{
                    width: 14px;
                    height: 14px;
                }
            }
        }
    }
    .footer-payment{
        margin: 24px 16px 0;
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