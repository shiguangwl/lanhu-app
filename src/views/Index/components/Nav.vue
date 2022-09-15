<template>
  <div class="nav">
      <ul class="nav-list">
          <!-- <li class="nav-item" v-for="item in navdata" :key="item.index_" @click="handlerNav(item.menu_signs)">
              <img :src="ip+item.meun_img" alt="">
              <span>{{item.menu_name}}</span>
          </li> -->
          <router-link class="nav-item" tag="li" :to="item.menu_url" v-for="item in navdata" :key="item.index_">
              <img :src="ip+item.meun_img" alt="">
              <span>{{item.menu_name}}</span>
          </router-link>
      </ul>
  </div>
</template>

<script>
export default {
    props:['navdata'],
    data(){
        return{
            ip:'http://tunnel.xxhoz.com:9080/',
        }
    },
    methods:{
        handlerNav(index){
            switch(index){
                case 0:
                    this.$router.push('/order')
                break;
                case 1:
                    this.$router.push('/consume')
                break;
                case 2:
                    this.$router.push('/personal')
                break;
                case 3:
                    this.$router.push('/vote')
                break;
                case 4:
                    this.$router.push('/search')
                break;
                case 5:
                    this.$router.push('/mealReport')
                break;
                default:
                 break;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.nav{
    .nav-list{
        display: flex;
        flex-wrap: wrap;
        .nav-item{
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
            img{
                width: 46px;
                height: 46px;
            }
            span{
                font-size: 12px;
                font-weight: 400;
                color: #242424;
                padding-top: 7px;
            }
        }
    }
}
</style>