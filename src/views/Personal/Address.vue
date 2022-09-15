<template>
  <div class="address-wrap">
      <Header title="地址管理"></Header>
      <div class="addAddr" @click="handlerAdd()">新增地址</div>
      <div class="address-box">
          <ul class="addr-list">
              <li class="addr-item" v-for="item in addrdata" :key="item.id">
                  <div class="message">
                      <div class="info">
                          <div class="name">{{item.name}}</div>
                          <div class="phone">{{item.phone}}</div>
                      </div>
                      <div class="address">{{item.firstlevel}} {{item.senodlevel}} {{item.threelevel}} {{item.details}}</div>
                  </div>
                  <img src="../../assets/personal/edit.png" alt="" class="edit" @click="handlerEdit(item)">
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
            addrdata:[],
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        //地址列表接口
        getdata(){
            let paramsdata={
                method:'sys.user.getUserAddress',
                user_id:sessionStorage.getItem('user_id'),
            }
            let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            this.$post('/router/rest/',encrypSendData)
            .then(res=>{
                this.addrdata = res.data
            })
            
        },
        //跳转到新增地址
        handlerAdd(){
            this.$router.push('/addAddress')
        },
        //跳转到编辑
        handlerEdit(obj){
            obj.souce = 'personal'
            let editParam = JSON.stringify(obj)
            this.$router.push('/editAddress?editParam='+editParam)
        },
    }
}
</script>

<style lang="less" scoped>
.address-wrap{
    .addAddr{
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
    }
    .address-box{
        .addr-list{
            padding: 10px 16px;
            .addr-item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 60px;
                box-sizing: border-box;
                padding: 10px 0;
                border-bottom: 1px dashed #E2E2E2;
                .message{
                    display: flex;
                    flex-direction: column;
                    .info{
                        display: flex;
                        align-items: center;
                        font-size: 11px;
                        font-weight: 400;
                        color: #959595;
                        .name{
                           
                        }
                        .phone{
                            padding-left: 10px;
                        }
                    }
                    .address{
                        font-size: 14px;
                        font-weight: 400;
                        color: #242424;
                        padding-top: 10px;
                        width: 300px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
                .edit{
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
}
</style>