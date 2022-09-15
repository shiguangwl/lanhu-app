<template>
  <div class="addOrder">
      <div v-if="orderlist.length>0">
      <ul class="obligation-list" v-for="(order,index) in orderlist" :key="index">
          <li class="obligation-item" @click="handleDel(item.id)" v-for="(item,index) in JSON.parse(order.foodDatas)" :key="index">
              <div class="head">
                  <span class="date">{{order.time }} {{item.pin_name}}</span>
                  <span class="status">{{item.status}}</span>
              </div>
              <div class="banner">
                  <ul class="food-list">
                      <li class="food-item" v-for="(items,indexs) in JSON.parse(item.foods)" :key="indexs">
                          <!-- <img v-lazy="'data:image/png;base64,'+items.imgcode" /> -->
                          <img src="../../../common/loading.png" alt="">
                          <span class="name">{{items.food_name}}</span>
                      </li>
                  </ul>
                  <div class="money">
                      <span class="price">￥{{item.amount.toFixed(2)}}</span>
                      <!-- <span class="price">￥{{totalPrice(item.foods)}}</span> -->
                      <span class="num">共{{JSON.parse(item.foods).length}}件</span>
                  </div>
              </div>
              <div class="footer" v-if='item.status === "待付款"'>
                  <button>立即支付</button>
              </div>
              <div class="footer" v-if='item.status === "已预订"'>
                  <button @click.stop="handleRet(item.canteen_id,item.card_id,item.id)">退餐</button>
              </div>
          </li>
      </ul>
      </div>
      <div class="empty" v-else>
          <img src="../../../assets/notice/no-notice.png" alt="">
          <span>暂无相关订单哦~</span>
      </div>
  </div>
</template>

<script>
export default {
    props:['orderlist'],
    data(){
        return{

        }
    },
    methods:{
        // totalPrice(food){
        //     let totalProce = 0
        //     JSON.parse(food).forEach(ele => {
        //         totalProce += ele.price*ele.qty
        //     })
        //     return totalProce
        // },
        //退餐
        handleRet(canteenId,cardId,id){
            this.$dialog.confirm({
                message:'是否要退餐?'
            })
            .then(()=>{
                let paramsdata={
                    method:'app.appPlaceOrder.changeback',
                    company_id: sessionStorage.getItem('company_id'),
                    user_id: sessionStorage.getItem('user_id'),
                    cardType_id:sessionStorage.getItem('cardType_id'),
                    canteen_id:canteenId,
                    card_id:cardId,
                    orderIds:[
                        id
                    ],
                    pay_num:'card',
                    meal_way:'meal',
                    bs_type:0,
                }
                let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
                console.log(sendData)
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/',encrypSendData)
                .then(res=>{
                    // console.log(res)
                    if(res.status == 0){
                        this.$toast('退单成功')
                        this.$parent.getdata()
                    }
                })
            })
            .catch(()=>{
            })
            
        },
        //进入详情
        handleDel(id){
            this.$router.push('/orderDel?id='+id)
        },
    },
    watch:{
        orderlist(newVal,oldVal){
            if(newVal){
                // console.log(newVal)
                // console.log(JSON.parse(newVal[0].foodDatas))
                // console.log(JSON.parse(newVal[1].foodDatas))
            }
        },

    }
}
</script>

<style lang="less" scoped>
.addOrder{
    .obligation-list{
        .obligation-item{
            width: 343px;
            // height: 192px;
            background: #FFFFFF;
            border-radius: 10px 10px 10px 10px;
            margin: 14px 16px;
            padding: 0 12px;
            box-sizing: border-box;
            .head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 38px;
                border-bottom: 1px dashed #eee;
                .date{
                    font-size: 12px;
                    font-weight: 400;
                    color: #242424;
                }
                .status{
                    font-size: 12px;
                    font-weight: 400;
                    color: #959595;
                }
            }
            .banner{
                display: flex;
                align-items: center;
                width: 100%;
                height: 102px;
                .food-list{
                    display: flex;
                    align-items: center;
                    width: 270px;
                    overflow: auto;
                    .food-item{
                        margin-right: 6px;
                        display: flex;
                        flex-direction: column;
                        &:last-child{
                            margin-right: 0;
                        }
                        img{
                            width: 80px;
                            height: 60px;
                            border-radius: 8px 8px 8px 8px;
                        }
                        .name{
                            font-size: 12px;
                            font-weight: 400;
                            color: #5D5D5D;
                            padding-top: 7px;
                            width:72px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                    &::-webkit-scrollbar {
                        display: none;
                    }
                }
                .money{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 73px;
                    height: 80px;
                    .price{
                        font-size: 14px;
                        font-weight: 500;
                        font-family: DIN-Regular, DIN;
                        color: #242424;
                    }
                    .num{
                        font-size: 11px;
                        font-weight: 400;
                        color: #959595;
                        padding-top: 6px;
                    }
                }
            }
            .footer{
                display: flex;
                justify-content: flex-end;
                padding-bottom: 12px;
                button{
                    height: 27px;
                    font-size: 12px;
                    color: #FF5D62;
                    border: 1px solid #FF5D62;
                    border-radius: 6px 6px 6px 6px;
                    background: #fff;
                }
            }
        }
    }
    .empty{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 126px;
        img{
            width: 173px;
        }
        span{
            font-size: 16px;
            color: #242424;
            padding-top: 23px;
        }
    }
}
</style>