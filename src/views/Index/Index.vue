<template>
  <div class="home">
    <!-- 头部 -->
    <Header :mealdata="mealdata" :carddata="carddata"></Header>
    <!-- 公告 -->
    <Notice :noticedata="noticedata"></Notice>
    <!-- 导航栏 -->
    <Nav :navdata="navdata"></Nav>
    <!-- 轮播 -->
    <Swiper :swiperdata="swiperdata"></Swiper>
    <!-- 食堂列表 -->
    <Commodity :commoditydata="commoditydata" :carddata="carddata"></Commodity>
    <!-- 第一次修改密码弹窗 -->
    <div class="edit-dialog" v-if="isDialogEdit">
      <div class="dialog-wrap">
        <div class="title">
          <span>登录成功！为确保账号安</span>
          <span>全，建议先修改密码</span>
        </div>
        <div class="footer">
          <div class="editPass" @click="handleEdit()">修改密码</div>
          <div class="cancel" @click="handleRem()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Notice from './components/Notice'
import Nav from './components/Nav'
import Swiper from './components/Swiper'
import Commodity from './components/Commodity'
export default {
  name: 'Home',
  components:{Header,Notice,Nav,Swiper,Commodity},
  data(){
    return{
      loading:true,
      isDialogEdit:false,
      //食堂订餐参数
      fooddata:{
        method:'app.appfood.casAll',
        company_id:sessionStorage.getItem('company_id'),
        is_meal:'1',
        dine_way:'1',
        user_id:sessionStorage.getItem('user_id'),
      },
      //食堂报餐参数
      mealparamsdata:{
        method:'app.appfood.casAll',
        company_id:sessionStorage.getItem('company_id'),
        is_meal:'1',
        dine_way:'2',
        user_id:sessionStorage.getItem('user_id'),
      },
      //首页公告参数
      paramsdata: {
        method: 'act.message.list',
        count: '15',
        currpage: '1',
        company_id:sessionStorage.getItem('company_id'),
        user_id:sessionStorage.getItem('user_id'),
      },
      //饭卡信息所需参数
      cardinfo:{
        method:'card.meal.MyMealCard',
        user_id:sessionStorage.getItem('user_id'),
      },
      //饭卡余额参数
      balancedata:{
        method:'card.meal.getMoneyByUserId',
        user_id:sessionStorage.getItem('user_id'),
      },
      //菜单导航
      navparamsdata:{
        method:'h5conf.menu.getList',
      },
      commoditydata:[],//食堂订餐列表数据
      navdata:[],//菜单导航
      swiperdata:'',//轮播图
      noticedata:[],//首页公告
      carddata:{},//饭卡信息
      mealdata:'',//饭卡余额
      canteenArray:[],//存食堂名字和食堂id
      canteenArray1:[],
      canteenArray2:[],//存报餐食堂
    }
  },
  created(){
    this.getdata()
  },
  methods:{
    getdata(){
      // 首页底部食堂订餐列表和轮播所需的参数
      let sendData = {...this.fooddata, ...this.myFun.getDefaultParameters()}
      // console.log(sendData)
      let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
      //首页公告所需参数
      let sendData1 = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData1 = this.myFun.encryptByMessage(JSON.stringify(sendData1))
       //首页饭卡信息所需参数
      let sendData3 = {...this.cardinfo, ...this.myFun.getDefaultParameters()}
      let encrypSendData3 = this.myFun.encryptByMessage(JSON.stringify(sendData3))
      //首页饭卡余额所需参数
      let sendData2 = {...this.balancedata, ...this.myFun.getDefaultParameters()}
      let encrypSendData2 = this.myFun.encryptByMessage(JSON.stringify(sendData2))
      //报餐食堂
      let sendData4 = {...this.mealparamsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData4 = this.myFun.encryptByMessage(JSON.stringify(sendData4))
      //菜单导航
      let sendData5 = {...this.navparamsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData5 = this.myFun.encryptByMessage(JSON.stringify(sendData5))
      //使用Promise.all批量并发请求
      Promise.all([this.$post('/router/rest/',encrypSendData),this.$post('/router/rest/',encrypSendData1),this.$post('/router/rest/',encrypSendData3),this.$post('/router/rest/',encrypSendData2),this.$post('/router/rest/',encrypSendData4),this.$post('/router/rest/',encrypSendData5)])
      .then(res=>{
        // console.log(res)
        //轮播图
        this.swiperdata=res[0].data.imgcode
        //食堂列表
        this.commoditydata=res[0].data.canteen
        //抽离出来食堂名字和食堂id存到vuex当中方便其他页面使用
        this.commoditydata.forEach(item=>{
          let obj={
            text:item.name,
            value:item.id
          }
          this.canteenArray.push(obj)
        })
        this.canteenArray.unshift({
          text:'全部食堂',
          value:''
        })
        this.$store.dispatch('setCanteenList',this.canteenArray)
        //不包括全部食堂的下拉框的数组
        this.commoditydata.forEach(item=>{
          let obj={
            text:item.name,
            value:item.id
          }
          this.canteenArray1.push(obj)
        })
        let canteenArray2=JSON.stringify(this.canteenArray1)
        sessionStorage.setItem('canteenArray1',canteenArray2)
        //首页公告
        this.noticedata=res[1].data
        //饭卡信息
        this.carddata=res[2].data
        sessionStorage.setItem('cardType_id', res[2].data.cardtype_id)
        //首页饭卡余额
        this.mealdata=res[3].msg
        //报餐食堂
        res[4].data.canteen.forEach(item=>{
            let obj={
              text:item.name,
              value:item.id
            }
            this.canteenArray2.push(obj)
        })
        this.canteenArray2.unshift({
          text:'全部食堂',
          value:''
        })
        this.$store.dispatch('setMealList',this.canteenArray2)
        //菜单导航
        this.navdata=res[5].data
      })
    },
    //点击弹窗修改密码
    handleEdit(){
      this.$router.push('/lastpass')
    },
    //点击弹窗取消
    handleRem(){
      this.isDialogEdit=false
    },
  }
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  min-height: 100%;
  background: #F6F6F6;
  .edit-dialog{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .dialog-wrap{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 275px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      box-sizing: border-box;
      .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
        color: #000000;
        line-height: 26px;
        padding: 34px 0;
        border-bottom: 1px dashed #eee;
      }
      .footer{
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        text-align: center;
        .editPass{
          flex: 1;
          color: #FF5D62;
          border-right: 1px dashed #eee;
        }
        .cancel{
          flex: 1;
          color: #5D5D5D;
        }
      }
    }
  }
}
</style>