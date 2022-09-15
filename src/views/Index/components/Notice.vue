<template>
  <div class="notice-wrap">
      <div class="notice">
          <img src="../../../assets/index/notice.png" alt="">
      </div>
      <div class="demo" v-if="noticedata.length>0">
          <ul class="list" >
              <li  v-for="(item, index) in noticedata" :key="index" :class="!index && play ? 'toUp' : ''" class="msg-item" @click="btnNotice()">{{ item.title }}</li>
          </ul>
      </div>

     <div class="empty" v-if="noticedata.length == 0" @click="btnNotice()">
         暂无公告~~~
     </div>

  </div>
</template>

<script>
export default {
    props:['noticedata'],
    data(){
        return{
            play: false
        }
    },
    mounted(){
        setInterval(this.startPlay, 2000)
    },
    methods:{
        startPlay() {
            let that = this
            that.play = true //开始播放
            setTimeout(() => {
                that.noticedata.push(that.noticedata[0]) //将第一条数据塞到最后一个
                that.noticedata.shift() //删除第一条数据
                that.play = false //暂停播放,此处修改，保证每一次都会有动画显示
            }, 500)
        },
        //点击进入公告
        btnNotice(){
            this.$router.push('/notice')
        },
    },
}
</script>

<style lang="less" scoped>
.notice-wrap{
    position: relative;
    margin-top: 14px;
    padding: 14px 16px 20px 16px;
    .notice{
        width: 343px;
        height: 36px;
        background: #FFFFFF;
        box-shadow: 0px 2px 3px 1px rgba(42,49,49,0.0800);
        border-radius: 6px 6px 6px 6px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        overflow: hidden;
        img{
            width: 39px;
            height: 16px;
            padding-left: 11px;
        }
    }
    .demo{
        position: absolute;
        top: 46%;
        transform: translateY(-50%);
        left: 70px;
        .list{
            box-sizing: border-box;
            overflow: hidden;
            height: 32px;
            padding-left: 20px;
            margin: 0;
            .msg-item{
                flex: 1;
                width: 180px;
                height: 32px;
                line-height: 32px;
                font-size: 13px;
                color: #242424;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .toUp{
                margin-top: -50px;
                transition: all 1.5s;
            }
        }
    }
    .empty{
        position: absolute;
        top: 38%;
        left: 70px;
        font-size: 13px;
        color: #242424;
        padding-left: 20px;
    }
}
</style>
