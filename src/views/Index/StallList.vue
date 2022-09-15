<template>
    <div class="order-wrap">
        <div class="batten">
            <div class="order-food">
                <div class="back" @click="jumpRouter">
                    <img src="../../assets/orderfood/back.png" alt="">
                </div>
                <div class="title">{{title}}</div>
            </div>
        </div>
        <div class="divine"></div>
        <!-- 商家档口列表 -->
        <div class="shop-notch">
            <ul class="notch-list">
                <li class="notch-item" v-for="item in stalldata" :key="item.id" @click="handleStall(item)">
                    <img src="../../assets/orderfood/notch.png" alt="" class="storeImg">
                    <span class="name">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <!-- <div class="empty">
            <img src="../../assets/notice/no-notice.png" alt="">
            <span>暂无相关档口哦~</span>
        </div> -->

    </div>
</template>

<script>
export default{
    data(){
        return{
            canteenId:'',//食堂id
            title:'',
            stalldata:[],//档口数组
        }
    },
    created(){
        //进入页面就获取当前时间年月日
        var getNowDate = new Date();
        const nowYear = getNowDate.getFullYear();
        let nowMonth = getNowDate.getMonth() + 1;
        let nowDay = getNowDate.getDate();
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        if (nowDay >= 1 && nowDay <= 9) {
            nowDay = "0" + nowDay;
        } else if (nowDay == 1) {
            nowDay = 30;
            nowMonth -= 1;
        }
        let time = nowYear + "-" + nowMonth + "-" + nowDay;
        let canteenId = this.$route.query.id //食堂id
        this.canteenId=canteenId
        this.title=this.$route.query.name
        this.getdata(canteenId,time)
    },
    methods:{
        //获取档口请求
        async getdata(canteenId,time){
            let paramsdata={
                method:'app.appfood.getCanteenStalls',
                cardtype_id:sessionStorage.getItem('cardType_id'),
                canteen_id:canteenId,
                bs_time:time,
                user_id: sessionStorage.getItem('user_id'),
                tag:'0',
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            let res = await this.$post('/router/rest/',encrypSendData)
            // console.log(res)
            this.stalldata=res.data
        },
        //点击档口进入报餐页
        handleStall(item){
            let meal=JSON.stringify(item)
            this.$router.push('/mealOrder?meal='+meal)
        },
        jumpRouter(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="less" scoped>
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
    .cloce{
        position: absolute;
        left: 52px;
        img{
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
    .appeal{
        position: absolute;
        right: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
    }
}
.order-wrap {
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .batten {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        .select-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 48px;
            box-sizing: border-box;
            // padding: 0 16px;
            padding: 0 20px;
            background: #fff;
            .cut-canteen{
                display: flex;
                align-items: center;
                .name{
                    font-size: 14px;
                    color: #242424;
                }
                .down{
                    width: 8px;
                    padding-left: 6px;
                }
            }
            .overlay{
                position: fixed;
                left: 0;
                right: 0;
                top: 82px;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1001;
                .canteen-option{
                    position: absolute;
                    top: -1px;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #fff;
                    border-radius: 0px 0px 15px 15px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #5D5D5D;
                    padding: 20px 0 12px;
                    .canteen-item{
                        margin-bottom: 16px;
                    }
                    .active{
                        color: #FF5D62;
                    }
                }
            }
            &.fade-enter-active,
            &.fade-leave-active {
            transition: opacity 0.25s ease-out;
            }

            &.fade-enter,
            &.fade-leave-to {
            opacity: 0;
            }
        }
        //tab
        .tab-wrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 38px;
            box-sizing: border-box;
            padding: 0 15px;
            overflow: hidden;
            background: #fff;
            .tab-list {
                width: auto;
                overflow-x: auto;
                white-space: nowrap;
                display: flex;
                align-items: center;
                .tab-item {
                    line-height: 38px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #5D5D5D;
                    padding-right: 22px;
                    &:last-child {
                        padding-right: 0;
                    }
                }
                &::-webkit-scrollbar {
                    display: none;
                }
                .active {
                    color: #FF5D62;
                }
            }
        }
    }
    .divine {
        height: 44px;
    }
    //档口
    .shop-notch {
        .notch-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 14px 15px 0;
            .notch-item {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 166px;
                height: 100px;
                background: #FFFFFF;
                box-shadow: 0px 2px 3px 1px rgba(42, 49, 49, 0.0800);
                border-radius: 10px 10px 10px 10px;
                margin-right: 12px;
                margin-bottom: 12px;
                &:nth-child(2n) {
                    margin-right: 0;
                }
                .storeImg{
                    width: 35px;
                }
                .name {
                    font-size: 16px;
                    font-weight: bold;
                    color: #242424;
                    padding-top: 14px;
                }
                .bage {
                    position: absolute;
                    top: 8px;
                    right: 11px;
                    width: 16px;
                    height: 16px;
                    text-align: center;
                    line-height: 16px;
                    background: #FF543B;
                    border-radius: 50%;
                    font-size: 11px;
                    color: #FFFFFF;
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

    //餐品列表
    .goods-wrap {
        display: flex;
        position: absolute;
        top: 130px;
        bottom: 52px;
        width: 100%;
        overflow: hidden;
        background: #fff;

        //左侧
        .menu-wrapper {
            background: #F6F6F6;
            border-radius: 0px 8px 0px 0px;

            .menu-list {
                width: 90px;

                .menu-item {
                    position: relative;
                    height: 48px;
                    line-height: 48px;
                    background: rgba(236, 236, 236, 0);
                    font-size: 12px;
                    font-weight: 400;
                    color: #959595;
                    text-align: center;
                    .num{
                        position: absolute;
                        top: 6px;
                        right: 6px;
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
                    .line {
                        position: absolute;
                        left: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        height: 12px;
                        border: 1px solid #FF5D62;
                        background: #FF5D62;
                    }
                    .bage {
                        position: absolute;
                        right: 9px;
                        top: 4px;
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 14px;
                        background: #FF543B;
                        font-size: 11px;
                        color: #FFFFFF;
                    }
                }

                .menuActive {
                    font-weight: bold;
                    color: #242424;
                    background: #fff;
                }
            }
        }

        //右侧
        .foods-wrapper {
            flex: 1;

            .foodsUl {
                .food-list-hook {
                    .food-header {
                        display: flex;
                        justify-content: space-between;
                        height: 34px;
                        line-height: 34px;
                        padding: 0 16px 0 10px;

                        .name {
                            font-size: 14px;
                            font-weight: 400;
                            color: #000000;
                        }

                        .date {
                            font-size: 11px;
                            font-weight: 400;
                            color: #959595;
                        }
                    }

                    .food-list {
                        box-sizing: border-box;

                        .food-item {
                            display: flex;
                            align-items: flex-start;
                            width: 100%;
                            box-sizing: border-box;
                            height: 110px;
                            padding: 10px;
                            .image {
                                img {
                                    width: 80px;
                                    height: 80px;
                                    border-radius: 8px 8px 8px 8px;
                                }
                            }
                            .content {
                                flex: 1;
                                padding-left: 10px;
                                .food-title{
                                    display: flex;
                                    align-items: center;
                                    .icon{
                                        width: 13px;
                                        height: 15px;
                                        padding-right: 6px;
                                    }
                                    .food-name {
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: #242424;
                                    }
                                }
                                .desc {
                                    display: flex;
                                    align-items: center;
                                    margin-top: 6px;
                                    .batching {
                                        padding: 0 3px;
                                        height: 15px;
                                        line-height: 15px;
                                        border-radius: 2px 2px 2px 2px;
                                        border: 1px solid #FF5D62;
                                        font-size: 11px;
                                        color: #FF5D62;
                                        box-sizing: border-box;
                                        .protein {}
                                        .calorie {}
                                    }
                                }
                                .Taboo {
                                    display: flex;
                                    align-items: center;
                                    padding: 8px 0 10px 0;
                                    .crowd {
                                        font-size: 11px;
                                        color: #959595;
                                    }
                                    img {
                                        width: 11px;
                                        height: 10px;
                                        vertical-align: middle;
                                        padding-left: 6px;
                                    }
                                    .illness {
                                        vertical-align: middle;
                                        font-size: 11px;
                                        font-weight: 400;
                                        color: #959595;
                                        padding-left: 2px;
                                    }
                                }

                                .food-tariff {
                                    display: flex;
                                    align-items: center;
                                    margin-top: 6px;

                                    .price {
                                        display: flex;
                                        align-items: flex-end;

                                        .mark {
                                            font-size: 9px;
                                            font-weight: 400;
                                            color: #FF543B;
                                            padding: 0 2px 2px 0;
                                            vertical-align: middle;
                                        }

                                        .num {
                                            font-size: 16px;
                                            font-weight: 400;
                                            color: #FF543B;
                                        }
                                    }
                                    .quota {
                                        font-size: 9px;
                                        font-weight: 400;
                                        color: #FF9B37;
                                        padding-left: 7px;
                                        flex: 1;
                                    }
                                    .cartcontrol-wrapper {
                                        img {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .shopcart {
        height: 52px;
    }

}
</style>