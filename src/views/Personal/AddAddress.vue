<template>
  <div class="AddAddress">
    <Header title="新增配送地址"></Header>
    <!-- <div class="order-food">
      <div class="back" @click="jumpRouter">
          <img src="../../assets/orderfood/back.png" alt="">
      </div>
      <div class="title">确认订单</div>
    </div> -->
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
// import { areaList } from '@vant/area-data';
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
      }
    }
  },
  created(){
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

          })
    },
    //地区选择
    onConfirm(values){
    this.commitAddrId=[]
      values.forEach(item=>{
        this.resData.forEach(item1=>{
          if(item1.code === item.code){
            this.commitAddrId.push(item1.id)
          }
        })
      })
      this.form.regionCode = values
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
      this.showArea = false;
    },
    //我的地址请求
    async getAddress(){
        let paramsdata={
            method:'sys.user.getUserAddress',
            user_id:sessionStorage.getItem('user_id'),
        }
        let sendData = {...paramsdata, ...this.myFun.getDefaultParameters()}
        let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
        let res = await this.$post('/router/rest/',encrypSendData)
        if(res.data) {
          return res.data
        } else {
          return null
        }
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
        console.log(addressObj)
        // this.$store.dispatch('setChooseAddr', addressObj)
    },
    //保存地址
    async handlerHold(){
      // 手机号验证
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if(!reg.test(this.form.contactPhone)){
        this.$toast('请输入合法的手机号')
      }else{
        let data={
            method:'sys.user.addUserAddress',
            user_id:sessionStorage.getItem('user_id'),
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
        console.log(res)
        if(res.status == 0) {
          let addressList = await this.getAddress()

          console.log(addressList)
          console.log(this.form)
          let obj = this.form
          let firstCityName = obj.regionCode.split('/')[0]
          let secondCityName = obj.regionCode.split('/')[1]
          let threeCityName = obj.regionCode.split('/')[2]
          this.$toast('添加成功')
          addressList.forEach( item => {
            if(item.name == obj.contactName && item.phone == obj.contactPhone && item.details == obj.detailAddress && item.firstlevel ==  firstCityName && item.senodlevel ==  secondCityName && item.threelevel ==  threeCityName) {
              this.$store.dispatch('setChooseAddr',item)
            }
          })
          this.$router.go(-1);
        }
      }
    },
    jumpRouter() {
      if(this.$route.params.type == "confirmOrderAddAddress") {
          this.$router.go(-1)
      } else {
          this.$router.go(-1)
      }
        // console.log(this.$route)
    }
  },
  computed:{
    isClick(){
      if(this.form.contactName=="" || this.form.contactPhone=="" || this.form.regionCode=="" || this.form.detailAddress=="") return true
      else return false
    }
  }
}
</script>

<style lang="less" scoped>
.AddAddress{
  width: 100%;
  min-height: 100%;
  background: #f6f6f6;
  /deep/ .van-field--disabled .van-field__label{
    color: #646566;
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
