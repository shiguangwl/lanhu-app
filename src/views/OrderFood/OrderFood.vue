<template>
    <div class="order-wrap">
        <div class="batten">
            <div class="order-food">
                <div class="back" @click="jumpRouter">
                    <img src="../../assets/orderfood/back.png" alt="">
                </div>
                <div class="title">订餐</div>
            </div>
            <!-- 日期选择器和员工食堂 -->
            <div class="select-wrap">
                <calendar v-model="datetime" @change="calendarchange" ref="calendar"/>
                <div class="cut-canteen" @click="handleCan">
                    <span class="name">{{canteenName}}</span>
                    <img src="../../assets/orderfood/down.png" alt="" class="down">
                </div>
                <transition name="fade">
                <div class="overlay" v-if="isCanteen" @click="isCanteen=false">
                    <ul class="canteen-option" v-if="isCanteen">
                        <li class="canteen-item" v-for="(item,index) in canteenList" :key="index" :class="{active:index==activeCanteen}" @click="handleDrop(index,item.value,item.text)">{{item.text}}</li>
                    </ul>
                </div>
                </transition>
            </div>
            <!-- tab -->
            <div class="tab-wrap">
                <ul class="tab-list">
                    <li class="tab-item" v-for="(item, index) in mealpinList" :key="index"
                        :class="{ active: index == num }" @click="initMealpinList(index,item.id,item)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="divine"></div>
        <!-- 商家档口列表 -->
        <div class="shop-notch" v-if="isShow">
            <ul class="notch-list">
                <li class="notch-item" v-for="item in stalls" :key="item.id" @click="handleNotch(item)">
                    <img src="../../assets/orderfood/notch.png" alt="" class="storeImg">
                    <span class="name">{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="empty" v-if="isEmpty">
            <img src="../../assets/notice/no-notice.png" alt="">
            <span>暂无相关档口哦~</span>
        </div>
        <!-- 商品列表 -->
        <div class="goods-wrap" v-if="!isShow">
            <!-- 左边分类 -->
            <div class="menu-wrapper" ref="menuScroll">
                <ul class="menu-list">
                    <li class="menu-item" v-for="(item, index) in menudata" :key="index"
                        :class="{ menuActive: currentIndex == index }" @click="handlerMenu(index)">
                        <span class="menu">{{ item.name }}</span>
                        <i class="num" v-show="calculateCount(item.children)">
                            {{calculateCount(item.children)}}
                        </i>
                        <span class="line" v-show="currentIndex == index"></span>
                    </li>
                </ul>
            </div>
            <!-- 右边对应的分类菜品 -->
            <div class="foods-wrapper" ref="foodScroll">
                <ul class="foodsUl" ref="foodsUl">
                    <li class="food-list-hook" v-for="(item, index) in menudata" :key="index">
                        <div class="food-header">
                            <span class="name">{{item.name}}</span>
                        </div>
                        <ul class="food-list">
                            <li class="food-item" v-for="(food, index) in item.children" :key="index">
                                <div class="image" @click="handleFood(food)">
                                    <img :src="'data:image/png;base64,'+food.imgcode" alt="">
                                    <!-- <img :src="ip+food.img_url" alt=""> -->
                                </div>
                                <div class="content">
                                    <div class="food-title">
                                        <img src="../../assets/orderfood/yi.png" alt="" class="icon">
                                        <span class="food-name">{{food.food_name}}</span>
                                    </div>
                                    <div class="desc">
                                        <div class="batching">
                                            <span class="protein">蛋白质：{{Math.floor(food.protein)}}克 |</span>
                                            <span class="calorie">卡路里：{{Math.floor(food.calorie)}}卡</span>
                                        </div>
                                    </div>
                                    <div class="Taboo">
                                        <div class="crowd">不宜人群：</div>
                                        <img src="../../assets/orderfood/lable.png" alt="">
                                        <span class="illness">高血压</span>
                                        <img src="../../assets/orderfood/lable.png" alt="">
                                        <span class="illness">高血压</span>
                                    </div>

                                    <div class="food-tariff">
                                        <div class="price">
                                            <span class="mark">¥</span>
                                            <span class="num">{{food.inner_price}}</span>
                                        </div>
                                        <div class="quota">限购{{food.limit_qty}}份</div>
                                        <div class="cartcontrol-wrapper">
                                            <CartControll :foods="food"></CartControll>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 底部购物车组件 -->
        <ShopCart v-if="!isShow" class="shopcart" :shopInfo="menudata" :datetime="datetime" :notchObj="notchObj" :mealType="mealType" :canteenId="canteenId" :canteenName="canteenName" :giveEat="giveEat" :giveCost="giveCost" :oneEat="oneEat" :oneCost="oneCost"></ShopCart>
        <!-- 商品列表详情 -->
        <FoodDetail :food="selectFood" ref="showFoods"></FoodDetail>
    </div>
</template>

<script>
//使用BScroll
import BScroll from 'better-scroll'
import Header from '../../components/Header'
//引入底部购物车组件
import ShopCart from './components/ShopCart'
import CartControll from './components/CartControll'
import FoodDetail from './components/FoodDetails'
//日历
import calendar from "../../components/calendar";
export default {
    components: { Header, ShopCart, CartControll, FoodDetail, calendar },
    data() {
        return {
            ip:'http://tunnel.xxhoz.com:9080/',
            datetime: "",//得到日历时间
            //选择食堂类型
            canteenId:'',
            canteenName:'',
            isCanteen:false,
            activeCanteen:null,
            canteenList: JSON.parse(sessionStorage.getItem('canteenArray1')),
            //tab餐别
            num: 0,
            mealpinList: [],
            // 初始化默认餐别的ID
            firstMealTypeId: '',
            Allstalls: [],
            //是否有档口
            isEmpty:false,
            // 档口列表
            stalls: [],
            //tab切换不同档口参数
            paramsdata: {
                method: 'app.appfood.getCanteenStalls',
                cardtype_id: sessionStorage.getItem('cardType_id'),
                canteen_id: '',
                user_id: sessionStorage.getItem('user_id'),
                bs_time: '',
            },
            //显示和隐藏
            isShow: true,
            //左侧索引
            menuindex: 0,
            //食品列表数据
            menudata: [],
            //better-scroll滚动
            menuScroll: {},//存放分类滚动
            foodScroll: {},//存放商品滚动
            scrollY:0,
            tops:[],
            //存储点击哪张图片详情的对象数据
            selectFood:{},
            // 点击对应档口对象
            notchObj:{},
            //对应餐别对象
            mealType:{},
            //配送费用、自提费用
            giveEat:0,
            giveCost:0,
            oneEat:0,
            oneCost:0
        }
    },
    created() {
        //从首页跳转传来的食堂id
        let canteenId = this.$route.query.id
        this.canteenName = this.$route.query.name
        this.getMealType(canteenId)
        this.paramsdata.canteen_id = canteenId
        this.canteenId=canteenId
        this.activeCanteen = this.$route.query.index
        //获取当天年月日
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
        this.paramsdata.bs_time = nowYear + "-" + nowMonth + "-" + nowDay;
        this.datetime=nowYear + "-" + nowMonth + "-" + nowDay;
        //档口请求
        this.getStalls()
    },
    computed:{
        currentIndex(){
            const {scrollY,tops}=this
            const index=tops.findIndex((top,index)=>{
                return scrollY>=top && scrollY<tops[index+1]
            })
            return index
        }
    },
    watch:{
        "$store.state.power":{
            handler(newVal){
                if(newVal){
                    //配送费用、自提费用
                    this.giveEat=newVal.giveEat
                    this.giveCost=newVal.giveCost
                    this.oneEat=newVal.oneEat
                    this.oneCost=newVal.oneCost
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        jumpRouter() {
            if(this.isShow) {
                this.$router.go(-1)
                localStorage.selectFoods = []
            } else {
                this.isShow = !this.isShow
            }
        },
        calculateCount(spus){
            let count = 0
            spus.forEach((food) => {
                if(food.count > 0){
                    count += food.count
                }
            })
            return count
        },
        //tab餐别请求
        getMealType(canteenId) {
            let data = {
                method: 'app.appfood.getMealpinList',
                canteen_id: canteenId
            }
            let sendData = { ...data, ...this.myFun.getDefaultParameters() }
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res => {
                // console.log(JSON.parse(res.data.mealpinList))
                this.mealType.id=JSON.parse(res.data.mealpinList)[0].id
                this.mealType.name=JSON.parse(res.data.mealpinList)[0].name
                this.mealpinList = JSON.parse(res.data.mealpinList)
                this.firstMealTypeId = this.mealpinList[0].id
                this.getStalls()
            })
        },
        //档口列表
        getStalls() {
            let sendData = { ...this.paramsdata, ...this.myFun.getDefaultParameters() }
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/', encrypSendData)
            .then(res => {
                this.Allstalls = res.data.map(item => {
                    item.mealpin_ids = item.mealpin_ids.substring(1, item.mealpin_ids.length - 1).split(',')
                    return item
                })
                this.initMealpinList(0, this.firstMealTypeId)
            })
        },
        //点击档口跳进商品一栏
        async handleNotch(obj) {
            this.isShow = false
            this.notchObj=obj
            // console.log(`餐别ID: ${obj.mealpin_ids2}\n档口ID: ${obj.id}`)
            //餐品分类请求
           let res1 =  await this.getNav(obj)
           let res2 =  await this.getFoodlist(obj)
            //餐品列表请求
            if(res1.length>0) {
                let res = this.initFoodlist(res1,res2)
                console.log(res)

                var menulist=[]
                res.forEach(item=>{
                    if(item.children.length !== 0){
                        menulist.push(item)
                    }
                })

                this.menudata=menulist
                // this.menudata=res
                this.$nextTick(()=>{
                    this._initScroll()
                    this._initTops()
                })
            }

        },
        //餐品分类请求
        getNav(obj) {
            return new Promise((resolve,reject)=>{
                let data = {
                    method: 'app.appfood.getFoodTypeList',
                    canteen_id: obj.canteen_id,
                    stall_id: obj.id,
                    company_id: sessionStorage.getItem('company_id'),
                    bs_time: this.paramsdata.bs_time,
                }
                let sendData = { ...data, ...this.myFun.getDefaultParameters() }
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/', encrypSendData)
                .then(res=>{
                    // console.log(res,'餐品分类')
                    resolve(res.data)

                })
                .catch(err=>{
                    // console.log(err)
                    reject(err)
                })
            })
        },
        //餐品列表请求
        getFoodlist(obj) {
            return new Promise((resolve,reject)=>{
                let data = {
                    method: 'app.appfood.getStallFootList',
                    canteen_id: obj.canteen_id,
                    stall_id: obj.id,
                    mealpin_id: obj.mealpin_ids2,
                    bs_time: this.paramsdata.bs_time,
                }
                let sendData = { ...data, ...this.myFun.getDefaultParameters() }
                let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
                this.$post('/router/rest/', encrypSendData)
                .then(res=>{
                    // console.log(res,'餐品列表')
                    res.forEach(item=>{
                        item.count = 0;
                    })
                    resolve(res)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
                
            })
        },
        //点击左侧分类
        handlerMenu(index) {
            //点击使右侧滑动对应的位置
            const y=this.tops[index]
            this.scrollY=y
            this.foodScroll.scrollTo(0,-y,250)
        },
        //点击右侧食品跳转到详情
        handleFood(food){
            this.selectFood=food
            this.$refs.showFoods.init()
        },
        //日历触发
        calendarchange(e) {
            this.paramsdata.bs_time = e
            this.datetime=e
            this.isCanteen=false
            this.getStalls()
        },
        //点击食堂
        handleCan(){
            this.isCanteen=!this.isCanteen
            this.$refs.calendar.init()
        },
        //选择食堂事件
        handleDrop(index,canteenId,name) {
            if(index!=this.activeCanteen){
                this.$dialog.confirm({
                    message:'切换食堂将会清除本食堂已点菜肴,是否确认切换?'
                })
                .then(res=>{
                    this.activeCanteen=index
                    this.canteenName=name
                    this.getMealType(canteenId)
                    this.paramsdata.canteen_id = canteenId
                    this.getStalls()
                })
                .catch(err=>{
                })
            }
        },
        // 初始化档口数据
        initMealpinList(index,id,obj) {
            if(obj){
                this.mealType.id=obj.id
                this.mealType.name=obj.name
            }
            this.isShow = true
            this.num = index
            this.stalls = []
            this.Allstalls.filter(item => {
                item.mealpin_ids.filter(objId => {
                    if (id == objId.trim()) {
                        item.mealpin_ids2 = objId.trim()
                        return this.stalls.push(item)
                    }
                })
            })
            //判断是否有档口
            if(this.stalls.length === 0){
                this.isEmpty=true
            }else{
                this.isEmpty=false
            }
            // console.log(this.stalls)
        },
        // 加工档口详细数据
        initFoodlist(arr1, arr2) {
            arr1.forEach( item => {
                item.children = []
                arr2.forEach( item2 => {
                    if(item.id == item2.type_id) {
                        item.children.push(item2)
                    }
                })
            })
            return arr1
        },
        //使用better-scroll
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
            })
            this.foodScroll=new BScroll(this.$refs.foodScroll,{
                click:true,
                probeType:3,
            })
            //给右侧绑定监听事件
            this.foodScroll.on('scroll',({x,y})=>{
                this.scrollY=Math.abs(y)
            })
        },
        _initTops(){
            const tops=[]
            let top=0
            tops.push(top)
            const lis=this.$refs.foodsUl.getElementsByClassName('food-list-hook')
            Array.prototype.slice.call(lis).forEach(li => {
                top += li.clientHeight
                tops.push(top)
            });
            this.tops=tops
        },
    },

}
</script>

<style lang="less" scoped>
.order-food{
    position: relative;
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
.order-wrap {
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .batten {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        .select-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 48px;
            box-sizing: border-box;
            // padding: 0 16px;
            padding: 0 20px;
            background: #fff;
            .cut-canteen{
                display: flex;
                align-items: center;
                .name{
                    font-size: 14px;
                    color: #242424;
                }
                .down{
                    width: 8px;
                    padding-left: 6px;
                }
            }
            .overlay{
                position: fixed;
                left: 0;
                right: 0;
                top: 82px;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1001;
                .canteen-option{
                    position: absolute;
                    top: -1px;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #fff;
                    border-radius: 0px 0px 15px 15px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #5D5D5D;
                    padding: 20px 0 12px;
                    .canteen-item{
                        margin-bottom: 16px;
                    }
                    .active{
                        color: #FF5D62;
                    }
                }
            }
            &.fade-enter-active,
            &.fade-leave-active {
            transition: opacity 0.25s ease-out;
            }

            &.fade-enter,
            &.fade-leave-to {
            opacity: 0;
            }
        }
        //tab
        .tab-wrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 38px;
            box-sizing: border-box;
            padding: 0 15px;
            overflow: hidden;
            background: #fff;
            .tab-list {
                width: auto;
                overflow-x: auto;
                white-space: nowrap;
                display: flex;
                align-items: center;
                .tab-item {
                    line-height: 38px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #5D5D5D;
                    padding-right: 22px;
                    &:last-child {
                        padding-right: 0;
                    }
                }
                &::-webkit-scrollbar {
                    display: none;
                }
                .active {
                    color: #FF5D62;
                }
            }
        }
    }
    .divine {
        height: 130px;
    }
    //档口
    .shop-notch {
        .notch-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 14px 15px 0;
            .notch-item {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 166px;
                height: 100px;
                background: #FFFFFF;
                box-shadow: 0px 2px 3px 1px rgba(42, 49, 49, 0.0800);
                border-radius: 10px 10px 10px 10px;
                margin-right: 12px;
                margin-bottom: 12px;
                &:nth-child(2n) {
                    margin-right: 0;
                }
                .storeImg{
                    width: 35px;
                }
                .name {
                    font-size: 16px;
                    font-weight: bold;
                    color: #242424;
                    padding-top: 14px;
                }
                .bage {
                    position: absolute;
                    top: 8px;
                    right: 11px;
                    width: 16px;
                    height: 16px;
                    text-align: center;
                    line-height: 16px;
                    background: #FF543B;
                    border-radius: 50%;
                    font-size: 11px;
                    color: #FFFFFF;
                }
            }
        }
    }
    .empty{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 126px;
        img{
            width: 173px;
        }
        span{
            font-size: 16px;
            color: #242424;
            padding-top: 23px;
        }
    }

    //餐品列表
    .goods-wrap {
        display: flex;
        position: absolute;
        top: 130px;
        bottom: 52px;
        width: 100%;
        overflow: hidden;
        background: #fff;

        //左侧
        .menu-wrapper {
            background: #F6F6F6;
            border-radius: 0px 8px 0px 0px;

            .menu-list {
                width: 90px;

                .menu-item {
                    position: relative;
                    height: 48px;
                    line-height: 48px;
                    background: rgba(236, 236, 236, 0);
                    font-size: 12px;
                    font-weight: 400;
                    color: #959595;
                    text-align: center;
                    .num{
                        position: absolute;
                        top: 6px;
                        right: 6px;
                        width: 16px;
                        height: 16px;
                        background: #ff0000;
                        border-radius: 50%;
                        font-size: 11px;
                        text-align: center;
                        line-height: 16px;
                        font-weight: 400;
                        color: #FFFFFF;
                    }
                    .line {
                        position: absolute;
                        left: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        height: 12px;
                        border: 1px solid #FF5D62;
                        background: #FF5D62;
                    }
                    .bage {
                        position: absolute;
                        right: 9px;
                        top: 4px;
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 14px;
                        background: #FF543B;
                        font-size: 11px;
                        color: #FFFFFF;
                    }
                }

                .menuActive {
                    font-weight: bold;
                    color: #242424;
                    background: #fff;
                }
            }
        }

        //右侧
        .foods-wrapper {
            flex: 1;

            .foodsUl {
                .food-list-hook {
                    .food-header {
                        display: flex;
                        justify-content: space-between;
                        height: 34px;
                        line-height: 34px;
                        padding: 0 16px 0 10px;

                        .name {
                            font-size: 14px;
                            font-weight: 400;
                            color: #000000;
                        }

                        .date {
                            font-size: 11px;
                            font-weight: 400;
                            color: #959595;
                        }
                    }

                    .food-list {
                        box-sizing: border-box;

                        .food-item {
                            display: flex;
                            align-items: flex-start;
                            width: 100%;
                            box-sizing: border-box;
                            height: 110px;
                            padding: 10px;
                            .image {
                                img {
                                    width: 80px;
                                    height: 80px;
                                    border-radius: 8px 8px 8px 8px;
                                }
                            }
                            .content {
                                flex: 1;
                                padding-left: 10px;
                                .food-title{
                                    display: flex;
                                    align-items: center;
                                    .icon{
                                        width: 13px;
                                        height: 15px;
                                        padding-right: 6px;
                                    }
                                    .food-name {
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: #242424;
                                    }
                                }
                                .desc {
                                    display: flex;
                                    align-items: center;
                                    margin-top: 6px;
                                    .batching {
                                        padding: 0 3px;
                                        height: 15px;
                                        line-height: 15px;
                                        border-radius: 2px 2px 2px 2px;
                                        border: 1px solid #FF5D62;
                                        font-size: 11px;
                                        color: #FF5D62;
                                        box-sizing: border-box;
                                        .protein {}
                                        .calorie {}
                                    }
                                }
                                .Taboo {
                                    display: flex;
                                    align-items: center;
                                    padding: 8px 0 10px 0;
                                    .crowd {
                                        font-size: 11px;
                                        color: #959595;
                                    }
                                    img {
                                        width: 11px;
                                        height: 10px;
                                        vertical-align: middle;
                                        padding-left: 6px;
                                    }
                                    .illness {
                                        vertical-align: middle;
                                        font-size: 11px;
                                        font-weight: 400;
                                        color: #959595;
                                        padding-left: 2px;
                                    }
                                }

                                .food-tariff {
                                    display: flex;
                                    align-items: center;
                                    margin-top: 6px;

                                    .price {
                                        display: flex;
                                        align-items: flex-end;

                                        .mark {
                                            font-size: 9px;
                                            font-weight: 400;
                                            color: #FF543B;
                                            padding: 0 2px 2px 0;
                                            vertical-align: middle;
                                        }

                                        .num {
                                            font-size: 16px;
                                            font-weight: 400;
                                            color: #FF543B;
                                        }
                                    }
                                    .quota {
                                        font-size: 9px;
                                        font-weight: 400;
                                        color: #FF9B37;
                                        padding-left: 7px;
                                        flex: 1;
                                    }
                                    .cartcontrol-wrapper {
                                        img {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .shopcart {
        height: 52px;
    }

}
</style>