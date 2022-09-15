import Vue from 'vue'
import VueRouter from 'vue-router'

const Index=()=>import('../views/Index/Index.vue') //首页
const Login=()=>import('../views/Login/Login.vue') //登录页
const Notice=()=>import('../views/Notice/Notice.vue') //公告
const NotideDetail=()=>import('../views/Notice/NotideDetail.vue') //公告详情
const Vote=()=>import('../views/Vote/Vote.vue') //投票中心
const Recharge=()=>import('../views/Recharge/Recharge.vue') //充值中心
const PaymentRec=()=>import('../views/Recharge/PaymentRec.vue') //充值支付
const VoteDetail=()=>import('../views/Vote/VoteDetail.vue') //投票详情
const Personal=()=>import('../views/Personal/Personal.vue') //个人中心
const Information=()=>import('../views/Personal/Information.vue') //个人信息
const Collection=()=>import('../views/Personal/Collection.vue') //人脸采集
const MealCard=()=>import('../views/Personal/MealCard.vue') //饭卡码
const LastPass=()=>import('../views/Personal/LastPass.vue') //密码管理
const Address=()=>import('../views/Personal/Address.vue') //地址管理
const AddAddress=()=>import('../views/Personal/AddAddress.vue') //新增配送地址
const EditAddress=()=>import('../views/Personal/EditAddress.vue') //编辑配送地址
const Consume=()=>import('../views/Consume/Consume.vue') //消费记录
const ConsumeDel=()=>import('../views/Consume/ConsumeDel.vue') //消费详情
const Appeal=()=>import('../views/Consume/Appeal.vue') //扣款申诉
const Schedule=()=>import('../views/Consume/Schedule.vue') //申诉进度
const ComplaintDel=()=>import('../views/Consume/ComplaintDel.vue') //申诉详情
const Search=()=>import('../views/Proposal/Search.vue') //搜索留言
const leaveMsgDel=()=>import('../views/Proposal/leaveMsgDel.vue') //留言详情
const LeaveMsg=()=>import('../views/Proposal/LeaveMsg.vue') //我要留言
const OrderFood=()=>import('../views/OrderFood/OrderFood.vue') //订餐
const Order=()=>import('../views/Order/Order.vue') //订单中心
const OrderDel=()=>import('../views/Order/OrderDel.vue') //订单详情
const Remark=()=>import('../views/OrderFood/Remark.vue') //订单备注
const ConfirmOrder=()=>import('../views/OrderFood/ConfirmOrder.vue') //确认订单
const Payment=()=>import('../views/OrderFood/Payment.vue') //订单结算
const PayResult=()=>import('../views/OrderFood/PayResult.vue') //支付结果
const MealOrder=()=>import('../views/Index/MealOrder.vue') //报餐
const StallList=()=>import('../views/Index/StallList.vue') //报餐档口
const MealReport=()=>import('../views/Index/MealReport.vue') //报餐记录
const FreeLogin=()=>import('../views/Login/Enroll.vue') //授权加载

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice
  },
  {
    path: '/notidedetail',
    name: 'NotideDetail',
    component: NotideDetail
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: Recharge
  },
  {
    path: '/paymentRec',
    name: 'PaymentRec',
    component: PaymentRec
  },
  {
    path: '/votedetail',
    name: 'VoteDetail',
    component: VoteDetail
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/information',
    name: 'Information',
    component: Information
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/mealcard',
    name: 'MealCard',
    component: MealCard
  },
  {
    path: '/lastpass',
    name: 'LastPass',
    component: LastPass
  },
  {
    path: '/address',
    name: 'Address',
    component: Address
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: AddAddress
  },
  {
    path: '/editAddress',
    name: 'EditAddress',
    component: EditAddress
  },
  {
    path: '/consume',
    name: 'Consume',
    component: Consume
  },
  {
    path: '/consumedetail',
    name: 'ConsumeDel',
    component: ConsumeDel
  },
  {
    path: '/appeal',
    name: 'Appeal',
    component: Appeal
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/complaintdel',
    name: 'ComplaintDel',
    component: ComplaintDel
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/leaveMsgDel',
    name: 'leaveMsgDel',
    component: leaveMsgDel
  },
  {
    path: '/leavemsg',
    name: 'LeaveMsg',
    component: LeaveMsg
  },
  {
    path: '/orderfood',
    name: 'OrderFood',
    component: OrderFood,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/orderDel',
    name: 'OrderDel',
    component: OrderDel
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: ConfirmOrder
  },
  {
    path: '/remark',
    name: 'Remark',
    component: Remark
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/payResult',
    name: 'PayResult',
    component: PayResult
  },
  {
    path: '/mealOrder',
    name: 'MealOrder',
    component: MealOrder
  },
  {
    path: '/stallList',
    name: 'StallList',
    component: StallList
  },
  {
    path: '/mealReport',
    name: 'MealReport',
    component: MealReport
  },
  {
    path: '/freeLogin',
    name: 'FreeLogin',
    component: FreeLogin
  },
]

const router = new VueRouter({
  routes
})
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
//路由守卫
router.beforeEach((to,from,next)=>{
  let token = sessionStorage.token
  let currentTime = new Date().getTime()
  let tokenStartTime = localStorage.tokenStartTime
  let expiresTime = localStorage.expiresTime
  // 如果大于说明是token过期了
  if(currentTime - tokenStartTime > expiresTime) {     
    token = null
  }
  if (!token) {
    if (to.path == '/login') return next()
    // console.log("登录状态过期，请重新登录")
    return next('/login')
  }
  next()
})


export default router
