<template>
  <div class="order-food">
    <div class="header">
      <div class="back" @click="$router.go(-3)">
          <img src="../../assets/orderfood/back.png" alt="">
      </div>
      <div class="title">支付结果</div>
    </div>
    <div class="banner">
      <img src="../../assets/orderfood/success.png" alt="" class="success">
      <div class="text">支付成功</div>
      <div class="price">
        <span class="mark">¥</span>
        <span class="number">{{totalPrice}}</span>
      </div>
    </div>
    <div class="footer">
      <button class="look" @click="$router.push('/order')">查看订单</button>
      <button class="finish" @click="$router.push('/index')">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      totalPrice:0,
    }
  },
  created(){},
  watch:{
    "$store.state.resultPrice":{
        handler(newVal){
            if(newVal){
                this.totalPrice=newVal
            }
        },
        deep: true,
        immediate: true,
    },
  }
};
</script>

<style lang="less" scoped>
.order-food{
    .header{
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
      .cloce{
          position: absolute;
          left: 52px;
          img{
            width: 16px;
            height: 16px;
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
    .banner{
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 112px 0 100px 0;
      .success{
        width: 101px;
        height: 101px;
      }
      .text{
        font-size: 12px;
        color: #242424;
        padding: 15px 0 10px;
      }
      .price{
        .number{
          font-family: DIN-Regular, DIN;
          font-size: 42px;
          color: #242424;
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 16px;
      .look{
        width: 162px;
        height: 40px;
        background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
        border-radius: 6px 6px 6px 6px;
        color: #fff;
        border: 0;
      }
      .finish{
        width: 162px;
        height: 40px;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #FF5D62;
        color: #FF5D62;
        background: #fff;
      }
    }
}
</style>