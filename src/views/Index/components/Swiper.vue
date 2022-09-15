<template>
  <div class="swiper-wrap">
      <!-- 有轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#FF5D62" v-if="swiperdata">
            <van-swipe-item>
                <img v-lazy="'data:image/png;base64,'+swiperdata" />
            </van-swipe-item>
        </van-swipe>
        <!-- 没有轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#FF5D62" v-else>
            <van-swipe-item>
                <img src="../../../assets/index/swiper1.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img src="../../../assets/index/swiper2.png" alt="">
            </van-swipe-item>
        </van-swipe>
  </div>
</template>

<script>
export default {
    props:['swiperdata'],

}
</script>

<style lang="less" scoped>
.swiper-wrap{
    padding: 20px 16px 0 16px;
    .van-swipe{
        .van-swipe-item{
            width: 343px;
            height: 110px;
            img{
                width: 343px;
                height: 110px;
                border-radius: 8px;
            }
        }
        /deep/ .van-swipe__indicator--active{
            width: 14px;
            height: 3px;
            background: #FF5D62;
            border-radius: 2px 2px 2px 2px;
        }
        /deep/ .van-swipe__indicator{
            width: 14px;
            height: 3px;
            background: #FF5D62;
            border-radius: 2px 2px 2px 2px;
            background: #fff;
        }
    }
}
</style>