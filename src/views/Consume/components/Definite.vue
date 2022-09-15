<template>
  <div class="definite-wrap">
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
      <div class="definite-content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
            v-model="loading" 
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            :immediate-check="false">
            <ul class="definite-list" v-if="defainitelist.length>0">
                <li class="definite-item" v-for="(item,index) in defainitelist" :key="index" @click="handlerDel(item.id)">
                    <div class="definite-left">
                        <span class="name">{{item.name}}-{{item.pin_name}}</span>
                        <span class="time">{{item.bs_time}}</span>
                    </div>
                    <div class="definite-right">
                        <div class="pay">
                            <span class="price">-{{item.amount}}</span>
                            <span class="status">支付成功</span>
                        </div>
                        <div class="icon">
                            <img src="../../../assets/consume/more.png" alt="">
                        </div>
                    </div>
                </li>
            </ul>
            </van-list>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //选择食堂类型
            canteenId: "",
            canteenList:[],
            //选择时间
            num:0,
            tabdate:['近一周','近一月','近三月'],
            //用餐明细参数
            paramsdata:{
                method:'app.appOrder.appOrderList',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                canteen_id:'',
                signs: "0,1,2,3,-1,4",
                start_time: "",
                end_time: "",
                delete_status: "0",
                currpage: 1,
                count: "12",
            },
            defainitelist:[],//接口返回数据
            loading: true,
            finished: false,
            refreshing: false,
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
        //请求用餐明细接口
        async getdata(){
            let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            let  res = await this.$post('/router/rest/', encrypSendData)
            console.log(res)
            if(res.status == 0) {
                let mealList = res.data
                mealList.sort((a, b) => new Date(b.bs_time).getTime() - new 
                Date(a.bs_time).getTime()) //按照时间升序处理
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
                this.defainitelist = []
                //得到近一个月时间
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
                this.defainitelist = []
                //得到近三个月时间
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
        //跳转详情页
        handlerDel(id){
            this.$router.push('/consumedetail?id='+id)
        },
    },
    watch:{
        "$store.state.canteenList":{
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
.definite-wrap{
    border-top: 1px dashed #eee;
    .definite-select{
        position: fixed;
        top: 88px;
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
    .divine{
        height: 136px;
    }
    .definite-content{
        margin: 14px 0;
        .definite-list{
            background: #fff;
            padding: 12px 16px 0 16px;
            .definite-item{
                display: flex;
                align-items: center;
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
                    display: flex;
                    align-items: center;
                    .pay{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        margin-right: 15px;
                        .price{
                            font-size: 16px;
                            font-weight: 500;
                            color: #242424;
                        }
                        .status{
                            font-size: 12px;
                            font-weight: 400;
                            color: #959595;
                            padding-top: 5px;
                        }
                    }
                    .icon{
                        img{
                            width: 6px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
}
</style>