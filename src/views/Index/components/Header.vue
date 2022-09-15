<template>
  <div class="header">
     <img src="../../../assets/index/background.png" alt="" class="setting">
     <div class="nav">
         <!-- <img src="../../../assets/index/close.png" alt="" class="close"> -->
         <span class="title">智慧食堂</span>
         <img src="../../../assets/index/scan.png" alt="" class="scan">
     </div>
     <div class="card-wrap">
         <div class="card-top">
             <div class="info">
                 <div class="name">{{carddata.user_name}}</div>
                 <div class="num">{{carddata.job_number}}</div>
             </div>
             <div class="recharge" @click.stop="handlerRecharge()">
                 饭卡充值
             </div>
         </div>
         <div class="card-bottom">
             <div class="account-wrap">
                 <div class="account">
                     <div class="balance">账户余额</div>
                     <img src="../../../assets/index/watch.png" alt="" v-show="isShow" @click="isShow=!isShow">
                     <img src="../../../assets/index/yin.png" alt="" v-show="!isShow" @click="isShow=!isShow">
                 </div>
                 <div class="price" v-show="isShow">¥ {{mealdata}}</div>
                 <div class="price" v-show="!isShow">******</div>
             </div>
             <img src="../../../assets/index/code.png" alt="" class="code" @click="$router.push('/mealcard')">
         </div>
     </div>
  </div>
</template>

<script>
export default {
    props:{
        mealdata:String,
        carddata:Object,
    },
    data(){
        return{
            isShow:true,//价格的显示和隐藏
        }
    },
    methods:{
        //跳转到充值中心
        handlerRecharge(){
            this.$router.push('/recharge')
        },
    }
}
</script>

<style lang="less" scoped>
.header{
    position: relative;
    width: 100%;
    height: 100%;
    .setting{
        width: 100%;
        height: 166px;
    }
    .nav{
        .title{
            position: absolute;
            top: 11px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            font-weight: 500;
            color: #FFFFFF;
        }
        .scan{
            position: absolute;
            top: 11px;
            right: 16px;
            width: 18px;
            height: 18px;
        }
    }
    .card-wrap{
            position: absolute;
            top: 52px;
            left: 16px;
            right: 16px;
            width: 343px;
            background: linear-gradient(135deg, #E19A4B 0%, #F3C89B 100%);
            border-radius: 8px 8px 8px 8px;
            padding: 16px 18px 10px 18px;
            box-sizing: border-box;
        .card-top{
            display: flex;
            justify-content: space-between;
            .info{
              display: flex;
                .name{
                    font-size: 14px;
                    font-weight: bold;
                    color: #FFF1DF;
                   &::after{
                        content: '';
                        border-right: 1px solid #FFF2E1;
                        padding-right: 9px;
                    }
                }
                .num{
                    font-size: 12px;
                    font-weight: 400;
                    color: #FFF1DF;
                    padding-left: 8px;
                }
            }
            .recharge{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 78px;
                height: 28px;
                font-size: 12px;
                background: #FFF1DF;
                font-weight: 400;
                color: #DC9341;
                border-radius: 14px 14px 14px 14px;
            }
        }
        .card-bottom{
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-top: 36px;
            .account-wrap{
                .account{
                    display: flex;
                    align-items: center;
                    .balance{
                        font-size: 12px;
                        font-weight: 400;
                        color: #FFF1DF;
                    }
                    img{
                        width: 12px;
                        padding-left: 5px;
                    }
                }
                .price{
                    font-size: 24px;
                    font-weight: bold;
                    color: #FFF1DF;
                    padding-top: 13px;
                }
            }
            .code{
                width: 42px;
                height: 42px;
            }
        }
    }
}
</style>