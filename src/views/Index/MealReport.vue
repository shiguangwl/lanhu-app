<template>
  <div class="mealReport">
      <Header title="报餐记录" class="head"/>
      <div class="definite-select">
          <div class="select-left">
              <van-dropdown-menu>
                  <van-dropdown-item v-model="canteenId" :options="canteenList" @change="handleDrop()"/>
              </van-dropdown-menu>
          </div>
          <div class="select-right">
              <ul>
                  <li v-for="(item,index) in tabdate" :key="index" :class="{active:index==num}" @click="handlerDate(index)">{{item}}</li>
              </ul>
          </div>
      </div>
      <div class="divine"></div>
      <div class="definite-content" v-if="defainitelist.length > 0">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
            v-model="loading" 
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            :immediate-check="false">
                <ul class="definite-list">
                    <li class="definite-item" v-for="(item,index) in defainitelist" :key="index">
                        <div class="definite-left">
                            <span class="name">{{item.bs_time.substring(0,10)}} ( {{ getWeek(item.bs_time)}} ) - {{item.pin_name}}</span>
                            <span class="time">{{item.add_time}}</span>
                        </div>
                        <div class="definite-right" v-if="item.status == 0">已报餐</div>
                        <div class="definite-right" v-if="item.status == 1">已完成</div>
                        <div class="definite-right" v-if="item.status == 2">已过期</div>
                        <div class="definite-right" v-if="item.status == 3">已评价</div>
                        <div class="definite-right" v-if="item.status == -1">已取消</div>
                        <div class="definite-right" v-if="item.status == 4">配送中</div>
                        <div class="opt" v-if="item.status == 0" @click="handleOpt(item.id)">取消报餐</div>
                    </li>
                </ul>
            </van-list>
        </van-pull-refresh>
      </div>
      <div class="empty" v-else>
          <img src="../../assets/index/no-meal.png" alt="">
          <span>暂无相关记录哦~</span>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            //选择食堂类型
            canteenId: "",
            canteenList:[],
            num:0,
            tabdate:['近一周','近一月','近三月'],
            paramsdata:{
                method:'report.reportMeal.getReportMealListPage',
                start_time:'',
                end_time:'',
                canteen_id:'',
                user_id:sessionStorage.getItem('user_id'),
                currpage:1,
                count:12
            },
            defainitelist:[],
            loading: true,
            finished: false,
            refreshing: false,
            timer: null,
            isCancel: true
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
        this.paramsdata.end_time = nowYear + "-" + nowMonth + "-" + nowDay;
        //进入页面获取当前时间的前7天
        let getOneweek = new Date(getNowDate - 7 * 24 * 3600 * 1000);
        let thYear = getOneweek.getFullYear();
        let thMonth = getOneweek.getMonth() + 1;
        let thDay = getOneweek.getDate();
        if (thMonth >= 1 && thMonth <= 9) {
            thMonth = "0" + thMonth;
        }
        if (thDay >= 0 && thDay <= 9) {
            thDay = "0" + thDay;
        }
        this.paramsdata.start_time = thYear + "-" + thMonth + "-" + thDay;
        //先发送请求
        this.initVoteList()
    },
    methods:{
        getWeek(date){
            var week;
            if(new Date(date.replace(/\-/g, "/")).getDay()==0) week="周日"
            if(new Date(date.replace(/\-/g, "/")).getDay()==1) week="周一"
            if(new Date(date.replace(/\-/g, "/")).getDay()==2) week="周二"
            if(new Date(date.replace(/\-/g, "/")).getDay()==3) week="周三"
            if(new Date(date.replace(/\-/g, "/")).getDay()==4) week="周四"
            if(new Date(date.replace(/\-/g, "/")).getDay()==5) week="周五"
            if(new Date(date.replace(/\-/g, "/")).getDay()==6) week="周六"
            return week;
        },
        // 上拉加载处理函数
        onLoad() {
            this.paramsdata.currpage++
            setTimeout( () => {
                this.initVoteList()
            },1500)
        },
        // 下拉刷新处理函数
        onRefresh() {
            setTimeout(() => {
                this.paramsdata.currpage = 1
                this.initVoteList(true)
            }, 1000);
        },
        //退订
        // handleOpt(id){
        //     console.log('111')
        //     let data={
        //         method:'report.reportMeal.unsubscribeReportMeal',
        //         orderIds:[id],
        //     }
        //     let sendData = {...data, ...this.myFun.getDefaultParameters()}
        //     // console.log(sendData)
        //     let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
        //     this.$post('/router/rest/', encrypSendData)
        //     .then(res=>{
        //         // console.log(res)
        //         if(res.status == 0){
        //             this.$toast(res.msg)
        //             this.onRefresh()
        //         }else{
        //             this.$toast(res.msg)
        //         }
        //     })
        // },
        // 取消报餐 - 防抖模式
        handleOpt(id) {
            // console.log('没有防抖')
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                // console.log('加了防抖后')
                let data={
                    method:'report.reportMeal.unsubscribeReportMeal',
                    orderIds:[id],
                }
                let sendData = {...data, ...this.myFun.getDefaultParameters()}
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/', encrypSendData)
                .then(res=>{
                    if(res.status == 0){
                        this.$toast(res.msg)
                        this.onRefresh()
                    }else{
                        this.$toast(res.msg)
                        // console.log('不行')
                    }
                })
            }, 1000);
        },
        // 取消报餐 - 节流阀模式
        // handleOpt(id) {
        //     if(this.isCancel) {
        //         this.isCancel = false
        //         let data={
        //             method:'report.reportMeal.unsubscribeReportMeal',
        //             orderIds:[id],
        //         }
        //         let sendData = {...data, ...this.myFun.getDefaultParameters()}
        //         let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
        //         this.$post('/router/rest/', encrypSendData)
        //         .then(res=>{
        //             // console.log('发送请求')
        //             if(res.status == 0){
        //                 this.$toast(res.msg)
        //                 this.onRefresh()
        //             }else{
        //                 this.$toast(res.msg)
        //             }
        //             this.isCancel = true
        //         })
        //     }
        // },

        async getdata(){
            let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            let  res = await this.$post('/router/rest/', encrypSendData)
            // console.log(res)
            // res.data.forEach(item => {
            //     let time = (item.bs_time.substring(0,10)+item.start_time.substring(10,16)+":00").replace(/-/g, '/')
            //     let last=new Date(time).getTime()-Math.abs(item.before_quit)*60*60*1000 //开始时间戳 如2022-09-12 8:30:00
            //     let current=new Date().getTime() //当前的时间戳  如2022-09-09 16:50
            //     if(current > last){
            //         return item.meal = 1
            //     }else{
            //         return item.meal = 0
            //     }
            // });
            // console.log(res)
            if(res.status == 0) {
                let mealList = res.data
                // mealList.sort((a, b) => new Date(b.bs_time).getTime() - new 
                // Date(a.bs_time).getTime()) //按照时间升序处理
                return mealList
            } else {
                return []
            }
        },
        async initVoteList(isRefresh) {
            let res = await this.getdata()
            if (isRefresh) {
                this.defainitelist = res
                this.refreshing = false
                this.finished = false
            } else {
                this.defainitelist = [...this.defainitelist, ...res]
                this.loading = false
            }
            if (res.length === 0 || res.length < 12) {
                this.finished = true
            }

        },
        //选择食堂获取对应id
        handleDrop(){
            this.paramsdata.canteen_id=this.canteenId
            this.defainitelist = []
            this.finished = false
            this.paramsdata.currpage = 1
            this.initVoteList()
        },
        //得到选择一周、一月、三月
        handlerDate(index){
            this.num=index
            //得到一周的结束时间
            if(index == 0){
                this.defainitelist = []
                let getNowDate = new Date();
                let getOneweek = new Date(getNowDate - 7 * 24 * 3600 * 1000);
                let thYear = getOneweek.getFullYear();
                let thMonth = getOneweek.getMonth() + 1;
                let thDay = getOneweek.getDate();
                if (thMonth >= 1 && thMonth <= 9) {
                    thMonth = "0" + thMonth;
                }
                if (thDay >= 0 && thDay <= 9) {
                    thDay = "0" + thDay;
                }
                this.paramsdata.start_time = thYear + "-" + thMonth + "-" + thDay;
                this.paramsdata.currpage = 1
                this.finished = false
                this.initVoteList()
            }else if(index == 1){
                //得到近一个月时间
                this.defainitelist = []
                let getNowDate = new Date();
                getNowDate.setMonth(getNowDate.getMonth() - 1);
                let thirtyYear = getNowDate.getFullYear();
                let thirtyMonth = getNowDate.getMonth() + 1;
                let thirtyDay = getNowDate.getDate();
                if (thirtyMonth >= 1 && thirtyMonth <= 9) {
                    thirtyMonth = "0" + thirtyMonth;
                }
                if (thirtyDay >= 1 && thirtyDay <= 9) {
                    thirtyDay = "0" + thirtyDay;
                }
                this.paramsdata.start_time = thirtyYear + "-" + thirtyMonth + "-" + thirtyDay;
                this.paramsdata.currpage = 1
                this.finished = false
                this.initVoteList()
            }else if(index == 2){
                //得到近三个月时间
                this.defainitelist = []
                let getNowDate = new Date();
                getNowDate.setMonth(getNowDate.getMonth() - 3);
                let thirtyYear = getNowDate.getFullYear();
                let thirtyMonth = getNowDate.getMonth() + 1;
                let thirtyDay = getNowDate.getDate();
                if (thirtyMonth >= 1 && thirtyMonth <= 9) {
                    thirtyMonth = "0" + thirtyMonth;
                }
                if (thirtyDay >= 1 && thirtyDay <= 9) {
                    thirtyDay = "0" + thirtyDay;
                }
                this.paramsdata.start_time = thirtyYear + "-" + thirtyMonth + "-" + thirtyDay;
                this.paramsdata.currpage = 1
                this.finished = false
                this.initVoteList()
            }
        },
    },
    watch:{
        "$store.state.mealCanteenList":{
            handler(newVal){
                this.canteenList=newVal
            },
            deep: true,
            immediate: true,
        }
    }
}
</script>

<style lang="less" scoped>
.mealReport{
    width: 100%;
    min-height: 100%;
    background: #f5f5f5;
    .head{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    .divine{
        height: 92px;
    }
    .definite-select{
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        width: 100%;
        height: 48px;
        background: #fff;
        box-sizing: border-box;
        .select-left{
            padding-left: 10px;
            .van-dropdown-menu{
                /deep/ .van-dropdown-menu__bar{
                    box-shadow:0 0 0 0;
                }
                /deep/ .van-dropdown-item__content{
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                }
            }
        }
        .select-right{
            flex: 1;
            padding-left: 7px;
            ul{
                display: flex;
                justify-content: flex-end;
                padding-right: 26px;
                li{
                    padding-left: 29px;
                }
                .active{
                    color: #FF5D62;
                }
            }
        }
    }
    .definite-content{
      margin: 14px 0;
        .definite-list{
            background: #fff;
            padding: 12px 16px 0 16px;
            .definite-item{
                position: relative;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                width: 100%;
                height: 51px;
                box-sizing: border-box;
                border-bottom: 1px dashed #eee;
                margin-bottom: 10px;
                &:last-child{
                    border-bottom: 0;
                }
                .definite-left{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .name{
                        font-size: 14px;
                        font-weight: 400;
                        color: #242424;
                    }
                    .time{
                        font-size: 12px;
                        font-weight: 400;
                        color: #959595;
                        padding-top: 4px;
                    }
                }
                .definite-right{
                    font-size: 12px;
                    font-weight: 400;
                    color: #959595;
                }
                .opt{
                    position: absolute;
                    top: 20px;
                    right: -4px;
                    padding: 0 6px;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid #FF5D62;
                    font-size: 12px;
                    font-weight: 400;
                    color: #FF5D62;
                }
            }
        }
    }
    .empty{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 115px;
        img{
            width: 173px;
        }
        span{
            font-size: 16px;
            font-weight: 400;
            color: #242424;
        }
    }
}
</style>