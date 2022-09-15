<template>
  <div class="mealOrder">
      <Header :title="title" class="header"/>
      <div class="occupy"></div>
        <!-- 列表 -->
        <div class="meal-wrap">
            <ul class="meal-list">
                <li class="meal-item" v-for="(item,id) in pininfodata" :key="item.id">
                    <div class="time">
                        <img src="../../assets/index/date.png" alt="">
                        <span class="date">{{item[0].date}}</span>
                    </div>
                    <ul class="meal-type">
                        <li class="type-item1"  v-for="(item2,id) in item">
                            <span class="lable">{{item2.name}}</span>
                            <span class="line1"></span>
                            <!-- <span class="line2"></span> -->
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 提交报餐按钮 -->
        <div class="footer-submit">
            <button  @click="handleSubmit()">提交报餐</button>
        </div>
  </div>
</template>

<script>
import { tr } from 'date-fns/locale';
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            title:'报餐',
            // 可报餐餐别数据
            pininfodata:[],
            //获取可报餐餐别参数
            paramsdata:{
                method:'app.AppSchemeMeal.getSchemeMealByStall',
                canteen_id:'',
                start:'',
                end:'',
                stall_id: '',
            },

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
        let start_time= nowYear + "-" + nowMonth + "-" + nowDay;
        this.paramsdata.start=start_time
        //进入页面获取当前时间的一个月后的时间
        getNowDate.setMonth(getNowDate.getMonth() + 1);
        let thirtyYear = getNowDate.getFullYear();
        let thirtyMonth = getNowDate.getMonth() + 1;
        let thirtyDay = getNowDate.getDate();
        if (thirtyMonth >= 1 && thirtyMonth <= 9) {
            thirtyMonth = "0" + thirtyMonth;
        }
        if (thirtyDay >= 1 && thirtyDay <= 9) {
            thirtyDay = "0" + thirtyDay;
        }
        let end_time = thirtyYear + "-" + thirtyMonth + "-" + thirtyDay;
        this.paramsdata.end=end_time
        //从档口页传来的值
        // console.log(JSON.parse(this.$route.query.meal))
        this.paramsdata.canteen_id=JSON.parse(this.$route.query.meal).canteen_id
        this.paramsdata.stall_id=JSON.parse(this.$route.query.meal).id
        //请求
        this.getdata()
    },
    methods:{
        //获取可报餐餐别
        async getdata(){
            let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            let res = await this.$post('/router/rest/',encrypSendData)
            console.log(res)

            var dataMap = {};
            res.data.forEach(item=>{
                if (!dataMap[item.date]){
                    dataMap[item.date] = []
                }
                dataMap[item.date].push(item)
            })
            this.pininfodata = dataMap
            // var items = []
            // for (let key in dataMap) {
            //   console.log(JSON.stringify(dataMap[key]),1111111111111)
            // }
            console.log(JSON.stringify(dataMap))


        },
        //点击报餐
        handleSubmit(){
            console.log('点击报餐')
        },
    }
}
</script>

<style lang="less" scoped>
.mealOrder{
    width: 100%;
    min-height: 100%;
    background: #F6F7F8;
    .header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    .occupy{
        height: 44px;
    }
    // 列表
    .meal-wrap{
        // padding: 0 16px;
        position: absolute;
        top: 60px;
        left: 16px;
        right: 16px;
        bottom: 56px;
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .meal-list{
            .meal-item{
                width: 343px;
                background: #FFFFFF;
                box-shadow: 0px 3px 4px 1px rgba(0,0,0,0.04);
                border-radius: 8px 8px 8px 8px;
                margin-bottom: 12px;
                &:last-child{
                    margin-bottom: 0;
                }
                .time{
                    display: flex;
                    align-items: center;
                    height: 44px;
                    line-height: 44px;
                    border-bottom: 1px solid #F4F4F4;
                    padding-left: 13px;
                    img{
                        width: 13px;
                        padding-right: 8px;
                    }
                    .date{
                        font-size: 14px;
                        font-weight: bold;
                        color: #333333;
                    }
                }
                .meal-type{
                    display: flex;
                    flex-wrap: wrap;
                    padding: 14px 12px 2px;
                    .type-item2{
                        background: #ff0000;
                    }
                    .type-item1{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 30%;
                        height: 74px;
                        background: rgba(255,155,55,0.08);
                        border-radius: 6px 6px 6px 6px;
                        opacity: 1;
                        // border: 1px solid #FF9B37;
                        font-size: 14px;
                        font-weight: bold;
                        color: #242424;
                        margin-right: 12px;
                        margin-bottom: 12px;
                        &:nth-child(3n){
                            margin-right: 0;
                        }
                        .line1{
                            position: absolute;
                            bottom: 30px;
                            width: 26px;
                            height: 5px;
                            background: linear-gradient(90deg, rgba(255,155,55,0.5) 0%, rgba(255,155,55,0.04) 100%);
                            border-radius: 5px 5px 5px 5px;
                        }
                        .line2{
                            position: absolute;
                            bottom: 30px;
                            width: 26px;
                            height: 5px;
                            background: linear-gradient(90deg, rgba(149,149,149,0.5) 0%, rgba(149,149,149,0) 100%);
                            border-radius: 5px 5px 5px 5px;
                        }
                        .van-stepper{
                            position: absolute;
                            margin-top: 50px;
                        }
                    }
                    .active{
                        background: #fff;
                        border: 1px solid #FF5D62;
                    }
                    .activeStatus{
                        background: #F5F5F5;
                    }
                }
            }
        }
    }
    // 提交按钮
    .footer-submit{
        position: fixed;
        bottom: 6px;
        left: 16px;
        right: 16px;
        z-index: 100;
        button{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            font-size: 16px;
            color: #FFFFFF;
            border: 0;
        }
    }
}
</style>
