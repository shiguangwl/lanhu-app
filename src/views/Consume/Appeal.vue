<template>
  <div class="appeal-wrap">
      <Header title="扣款申诉"></Header>
      <div class="tip">
          <img src="../../assets/consume/tip.png" alt="" class="sign">
          <span class="text">申诉必须当日发起，次日不可再发起申诉。</span>
      </div>
      <div class="input-wrap">
          <div class="original">
              <span>原订单金额</span>
              <input type="text" value="¥15.99">
          </div>
          <div class="refund">
              <span>退款金额(元)</span>
              <input type="text" placeholder="请输入退款金额">
          </div>
      </div>
      <!-- 描述 -->
      <div class="describe">
          <textarea name="" id="" cols="30" rows="10" placeholder="如：XX菜识别错误，实际金额为5.6元，系统识别为8.6元，申请退款3元"></textarea>
      </div>
      <div class="version">
          请准确描述要申诉的订单，并明确您的错误扣款项目，方便我们能更快的处理您的申诉。
      </div>
      <div class="footer-btn">
          <button class="submit" @click="submit">提交申诉</button>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{}
    },
    methods:{
        submit(){
            this.$router.push('/consumedetail?sac='+1)
        }
    }
}
</script>

<style lang="less" scoped>
.appeal-wrap{
    width: 100%;
    min-height: 100%;
    background: #F6F6F6;
    .tip{
        display: flex;
        align-items: center;
        margin: 16px 22px 12px;
        .sign{
            width: 12px;
            height: 12px;
            padding-right: 5px;
        }
        .text{
            font-size: 12px;
            font-weight: 400;
            color: #FF543B;
        }
    }
    .input-wrap{
        display: flex;
        flex-direction: column;
        width: 343px;
        height: 86px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        margin: 0 16px 12px;
        padding-left: 12px;
        box-sizing: border-box;
        .original{
            display: flex;
            align-items: center;
            height: 50%;
            span{
                width: 100px;
                font-size: 14px;
                font-weight: 400;
                color: #000000;
            }
            input{
                flex: 1;
                font-size: 12px;
                font-weight: 400;
                color: #242424;
                border: 0;
            }
        }
        .refund{
            display: flex;
            align-items: center;
            height: 50%;
            span{
                width: 100px;
                font-size: 14px;
                font-weight: 400;
                color: #000000;
            }
            input{
                flex: 1;
                font-size: 12px;
                font-weight: 400;
                color: #242424;
                border: 0;
            }
        }
    }
    .describe{
        margin: 0 16px 12px;
        textarea{
            box-sizing: border-box;
            width: 343px;
            height: 159px;
            background: #FFFFFF;
            border-radius: 6px 6px 6px 6px;
            border: 0;
            font-size: 14px;
            font-weight: 400;
            color: #959595;
            padding: 10px 12px;
            line-height: 22px;
        }
    }
    .version{
        font-size: 14px;
        font-weight: 400;
        color: #959595;
        margin: 0 16px 12px;
        line-height: 24px;
    }
    .footer-btn{
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        button{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            border: 0;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
}
</style>