<template>
  <transition name="move">
  <div class="food" v-show="isShow">
      <!-- 头部 -->
      <div class="header">
          <img src="../../../assets/orderfood/close.png" alt="" @click="isShowFood()">
          <div class="title">菜品详情</div>
      </div>
      <!-- 主体 -->
      <div class="banner-wrap">
          <div class="food-particulars">
              <div class="photo">
                  <img :src="'data:image/png;base64,'+food.imgcode" alt="">
              </div>
              <div class="food-dec">
                  <ul>
                      <li>
                          <img src="../../../assets/orderfood/item1.png" alt="" class="item1">
                          <span class="lable">蛋白质：</span>
                          <span class="gram">{{Math.floor(food.protein)}}克</span>
                      </li>
                       <li>
                          <img src="../../../assets/orderfood/item2.png" alt="" class="item2">
                          <span class="lable">碳水：</span>
                          <span class="gram">{{Math.floor(food.drates)}}克</span>
                      </li>
                       <li>
                          <img src="../../../assets/orderfood/item3.png" alt="" class="item3">
                          <span class="lable">卡路里：</span>
                          <span class="gram">{{Math.floor(food.calorie)}}卡</span>
                      </li>
                       <li>
                          <img src="../../../assets/orderfood/item4.png" alt="" class="item4">
                          <span class="lable">脂肪：</span>
                          <span class="gram">{{Math.floor(food.axunge)}}克</span>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="food-info">
              <div class="info-top">
                  <img src="../../../assets/orderfood/yi.png" alt="">
                  <span class="name">{{food.food_name}}</span>
                  <!-- <span class="lable">仅剩5份</span> -->
              </div>
              <div class="info-bottom">
                  <div class="price">
                      <span class="mark">¥</span>
                      <span class="price">{{food.inner_price}}</span>
                      <span class="quota">限购{{food.limit_qty}}份</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                      <CartControll :foods="food"></CartControll>
                  </div>
              </div>
          </div>
          <div class="food-synopsis">
              <div class="title">菜品简介</div>
              <div class="content">{{food.intro}}</div>
              <div class="Taboo">
                  <div class="crowd">不宜人群：</div>
                  <img src="../../../assets/orderfood/lable.png" alt="">
                  <span class="illness">高血压</span>
                  <img src="../../../assets/orderfood/lable.png" alt="">
                  <span class="illness">高血压</span>
              </div>
          </div>
      </div>

  </div>
  </transition>
</template>

<script>
import CartControll from '../components/CartControll'
export default {
    props:{
        food:Object,
    },
    components:{CartControll},
    data(){
        return{
            isShow:false
        }
    },
    mounted(){},
    methods:{
        init(){
            this.isShow=true
            this.noScroll()
        },
        isShowFood(){
            this.isShow=false
            this.canScroll()
        }
    }
}
</script>

<style lang="less" scoped>
.food{
    width: 100%;
    // min-height: 100%;
    overflow: scroll;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    &.move-enter-active,
    &.move-leave-active {
    transition: all 0.25s ease-in;
    transform: translate(0, -500px);
    }

    &.move-enter,
    &.move-leave-to {
    transform: translate(0, 500px);
    }
    //头部
    .header{
        display: flex;
        align-items: center;
        padding: 0 16px;
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        background: #FF5D62;
        img{
            width: 16px;
            height: 16px;
        }
        .title{
            font-size: 18px;
            font-weight: 500;
            color: #FFFFFF;
            padding-left: 123px;
        }
    }
    .banner-wrap{
        .food-particulars{
            position: relative;
            .photo{
                width: 100%;
                height: 220px;
                overflow: hidden;
                img{
                    width: 100%;
                    display: block;
                }
            }
            .food-dec{
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 189px;
                left: 16px;
                right: 16px;
                width: 343px;
                height: 62px;
                background: #FFFFFF;
                box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
                border-radius: 6px 6px 6px 6px;
                padding: 0 30px;
                box-sizing: border-box;
                ul{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    li{
                        width: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 0;
                        .item1{
                            width: 14px;
                            padding-right: 4px;
                        }
                        .item2{
                            width: 10px;
                            padding-right: 4px;
                        }
                        .item3{
                            width: 10px;
                            padding-right: 4px;
                        }
                        .item4{
                            width: 9px;
                            padding-right: 4px;
                        }
                        .lable{
                            font-size: 12px;
                            font-weight: 400;
                            color: #959595;
                        }
                        .gram{
                            font-size: 12px;
                            font-weight: 400;
                            color: #242424;
                        }
                    }
                }
            }
        }
        .food-info{
            width: 100%;
            height: 124px;
            box-sizing: border-box;
            background: #FFFFFF;
            padding: 46px 16px 12px 16px;
            .info-top{
                display: flex;
                align-items: center;
                img{
                    width: 13px;
                    height: 15px;
                }
                .name{
                    font-size: 16px;
                    font-weight: bold;
                    color: #242424;
                    padding: 0 10px;
                }
                .lable{
                    width: 46px;
                    height: 16px;
                    border-radius: 4px 4px 4px 4px;
                    border: 1px solid #959595;
                    font-size: 9px;
                    font-weight: 400;
                    text-align: center;
                    line-height: 16px;
                    color: #959595;
                }
            }
            .info-bottom{
                display: flex;
                margin-top: 20px;
                .price{
                    .mark{
                        font-size: 13px;
                        font-weight: 400;
                        color: #FF543B;
                    }
                    .price{
                        font-size: 20px;
                        font-weight: 400;
                        color: #FF543B;
                    }
                    .quota{
                        font-size: 11px;
                        font-weight: 400;
                        color: #FF9B37;
                        padding-left: 17px;
                    }
                }
                .cartcontrol-wrapper{
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                }

            }
        }
        .food-synopsis{
            width: 100%;
            height: 130px;
            box-sizing: border-box;
            background: #FFFFFF;
            margin: 12px 0;
            padding: 12px 16px 12px 0;
            .title{
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                padding-left: 17px;
                &::before{
                    content: '';
                    border-right: 2px solid #FF5D62;
                    margin-right: 5px;
                }
            }
            .content{
                font-size: 12px;
                font-weight: 400;
                color: #242424;
                line-height: 18px;
                margin-top: 9px;
                padding-left: 25px;
            }
            .Taboo{
                display: flex;
                align-items: center;
                font-size: 9px;
                font-weight: 400;
                color: #959595;
                margin-top: 9px;
                padding-left: 25px;
                .crowd{}
                img{
                    width: 11px;
                    height: 10px;
                    padding: 0 6px;
                }
                .illness{}

            }
        }
        .food-goods{
            background: #fff;
            padding: 14px 0;
            margin-bottom: 52px;
            .title{
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                padding-left: 17px;
                &::before{
                    content: '';
                    border-right: 2px solid #FF5D62;
                    margin-right: 5px;
                }
            }
            .cart-list{
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
                                vertical-align: middle;
                                padding-left: 6px;
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
                                    font-weight: 400;
                                    color: #FF543B;
                                    padding: 0 2px 2px 0;
                                    vertical-align: middle;
                                }
                                .num{
                                    font-size: 16px;
                                    font-weight: 400;
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