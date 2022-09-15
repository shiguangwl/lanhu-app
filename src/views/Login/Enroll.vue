<template>
  <div class="enroll">
      <div class="content-wrap">
          <van-loading type="spinner" color="#1989fa" size="32px"/>
          <span>免密登录中...</span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.enroll{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .1);
    .content-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .van-loading{
        }
        span{
            padding-top: 16px;
            font-size: 13px;
        }
    }
}
</style>