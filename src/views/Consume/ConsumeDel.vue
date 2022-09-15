<template>
  <div class="consume-del">
      <!-- <Header title="消费详情" appeal="扣款申诉"></Header> -->
      <Header title="消费详情" class="header"></Header>
      <div class="divine"></div>
      <!-- <div class="appeal" @click="handlerSpeed()" v-if="sac==1">申诉进度</div>
      <div class="appeal" @click="handlerAppeal()" v-else>扣款申诉</div> -->
      <!-- 详情 -->
      <div class="del-wrap">
          <div class="price">-{{consumedata.amount}}</div>
          <div class="name">{{consumedata.name}}-{{consumedata.pin_name}}</div>
          <div class="del-list">
              <ul>
                  <li>
                      <span class="lable">优惠金额</span>
                      <span class="text">¥ {{consumedata.coupon_cost}}</span>
                  </li>
                  <li>
                      <span class="lable">消费时间</span>
                      <span class="text">{{consumedata.add_time}}</span>
                  </li>
                  <li>
                      <span class="lable">订单编号</span>
                      <span class="text">{{consumedata.number}}</span>
                  </li>
                   <!-- <li>
                      <span class="lable">交易单号</span>
                      <span class="text">{{consumedata.number}}</span>
                  </li> -->
                   <li>
                      <span class="lable">支付方式</span>
                      <span class="text">{{consumedata.pay_name}}</span>
                  </li>
              </ul>
          </div>
      </div>
      <!-- 表格 -->
      <div class="table-wrap">
          <div class="table-header">
              <span class="detail">菜品详情</span>
              <span class="num">共{{tableData.length}}件</span>
          </div>
          <div class="vant-table">
              <table cellspacing="0" style="width:100%" class="table">
                  <tr>
                      <th class="th" v-for="(item, index) in option.column" :key="index">{{ item.label }}</th>
                  </tr>
                  <tr v-for="(item, index) in tableData" :key="index" class="list-tr">
                      <td v-for="(context, i) in option.column" :key="i">{{ item[context.prop] }}</td>
                  </tr>
              </table>
          </div>
      </div>
      <!-- 图标 -->
      <div class="chart-wrap">
          <div class="chart-header">
              <span class="title">本餐营养</span>
              <span class="lable">营养成分仅供参考</span>
          </div>
          <div class="chart-content">
              <div id="main" style="height:100px;width:100%"></div>
          </div>
      </div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            sac:1,
            //表头
            option:{
                column:[
                    {
                        label:'菜品名称',
                        prop:'name'
                    },
                    {
                        label:'数量',
                        prop:'qty'
                    },
                    {
                        label:'单价',
                        prop:'price'
                    },
                    {
                        label:'小计',
                        prop:'price'
                    }
                ],
            },
            //表格列表
            tableData:[],
            //图标配置
            options:{
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    name: '本餐营养',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 0, name: '蛋白质' },
                        { value: 0, name: '卡路里' },
                        { value: 0, name: '碳水' },
                        { value: 0, name: '脂肪' },
                    ],
                    emphasis:{
                        itemStyle:{
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            },
            //图标配置
            // 请求参数
            paramsdata:{
                method:'meal.order.get',
                company_id: sessionStorage.getItem('company_id'),
                order_id:'',
            },
            consumedata:{},//接口返回对象
        }
    },
    created(){
        this.sac=this.$route.query.sac
        //从用餐明细跳转过来传的id
        this.paramsdata.order_id=this.$route.query.id
        //请求
        this.getdata()
    },
    mounted(){
         var myChart = echarts.init(document.getElementById('main'));

         myChart.setOption(this.options);

    },
    methods:{
        //详情请求
        getdata(){
            let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                console.log(res)
                this.consumedata=res.data
                this.tableData=res.data.details
                //echart
                this.options.series[0].data[0].value=res.data.protein
                this.options.series[0].data[1].value=res.data.calorie
                this.options.series[0].data[2].value=res.data.drates
                this.options.series[0].data[3].value=res.data.axunge
            })
        },
        //跳转到扣款申诉
        handlerAppeal(){
            this.$router.push('/appeal')
        },
        //跳转到申诉进度
        handlerSpeed(){
            this.$router.push('/schedule')
        },
    }
}
</script>

<style lang="less" scoped>
.consume-del{
    width: 100%;
    min-height: 100%;
    background: #F6F6F6;
    .header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    .divine{
        height: 44px;
    }
    .appeal{
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
    }
    .del-wrap{
        width: 343px;
        height: 242px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
        border-radius: 10px 10px 10px 10px;
        margin: 16px 16px 12px;
        .price{
            font-size: 26px;
            font-weight: 500;
            color: #FF543B;
            text-align: center;
            padding: 24px 0 7px;
        }
        .name{
            font-size: 12px;
            font-weight: 400;
            color: #242424;
            text-align: center;
        }
        .del-list{
            padding: 0 12px;
            margin-top: 38px;
            ul{
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    .lable{
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                    }
                    .text{
                        font-size: 12px;
                        font-weight: 400;
                        color: #242424;
                    }
                }
            }
        }
    }
    //表格
    .table-wrap{
        width: 343px;
        // height: 171px;
        background: #FFFFFF;
        box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
        border-radius: 10px 10px 10px 10px;
        box-sizing: border-box;
        margin: 0 16px 12px;
        .table-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 12px 12px;
            .detail{
                font-size: 12px;
                font-weight: bold;
                color: #242424;
            }
            .num{
                font-size: 11px;
                font-weight: 400;
                color: #5D5D5D;
            }
        }
        .vant-table{
            .table{
                .th{
                    font-size: 12px;
                    font-weight: 400;
                    color: #242424;
                    background: #fff5f6;
                    height: 30px;
                    line-height: 30px;
                    width: 97px;
                }
                .list-tr{
                    font-size: 12px;
                    font-weight: 400;
                    color: #242424;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
            }
        }
    }
    //图表
    .chart-wrap{
        width: 343px;
        // height: 171px;
        background: #FFFFFF;
        box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
        border-radius: 10px 10px 10px 10px;
        box-sizing: border-box;
        margin: 0 16px;
        .chart-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 12px 20px;
            // padding: 14px 12px 0;
            .title{
                font-size: 12px;
                font-weight: bold;
                color: #242424;
            }
            .lable{
                font-size: 11px;
                font-weight: 400;
                color: #5D5D5D;
            }
        }
        .chart-content{
            padding-left: 30px;
        }
    }

}
</style>