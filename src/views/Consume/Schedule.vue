<template>
  <div class="schedule-wrap">
      <Header title="申诉进度"></Header>
      <div class="schedule-step">
          <van-steps direction="vertical"  :active="active">
              <van-step>
                  <p class="name">李星河（提交申诉）</p>
                  <p class="refund">申请退款金额：<span class="price">3元</span></p>
                  <p class="date">2022-05-20 14:30</p>
              </van-step>
              <!-- <van-step>
                  <p class="name">李星河<span class="success">（已通过）</span></p>
                  <p class="refund">实际退款金额：<span class="price">3元</span></p>
                  <p class="refund">实际扣款金额：<span class="price">3元</span></p>
                  <p class="refund">消费快照：<span class="price">暂无快照信息</span></p>
                  <p class="refund">处理意见：<span class="examine">核对无误</span></p>
                  <p class="date">2022-05-23 10:30</p>
              </van-step> -->
              <van-step>
                  <p class="name">李星河<span class="fail">（已驳回）</span></p>
                  <p class="refund">实际退款金额：<span class="price">0元</span></p>
                  <p class="refund">实际扣款金额：<span class="price">5.6元</span></p>
                  <p class="refund">消费快照：
                      <span class="photo">
                          <img src="../../assets/consume/shop.png" alt="">
                          <img src="../../assets/consume/shop.png" alt="">
                      </span>
                  </p>
                  <p class="refund">处理意见：<span class="examine">交易时系统已自动退款</span></p>
                  <p class="date">2022-05-23 10:30</p>
              </van-step>
              <!-- <van-step>
                  <p class="name">食堂管理人员（审批中）</p>
                  <p class="date">2022-05-20 14:30</p>
              </van-step> -->
          </van-steps>
      </div>
      <!-- 申诉详情 -->
      <div class="complaint-del" @click="handlerDel()">
          <span>申诉详情</span>
          <img src="../../assets/consume/more.png" alt="">
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            active: 1,
        }
    },
    methods:{
        //跳转到申诉详情
        handlerDel(){
            this.$router.push('/complaintdel')
        },
    }
}
</script>

<style lang="less" scoped>
.schedule-wrap{
    .schedule-step{
        margin: 16px 0 0 17px;
        .van-steps{
            .van-step{
                .name{
                    font-size: 14px;
                    font-weight: 400;
                    color: #242424;
                    padding-bottom: 9px;
                    .success{
                        color: #0cb684;
                    }
                    .fail{
                        color: #ff5940;
                    }
                }
                .refund{
                    font-size: 12px;
                    font-weight: 400;
                    color: #5D5D5D;
                    padding-bottom: 9px;
                    .price{
                        font-size: 14px;
                        color: #242424;
                    }
                    .examine{
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .photo{
                        display: block;
                        img{
                            width: 70px;
                            height: 70px;
                            border-radius: 6px 6px 6px 6px;
                            margin-right: 10px;
                        }
                    }
                }
                .date{
                    font-size: 12px;
                    font-weight: 400;
                    color: #5D5D5D;
                    padding-bottom: 9px;
                }
            }
            /deep/ .van-step__circle{
                width: 14px;
                height: 14px;
                background: #fff;
                border: 3px solid #D8D8D8;
            }
            /deep/ .van-icon{
               font-size: 20px;
               
            }
        }
    }
    .complaint-del{
        position: absolute;
        top: 78px;
        right: 16px;
        display: flex;
        align-items: center;
        span{
            font-size: 12px;
            font-weight: 400;
            color: #5D5D5D;
            padding-right: 6px;
        }
        img{
            width: 6px;
            height: 10px;
        }
    }
}
</style>