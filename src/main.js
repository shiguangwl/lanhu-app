import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

//请求
import { post} from './api/request'
Vue.prototype.$post = post

//引入移动端适配rem
import 'amfe-flexible'
// axios.defaults.baseURL = 'http://192.168.2.10:8082/public'
//vant
import { Swipe, SwipeItem,Calendar,Checkbox, CheckboxGroup,RadioGroup, Radio,Dialog,Tab, Tabs,DropdownMenu, DropdownItem,Step, Steps,Icon,Uploader,Form,Field,Toast,List,PullRefresh,AddressEdit,Area,Popup,Picker,Stepper,Lazyload,Loading  } from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Calendar).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio).use(Dialog).use(Tab).use(Tabs).use(DropdownMenu).use(DropdownItem).use(Step).use(Steps).use(Icon).use(Uploader).use(Form).use(Field).use(Toast).use(List).use(PullRefresh).use(AddressEdit).use(Area).use(Popup).use(Picker).use(Stepper).use(Lazyload).use(Loading)
import 'vant/lib/index.css';

// MintUi
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Indicator} from 'mint-ui';
Vue.use(MintUI)

// 使用横向滑动tab
import LyTab from 'ly-tab'
Vue.use(LyTab)

//弹出框禁⽌滑动
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁⽌页⾯滑动
}
//弹出框可以滑动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}

//配送时间
import './common/css/delivery-time-picker.css'
import DeliveryTimePicker from './common/js/delivery-time-picker'
Vue.prototype.DeliveryTimePicker = DeliveryTimePicker

// 公共函数
import defaultParameters from './api/public'
Vue.prototype.myFun = defaultParameters


//时间日期过滤器封装
import './filters/index'// 加载过滤器

Vue.use(Lazyload, {
  lazyComponent: true,
});

// 请求拦截：使用MintUi的Indicator组件实现请求加载动画开启
axios.interceptors.request.use(config=>{
  config.headers.Authorization = sessionStorage.getItem('token')
  //加载动画
  Indicator.open('加载中...');
  return config
},error=>{
  return Promise.reject(error);
}
);

//响应拦截：使用MintUi的Indicator组件实现请求加载动画关闭
axios.interceptors.response.use(response=>{
  Indicator.close();
  return response
},error=>{
  Indicator.close();
  return Promise.reject(error);
}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
