<template>
  <div class="collection-wrap">
      <Header title="人脸信息采集"></Header>
      <!-- 人脸采集中 -->
      <div class="face-center">
          <img src="../../assets/personal/face-center.png" alt="">
          <span class="text">请保持正脸在取景框中根据指示完成采集</span>
          <button class="picture">拍照采集</button>
          <button class="album">相册录入</button>
      </div>

      <!-- 人脸采集失败 -->
      <!-- <div class="face-fail">
          <img src="../../assets/personal/face-fail.png" alt="">
          <span class="tip">人脸信息采集失败！</span>
          <ul>
              <li>· 确保本人面部出现在框内</li>
              <li>· 确保与屏幕保持适当距离</li>
              <li>· 保持光线充足</li>
          </ul>
          <button class="again">重新采集</button>
      </div> -->

      <!-- 人脸采集成功 -->
      <!-- <div class="face-success">
          <img src="../../assets/personal/face-success.png" alt="">
          <span class="tip">人脸信息采集成功！</span>
          <button class="success" @click="handlerIndex()">返回主页</button>
      </div> -->

  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            
        }
    },
    methods:{
        //返回主页
        handlerIndex(){
            this.$router.push('/index')
        }
    }
}
</script>

<style lang="less" scoped>
.collection-wrap{
    .face-center{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 211px;
            margin-top: 63px;
        }
        .text{
            text-align: center;
            width: 120px;
            height: 37px;
            font-size: 12px;
            font-weight: 400;
            color: #242424;
            line-height: 20px;
            margin-top: 20px;
        }
        .picture{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
            border: 0;
            margin: 80px 0 20px;
        }
        .album{
            width: 343px;
            height: 40px;
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #FF5D62;
            font-size: 16px;
            font-weight: 400;
            color: #FF5D62;
            border: 0;
        }
    }
    .face-fail{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 76px;
        img{
            width: 174px;
        }
        .tip{
            font-size: 14px;
            font-weight: bold;
            color: #242424;
            margin: 20px 0 22px;
        }
        ul{
            font-size: 12px;
            font-weight: 400;
            color: #242424;
            line-height: 20px;
            li{
                // font-weight: bold;
            }
        }
        .again{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
            border: 0;
            margin-top: 83px;
        }
    }
    .face-success{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 76px;
        img{
            width: 174px;
        }
        .tip{
            font-size: 14px;
            font-weight: bold;
            color: #242424;
            margin-top: 20px;
        }
        .success{
            width: 343px;
            height: 40px;
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #FF5D62;
            font-size: 16px;
            font-weight: 400;
            color: #FF5D62;
            background: #fff;
            margin-top: 174px;
        }
    }
}
</style>