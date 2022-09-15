<template>
  <div class="notice-detail">
      <Header title="留言详情"></Header>
      <div class="detail-wrap">
          <div class="Leave-box" v-if="messagedata.length>0">
              <div class="title">{{messagedata[0].title}}</div>
              <div class="content">{{messagedata[0].content}}</div>
              <div class="footer">
                  <span class="date">{{messagedata[0].add_time.substring(0,10)}} | </span>
                  <span class="status1" v-if="repcount == 1">已答复</span>
                  <span class="status2" v-if="repcount == 0">未答复</span>
              </div>
          </div>
          <div class="reply-box" v-if="messagedata[1]">
              <div class="answer">留言回复</div>
              <div class="reply-wrap">
                  {{messagedata[1].content}}
              </div>
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
          messagedata:[],
          repcount:'',
      }
  },
  created(){
      console.log(this.$route)
      this.repcount=this.$route.query.repcount
      let id=this.$route.query.id
      this.getdata(id)
  },
  methods:{
      getdata(id){
          let paramsdata={
              method:'act.leave_message.getDails',
              id:id
          }
          let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
        //   console.log(sendData)
          let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
          this.$post('/router/rest/', encrypSendData)
          .then(res=>{
              this.messagedata=res.data
              console.log(res)
          })
      },
  }
}
</script>

<style lang="less" scoped>
.notice-detail{
    width: 100%;
    min-height: 100%;
    background: #f5f5f5;
    .detail-wrap{
       .Leave-box{
            width: 100%;
            box-sizing: border-box;
            padding: 16px;
            background: #FFFFFF;
           .title{
               width: 112px;
               text-overflow: ellipsis;
               white-space: nowrap;
               overflow: hidden;
               font-size: 16px;
               font-weight: bold;
               color: #242424;
               padding: 4px 0 12px;
           }
           .content{
                font-size: 14px;
                font-weight: 400;
                color: #242424;
                line-height: 24px;
           }
           .footer{
                font-size: 12px;
                font-weight: 500;
                text-align: right;
                padding-top: 24px;
               .date{
                   color: #959595;
               }
               .status1{
                   color: #0AB583;
               }
               .status2{
                   color: #FF543B;
               }
           }
       }
       .reply-box{
           .answer{
                font-size: 16px;
                font-weight: bold;
                color: #242424;
                padding: 20px 16px 12px;
           }
           .reply-wrap{
                width: 100%;
                box-sizing: border-box;
                background: #FFFFFF;
                font-size: 14px;
                font-weight: 400;
                color: #242424;
                line-height: 20px;
                padding: 14px 20px;
           }
       }
    }
}
</style>