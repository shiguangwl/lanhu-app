<template>
  <div class="definite-wrap">
      <div class="definite-select">
          <div class="select-left">
              <van-dropdown-menu>
                  <van-dropdown-item v-model="value1" :options="option1" />
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
            <ul class="definite-list" v-if="recordlists.length>0">
                <li class="definite-item" v-for="(item,index) of recordlists" :key="index">
                    <div class="definite-left">
                        <span class="name">{{item.bs_type}}</span>
                        <span class="time">{{item.bs_time}}</span>
                    </div>
                    <div class="definite-right">
                        {{item.amount}}
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
            value1: 0,
            option1:[
                { text: '全部类型', value: 0 },
                { text: '卡户充值', value: 1 },
                { text: '刷卡消费', value: 2 },
                { text: '餐补', value: 3 },
                { text: '调账', value: 4 },
                { text: '核加', value: 5 },
                { text: '核减', value: 6 },
            ],
            num:0,
            tabdate:['近一周','近一月','近三月'],
            //请求需要的参数
            paramsdata:{
                method:'app.appRecord.Applist',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                card_id:sessionStorage.getItem('card_id'),
                start_time:'',
                end_time:'',
                bs_type:'',
                currpage:1,
                count:'12'
            },
            recordlist:[],//接口返回数据
            loading: true,
            finished: false,
            refreshing: false,
        }
    },
    created(){
        //进入页面就获取当前时间年月日和前7天时间
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
        //当前时间的前7天
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
        //请求
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
                this.recordlist = res
                this.refreshing = false
                this.finished = false
            } else {
                this.recordlist = [...this.recordlist, ...res]
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
        //得到选择一周、一月、三月
        handlerDate(index){
            this.num=index
            //得到一周的结束时间
            if(index == 0){
                this.recordlist = []
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
                this.recordlist = []
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
                this.recordlist = []
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
        
    },
    //筛选
    computed:{
        recordlists(){
            if(this.value1==1){
                return this.recordlist.filter((item) => item.bs_type.includes("卡户充值"));
            }else if(this.value1==2){
                return this.recordlist.filter((item) => item.bs_type.includes('刷卡消费'));
            }else if(this.value1==0){
                return this.recordlist
            }else if(this.value1==3){
                return this.recordlist.filter((item) => item.bs_type.includes('餐补'));
            }else if(this.value1==4){
                return this.recordlist.filter((item) => item.bs_type.includes('调账'));
            }else if(this.value1==5){
                return this.recordlist.filter((item) => item.bs_type.includes('核加'));
            }else if(this.value1==6){
                return this.recordlist.filter((item) => item.bs_type.includes('核减'));
            }
            
        }
    },
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
                  font-size: 16px;
                  font-weight: 500;
                  color: #242424;
                }
            }
        }
        .empty{
            text-align: center;
            font-size: 0.37333rem;
            color: #5D5D5D;
            padding: 12px 0;
        }
    }
}
</style>