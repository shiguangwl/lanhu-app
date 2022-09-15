<template>
  <div class="leave-msg">
      <Header title="我要留言"></Header>
      <div class="form-wrap">
          <div class="select-wrap">
              <div class="select-title">
                  <span class="iconfont">*</span>
                  <span class="lable">食堂选择</span>
              </div>
              <div class="select-input" @click="btnInput()">
                  <input type="text" v-model="form.canteenId" placeholder="请选择食堂" disabled>
                  <img src="../../assets/Search/down.png" alt="" :class="{admining:rotate}">
                  <transition name="fade">
                  <ul v-show="isShow">
                      <li v-for="(item,index) in canteendata" :key="index" :class="{active:index==num}" @click="handlerType(index,item.name,item.id)">{{item.name}}</li>
                  </ul>
                  </transition>
              </div>
          </div>

          <div class="select-wrap">
              <div class="select-title">
                  <span class="iconfont">*</span>
                  <span class="lable">留言标题</span>
              </div>
              <div class="select-input">
                  <input type="text" v-model="form.title" placeholder="请输入留言标题">
              </div>
          </div>

          <div class="select-wrap">
              <div class="select-title">
                  <span class="iconfont">*</span>
                  <span class="lable">留言内容</span>
              </div>
              <div class="select-input">
                  <textarea name="" v-model="form.describe" id="" cols="30" rows="10" placeholder="请输入您要反馈的详细内容"></textarea>
              </div>
          </div>

          <!-- <div class="update-image">
              <div class="title">图片补充</div>
              <div class="Uploader">
                  <van-uploader v-model="fileList" :after-read="afterRead" multiple />
              </div>
          </div> -->

          <div class="submit">
              <button :disabled="isClick" @click="btnSubmit()">提交</button>
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
            num:0,
            form:{
                canteenId:'',
                title:'',
                describe:'',
                value:'',

            },
            fileList:[],//图片上传
            dataImg:new FormData(),
            isShow:false,//下拉框的显示和隐藏
            rotate:false,
            canteendata:[],//全部食堂
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        //获取全部食堂
        async getdata(){
            let paramsdata={
                method:'app.appfood.casAll',
                company_id: sessionStorage.getItem('company_id'),
                is_meal:'1',
                user_id:sessionStorage.getItem('user_id'),
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            let  res = await this.$post('/router/rest/', encrypSendData)
            this.canteendata=res.data.canteen
            // console.log(res)
        },
        // 图片上传 
        afterRead(file){
            // console.log(file)
            if(file.length>1){
                for(const item of file){
                    console.log(item)
                    this.dataImg.append(file.file.name, file);
                }
            }else{
                this.dataImg.append("files", file);
            }
            console.log(this.dataImg);
            this.upload()
        },
        async upload(){
            //图片上传的请求
            // const request=await this.$post('/api/test/uploadFiles',this.dataImg)

            
        },
        //选择食堂
        btnInput(){
            this.rotate=this.rotate==true?false:true
            this.isShow=!this.isShow
        },
        //下拉选项
        handlerType(index,name,id){
            this.form.canteenId=name
            this.form.value=id
            this.num=index
            this.isShow=true
        },
        //点击提交
        btnSubmit(){
            let paramsdata={
                method:'act.leave_message.save',
                company_id:sessionStorage.getItem('company_id'),
                user_id:sessionStorage.getItem('user_id'),
                title:this.form.title,
                content:this.form.describe,
                canteen_id:this.form.value,
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            // console.log(sendData)
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                if(res.status == 0){
                    this.$toast('留言成功')
                    this.$router.push('/search')
                }
            })
        }
    },
    computed:{
        isClick(){
            if(this.form.canteenId=="" || this.form.title=="" || this.form.describe=="") return true
            else return false
        }
    },
    watch:{

    }
}
</script>

<style lang="less" scoped>
.leave-msg{
    width: 100%;
    min-height: 100%;
    background: #F6F6F6;
    .form-wrap{
        padding: 0 16px;
        .select-wrap{
            margin-bottom: 7px;
            .select-title{
                padding: 5px 0 9px 0;
                .iconfont{
                    font-size: 14px;
                    font-weight: 400;
                    color: #FF543B;
                    padding-right: 4px;
                }
                .lable{
                    font-size: 14px;
                    font-weight: 400;
                    color: #242424;
                }
            }
            .select-input{
                position: relative;
                input{
                    width: 343px;
                    height: 38px;
                    background: #FFFFFF;
                    border-radius: 6px 6px 6px 6px;
                    border: 0;
                    font-size: 14px;
                    font-weight: 400;
                    color: #959595;
                    box-sizing: border-box;
                    padding-left: 12px;
                }
                img{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 13px;
                    vertical-align: middle;
                    width: 10px;
                    height: 6px;
                }
                .admining{
                    transform:rotate(180deg);
                }
                ul{
                    position: absolute;
                    z-index: 999;
                    width: 343px;
                    background: #FFFFFF;
                    box-shadow: 0px 2px 2px 1px rgba(42,49,49,0.0800);
                    border-radius: 6px 6px 6px 6px;
                    padding: 0 13px;
                    box-sizing: border-box;
                    &.fade-enter-active,
                    &.fade-leave-active {
                    transition: opacity 0.25s ease-out;
                    }

                    &.fade-enter,
                    &.fade-leave-to {
                    opacity: 0;
                    }
                    li{
                        font-size: 14px;
                        font-weight: 400;
                        color: #5D5D5D;
                        height: 40px;
                        line-height: 40px;
                    }
                    .active{
                        color: #FF5D62;
                    }
                }
                textarea{
                    width: 343px;
                    background: #FFFFFF;
                    border-radius: 6px 6px 6px 6px;
                    border: 0;
                    font-size: 14px;
                    font-weight: 400;
                    color: #959595;
                    box-sizing: border-box;
                    padding-left: 12px;
                    padding-top: 9px;
                }
            }

        }
        .update-image{
            margin-top: 18px;
            .title{
                font-size: 14px;
                font-weight: 400;
                color: #242424;
            }
            .Uploader{
                margin-top: 8px;
                .van-Uploader{

                }
            }
        }
        .submit{
            margin-top: 12px;
            button{
                width: 343px;
                height: 40px;
                background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
                border-radius: 6px 6px 6px 6px;
                border: 0;
                font-size: 16px;
                font-weight: 400;
                color: #FFFFFF;
                opacity: 1;
            }
            button[disabled]{
                opacity: 0.6;
            }
        }
    }
}
</style>