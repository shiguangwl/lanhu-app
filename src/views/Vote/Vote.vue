<template>
    <div class="vote-wrap">
        <Header title="投票中心" class="header"></Header>
        <div class="vote-box">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                v-model="loading" 
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :offset="10"
                :immediate-check="false">
                    <ul class="vote-list" v-for="item in voteList" :key="item.id">
                        <li class="vote-item" v-if="item.status != 0 "   @click="flag && handlerVote(item.id,item.end_time,item.status)">
                            <div class="vote-icon">
                                <img src="../../assets/vote/vote.png" alt="">
                                <span class="tip"></span>
                            </div>
                            <div class="vote-dec">
                                <div class="dec-top">
                                    <span class="dec-title">{{ item.name }}</span>
                                    <span class="dec-date">{{ item.add_time.substring(11, 16) }}</span>
                                </div>
                                <div class="dec-bottom">
                                    <span class="time">截止日期：{{ item.end_time }}</span>
                                    <!-- <span class="condition1" v-if="new Date(item.end_time).getTime() - new Date().getTime() < 0">已截止</span> -->
                                    <span class="condition1" v-if="item.status == -1">已截止</span>
                                    <span class="condition" v-if="item.status == 1">进行中</span>
                                    <span class="condition1" v-if="item.status == -2">已投票</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header'
import { tr } from 'date-fns/locale'
export default {
    components: { Header },
    data() {
        return {
            voteList: [],
            loading: true,
            finished: false,
            refreshing: false,
            flag:true,
            //投票列表参数
            paramsdata: {
                method: 'act.vote.list',
                currpage: '1',
                count: '10',
                company_id: sessionStorage.getItem('company_id'),
                user_id: sessionStorage.getItem('user_id'),
            },
            end_time:'',
        }
    },
    created() {
        this.initVoteList()
    },
    methods: {
        //请求当前页数据
        async getVoteListAPI() {
            let sendData = { ...this.paramsdata, ...this.myFun.getDefaultParameters() }
            let encrypSendData = this.myFun.encryptByMessage(JSON.stringify(sendData))
            let { data: res } = await this.$post('/router/rest/', encrypSendData)
            // console.log(res)
            return res
        },
        // 处理列表
        async initVoteList(isRefresh) {
            let res = await this.getVoteListAPI()
            if (isRefresh) {
                this.voteList = res
                this.refreshing = false
                this.finished = false
            } else {
                this.voteList = [...this.voteList, ...res]
                this.loading = false
            }
            if (res.length === 0) {
                this.finished = true
            }
        },
        // 上拉加载处理函数
        onLoad() {
            this.paramsdata.currpage++
            setTimeout( () => {
                this.initVoteList()
            },1500)
        },
        // 下拉刷新处理函数
        onRefresh() {
            setTimeout(() => {
                this.paramsdata.currpage = 1
                this.initVoteList(true)
            }, 1000);
        },
        //进入详情
        handlerVote(id,end_time,status){
            // if(new Date(end_time).getTime() - new Date().getTime() < 0){
            //     this.flag == false
            // }else{
            //     this.flag == true
            //     this.$router.push('/votedetail?id='+id)
            // }
            if(status == '-1'){
                this.flag==false
                this.$toast('这个投票截止了哦')
            }else if(status == '-2'){
                this.flag == true
                this.$router.push('/votedetail?id='+id+'&status='+status)
            }else if(status == '1'){
                this.flag == true
                this.$router.push('/votedetail?id='+id+'&status='+status)
            }
        },
    },
}
</script>

<style lang="less" scoped>
.vote-wrap {
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }

    .vote-box {
        margin-top: 44px;

        .vote-list {
            .vote-item {
                display: flex;
                align-items: center;
                width: 100%;
                height: 66px;
                box-sizing: border-box;
                padding: 0 16px;
                border-bottom: 1px solid #eee;

                .vote-icon {
                    position: relative;
                    width: 40px;
                    height: 40px;

                    img {
                        width: 40px;
                        height: 40px;
                    }

                    .tip {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 8px;
                        height: 8px;
                        background: #FF543B;
                        border-radius: 50%;
                    }
                }

                .vote-dec {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    padding-left: 12px;

                    .dec-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .dec-title {
                            font-size: 14px;
                            font-weight: 400;
                            color: #242424;
                        }

                        .dec-date {
                            font-size: 12px;
                            font-weight: 500;
                            color: #959595;
                        }
                    }

                    .dec-bottom {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-top: 4px;

                        .time {
                            font-size: 12px;
                            font-weight: 400;
                            color: #959595;
                        }
                        .condition {
                            font-size: 12px;
                            font-weight: 400;
                            color: #0AB583;
                        }
                        .condition1{
                            font-size: 12px;
                            font-weight: 400;
                            color: #959595;
                        }
                    }
                }
            }
        }
    }
}
</style>