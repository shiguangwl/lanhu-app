<template>
  <div class="order-del">
      <Header title="订单详情"></Header>
      <div class="image">
          <!-- 订单倒计时时间 -->
          <!-- <div class="order-text">
              订单将在29分50秒后关闭，请及时付款！
          </div> -->
          <!-- <div class="order-text">
              订单已完成 >
          </div> -->
          <div class="order-text" @click="handleSteps()">
              {{orderdata.status}} >
          </div>
          <!-- 立即支付和取消订单 -->
          <!-- <div class="select-meal">
              <ul>
                  <li>
                      <img src="../../assets/orderfood/pay.png" alt="">
                      <span class="text1">立即支付</span>
                  </li>
                   <li>
                      <img src="../../assets/orderfood/remove.png" alt="">
                      <span class="text2">取消订单</span>
                  </li>
              </ul>
          </div> -->
          <!-- 商品信息展示区 -->
            <div class="shop-wrap">
                <!-- 商品信息 -->
                <div class="food-wrap">
                    <div class="header">
                        <span class="canteen">{{orderdata.name}}</span>
                        <span class="time">{{orderdata.add_time}} {{orderdata.pin_name}}</span>
                    </div>
                    <ul class="food-list">
                        <li class="food-item" v-for="(item,index) in detailsdata" :key="index">
                            <img src="../../assets/orderfood/shop.png" alt="" class="photo">
                            <div class="food-list-hook">
                                <div class="title">
                                    <img src="../../assets/orderfood/yi.png" alt="">
                                    <span class="name">{{item.name}}</span>
                                </div>
                                <div class="batching">
                                        <span class="protein">蛋白质：{{item.protein}}克 |</span>
                                        <span class="calorie">卡路里：{{item.calorie}}卡</span>
                                    </div>
                                    <div class="food-tariff">
                                        <div class="quantity">
                                            <span class="num">x{{item.qty}}</span>
                                            <span class="label">精品粤菜窗</span>
                                        </div>
                                        <div class="price">
                                            <span class="mark">¥</span>
                                            <span class="number">{{item.price}}</span>
                                        </div>
                                    </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 打包费 -->
                <div class="cost-msg">
                    <ul class="cost-list">
                        <li>
                            <div class="lable" v-if="orderdata.meal_way == '送餐'">配送费</div>
                            <div class="lable" v-if="orderdata.meal_way == '自提'">自提费</div>
                            <div class="lable" v-if="orderdata.meal_way == '堂食'">堂食</div>
                            <div class="price">
                                <span class="mark">￥</span>
                                <span class="num">{{orderdata.way_cost}}</span>
                            </div>
                        </li>
                        <!-- <li>
                            <div class="lable">配送费</div>
                            <div class="price">
                                <span class="mark">￥</span>
                                <span class="num">1.00</span>
                            </div>
                        </li> -->
                        <li>
                            <div class="lable">优惠</div>
                            <div class="price">
                                <span class="marks">￥</span>
                                <span class="nums">{{orderdata.coupon_cost}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="gather">
                        <span class="text">总数量：</span>
                        <span class="num">x{{totalCount}}</span>
                        <span class="subtotal" v-if="orderdata.amount">小计：￥{{orderdata.amount.toFixed(2)}}</span>
                    </div>
                </div>
                <!-- 外卖配送取餐方式 -->
                <!-- <div class="take-meal">
                    <ul>
                        <li>
                            <span class="text">取餐方式</span>
                            <span class="lable">外卖配送</span>
                        </li>
                        <li>
                            <span class="text">配送时间</span>
                            <span class="time">11:50送达</span>
                        </li>
                        <li>
                            <span class="text">配送地址</span>
                            <div class="address">
                                <div class="addr">创意大厦B2栋1801</div>
                                <div class="info">
                                    <span class="name">李星河</span>
                                    <span class="phone">13649756812</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span class="text">备注</span>
                            <span class="msg">多加辣椒,谢谢</span>
                        </li>
                    </ul>
                </div> -->
                <!-- 食堂自取取餐方式 -->
                <div class="take-meal">
                    <ul>
                        <li>
                            <span class="text">取餐方式</span>
                            <span class="lable">{{orderdata.meal_way}}</span>
                        </li>
                        <li>
                            <span class="text">取餐时间</span>
                            <span class="time">{{orderdata.add_time}}</span>
                        </li>
                        <li>
                            <span class="text">取餐地址</span>
                            <!-- 外卖配送的地址 -->
                            <div class="address">
                                <div class="take-addr">{{orderdata.name}}</div>
                            </div>
                        </li>
                        <li>
                            <span class="text">备注</span>
                            <span class="msg">{{orderdata.remark}}</span>
                        </li>
                    </ul>
                </div>
            </div>
          <!-- 底部订单编号 -->
            <div class="order-info">
                <ul>
                    <li>
                        <span class="text">订单编号</span>
                        <span class="value">{{orderdata.number}}</span>
                    </li>
                    <li>
                        <span class="text">下单时间</span>
                        <span class="value">{{orderdata.add_time}}</span>
                    </li>
                    <li>
                        <span class="text">支付方式</span>
                        <span class="value">{{orderdata.pay_name}}</span>
                    </li>
                </ul>
            </div>
            <div class="empty"></div>
      </div>


      <!-- 配送订单追踪弹窗 -->
      <div class="step-wrap" v-if="showSteps" @click.self="showSteps=false">
          <div class="step-dialog">
              <div class="title">订单追踪</div>
              <img src="../../assets/orderfood/close1.png" alt="" class="close" @click="showSteps=false">
              <van-steps direction="vertical" :active="0">
                  <van-step>
                      <div class="track">
                          <span class="text">订单待取餐</span>
                          <span class="time">05-16 11:30:03</span>
                      </div>
                  </van-step>
                  <van-step>
                      <div class="track">
                          <span class="text">订单待取餐</span>
                          <span class="time">05-16 11:30:03</span>
                      </div>
                  </van-step>
                  <van-step>
                      <div class="track">
                          <span class="text">订单待取餐</span>
                          <span class="time">05-16 11:30:03</span>
                      </div>
                  </van-step>
                  <van-step>
                      <div class="track">
                          <span class="text">订单待取餐</span>
                          <span class="time">05-16 11:30:03</span>
                      </div>
                  </van-step>
                  <van-step>
                      <div class="track">
                          <span class="text">订单待取餐</span>
                          <span class="time">05-16 11:30:03</span>
                      </div>
                  </van-step>
              </van-steps>
          </div>
      </div>

  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            showSteps:false,//订单追踪弹窗
            id:'',//订单id
            orderdata:{},
            detailsdata:[],
            totalCount:0,//总数量
        }
    },
    created(){
        this.id=this.$route.query.id
        this.getdata()
        this.getSave()
        this.getBoard()
    },
    methods:{
        // 订单详情请求
        getdata(){
            let data={
                method:'meal.order.get',
                company_id: sessionStorage.getItem('company_id'),
                order_id:this.id
            }
            let sendData = {...data, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                console.log(res)
                this.orderdata=res.data

                this.detailsdata=res.data.details.filter(item=>{
                    if(item.food_id !='11111'){
                        return item
                    }
                })
                //总数量
                this.totalCount=0
                this.detailsdata.forEach(item=>{
                    this.totalCount+=item.qty
                })
            })
        },
        //存餐状态
        getSave(){
            let data={
                method:'meal.order.isSaveMeal',
                company_id: sessionStorage.getItem('company_id'),
                order_id:this.id
            }
            let sendData = {...data, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                // console.log(res)
            })
        },
        //查询存餐位置
        getBoard(){
            let data={
                method:'base.sideboard.wxCupboardInThe',
                order_id:this.id
            }
            let sendData = {...data, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                // console.log(res)
            })
        },
        //点击配送追踪弹窗显示
        handleSteps(){
            // this.showSteps=true
        },
    }
}
</script>

<style lang="less" scoped>
.order-del{
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    overflow: auto;
    margin-bottom: 30px;
    .image{
        position: relative;
        width: 100%;
        height: 160px;
        background-image: url('../../assets/index/background.png');
        background-size: 100% 100%;
        .order-text{
            padding: 20px 16px 0;
            font-size: 12px;
            color: #FFFFFF;
        }
        .select-meal{
            margin: 9px 16px 0;
            display: flex;
            width: 343px;
            height: 56px;
            background: #FFFFFF;
            border-radius: 10px 10px 10px 10px;
            opacity: 0.9;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                li{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        width: 15px;
                        height: 15px;
                    }
                    .text1{
                        font-size: 11px;
                        color: #FF9B37;
                        padding-top: 5px;
                    }
                    .text2{
                        font-size: 11px;
                        color: #242424;
                        padding-top: 5px;
                    }
                }
            }
        }
        //商品展示
        .shop-wrap{
            margin: 12px 16px;
            width: 343px;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
            border-radius: 10px 10px 10px 10px;
            //食品列表
            .food-wrap{
                box-sizing: border-box;
                padding: 18px 12px 0;
                .header{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .canteen{
                        font-size: 12px;
                        font-weight: bold;
                        color: #242424;
                    }
                    .time{
                        font-size: 11px;
                        font-weight: 400;
                        color: #5D5D5D;
                    }
                }
                .food-list{
                    padding-top: 18px;
                    border-bottom: 1px dashed #eee;
                    .food-item{
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                        .photo{
                            width: 60px;
                            height: 60px;
                            border-radius: 8px 8px 8px 8px;
                        }
                        .food-list-hook{
                            padding-left: 10px;
                            flex: 1;
                            .title{
                                display: flex;
                                img{
                                    width: 13px;
                                    height: 15px;
                                }
                                .name{
                                    font-size: 12px;
                                    font-weight: 400;
                                    color: #242424;
                                    padding-left: 2px;
                                }
                            }
                            .batching{
                                display:table;
                                margin: 8px 0;
                                padding: 0 3px;
                                height: 15px;
                                line-height: 15px;
                                border-radius: 2px 2px 2px 2px;
                                border: 1px solid #FF5D62;
                                font-size: 9px;
                                font-weight: 400;
                                color: #FF5D62;
                                box-sizing: border-box;
                                .protein{}
                                .calorie{}
                            }
                            .food-tariff{
                                display: flex;
                                justify-content: space-between;
                                .quantity{
                                    display: flex;
                                    .num{
                                        font-size: 9px;
                                        font-weight: 400;
                                        color: #959595;
                                    }
                                    .label{
                                        font-size: 9px;
                                        font-weight: 400;
                                        color: #959595;
                                        padding-left: 17px;
                                    }
                                }
                                .price{
                                    display: flex;
                                    align-items: flex-end;
                                    .mark{
                                        font-size: 9px;
                                        font-weight: 400;
                                        color: #242424;
                                        vertical-align: middle;
                                        padding-right: 2px;
                                    }
                                    .number{
                                        font-size: 12px;
                                        font-weight: 400;
                                        color: #242424;
                                    }
                                }
                            }

                        }
                    }
                }

            }
            .cost-msg{
                width: 100%;
                background: #fff;
                box-sizing: border-box;
                padding: 12px 12px 0;
                .cost-list{
                    width: 100%;
                    li{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 12px;
                        .lable{
                            font-size: 12px;
                            font-weight: 400;
                            color: #242424;
                        }
                        .price{
                            display: flex;
                            align-items: center;
                            .mark{
                                font-size: 9px;
                                font-weight: 400;
                                color: #242424;
                            }
                            .num{
                                font-size: 12px;
                                font-weight: 400;
                                color: #242424;
                            }
                            .marks{
                                font-size: 9px;
                                font-weight: 400;
                                color: #FF543B;
                            }
                            .nums{
                                font-size: 12px;
                                font-weight: 400;
                                color: #FF543B;
                            }
                        }
                    }
                }
                .gather{
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 16px;
                    padding-bottom: 12px;
                    border-bottom: 1px dashed #eee;
                    .text{
                        font-size: 12px;
                        font-weight: 400;
                        color: #242424;
                    }
                    .num{
                        font-size: 12px;
                        font-weight: 400;
                        color: #FF9B37;
                        padding-right: 20px;
                    }
                    .subtotal{
                        font-size: 12px;
                        font-weight: 400;
                        color: #000000;
                    }
                }
            }
            .take-meal{
                ul{
                    padding: 14px 12px;
                    li{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 12px;
                        .text{
                            font-size: 12px;
                            color: #5D5D5D;
                        }
                        .lable{
                            font-size: 12px;
                            color: #242424;
                        }
                        .time{
                            font-size: 12px;
                            color: #242424;
                        }
                        .address{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            font-size: 12px;
                            color: #242424;
                            .take-addr{
                                width:250px;
                                text-align: right;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            }
                            .addr{
                                padding-bottom: 3px;
                            }
                            .info{
                                .name{
                                    padding-right: 5px;
                                }
                                .phone{}
                            }

                        }
                        .msg{
                            font-size: 12px;
                            color: #242424;
                        }
                    }
                }
            }
        }
        //订单编号
        .order-info{
            margin: 0 16px;
            width: 343px;
            background: turquoise;
            background: #FFFFFF;
            border-radius: 10px 10px 10px 10px;
            ul{
                padding: 14px 12px 5px;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 9px;
                    .text{
                        font-size: 12px;
                        color: #5D5D5D;
                    }
                    .value{
                        font-size: 12px;
                        color: #242424;
                    }
                }
            }
        }
        .empty{
            height: 34px;
        }
    }
    //订单追踪弹窗
    .step-wrap{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.5);
        .step-dialog{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            box-sizing: border-box;
            height: 270px;
            background: #FFFFFF;
            border-radius: 15px 15px 0px 0px;
            .title{
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                text-align: center;
                padding-top: 16px;
            }
            .close{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 12px;
                height: 12px;
            }
            .van-steps{
                margin-top: 20px;
                .van-step{
                    .track{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .text{
                            font-size: 12px;
                            color: #242424;
                        }
                        .time{
                            font-size: 11px;
                            color: #959595;
                        }
                    }
                }
            }
        }
    }
}
</style>