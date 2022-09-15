<template>
  <div class="Commodity">
      <!-- <div class="title">食堂订餐</div> -->
      <div class="title">
          <ul class="tab">
              <li v-for="(item,index) in navList" :key="index" :class="{active:index == num}" @click="handleTab(index)">{{item}}</li>
          </ul>
      </div>
      <div class="comm-wrap">
          <ul class="comm-list">
              <li class="comm-item" @click="btnOrderFood(item.id,item.name,index,item.address,item.give_eat,item.give_cost,item.one_eat,item.one_cost)" v-for="(item,index) in commoditydata" :key="index">
                  <div class="photo">
                      <img v-lazy="'data:image/png;base64,'+item.imgcode" />
                  </div>
                  <div class="comm-info">
                      <div class="name">{{item.name}}</div>
                      <div class="address">地址：{{item.address}}</div>
                      <!-- <div class="lable">
                          <span>早餐</span>
                          <span class="tip">|</span>
                          <span>午餐</span>
                          <span class="tip">|</span>
                          <span>下午茶</span>
                      </div> -->
                      <!-- <div class="empty">暂未开放</div> -->
                      <div class="type-food">
                          <div class="hall-food" v-if="item.meal_eat == 1">
                              <img src="../../../assets/index/hall-food.png" alt="">
                              <span>堂食</span>
                          </div>
                          <div class="take-food" v-if="item.give_eat == 1">
                              <img src="../../../assets/index/take-food.png" alt="">
                              <span>外卖</span>
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        commoditydata:Array,
        carddata:Object
    },
    data(){
        return{
            navList:['食堂订餐','食堂报餐'],
            num:0,
        }
    },
    methods:{
        handleTab(index){
            this.num=index
        },
        //跳转到订餐页
        btnOrderFood(id,name,index,address,giveEat,giveCost,oneEat,oneCost){
            if(this.num == 0){
            this.$store.dispatch('setCanteenAddr',address)
            let powerdata={
                giveEat:giveEat,
                giveCost:giveCost,
                oneEat:oneEat,
                oneCost:oneCost
            }
            this.$store.dispatch('setPower',powerdata)
            this.$router.push('/orderfood?id='+id+'&name='+name+'&index='+index)
            }else{
                if(this.carddata.statusName == "挂失"){
                    this.$toast('饭卡已挂失，不能报餐')
                }else if(this.carddata.statusName == '退卡'){
                    this.$toast('饭卡已退卡，不能报餐')
                }else{
                    this.$router.push('/stallList?id='+id+'&name='+name)
                }
                
            }
        }
    }
}
</script>

<style lang="less" scoped>
.Commodity{
    padding: 22px 16px 28px 16px;
    .title{
        font-size: 16px;
        color: #5D5D5D;
        font-weight: bold;
        .tab{
            display: flex;
            align-items: center;
            li{
                padding-right: 26px;
            }
            .active{
                color: #242424;
                font-weight: bold;
            }
        }
    }
    .comm-wrap{
        .comm-list{
            .comm-item{
                display: flex;
                margin-top: 12px;
                background: #fff;
                width: 343px;
                height: 112px;
                box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
                border-radius: 10px 10px 10px 10px;
                box-sizing: border-box;
                padding: 10px;
                &:nth-child(1){
                    margin-top: 16px;
                }
                .photo{
                    img{
                        width: 92px;
                        height: 92px;
                        background: #0AB583;
                        border-radius: 6px 6px 6px 6px;
                    }
                }
                .comm-info{
                    // display: flex;
                    // flex-direction: column;
                    // justify-content: space-between;
                    padding-left: 14px;
                    .name{
                        font-size: 16px;
                        font-weight: bold;
                        color: #242424;
                        margin-top: 4px;
                    }
                    .address{
                        font-size: 11px;
                        font-weight: 400;
                        color: #242424;
                        // padding: 4px 0 9px;
                        padding-top: 10px;
                        padding-bottom: 36px;
                    }
                    .lable{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 3px;
                        height: 18px;
                        background: rgba(255,93,98,0.0300);
                        border-radius: 4px 4px 4px 4px;
                        border: 1px solid #FF5D62;
                        font-size: 11px;
                        color: #FF5D62;
                        .tip{
                            padding: 0 3px;
                        }
                    }
                    .empty{
                        font-size: 11px;
                        color: #5D5D5D;
                        padding: 0 0 4px;
                    }
                    .type-food{
                        display: flex;
                        align-items: center;
                        font-size: 13px;
                        font-weight: 400;
                        color: #959595;
                        .hall-food{
                            display: flex;
                            align-items: center;
                            img{
                                width: 16px;
                                height: 16px;
                            }
                            span{
                                padding-left: 6px;
                            }
                        }
                        .take-food{
                            display: flex;
                            align-items: center;
                            padding-left: 16px;
                            img{
                                width: 16px;
                                height: 16px;
                            }
                            span{
                                padding-left: 6px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>