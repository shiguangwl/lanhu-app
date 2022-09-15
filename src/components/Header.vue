<template>
  <div class="order-food">
      <div class="back" @click="$router.go(-1)">
          <img src="../assets/orderfood/back.png" alt="">
      </div>
      <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    appeal:String
  }
};
</script>

<style lang="less" scoped>
.order-food{
    position: relative;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #FF5D62;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .back{
        position: absolute;
        left: 16px;
        img{
            width: 9px;
            vertical-align: middle;
        }
    }
    .cloce{
        position: absolute;
        left: 52px;
        img{
            vertical-align: middle;
        }
    }
    .title{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
    }
    .appeal{
        position: absolute;
        right: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
    }
}
</style>