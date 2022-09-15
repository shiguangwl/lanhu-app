<template>
  <div class="consume-wrap">
      <Header title="消费记录" class="header"></Header>
      <div class="tab">
          <van-tabs v-model="active">
              <van-tab title="用餐明细">
                  <Definite></Definite>
              </van-tab>
              <van-tab title="消费记录">
                  <Record></Record>
              </van-tab>
          </van-tabs>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Definite from './components/Definite'
import Record from './components/Record'
export default {
    components:{Header,Definite,Record},
    data(){
        return{
            active:0
        }
    }
}
</script>

<style lang="less" scoped>
.consume-wrap{
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
    .tab{
        // margin-top: 44px;
        /deep/ .van-tabs__wrap{
            position: fixed;
            top: 44px;
            left: 0;
            right: 0;
            z-index: 100;
        }
    }
}
</style>