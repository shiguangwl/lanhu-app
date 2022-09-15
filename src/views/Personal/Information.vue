<template>
  <div class="information">
      <Header title="个人信息"></Header>
      <div class="info-top">
          <ul>
              <li>
                  <span class="lable">人脸信息</span>
                  <img :src="information.imgUrl" alt="" v-if="!information.imgUrl" class="head">
                  <img src="../../assets/personal/info.png" alt="" v-else class="head">
              </li>
               <li>
                  <span class="lable">姓名</span>
                  <span class="name">{{infodata.user_name}}</span>
              </li>
               <li>
                  <span class="lable">工号</span>
                  <span class="num">{{infodata.job_number}}</span>
              </li>
               <li>
                  <span class="lable">所属企业</span>
                  <span class="company">{{infodata.company_name}}</span>
              </li>
          </ul>
      </div>

      <div class="info-top">
          <ul>
              <li>
                  <span class="lable">放卡类型</span>
                  <span class="name">{{infodata.cardtype_name}}</span>
              </li>
               <li>
                  <span class="lable">饭卡状态</span>
                  <span class="name">{{infodata.statusName}}</span>
              </li>
               <li>
                  <span class="lable">截止日期</span>
                  <span class="num">{{infodata.in_date}}</span>
              </li>
               <li @click="$router.push('/mealcard')">
                  <span class="lable">我的饭卡码</span>
                  <div class="iconfont">
                      <img src="../../assets/personal/card-code.png" alt="" class="code">
                      <img src="../../assets/personal/more.png" alt="" class="more">
                  </div>
              </li>
               <li @click="$router.push('/index')">
                  <span class="lable">我的余额</span>
                  <div class="iconfont">
                      <span class="price">¥{{infodata.remainingSum}}</span>
                      <img src="../../assets/personal/more.png" alt="" class="more">
                  </div>
              </li>
          </ul>
      </div>

  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    components:{Header},
    data(){
        return{
            information:{
                user_name:sessionStorage.getItem('user_name'),
                company_name:sessionStorage.getItem('company_name'),
                imgUrl:sessionStorage.getItem('img_url')
            },
            infodata:{},
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        //饭卡信息请求
        getdata(){
            let paramsdata={
                method:'card.meal.MyMealCard',
                user_id:sessionStorage.getItem('user_id')
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                this.infodata=res.data
            })

        },
    }
}
</script>

<style lang="less" scoped>
.information{
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .info-top{
        margin-bottom: 12px;
        ul{
            width: 100%;
            background: #FFFFFF;
            box-sizing: border-box;
            padding: 0 16px;
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 44px;
                line-height: 44px;
                border-bottom: 1px solid #E9E9E9;
                &:last-child{
                    border-bottom: 0;
                }
                .lable{
                    font-size: 14px;
                    font-weight: 400;
                    color: #5D5D5D;
                }
                .head{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .name{
                    font-size: 14px;
                    font-weight: 400;
                    color: #242424;
                }
                .num{
                    font-size: 14px;
                    font-weight: 400;
                    color: #242424;
                }
                .company{
                    font-size: 14px;
                    font-weight: 400;
                    color: #242424;
                }
                .iconfont{
                    display: flex;
                    align-items: center;
                    .price{
                        font-size: 14px;
                        font-weight: 400;
                        color: #242424;
                        padding-right: 8px;
                    }
                    .code{
                        width: 17px;
                        height: 17px;
                        padding-right: 8px;
                    }
                    .more{

                    }
                }
            }
        }
    }
    .info-bottom{
        ul{
            li{

            }
        }
    }
}
</style>