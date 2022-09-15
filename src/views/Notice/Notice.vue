<template>
  <div class="notice-wrap">
    <Header title="公告" class="header"></Header>
    <div class="notice-box" v-if="noticedata.length >0 ">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
        v-model="loading" 
        :finished="finished" 
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
        :immediate-check="false">
        <ul class="notice-list">
          <li class="notice-item" v-for="item in noticedata" :key="item.id" @click="btnNotice(item)">
            <div class="notice-icon">
              <img src="../../assets/notice/notice.png" alt="">
              <span class="tip" v-if="item.status== '未读'"></span>
            </div>
            <div class="notice-rec">
              <div class="rec-top">
                <div class="rec-title">{{item.title}}</div>
                <div class="rec-date">{{item.add_time.substring(11,16)}}</div>
              </div>
              <div class="rec-bottom" v-html="item.content">
              </div>
            </div>
          </li>
        </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 没有公告 -->
    <div class="empty" v-if="noticedata.length == 0 ">
      <img src="../../assets/notice/no-notice.png" alt="">
      <span>暂无相关信息哦~</span>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components:{Header},
  data(){
    return{
      noticedata:[],
      loading: true,
      finished: false,
      refreshing: false,
      paramsdata: {
        method: 'act.message.list',
        count: '10',
        currpage: '1',
        company_id:sessionStorage.getItem('company_id'),
        user_id:sessionStorage.getItem('user_id'),
      },
      
    }
  },
  created() {
    this.initNoticeList()
  },
  methods:{
    // 获取公告列表数据
    async getActList() {
      let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
      let { data: res } = await this.$post('/router/rest/', encrypSendData)
      return res
    },
    // 处理列表
    async initNoticeList(isRefresh) {
        let res = await this.getActList()
        if (isRefresh) {
            this.noticedata = res
            this.refreshing = false
            this.finished = false
        } else {
            this.noticedata = [...this.noticedata, ...res]
            this.loading = false
        }
        if (res.length === 0) {
            this.finished = true
        }
    },
    // 上拉加载处理函数
    onLoad() {
        this.paramsdata.currpage++
        setTimeout( () => {
            this.initNoticeList()
        },1500)
    },
    // 下拉刷新处理函数
    onRefresh() {
        setTimeout(() => {
            this.paramsdata.currpage=1
            this.initNoticeList(true) 
        }, 1000);
    },
    // 公告详情页
    btnNotice(item){
      let noticedel = JSON.stringify(item)
      this.$router.push('/notidedetail?noticedel='+noticedel)
    }
  }
}
</script>

<style lang="less" scoped>
.notice-wrap{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .notice-box{
    margin-top: 44px;
    .notice-list{
      .notice-item{
        display: flex;
        align-items: center;
        width: 100%;
        height: 53px;
        box-sizing: border-box;
        padding: 0 16px 12px 16px;
        margin-bottom: 13px;
        border-bottom: 1px solid #eee;
        &:nth-child(1){
          padding-top: 16px;
        }
        &:last-child{
          margin-bottom: 0;
        }
        .notice-icon{
          position: relative;
          width: 40px;
          height: 40px;
          img{
            width: 40px;
            height: 40px;
          }
          .tip{
            position: absolute;
            right: 0;
            top: 0;
            width: 8px;
            height: 8px;
            background: #FF543B;
            border-radius: 50%;
          }
        }
        .notice-rec{
          display: flex;
          flex: 1;
          flex-direction: column;
          padding-left: 12px;
          .rec-top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .rec-title{
              font-size: 14px;
              font-weight: 400;
              color: #242424;
              width: 182px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .rec-date{
              font-size: 12px;
              font-weight: 500;
              color: #959595;
            }
          }
          .rec-bottom{
            font-size: 12px;
            font-weight: 400;
            color: #5D5D5D;
            width: 282px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding-top: 4px;
          }
        }
      }
    }
  }
  .empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 253px;
    img{
      width: 173px;
    }
    span{
      font-size: 16px;
      color: #242424;
    }
  }
}
</style>