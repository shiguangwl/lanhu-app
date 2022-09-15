<template>
  <div class="confirm-order">
      <div class="order-food">
          <div class="back" @click="jumpRouter">
              <img src="../../assets/orderfood/back.png" alt="">
          </div>
          <div class="title">确认订单</div>
      </div>
      <!-- 单选框选择取餐方式 -->
      <div class="select-mode" v-show="currentsort === 0">
          <div class="lable">统一取餐</div>
          <div class="radio-wrap">
              <ul>
                  <li>
                      <input type="radio" v-model="radio" name="mode" value="1" class="icon_btn" @change="handeRio()">
                      <span class="icon_text">外卖配送</span>
                  </li>
                  <li>
                      <input type="radio" v-model="radio" name="mode" value="2" class="icon_btn" @change="handeRio()">
                      <span class="icon_text">食堂自取</span>
                  </li>
                  <li>
                      <input type="radio" v-model="radio" name="mode" value="3" class="icon_btn" @change="handeRio()">
                      <span class="icon_text">到店堂食</span>
                  </li>
              </ul>
          </div>
          <div class="choose-mode" @click="handleSel()">
              <img src="../../assets/orderfood/more3.png" alt="">
          </div>
      </div>
      <!-- 自定义取餐方式 -->
      <div class="custom-mode" v-show="currentsort === 1" @click="handleSel()">
          <div class="lable">自定义取餐</div>
          <img src="../../assets/orderfood/more.png" alt="" class="more">
      </div>

      <div class="divine"></div>

      <!-- 选择外卖配送 -->
      <div class="content-wrap">
          <!-- 统一取餐tab -->
          <div class="tab" v-if="currentsort === 0">
              <div class="text">{{radioText}}</div>
          </div>
          <!-- 自定义取餐tab -->
          <div class="custom-tab" v-if="currentsort === 1">
              <ul>
                  <li :class="{activeCus:index==numCus}" v-for="(item,index) in customTab" :key="index" @click="handleCus(index)">
                      {{item}}
                  </li>
              </ul>
          </div>
          <!-- 统一取餐地址和配送时间 -->
          <div class="delivery" v-if="currentsort == 0 && radio == 1">
              <div class="delivery-addr" @click="handleAddr()" v-if="!chooseAddr">
                  <span class="text">请选择配送地址</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
               <div class="select-addr" @click="handleAddr()" v-else>
                  <div class="addr-info">
                      <div class="address">{{chooseAddr.firstlevel}} {{chooseAddr.senodlevel}} {{chooseAddr.threelevel}} {{chooseAddr.details}}</div>
                      <div class="info">
                          <span class="name">{{chooseAddr.name}}</span>
                          <span class="phone">{{chooseAddr.phone}}</span>
                      </div>
                  </div>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <div class="delivery-date" @click="handleDelivery()">
                  <span class="text">配送时间</span>
                  <span class="date" v-if="!timedate">请选择配送时间</span>
                  <span class="date" v-else>{{timedate}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <span class="bage1"></span>
              <span class="bage2"></span>
          </div>
          <!-- 统一取餐食堂自取 -->
          <div class="invite" v-if="currentsort == 0 && radio == 2">
              <div class="delivery-addr">
                 {{canteenAddr}}
              </div>
              <div class="delivery-date" @click="handleDelivery()">
                  <span class="text">自取时间</span>
                  <span class="date" v-if="!timedate">请选择配送时间</span>
                  <span class="date" v-else>{{timedate}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <div class="delivery-date" @click="showPat()">
                  <span class="text">自提方式</span>
                  <span class="date">{{patText}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <div class="delivery-date" @click="showLift()" v-if="patText == '餐柜自提'">
                  <span class="text">选择餐柜</span>
                  <span class="date">{{liftText}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <span class="bage1"></span>
              <span class="bage2"></span>
          </div>
          <!-- 统一取餐到店堂食 -->
          <div class="toCanteen" v-if="currentsort == 0 && radio == 3">
              <div class="delivery-addr">
                  <span class="text">{{canteenAddr}}</span>
                  <!-- <img src="../../assets/orderfood/more.png" class="more" alt=""> -->
              </div>
              <div class="delivery-date" @click="handleDelivery()">
                  <span class="text">堂食时间</span>
                  <span class="date" v-if="!timedate">请选择配送时间</span>
                  <span class="date" v-else>{{timedate}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <span class="bage1"></span>
              <span class="bage2"></span>
          </div>
          <!-- 自定义地址和配送时间 -->
          <div class="delivery" v-if="numCus == 0 && currentsort == 1">
              <div class="delivery-addr" @click="handleAddr()" v-if="!chooseAddr">
                  <span class="text">请选择配送地址</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
               <div class="select-addr" @click="handleAddr()" v-else>
                  <div class="addr-info">
                      <div class="address">{{chooseAddr.firstlevel}} {{chooseAddr.senodlevel}} {{chooseAddr.threelevel}} {{chooseAddr.details}}</div>
                      <div class="info">
                          <span class="name">{{chooseAddr.name}}</span>
                          <span class="phone">{{chooseAddr.phone}}</span>
                      </div>
                  </div>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>

              <div class="delivery-date" @click="handleDelivery()">
                  <span class="text">配送时间</span>
                  <span class="date" v-if="!timedate">请选择配送时间</span>
                  <span class="date" v-else>{{timedate}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <span class="bage1"></span>
              <span class="bage2"></span>
          </div>
          <!-- 自定义食堂自取 -->
          <div class="invite" v-if="numCus == 1 && currentsort == 1">
              <div class="delivery-addr">
                 {{canteenAddr}}
              </div>
              <div class="delivery-date" @click="handleDelivery()">
                  <span class="text">自取时间</span>
                  <span class="date" v-if="!timedate">请选择配送时间</span>
                  <span class="date" v-else>{{timedate}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <div class="delivery-date" @click="showPat()">
                  <span class="text">自提方式</span>
                  <span class="date">{{patText}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <div class="delivery-date" @click="showLift()" v-if="patText == '餐柜自提'">
                  <span class="text">选择餐柜</span>
                  <span class="date">{{liftText}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <span class="bage1"></span>
              <span class="bage2"></span>
          </div>
          <!-- 自定义到店堂食 -->
          <div class="toCanteen" v-if="numCus == 2 && currentsort == 1">
              <div class="delivery-addr">
                  <span class="text">{{canteenAddr}}</span>
                  <!-- <img src="../../assets/orderfood/more.png" class="more" alt=""> -->
              </div>
              <div class="delivery-date" @click="handleDelivery()">
                  <span class="text">堂食时间</span>
                  <span class="date" v-if="!timedate">请选择配送时间</span>
                  <span class="date" v-else>{{timedate}}</span>
                  <img src="../../assets/orderfood/more.png" class="more" alt="">
              </div>
              <span class="bage1"></span>
              <span class="bage2"></span>
          </div>
          <!-- 商品信息 -->
          <div class="food-wrap">
              <div class="header">
                  <span class="canteen">{{cartParams.canteenName}}</span>
                  <span class="time">{{placeOrder[0].orderDay}} {{placeOrder[0].dKouArray[0].mealArray[0].mealName}}</span>
              </div>
              <ul class="food-list">
                  <li class="food-item" v-for="(food,index) in cartList" :key="index">
                      <img :src="'data:image/png;base64,'+food.imgcode" alt="" class="photo">
                      <div class="food-list-hook">
                          <div class="title">
                              <img src="../../assets/orderfood/yi.png" alt="">
                              <span class="name">{{food.food_name}}</span>
                          </div>
                           <div class="batching">
                                <span class="protein">蛋白质：{{Math.floor(food.protein)}}克 |</span>
                                <span class="calorie">卡路里：{{Math.floor(food.calorie)}}卡</span>
                            </div>
                            <div class="food-tariff">
                                <div class="quantity">
                                    <span class="num">x{{food.count}}</span>
                                    <span class="label">{{placeOrder[0].dKouArray[0].dKouName}}</span>
                                </div>
                                <div class="price">
                                    <span class="mark">¥</span>
                                    <span class="number">{{food.inner_price}}</span>
                                </div>
                            </div>

                      </div>
                  </li>
              </ul>
          </div>
          <!-- 打包费 -->
          <div class="cost-msg">
              <ul class="cost-list">
                  <li v-show="radio ==2 || numCus == 1">
                      <div class="lable">打包费</div>
                      <div class="price">
                          <span class="mark">￥</span>
                          <span class="num">{{oneCost}}</span>
                      </div>
                  </li>
                  <li v-show="radio ==1 || numCus == 0">
                      <div class="lable">配送费</div>
                      <div class="price">
                          <span class="mark">￥</span>
                          <span class="num">{{giveCost}}</span>
                      </div>
                  </li>
                  <li>
                      <div class="lable">优惠</div>
                      <div class="price">
                          <span class="marks">￥</span>
                          <span class="nums">{{parseFloat(this.discountPrice).toFixed(2)}}</span>
                      </div>
                  </li>
              </ul>
              <div class="gather">
                  <span class="text">总数量：</span>
                  <span class="num">x{{cartList.length}}</span>
                  <span class="subtotal">小计：￥{{parseFloat(cartParams.totalPrice).toFixed(2)}}</span>
              </div>
          </div>
          <!-- 备注 -->
          <div class="remarks" @click="handleRemark()">
              <span class="lable">备注</span>
              <input type="text" placeholder="在此输入备注信息" disabled v-model="remark">
              <img src="../../assets/orderfood/more.png" class="more" alt="">
          </div>

      </div>
      <div class="divine2"></div>
      <!-- 底部结算 -->
      <div class="footer-pay">
          <img src="../../assets/orderfood/cart.png" alt="" class="icon">
          <span class="bage">{{cartList.length}}</span>
          <div class="price">
              <span class="new">
                  ¥{{parseFloat(this.newPrice - this.discountPrice).toFixed(2)}}
              </span>
              <span class="old">¥{{parseFloat(this.newPrice).toFixed(2)}}</span>
          </div>
          <button @click="btnPayment()">去结算</button>
      </div>

      <!-- 统一取餐、自定义取餐弹窗 -->
      <transition name="fade">
      <div class="select-popup" v-if="isSortDialog" @click.self="hideView">
          <div class="popup-wrap">
              <div class="title">选择取餐方式</div>
              <img src="../../assets/orderfood/close1.png" alt="" class="close" @click="handlerClose()">
              <ul class="mode-list">
                  <li class="mode-item" v-for="(item,index) in sortBy" :key="index" @click="handlerSort(index)">
                      <span class="lable">{{item}}</span>
                      <img src="../../assets/orderfood/dui.png" alt="" v-if="currentsort == index" class="dui">
                  </li>
              </ul>
          </div>
      </div>
      </transition>

      <!-- 自提方式取餐弹窗 -->
      <transition name="fade1">
      <div class="pattern-popup" v-if="isPatternDialog" @click.self="handlePat">
          <div class="pattern-wrap">
              <div class="title">选择取餐方式</div>
              <img src="../../assets/orderfood/close1.png" alt="" class="close" @click="closePat()">
              <ul class="mode-list">
                  <li class="mode-item" v-for="(item,index) in pattern" :key="index" @click="btnPat(item,index)">
                      <span class="lable">{{item}}</span>
                      <img src="../../assets/orderfood/dui.png" alt="" v-if="currentMode == index" class="dui">
                  </li>
              </ul>
          </div>
      </div>
      </transition>

      <!-- 选择餐柜弹窗 -->
      <transition name="fade1">
      <div class="pattern-popup" v-if="isLiftDialog" @click.self="handleLift">
          <div class="pattern-wrap">
              <div class="title">选择取餐方式</div>
              <img src="../../assets/orderfood/close1.png" alt="" class="close" @click="closeLift()">
              <ul class="mode-list">
                  <li class="mode-item" v-for="(item,index) in liftdata" :key="index" @click="btnLift(item.id,index)">
                      <span class="lable">{{item.name}}</span>
                      <img src="../../assets/orderfood/dui.png" alt="" v-if="currentLift == index" class="dui">
                  </li>
              </ul>
          </div>
      </div>
      </transition>

      <!-- 配送地址弹窗 -->
      <transition name="fade2">
      <div class="addr-popup" v-if="isAddrDialog" @click.self="handleSite">
          <div class="addr-wrap">
              <div class="title">选择配送地址</div>
              <img src="../../assets/orderfood/close1.png" alt="" class="close" @click="isAddrDialog = false">
              <!-- 可选地址 -->
              <div class="choose-addr" v-if="myAddressList">
                  <ul>
                      <li class="choose-item" v-for="(item,index) in myAddressList" :key="index" @click="handleChoose(index,item)">
                          <div class="radio">
                              <img src="../../assets/orderfood/radio.png" alt="" v-if="activeAddr == index">
                          </div>
                          <div class="information">
                              <div class="info">
                                  <span class="name">{{item.name}}</span>
                                  <span class="phone">{{item.phone}}</span>
                              </div>
                              <div class="address">{{item.firstlevel}} {{item.senodlevel}} {{item.threelevel}} {{item.details}}</div>
                          </div>
                          <img src="../../assets/personal/edit.png" alt="" class="edit" @click="btnEditAddr(item)">
                      </li>
                  </ul>
              </div>
              <div class="empty" v-if="myAddressList.length<=0">
                  <img src="../../assets/personal/no-address.png" alt="">
                  <span>暂无相关地址哦~</span>
              </div>
              <!-- 超出范围 -->
              <!-- <div class="range-addr">
                  <div class="text">超出配送范围地址</div>
                  <ul>
                      <li class="range-item">
                          <div class="information">
                              <div class="info">
                                  <span class="name">李星河</span>
                                  <span class="phone">13649756812</span>
                              </div>
                              <div class="address">科学城创意大厦B2栋1801</div>
                          </div>
                          <img src="../../assets/personal/edit.png" alt="" class="edit">
                      </li>
                  </ul>
              </div> -->
              <!-- 新增地址按钮 -->
              <div class="btnAdd" @click="btnAddAddr()">
                  <button>新增配送地址</button>
              </div>

          </div>
      </div>
      </transition>
      
  </div>
</template>

<script>
import Header from '../../components/Header'
import {mapState} from 'vuex'
//价格补零
const Price=require('e-commerce_price')
export default {
    components:{Header},
    data(){
        return{
            radioText:"外卖配送",
            radio: 1,//单选框选择
            sortBy:['统一取餐方式','自定义取餐方式'],//选择取餐方式
            currentsort:0,//统一取餐和自定义取餐的索引
            isSortDialog:false,
            customTab:['外卖配送','食堂自取','到店堂食'],
            numCus:0,
            pattern:['窗口自提','餐柜自提'],//选择自提方式
            currentMode:0,//选择自提方式
            isPatternDialog:false,
            patText:'窗口自提',
            liftdata:[],//获取主机
            currentLift:-1,//选择自提方式
            liftText:'请选择餐柜',
            isLiftDialog:false,
            //配送地址弹窗
            isAddrDialog:false,
            // 配送地址列表
            activeAddr:0,
            myAddressList:[],
            //配送时间
            timedate:'',
            //拼接地址
            orderingAddressdetail:'',
            //优惠价格
            discountPrice:0,
            //自提所需参数
            buffet:{},
            //最终价格
            newPrice:0,
        }
    },
    created() {
        let self = this
        window.chooseTime = function (i) {
            self.chooseTime(i)
        }
        this.DeliveryTimePicker.init(
        {
            dayRange: 1, // 日期的显示数量，从今天起往后推
            timeInterval: 30, // 时间的间隔，单位分钟
            startTime: 8, // 时间范围的开始（开始营业的时间）
            endTime: 24, // 时间范围的结束（结束营业的时间）
            showDate: false, // 显示‘今天/明天/后天’还是全部显示日期
            showWeekday: true, // 是否显示周几
            clickOutside: true, // 点击选择器外部关闭，默认true开启
            // 选择时间后的回调函数
            callback: function (str, time) {
            var timearr=str.replace(" ", ":").replace(/\:/g, "-").split("-")
            var time=""+timearr[3]+ " ：" + timearr[4]+" ";
            self.timedate=time.replace('立即配送',"").replace('(',"").replace(')',"")
            // console.log(str)
            }
        },
        "" // 要将控件添加到指定的dom下面，注意要加#号，此参数如果不写默认添加到body最后
        );
        //获取地址列表
        this.getAddress()
        //获取可用主机
        this.getHost()
        //查询优惠
        this.getdata()
    },
    methods:{
        //查询可用主机
        getHost(){
            let data={
                method:'base.sideboard.queryTheHost',
                company_id: sessionStorage.getItem('company_id'),
                status:2,
                canteen_id:this.cartParams.canteenId
            }
            let sendData = {...data, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                this.liftdata=res.data
                // console.log(res,'获取主机')
            })

        },
        //单选框事件
        handeRio(){
            this.numCus=this.radio-1
            if(this.radio=="1"){
                this.newPrice=parseFloat(this.cartParams.totalPrice)+parseFloat(this.giveCost)
                this.radioText="外卖配送"
            }else if(this.radio=="2"){
                this.newPrice=parseFloat(this.cartParams.totalPrice)+parseFloat(this.oneCost)
                this.radioText="食堂自取"
            }else{
                this.newPrice=this.cartParams.totalPrice
                this.radioText="到店堂食"
            }
        },
        //外卖配送地址弹窗
        handleAddr(){
            this.isAddrDialog=true
        },
        //我的地址请求
        getAddress(){
            let paramsdata={
                method:'sys.user.getUserAddress',
                user_id:sessionStorage.getItem('user_id'),
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                if(res.data) {
                    this.myAddressList = res.data
                    this.activeAddr = -1
                    if(this.chooseAddr) {
                        this.myAddressList.filter((item,i) => {
                            if(this.chooseAddr.id == item.id) {
                                this.activeAddr = i
                            }
                        })
                    }
                }
            })
        },
        //选择配送地址
        handleChoose(index,item){
            this.activeAddr=index
            this.$store.dispatch('setChooseAddr',item)
            this.isAddrDialog=false
        },
        //选择配送时间显示
        handleDelivery(){
            this.DeliveryTimePicker.show()
        },
        //选择配送时间
        chooseTime(i) {
            this.DeliveryTimePicker.chooseTime(i)
        },
        handleSite(){
            this.isAddrDialog=false
        },
        //点击进入修改地址
        btnEditAddr(obj){
            // console.log(obj)
            let editParam=JSON.stringify(obj)
            this.$router.push('/editAddress?editParam='+editParam)
        },
        //点击进入新增地址
        btnAddAddr(){
            this.$router.push('/addAddress')
            // this.$router.push({ name: 'AddAddress', params: { type: 'confirmOrderAddAddress' } })
        },
        //点击选择统一取餐、自定义取餐弹窗
        handleSel(){
            this.isSortDialog=true
        },
        //选择取餐方式
        handlerSort(index){
            this.currentsort=index
            this.isSortDialog=false
        },
        //自定义取餐tab切换
        handleCus(index){
            this.radio=index+1
            this.numCus=index
            if(index ==0){
                this.newPrice=parseFloat(this.cartParams.totalPrice)+parseFloat(this.giveCost)
            }else if(index == 1){
                 this.newPrice=parseFloat(this.cartParams.totalPrice)+parseFloat(this.oneCost)
            }else{
                this.newPrice=this.cartParams.totalPrice
            }
        },
        //点击取餐方式关闭
        handlerClose(){
            this.isSortDialog=false
        },
        //取餐方式点击阴影
        hideView(){
            this.isSortDialog=false
        },
        //关闭自提弹窗
        closePat(){
            this.isPatternDialog=false
        },
        //关闭选择餐柜
        closeLift(){
            this.isLiftDialog=false
        },
        //打开自提弹窗
        showPat(){
            this.isPatternDialog=true
        },
        //打开选择餐柜
        showLift(){
            this.isLiftDialog=true
        },
        //选择自提方式
        btnPat(item,index){
            this.currentMode=index
            this.patText=item
            this.isPatternDialog=false
        },
        //选择几号餐柜
        btnLift(id,index){
            this.currentLift=index
            let data={
                method:'base.sideboard.randomDrawing',
                company_id: sessionStorage.getItem('company_id'),
                canteen_id:this.cartParams.canteenId,
                hostid:id
            }
            let sendData = {...data, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                console.log(res,'获取餐柜')
                this.buffet=res.data[0]
                this.liftText=res.data[0].name
                this.isLiftDialog=false
            })
        },
        //跳转到订单备注
        handleRemark(){
            this.$router.push('/remark')
        },
        //点击自提弹窗阴影
        handlePat(){
            this.isPatternDialog=false
        },
        //点击餐柜弹窗阴影
        handleLift(){
            this.isLiftDialog=false
        },
        //查询优惠接口
        getdata(){
            let data={
                method:'app.appPlaceOrder.findCoupon',
                user_id:sessionStorage.getItem('user_id'),
                company_id:sessionStorage.getItem('company_id'),
                cardtype_id:sessionStorage.getItem('cardType_id'),
                card_id:sessionStorage.getItem('card_id'),
                canteen_id:this.cartParams.canteenId,
                bs_type:'0',
                orderingAddressdetail:this.orderingAddressdetail,
                placeOrder:this.placeOrder
            }
            let sendData = { ...data, ...this.myFun.getDefaultParameters() }
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res=>{
                // console.log(res)
                this.discountPrice=res.data[0]
            })
        },
        //去结算页
        btnPayment(){
            if(this.currentsort ==0&&this.radio==1){
                if(!this.chooseAddr){
                    this.$toast('请选择配送地址')
                    return
                }
                let idention="1"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$router.push('/payment')
            }else if(this.currentsort ==1&&this.numCus == 0){
                 if(!this.chooseAddr){
                    this.$toast('请选择配送地址')
                    return
                }
                let idention="1"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$router.push('/payment')
            }else if(this.currentsort ==0&&this.radio==2&&this.currentMode==0){
                let idention="2"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$router.push('/payment')
            }else if(this.currentsort ==0&&this.radio==2&&this.currentMode==1){
                if(this.currentLift == -1){
                    this.$toast('请选择餐柜')
                    return
                }
                let idention="3"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$store.dispatch('setBuffet',this.buffet)
                this.$router.push('/payment')
            }else if(this.currentsort ==1&&this.numCus==1&&this.currentMode==0){
                let idention="2"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$router.push('/payment')
            }else if(this.currentsort ==1&&this.numCus==1&&this.currentMode==1){
                if(this.currentLift == -1){
                    this.$toast('请选择餐柜')
                    return
                }
                let idention="3"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$store.dispatch('setBuffet',this.buffet)
                this.$router.push('/payment')
            }else{
                let idention="4"
                let paydata={
                    totalPrice:this.newPrice,
                    discountPrice:this.discountPrice,
                    canteenName:this.cartParams.canteenName,
                    canteenId:this.cartParams.canteenId,
                    idention:idention
                }
                this.$store.dispatch('setPaymentParams',paydata)
                this.$router.push('/payment')
            }
        },
        jumpRouter() {
            if(this.$route.params.type == "editAddress") {
                this.$router.go(-3)
            } else {
                this.$router.go(-1)
            }
            // console.log(this.$route)
        }
    },
    computed:{
        ...mapState(['chooseAddr','remark','placeOrder','cartList','giveCost','oneCost','canteenAddr','cartParams']),
    },
    watch:{
        "$store.state.chooseAddr":{
            handler(newVal){
                //拼接地址
                if(newVal){
                    this.orderingAddressdetail=newVal.firstlevel +newVal.senodlevel +newVal.threelevel +newVal.details
                }
            },
            deep: true,
            immediate: true,
        },
        "$store.state.cartParams":{
            handler(newVal){
                //拼接地址
                if(newVal){
                    this.newPrice=this.cartParams.newPrice
                }
            },
            deep: true,
            immediate: true,
        },
    }
}
</script>

<style lang="less" scoped>
@import url("../../common/css/confirm-order.less");
.order-food{
    // position: relative;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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