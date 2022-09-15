<template>
  <div class="shopcart">
      <!-- 底部购物车组件 -->
      <div class="bottomNav-cartfooter">
        <!-- 灰色购物车图标 -->
        <div class="footer-wrap" v-if="isEmpty">
          <img src="../../../assets/orderfood/cart-hui.png" alt="" class="cart-hui">
        </div>
        <!-- 可点击购物车图标 -->
        <div class="footer-wrap" v-if="!isEmpty" @click="showCartView()">
          <span class="bage">{{totalCount}}</span>
          <img src="../../../assets/orderfood/cart.png" alt="" class="cart-bright">
        </div>
        <!-- 加入购物车的总价格 -->
        <div class="number" v-if="!isEmpty">
          <span class="mark">¥</span>
          <span class="price">{{totalPrice.toFixed(2)}}</span>
        </div>
        <!-- 不可结算按钮 -->
        <div class="settle" v-if="isEmpty">
          去结算
        </div>
        <!-- 可结算按钮 -->
        <div class="sure" v-if="!isEmpty" @click="handlePay()">
          去结算
        </div>
      </div>

      <!-- 底部打开购物车组件 -->
      <transition name="fade">
      <div class="cartview-body" v-show="isCartview && totalNum" @click.self="isCartBody()">
        <div class="cartview-cartmask">
            <div class="header">
                <div class="date">{{datetime}}</div>
                <div class="delete" @click="clearFoods()">
                    <img src="../../../assets/orderfood/clear.png" alt="" class="fa">
                    <span class="text">清空</span>
                </div>
            </div>
            <ul class="cart-list">
                <li class="cart-item" v-for="(food, index) in selectFoods" :key="index">
                  <div class="image">
                    <img :src="'data:image/png;base64,'+food.imgcode" alt="">
                  </div>
                  <div class="content">
                      <div class="name">{{food.food_name}}</div>
                      <div class="desc">
                          <img src="../../../assets/orderfood/yi.png" alt="" class="icon">
                          <!-- <img src="../../../assets/orderfood/ji.png" alt="" class="icon"> -->
                          <div class="batching">
                              <span class="protein">蛋白质：{{Math.floor(food.protein)}}克 |</span>
                              <span class="calorie">卡路里：{{Math.floor(food.calorie)}}卡</span>
                          </div>
                      </div>
                      <div class="Taboo">
                          <div class="crowd">不宜人群：</div>
                            <img src="../../../assets/orderfood/lable.png" alt="">
                            <span class="illness">高血压</span>
                            <img src="../../../assets/orderfood/lable.png" alt="">
                            <span class="illness">高血压</span>
                      </div>

                      <div class="food-tariff">
                          <div class="price">
                              <span class="mark">¥</span>
                              <span class="num">{{food.inner_price}}</span>
                          </div>
                          <div class="quota">限购{{food.limit_qty}}份</div>
                          <div class="cartcontrol-wrapper">
                              <CartControll :foods="food"></CartControll>
                          </div>
                      </div>
                  </div>
                </li>
            </ul>
        </div>
      </div>
      </transition>
      
  </div>
</template>

<script>
import CartControll from './CartControll'
export default {
  components:{CartControll},
  props:['shopInfo','datetime','notchObj','mealType','canteenId','canteenName','giveEat','giveCost','oneEat','oneCost'],
  data(){
    return{
      isCartview:false,//底部购物车组件显示和隐藏
      totalCount:0,//选中的个数
      totalPrice:0,//选中所有商品的总价格,
      selectFoods:[],//选中的商品数组
      screenFoods:[],//转化格式

    }
  },
  methods:{
    //点击购物车显示购物车组件
    showCartView(){
      this.isCartview=!this.isCartview
      this.noScroll()
    },
    //点击阴影隐藏购物车组件
    isCartBody(){
        this.isCartview=false
        this.canScroll()
    },
    //点击清空
    clearFoods(){
      this.shopInfo.forEach(menu=>{
          menu.children.forEach(item=>{
              item.count=0
          })
      })
      this.isCartview=false
      this.canScroll()
    },
    //可以去结算
    handlePay(){
      //购物车数组
      let placeOrder=[
          {
          orderDay: this.datetime,//时间日期
          dKouArray: [
              {
              dKouId: this.notchObj.id,//档口id
              dKouName: this.notchObj.name,//档口名字
              dKouNum: this.notchObj.number,//档口请求接口返回的“number”字段  如：0001
              mealArray: [
                  {
                  mealId: this.mealType.id,//餐别id
                  mealName: this.mealType.name,//餐别名字
                  amount: this.totalPrice,//当前档口下列表计算的总价格
                  foodArray: this.screenFoods//购物车选择的所有菜品数组
                  }
              ]
              }
          ]
          }
      ]
      // console.log(placeOrder)
      //购物车数组
      this.$store.dispatch('setPlaceOrder',placeOrder)
      this.$store.dispatch('setCartList',this.selectFoods)
      if(this.giveEat == 1 && this.oneEat == 1){
        let newPrice=parseFloat(this.totalPrice)+parseFloat(this.giveCost)
        let cartdata={
          canteenId:this.canteenId,
          totalPrice:this.totalPrice,
          canteenName:this.canteenName,
          newPrice: newPrice
        }
        this.$store.dispatch('setCartParams',cartdata)
        this.$store.dispatch('setGiveCost',this.giveCost)
        this.$store.dispatch('setOneCost',this.oneCost)
        this.$router.push('/confirmOrder')
      }else if(this.giveEat == 1 && this.oneEat == 0){
        let newPrice=parseFloat(this.totalPrice)+parseFloat(this.giveCost)
        let cartdata={
          canteenId:this.canteenId,
          totalPrice:this.totalPrice,
          canteenName:this.canteenName,
          newPrice: newPrice
        }
        this.$store.dispatch('setCartParams',cartdata)
        this.$store.dispatch('setGiveCost',this.giveCost)
        this.$store.dispatch('setOneCost',0)
        this.$router.push('/confirmOrder')
      }else if(this.giveEat == 0 && this.oneEat == 1){
        let newPrice=parseFloat(this.totalPrice)
        let cartdata={
          canteenId:this.canteenId,
          totalPrice:this.totalPrice,
          canteenName:this.canteenName,
          newPrice: newPrice
        }
        this.$store.dispatch('setCartParams',cartdata)
        this.$store.dispatch('setGiveCost',0)
        this.$store.dispatch('setOneCost',this.oneCost)
        this.$router.push('/confirmOrder')
      }else{
        let newPrice=parseFloat(this.totalPrice)
        let cartdata={
          canteenId:this.canteenId,
          totalPrice:this.totalPrice,
          canteenName:this.canteenName,
          newPrice: newPrice
        }
        this.$store.dispatch('setCartParams',cartdata)
        this.$store.dispatch('setGiveCost',0)
        this.$store.dispatch('setOneCost',0)
        this.$router.push('/confirmOrder')
      }
    },
  },
  computed:{
    isEmpty(){
      let empty=true
      this.totalCount=0
      this.totalPrice=0;
      this.selectFoods=[]
      this.screenFoods=[]
      this.shopInfo.forEach(menu=>{
        menu.children.forEach(food=>{
          if(food.count){
            empty=false
            this.totalCount+=food.count
            this.totalPrice+=food.inner_price*food.count
            let obj={
              foodId:food.food_id,
              foodName:food.food_name,
              foodPrice:food.inner_price,
              foodImg:food.imgcode,
              foodNum:food.count,
              limitQty:food.limit_qty,
              qty:food.qty,
            }
            this.screenFoods.push(obj)
            this.selectFoods.push(food)
          }
        })
      })
      return empty;
    },
    totalNum(){
      if(this.totalCount <=0){
        return false
      }else{
        return true
      }
    }
  },

}
</script>

<style lang="less" scoped>
.shopcart{
  .bottomNav-cartfooter{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: #fff;
    z-index: 1000;
    padding: 6px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .footer-wrap{
      position: relative;
      .cart-hui{
        width: 40px;
        height: 40px;
      }
      .cart-bright{
        width: 42px;
        height: 43px;
      }
      .bage{
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        background: #ff0000;
        border-radius: 50%;
        font-size: 11px;
        text-align: center;
        line-height: 16px;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
    .number{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      padding-right: 8px;
      .mark{
        font-size: 13px;
        font-weight: 400;
        color: #242424;
        padding-right: 2px;
      }
      .price{
        font-size: 20px;
        color: #242424;
      }
    }
    .settle{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96px;
      height: 40px;
      background: linear-gradient(180deg, #AEAEAE 0%, #E2E2E2 100%);
      border-radius: 20px 20px 20px 20px;
      font-size: 14px;
      color: #FFFFFF;
    }
    .sure{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96px;
      height: 40px;
      background: linear-gradient(180deg, #FF5D62 0%, #FF7558 100%);
      border-radius: 20px 20px 20px 20px;
      font-size: 14px;
      color: #FFFFFF;
    }
  }
  //展开购物车组件布局
  .cartview-body{
      position: fixed;
      top: 0;
      bottom: 52px;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      &.fade-enter-active,
      &.fade-leave-active {
      transition: opacity 0.25s ease-out;
      }

      &.fade-enter,
      &.fade-leave-to {
      opacity: 0;
      }
      .cartview-cartmask{
          position: fixed;
          bottom: 48px;
          left: 0;
          right: 0;
          .header{
              background: #eceff1;
              display: flex;
              justify-content: space-between;
              padding: 0 16px;
              width: 100%;
              height: 35px;
              line-height: 35px;
              box-sizing: border-box;
              background: #f7f6f9;
              border-radius: 15px 15px 0px 0px;
              .date{
                  font-size: 11px;
                  font-weight: 400;
                  color: #242424;
              }
              .delete{
                display: flex;
                align-items: center;
                  .fa{
                    width: 10px;
                    height: 10px;
                    padding-right: 3px;
                  }
                  .text{
                    font-size: 11px;
                    font-weight: 400;
                    color: #959595;
                  }
              }
          }
          .cart-list{
              background: #fff;
              padding: 0 10px;
              box-sizing: border-box;
              .cart-item{
                  display: flex;
                  align-items: flex-start;
                  width: 100%;
                  box-sizing: border-box;
                  height: 110px;
                  padding: 10px;
                  .image{
                      img{
                          width: 80px;
                          height: 80px;
                          border-radius: 8px 8px 8px 8px;
                      }
                  }
                  .content{
                      flex: 1;
                      padding-left: 10px;
                      .name{
                          font-size: 14px;
                          font-weight: bold;
                          color: #242424;
                      }
                      .desc{
                          display: flex;
                          align-items: center;
                          margin-top: 6px;
                          .icon{
                              padding-right: 6px;
                              width: 13px;
                              height: 15px;
                          }
                          .batching{
                              padding: 0 3px;
                              height: 15px;
                              line-height: 15px;
                              border-radius: 2px 2px 2px 2px;
                              border: 1px solid #FF5D62;
                              font-size: 9px;
                              font-weight: 400;
                              color: #FF5D62;
                              box-sizing: border-box;
                              .protein{
                                  
                              }
                              .calorie{}
                          }
                      }
                      .Taboo{
                          display: flex;
                          align-items: center;
                          padding: 8px 0 10px 0;
                          .crowd{
                              font-size: 9px;
                              font-weight: 400;
                              color: #959595;
                          }
                          img{
                              vertical-align: middle;
                              padding-left: 6px;
                              width: 11px;
                              height: 10px;
                          }
                          .illness{
                              vertical-align: middle;
                              font-size: 9px;
                              font-weight: 400;
                              color: #959595;
                              padding-left: 2px;
                          }
                          
                      }
                      .food-tariff{
                          display: flex;
                          align-items: center;
                          .price{
                              display: flex;
                              align-items: flex-end;
                              .mark{
                                  font-size: 9px;
                                  color: #FF543B;
                                  padding: 0 2px 2px 0;
                                  vertical-align: middle;
                              }
                              .num{
                                  font-size: 16px;
                                  font-family: DIN-Regular, DIN;
                                  color: #FF543B;
                              }
                          }
                          .quota{
                              font-size: 9px;
                              font-weight: 400;
                              color: #FF9B37;
                              padding-left: 7px;
                              flex: 1;
                          }
                          .cartcontrol-wrapper{
                              img{
                              }
                          }
                      }
                  }
              }
          }
      }
  }

}
</style>