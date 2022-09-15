<template>
  <div class="remark">
      <!-- 头部 -->
      <Header title="订单备注"/>
      <div class="view-body">
          <div class="remark-wrap">
              <div class="text-wrap">
                  <textarea placeholder="请填写备注信息" v-model="text" maxlength="100"></textarea>
              </div>
          </div>
           <div class="button" @click="submitClick">
                确定
            </div>
      </div>
  </div>
</template>

<script>
//引入头部组件
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            text: "",
        }
    },
    methods:{
        //点击确定
        submitClick(){
            this.$store.dispatch('setRemark',this.text)
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.remark{
    .view-body{
        .remark-wrap{
            background: #fff;
            padding: 10px;
            .text-wrap{
                textarea{
                    width: 100%;
                    height: 100px;
                    font-size: 12px;
                    background: #f9f9f9;
                    padding: 6px;
                    box-sizing: border-box;
                }
            }
        }
        .button{
            position: absolute;
            left: 10px;
            right: 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            border-radius: 5px;
            margin: 10px 0;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            color: #fff;
        }
    }
}
</style>