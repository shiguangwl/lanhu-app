<template>
  <div class="complaintdel">
      <Header title="申诉详情"></Header>
      <!-- 详情 -->
      <div class="del-wrap">
          <div class="price">-15.12</div>
          <div class="name">员工创意食堂-晚餐</div>
          <div class="del-list">
              <ul>
                  <li>
                      <span class="lable">优惠金额</span>
                      <span class="text">¥ 2.00</span>
                  </li>
                  <li>
                      <span class="lable">消费时间</span>
                      <span class="text">2022-05-16 17:05:35</span>
                  </li>
                  <li>
                      <span class="lable">支付方式</span>
                      <span class="text">微信支付</span>
                  </li>
                   <li>
                      <span class="lable">支付方式</span>
                      <span class="text">微信支付</span>
                  </li>
                   <li>
                      <span class="lable">支付方式</span>
                      <span class="text">微信支付</span>
                  </li>
              </ul>
          </div>
      </div>
      <!-- 详情 -->
      <div class="primary-del">
          <div class="del-list">
              <ul>
                  <li>
                      <span class="lable">原订单金额</span>
                      <span class="text">¥ 5.6</span>
                  </li>
                  <li>
                      <span class="lable">申请退款金额</span>
                      <span class="text">¥ 3</span>
                  </li>
                  <li>
                      <span class="lable">详细说明</span>
                      <span class="text">青菜识别错误，实际金额为5.6元，系统识别为8.6元，申请退款3元</span>
                  </li>
              </ul>
          </div>
      </div>

  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
}
</script>

<style lang="less" scoped>
.complaintdel{
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
    .primary-del{
        width: 343px;
        // height: 117px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
        border-radius: 10px 10px 10px 10px;
        margin: 16px 16px 12px;
        .del-list{
            padding: 0 12px;
            margin-top: 12px;
            ul{
                padding: 14px 0;
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    .lable{
                        width: 130px;
                        font-size: 12px;
                        font-weight: 400;
                        color: #5D5D5D;
                    }
                    .text{
                        // display: flex;
                        // align-items: flex-start;
                        font-size: 12px;
                        font-weight: 400;
                        color: #242424;
                        line-height: 16px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>