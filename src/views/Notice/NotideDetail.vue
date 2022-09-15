<template>
  <div class="notice-detail">
      <Header title="公告详情"></Header>
      <div class="detail-wrap" v-if="noticedel">
          <div class="title">{{noticedel.title}}</div>
          <div class="time">{{noticedel.add_time}}</div>
          <div class="content" v-html="noticedel.content"></div>
          <div class="footer">
              <span class="name">{{noticedel.user_name}}</span>
              <span class="date">{{noticedel.add_time.substring(0,10)}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components:{Header},
  data(){
      return{
          noticedel:{}
      }
  },
  created(){
      this.noticedel=JSON.parse(this.$route.query.noticedel)
  },
}
</script>

<style lang="less" scoped>
.notice-detail{
    .detail-wrap{
        .title{
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #242424;
            padding-top: 20px;
        }
        .time{
            font-size: 12px;
            color: #959595;
            text-align: center;
            padding-top: 6px;
        }
        .content{
            margin: auto;
            width: 343px;
            font-size: 14px;
            color: #242424;
            line-height: 24px;
            margin-top: 22px;
        }
        .footer{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            font-size: 14px;
            color: #242424;
            margin: 30px 16px;
            .name{
                padding-bottom: 10px;
            }
        }
    }
}
</style>