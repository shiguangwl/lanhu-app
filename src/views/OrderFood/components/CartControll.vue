<template>
  <div class="cartconrroll" v-if="foods">
      <transition name="move">
      <img src="../../../assets/orderfood/reduce.png" alt="" class="minus" v-if="foods.count > 0" @click.stop="btnMinus()">
      </transition>
      <span class="num" v-if="foods.count > 0">
          {{foods.count}}
      </span>
      <img src="../../../assets/orderfood/add.png" alt="" class="plus" @click.stop="btnPlus(foods.limit_qty,foods.count)">
  </div>
</template>

<script>
export default {
    props:{
        foods:Object
    },
    data(){
        return{
            food:false,
        }
    },
    methods:{
        //减
        btnMinus(){
            this.foods.count--;
        },
        //加
        btnPlus(limqty,count){
            if(count+1 <= limqty){
                this.foods.count++;
            }else{
                this.$dialog.alert({
                    message:'菜品已超出最大限购份数'
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.cartconrroll{
    display: flex;
    align-items: center;
    .minus{
        width: 17px;
        height: 17px;
        &.move-enter-active, &.move-leave-active{
            transition: all .3s;
        }
        &.move-enter, &.move-leave-to{
            opacity: 0;
            transform: translateX(15px) rotate(180deg);
        }
    }
    .num{
        width: 24px;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #242424;
    }
    .plus{
        width: 16px;
        height: 16px;
    }
}
</style>