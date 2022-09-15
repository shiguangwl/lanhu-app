<template>
  <div class="edit-address">
    <Header title="编辑配送地址"></Header>
    <div class="addAddr" @click="handlerRemove()">删除地址</div>
    <div class="add-wrap">
      <van-field v-model="form.contactName" label-width="60" label="联系人" placeholder="请填写取餐人姓名"/>
      <van-field v-model="form.contactPhone" label-width="60" type="tel" label="手机号" placeholder="请填写取餐人手机号码"/>
      <van-field
          v-model="form.regionCode"
          :rules="[{ required: true, message: '请选择区域' }]"
          readonly
          clickable
          label-width="60"
          label="配送地址"
          is-link
          placeholder="点击选择省市区"
          @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
        />
      </van-popup>

      <van-field v-model="form.detailAddress" label-width="60" label="详细地址" placeholder="请输入详细地址（门牌号等）"/>
    </div>
    <div class="footer">
      <button :disabled="isClick" @click="handlerHold()">保存地址</button>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import {mapState} from 'vuex'
export default {
  components:{Header},
  data(){
    return{
      resData: [],
      commitAddrId:[],
      form:{
        contactName:'',
        contactPhone:'',
        regionCode:'',
        detailAddress:'',
      },
      //地区选择
      showArea: false,
      areaList: {
        province_list: {
        },
        city_list: {
        },
        county_list: {
        },
      },
      //地址列表传来的id
      id:"",

    }
  },
  created(){
    //从地址列表传来的值
    let edit=JSON.parse(this.$route.query.editParam)
    this.form.contactName=edit.name
    this.form.contactPhone=edit.phone
    this.form.regionCode=edit.firstlevel+"/"+edit.senodlevel+"/"+edit.threelevel
    this.form.detailAddress=edit.details
    this.id=edit.id,
    this.commitAddrId[0]=edit.org_id_firstlevel,
    this.commitAddrId[1]=edit.org_id_senodlevel,
    this.commitAddrId[2]=edit.org_id_threelevel,
    // console.log(edit)
    
    this.getConstruct()
  },
  methods:{
    //地址架构
    getConstruct(){
      let data={
        method:'adr.org.getobj',
        company_id:sessionStorage.getItem('company_id'),
      }
      let sendData = {...data, ...this.myFun.getDefaultParameters()}
      let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
      this.$post('/router/rest/',encrypSendData)
          .then(res=>{
            // this.areaList.
            // console.log(res)
            this.resData = res.data
            res.data.forEach(item => {
                if(item.level === '1'){
                  this.areaList.province_list[item.code] = item.adr_name
                }else if(item.level === '2'){
                  this.areaList.city_list[item.code] = item.adr_name
                }else {
                  this.areaList.county_list[item.code] = item.adr_name
                }
            })

            // console.log(this.areaList)

          })
    },
    //地区选择
    onConfirm(values){
    //   console.log(values,'获取编码')
    this.commitAddrId=[]
      values.forEach(item=>{
        this.resData.forEach(item1=>{
          if(item1.code === item.code){
            this.commitAddrId.push(item1.id)
          }
        })
      })
    //   console.log(this.commitAddrId)
      this.form.regionCode = values
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
      this.showArea = false;
    },
    // 更新vues里面的地址
    updateAddress() {
        let firstlevel = this.form.regionCode.split('/')[0]
        let senodlevel = this.form.regionCode.split('/')[1]
        let threelevel = this.form.regionCode.split('/')[2]
        let addressObj = {
          details: this.form.detailAddress,
          firstlevel: firstlevel,
          id: this.id,
          name: this.form.contactName,
          phone: this.form.contactPhone,
          senodlevel: senodlevel,
          threelevel: threelevel,
        }
        this.$store.dispatch('setChooseAddr', addressObj)
    },
    //保存地址
    async handlerHold(){
      // 手机号验证
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if(!reg.test(this.form.contactPhone)){
        this.$toast('请输入合法的手机号')
      }else{
        let data={
            method:'sys.user.editUserAddress',
            id:this.id,
            org_id_firstlevel:this.commitAddrId[0],
            org_id_senodlevel:this.commitAddrId[1],
            org_id_threelevel:this.commitAddrId[2],
            phone:this.form.contactPhone,
            name:this.form.contactName,
            details:this.form.detailAddress,
            remark:'',
        }
        let sendData = {...data, ...this.myFun.getDefaultParameters()}
        let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
        let res =await this.$post('/router/rest/',encrypSendData)
        let isPersonal = JSON.parse(this.$route.query.editParam)
        if(isPersonal.souce) {
          this.$router.go(-1)
        } else {
          this.$router.push({ name: 'ConfirmOrder', params: { type: 'editAddress' } })
        }
        this.$toast('修改成功')
        this.updateAddress()
      }
    },
    //点击删除
    handlerRemove(){
        this.$dialog.confirm({
            title: '删除配送地址',
            message:'确认删除?'
        })
        .then(async ()=>{
        let data={
            method:'sys.user.deleteUserAddress',
            id:this.id,
        }
        let sendData = {...data, ...this.myFun.getDefaultParameters()}
        let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
        let res =await this.$post('/router/rest/',encrypSendData)
        // this.$router.push("/address");
        this.$router.go(-1)
        if(data.id == this.chooseAddr.id) {
          this.$store.dispatch('setChooseAddr',null)
        }
        this.$toast('删除成功')
        })
        .catch((e)=>{
            this.$toast('取消删除')
        })
    },
  },
  computed:{
    ...mapState(['chooseAddr']),
    isClick(){
      if(this.form.contactName=="" || this.form.contactPhone=="" || this.form.regionCode=="" || this.form.detailAddress=="") return true
      else return false
    }
  }
}
</script>

<style lang="less" scoped>
.edit-address{
    width: 100%;
    min-height: 100%;
    background: #f6f6f6;
    .addAddr{
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
    }
    /deep/ .van-field--disabled .van-field__label{
        color: #646566;
    }
    .add-wrap{
        position: relative;
        width: 343px;
        height: 164px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;
        margin: 16px;
        .down{
            position: absolute;
            top: 107px;
            right: 16px;
        }
    }
    .footer{
        margin: 48px 16px;
        button{
            width: 343px;
            height: 40px;
            background: linear-gradient(128deg, #FF5D62 0%, #FF7558 100%);
            border-radius: 6px 6px 6px 6px;
            opacity: 1;
            border: 0;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
        }
        button[disabled]{
            opacity: 0.6;
        }
    }
}
</style>
