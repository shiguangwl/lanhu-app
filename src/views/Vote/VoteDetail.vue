<template>
  <div class="vote-detail">
      <Header title="投票详情"></Header>
      <div class="content-wrap">
        <div class="content-message">
          <div class="title">{{voteDel.name}}</div>
          <div class="date">截止日期：{{voteDel.end_time}}</div>
          <span class="dot-left"></span>
          <span class="dot-right"></span>
        </div>
        <div class="content-option">
          <ul class="option-list">
            
            <li class="option-item" v-for="(option,index) in voteDel.question" :key="index">
              <!-- 多选部分 -->
              <!-- 供投票详情多选查看 -->
              <div class="checkbox" v-if="option.selects == 1 && status == -2 ">
                <span class="label">{{index+1}}.{{option.title}}</span>
                <p class="select_icon" v-for="(items,indexs) in option.item" :key="indexs">
                  <input type="checkbox" name="select3" class="icon_btn" v-if="items.checked == 0" disabled>
                  <input type="checkbox" name="select3" class="icon_btn" checked v-if="items.checked == 1" disabled>
                  <span class="icon_text">{{items.item_title}}</span>
                </p>
              </div>
              <!-- 供多选投票 -->
              <div class="checkbox" v-if="option.selects == 1 && status == 1 ">
                <span class="label">{{index+1}}.{{option.title}}</span>
                <p class="select_icon" v-for="(items,indexs) in option.item" :key="indexs">
                  <input type="checkbox" name="select3" class="icon_btn" @click="handleCheckbox($event,option.vote_id,items.question_id,items.id,option.mul_qty)">
                  <span class="icon_text">{{items.item_title}}</span>
                </p>
              </div>
              <!-- 单选部分 -->
              <!-- 供投票详情单选查看 -->
              <div class="checkbox" v-if="option.selects == 0 && status == -2">
                <span class="label">{{index+1}}.{{option.title}}</span>
                <p class="select_icon" v-for="(items,indexs) in option.item" :key="indexs">
                  <input type="radio" name="select3" class="icon_btn" v-if="items.checked == 0" disabled>
                  <input type="radio" name="select3" class="icon_btn" checked v-if="items.checked == 1" disabled>
                  <span class="icon_text">{{items.item_title}}</span>
                </p>
              </div>
              <!-- 供单选投票 -->
               <div class="checkbox" v-if="option.selects == 0 && status == 1">
                <span class="label">{{index+1}}.{{option.title}}</span>
                <p class="select_icon" v-for="(items,indexs) in option.item" :key="indexs">
                  <input type="radio" :name="index+1" class="icon_btn" @change="handleRadio($event,option.vote_id,items.question_id,items.id)">
                  <span class="icon_text">{{items.item_title}}</span>
                </p>
              </div>

            </li>
            
          </ul>
        </div>
      </div>
      <div class="footer-bottom" v-if="status == 1">
        <button :disabled="isClick" @click="submit">确定</button>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components:{Header},
  data(){
      return{
          //投票详情参数
          paramsdata:{
            method:'act.vote.getVoteDetail',
            user_id: sessionStorage.getItem('user_id'),
            id:''
          },
          voteDel:{},
          status:'',
          //确定确定所需要的参数
          voteId:'',
          questions:[],
      }
  },
  created(){
    this.paramsdata.id=this.$route.query.id
    this.status=this.$route.query.status
    this.getdata()
  },
  methods:{
    //详情请求
    getdata(){
      let sendData = {...this.paramsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
      this.$post('/router/rest/',encrypSendData)
      .then(res=>{
        this.voteDel=res.data
      })
    },
    //点击确定
    submit(){
      let paramsdata={
        method:'act.vote.votes',
        user_id: sessionStorage.getItem('user_id'),
        vote_id:this.voteId,
        questions:this.questions
      }
      let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
      let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
      this.$post('/router/rest/',encrypSendData)
      .then(res=>{
        this.$toast('投票成功')
        this.$router.go(-1)
      })
    },
    //点击多选框
    handleCheckbox(e,voteId,questionId,id,mulqty){
      // console.log(mulqty)
      // console.log(e)
      let isChecked = e.srcElement.checked
      this.questions.forEach( (item,i) => {
        if(item.items == id) {
          this.questions.splice(i, 1)
        }
      })
      if(isChecked) {
        this.voteId=voteId
        let obj={
          question_id:questionId,
          items:id
        }
        this.questions.push(obj)
      }
    },
    //点击单选框
    handleRadio(e,voteId,questionId,id){
      this.questions.forEach( (item,i) => {
        if(item.question_id == questionId) {
          this.questions.splice(i, 1)
        }
      })
      this.voteId=voteId
      let obj={
        question_id:questionId,
        items:id
      }
      this.questions.push(obj)
      // console.log(obj)
    },
  },
  computed:{
    isClick(){
      if(JSON.stringify(this.questions)=="[]") return true
      else return false
    }
  },
}
</script>

<style lang="less" scoped>
.vote-detail{
  .content-wrap{
    .content-message{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100px;
      border-bottom: 1px dashed  #eee;
      .title{
        font-size: 16px;
        font-weight: bold;
        color: #242424;
        margin-top: 25px;
      }
      .date{
        font-size: 12px;
        font-weight: 400;
        color: #959595;
        margin-top: 5px;
      }
      .dot-left{
        position: absolute;
        top: 94px;
        left: 0;
        width: 6px;
        height: 12px;
        background: #eee;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
      .dot-right{
        position: absolute;
        top: 94px;
        right: 0;
        width: 6px;
        height: 12px;
        background: #eee;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
    }
    .content-option{
      padding-left: 15px;
      padding-top: 19px;
      .option-list{
        .option-item{
          margin-bottom: 16px;
          .checkbox{
            font-size: 14px;
            color: #333333;
            padding-left: 19px;
            .label{
              font-size: 14px;
              color: #000000;
              display: block;
              margin-bottom: 16px;
            }
            .select_icon{
              display: flex;
              align-items: center;
              margin-top: 12px;
              // 多选
              input[type=checkbox] {
                background: url('../../assets/vote/checkboxicon_on.png') no-repeat center;
                background-size: 100%;
              }
              input[type=checkbox]:checked{
                background: url('../../assets/vote/checkboxicon.png') no-repeat center;
                background-size: 100%;
              }
              // 单选
              input[type=radio] {
                background: url('../../assets/vote/radioicon_on.png') no-repeat center;
                background-size: 100%;
              }
              input[type=radio]:checked{
                background: url('../../assets/vote/radioicon.png') no-repeat center;
                background-size: 100%;
              }
              .icon_text{
               padding-top: 3px;
               padding-left: 5px;
              }
              .icon_btn1{
                display: block; 
                width: 17px; 
                height: 17px; 
                background-color: #fff; 
                -webkit-appearance:none;
                outline: none; 
                border: none;
              }
              .icon_btn{
                display: block; 
                width: 18px; 
                height: 18px; 
                background-color: #fff; 
                -webkit-appearance:none;
                outline: none; 
                border: none;
              }
            }

          }
        }
      }
    }
  }
  .footer-bottom{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
    button{
      width: 343px;
      height: 40px;
      background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
      border-radius: 6px 6px 6px 6px;
      border: 0;
    }
  }
  
}
.footer-bottom button[disabled]{
    opacity: 0.6;
  }
</style>