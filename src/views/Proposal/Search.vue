<template>
  <div class="search-wrap">
      <div class="order-food">
          <div class="back" @click="jumpRouter">
              <img src="../../assets/orderfood/back.png" alt="">
          </div>
          <div class="title">留言建议</div>
      </div>
      <div class="leave-msg" @click="handlerLeave()">我要留言</div>
      <!-- 搜索框 -->
      <div class="input-wrap">
        <div class="serch-input">
          <van-icon name="search"  size="16" color="#959595" />
          <input type="text" v-model="key_word"  placeholder="请输入关键字进行搜索">
        </div>
        <div class="van-menu">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" />
          </van-dropdown-menu>
        </div>
      </div>

      <!-- 留言内容 -->
      <div class="container-wrap" v-if="msgList.length > 0">
        <ul class="container-list">
          <li class="container-item" v-for="item of key_words" :key="item.id" @click="toMsgDel(item.id)">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.content}}</div>
            <div class="time">
              <span class="date">{{item.add_time.substring(0,10)}}</span>
              <span class="status" v-if="item.repcount == 0">未答复</span>
              <span class="success" v-else>已答复</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 没有留言 -->
      <div class="empty_wrap" v-if="msgList.length == 0">
        <img src="../../assets/Search/empty.png" alt="">
        <span class="empty_txt">暂无相关留言哦~</span>
      </div>


  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components:{Header},
  data(){
    return{
      key_word:'',
      value:0,//下拉选项
      option:[
        { text: '全部', value: 0 },
        { text: '未答复', value: 1 },
        { text: '已答复', value: 2 },
      ],
      //留言列表参数
      paramsdata:{
        method:'act.leave_message.list',
        currpage:1,
        count: 30,
        company_id:sessionStorage.getItem('company_id'),
        user_id:sessionStorage.getItem('user_id'),
      },
      msgList:[],//留言列表
    }
  },
  created(){
    this.getActList()
  },
  methods:{
    jumpRouter(){
      this.$router.push('/index')
    },
    //留言列表接口
    getActList() {
      let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
      this.$post('/router/rest/', encrypSendData)
      .then(res=>{
        this.msgList=res.data
      })
    },
    //跳转到去留言
    handlerLeave(){
      this.$router.push('/leavemsg')
    },
    //跳转到详情
    toMsgDel(id){
      this.$router.push('/leaveMsgDel?id='+id)
    },
   /*  mySearch() {
      console.log(this.key_word)
      console.log(this.msgList.filter((item) => item.title.includes(this.key_word)))
      
    } */
  },
  computed:{
    key_words(){
      if(this.value==1){
        if(this.key_word) {
          return this.msgList.filter( item => {
            if(item.title.includes(this.key_word) && item.repcount.includes(0)) {
              return item
            }
          })
        } else {
          return this.msgList.filter((item) => item.repcount.includes(0));
        }
      }else if(this.value==2){
        if(this.key_word) {
          return this.msgList.filter( item => {
            if(item.title.includes(this.key_word) && item.repcount.includes(1)) {
              return item
            }
          })
        } else {
          return this.msgList.filter((item) => item.repcount.includes(1));
        }
      }
      return this.msgList.filter((item) => item.title.includes(this.key_word));
    }
  }
}
</script>

<style lang="less" scoped>
.search-wrap{
  width: 100%;
  min-height: 100%;
  background: #F6F6F6;
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
      .title{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-weight: 500;
          color: #FFFFFF;
      }
  }
  .leave-msg{
    position: fixed;
    top: 16px;
    right: 16px;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
    z-index: 100;
  }
  .input-wrap{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    background: #fff;
    .serch-input{
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 16px;
      .van-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 24px;
      }
      input{
        width: 261px;
        height: 24px;
        background: #E9E9E9;
        border-radius: 12px 12px 12px 12px;
        font-size: 11px;
        font-weight: 400;
        border: 0;
        box-sizing: border-box;
        padding-left: 31px;
      }
    }
    .van-menu{
      padding-right: 10px;
      .van-dropdown-menu{
          /deep/ .van-dropdown-menu__bar{
              box-shadow:0 0 0 0;
              height: 40px;
          }
          /deep/ .van-dropdown-item__content{
              border-bottom-left-radius: 15px;
              border-bottom-right-radius: 15px;
          }
      }
    }
  }
  //留言内容
  .container-wrap{
    margin-top: 84px;
    .container-list{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .container-item{
        width: 343px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        box-sizing: border-box;
        margin-top: 14px;
        padding: 12px;
        &:last-child{
          margin-bottom: 14px;
        }
        .title{
          font-size: 14px;
          font-weight: bold;
          color: #242424;
        }
        .content{
          width: 319px;
          font-size: 12px;
          font-weight: 400;
          color: #5D5D5D;
          height: 38px;
          line-height: 18px;
          display:-webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;  /* 几行超出隐藏就写几 */
          padding: 4px 0 6px;
        }
        .time{
          font-size: 12px;
          font-weight: 500;
          color: #FF543B;
          .date{
            color: #959595;
            &::after{
              content: '';
              border-right: 1px solid #959595;
              padding-right: 5px;
            }
          }
          .status{
            color: #FF543B;
            padding-left: 5px;
          }
          .success{
            color: #0AB583;
            padding-left: 5px;
          }
        }
      }
    }
  }
  //提示
  .empty_wrap{
    position: absolute;
    top: 96px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
    padding-top: 148px;
    img{
      width: 173px;
    }
    .empty_txt{
      font-size: 16px;
      font-weight: 400;
      color: #242424;
    }
  }
}
</style>