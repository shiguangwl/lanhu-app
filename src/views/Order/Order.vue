<template>
  <div class="order-wrap">
      <div class="order-food">
          <div class="back" @click="jumpRouter">
              <img src="../../assets/orderfood/back.png" alt="">
          </div>
          <div class="title">订单中心</div>
      </div>
      <!-- 日期选择器和员工食堂 -->
      <div class="select-wrap">
        <!-- 日历 -->
        <calendar v-model="datetime" :isfree="true"  @change="calendarchange" />
        <!-- 选择食堂类型 -->
        <van-dropdown-menu>
          <van-dropdown-item v-model="canteenId" :options="canteenList" @change="handleDrop()"/>
        </van-dropdown-menu>
      </div>
      <!-- tab切换 -->
      <div class="tab-box">
        <ly-tab v-model="selectedId" :items="items" :options="options" @change="handlerChange"></ly-tab>
      </div>
      <div class="divine"></div>
      <!-- 展示区 -->
      <div class="content-wrap">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
            v-model="loading" 
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            :immediate-check="false">
            <AllOrder :orderlist="orderlist"></AllOrder>
          </van-list>
        </van-pull-refresh>
      </div>

  </div>
</template>

<script>
import Header from '../../components/Header'
import calendar from '../../components/calendar'
import AllOrder from './components/AllOrder'
export default {
  components:{Header,calendar,AllOrder},
  data(){
    return{
      datetime: "",
      datetime1: "",
      //选择食堂类型
      canteenId: "",
      canteenList:[],
      //ly-tab配置开始
      selectedId: 0,
      items: [
        { label: "全部" },
        // { label: "待付款" },
        { label: "待取餐" },
        { label: "已取餐" },
        { label: "已退餐" },
        { label: "已过期" },
      ],
      options:{
        activeColor: "#FF5D62",
      },
      label:'全部',
      //ly-tab配置结束
      //订单请求参数
      paramsdata:{
        method:'app.appOrder.appOrderListHFive',
        company_id: sessionStorage.getItem('company_id'),
        user_id: sessionStorage.getItem('user_id'),
        canteen_id:'',
        signs:'0',
        status:'',
        start_time:'',
        end_time:'',
        delete_status:'0',
        currpage:1,
        count:1,
      },
      loading: true,
      finished: false,
      refreshing: false,
      orderlist:[],//订单列表
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
    this.paramsdata.start_time = nowYear + "-" + nowMonth + "-" + nowDay;
    //当前时间的后7天
    var dateTime= new Date(getNowDate) // this.startTime = '2022-05-02'
    dateTime.setDate(dateTime.getDate() + 6)
    this.paramsdata.end_time = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + "-" + dateTime.getDate();
    //请求
    this.initVoteList('init')
  },
  methods:{
    //订单请求
    async getdata(){
        // this.paramsdata.start_time = '2022-8-5'
        // this.paramsdata.end_time = '2022-8-11'
        let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
        let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
        let res = await this.$post('/router/rest/',encrypSendData)
        // console.log(this.paramsdata);
        // console.log(res.data);
        if(res.data.length >0) {
          return res.data
        } else {
          return []
        }
    },
    async initVoteList(type) {
      let voteList = await this.getdata()
      this.finished = false
      if (type == 'onRefresh') {
        this.orderlist = voteList
        this.refreshing = false
        this.finished = false
      } else {
        this.orderlist = [...this.orderlist, ...voteList]
        this.loading = false
      }
      if (voteList.length === 0) {
        this.finished = true
      }
      // console.log(this.paramsdata.currpage)
      // console.log(this.orderlist)
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
            this.initVoteList('onRefresh')
        }, 1000);
    },
    // 日历触发事件
    calendarchange(e){
      this.paramsdata.start_time = e.start_time
      this.paramsdata.end_time = e.end_time
      this.orderlist = []
      this.paramsdata.currpage = 1
      this.initVoteList()
    },
    //选择食堂获取对应id
    handleDrop(){
      this.orderlist = []
      this.paramsdata.currpage = 1
      // this.finished = false
      this.paramsdata.canteen_id=this.canteenId
      this.initVoteList()
    },
    //tab切换触发
    handlerChange(e){
      this.orderlist = []
      this.paramsdata.currpage = 1
      if(e.label == '待取餐'){
        this.paramsdata.status = 0
        this.initVoteList()
      }else if(e.label == '已取餐'){
        this.paramsdata.status = 1
        this.initVoteList()
      }else if(e.label == '已退餐'){
        this.paramsdata.status = -1
        this.initVoteList()
      }else if(e.label == '已过期'){
        this.paramsdata.status = 2
        this.initVoteList()
      }else if(e.label == '全部'){
        this.paramsdata.status = ""
        this.initVoteList()
      }
      this.label=e.label
    },
    jumpRouter() {
      this.$router.push('/index')
    }
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
.order-wrap{
  width: 100%;
  min-height: 100%;
  background: #f6f6f6;
  .header{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
  .select-wrap{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    padding: 0 16px;
    background: #fff;
    .van-dropdown-menu{
      // padding-left: 20px;
        /deep/ .van-dropdown-menu__bar{
            box-shadow:0 0 0 0;
            // height: 0;
        }
        /deep/ .van-dropdown-item__content{
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    }

  }
  .tab-box{
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    .ly-tab{
      /deep/ .ly-tab-list{
      }
      /deep/ .ly-tabbar{
        box-shadow:0 0 0 0;
        border-bottom: 0;
        background: #fff;
      }
    }
  }
  .divine{
    height: 132px;
  }
}
.order-food{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
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
</style>