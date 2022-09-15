<template>
    <div>
        <div class="pick" id="pick" v-if="!isfree">
            <van-icon
                name="arrow-left"
                @click.stop="reducedate"
                :color="isfree ? '#000' : curDate1 == nowDate ? '#ccc' : '#000'"
            />
            <div @click.stop="openDatePick">{{ curDate }}</div>
            <van-icon name="arrow" @click.stop="adddate" />
        </div>
        <div v-if="isfree" class="input-back" id="pick">
            <div class="input" @click.stop="openDatePick('input1')">
                {{ curDate.slice(0, 10) }}
            </div>
            <span class="separate">-</span>
            <div class="input" @click.stop="openDatePick('input2')">
                {{ curDatetwo.slice(0, 10) }}
            </div>
        </div>
        <div
            class="overlay"
            id="overlay"
            v-show="pickshow"
            @click.stop="pickshow = false"
        >
            <div class="Date-Pick" @click.stop="pickshow = true">
                <div class="P-week pick-box">
                    <span
                        v-for="(item, index) in [
                            '一',
                            '二',
                            '三',
                            '四',
                            '五',
                            '六',
                            '日',
                        ]"
                        :key="index"
                        >{{ item }}</span
                    >
                </div>
                <div class="day-back pick-box">
                    <div
                        v-for="(item, index) in dayList"
                        :key="index"
                        @click.stop="daychange(item)"
                        :style="
                            isfree
                                ? '#000'
                                : curyear < nowyear
                                ? 'color:#ccc'
                                : item < curday || nowmonth > curmonth
                                ? 'color:#ccc'
                                : 'color:#000'
                        "
                        :class="{ active: tapcurday == item }"
                    >
                        {{ item != 0 ? item : "" }}
                    </div>
                </div>
                <div class="pick P-month">
                    <van-icon
                        name="arrow-left"
                        @click.stop="reducemothn"
                        :color="
                            isfree
                                ? '#000'
                                : curmonth == nowmonth
                                ? '#ccc'
                                : '#000'
                        "
                    />
                    <div v-if="curDate">{{ curDate.slice(0, 7) }}</div>
                    <van-icon name="arrow" @click.stop="addmonth" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let date = new Date();
let year;
let month;
let day;
let week;
export default {
    name: "calendar",
    model: "value",
    props: {
        value: {
            type: String,
            default: "",
        },
        isfree: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            inputflag: "input1",
            nowDate: "",
            curDate: "",
            curDate1: "",
            weeklist: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            pickshow: false,
            dayList: [],
            curday: "",
            tapcurday: "",
            nowmonth: "",
            curmonth: "",
            nowyear: "",
            curyear: "",
            curDatetwo: "",
            curDatetwo1: "",
        };
    },

    created() {
        if (this.value != "") {
            var ncd = new Date(this.value.replace(/-/g, '/'));
            year = ncd.getFullYear();
            month = ncd.getMonth() + 1;
            day = ncd.getDate();
            week = this.weeklist[new Date(`${year}-${month}-${day}`.replace(/-/g, '/')).getDay()];
            this.curyear = year;
            this.nowyear = year;
            this.nowmonth = month;
            this.curmonth = month;
            this.curday = new Date().getDate();
            this.tapcurday = day;
            this.curDate1 = `${year}-${month}-${day}`;
            this.nowDate = `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
            }-${new Date().getDate()}`;
            this.curDate = `${year}年${month}月${day}日 ${week}`;
            this.cueDatechange(this.curDate1);
        } else {
            this.getdate();
        }
    },
    methods: {
        addmonth() {
            this.handleDate("addmonth");
        },
        reducemothn() {
            
            if (!this.isfree) {
                if (this.curmonth == this.nowmonth) {
                    return;
                }
            }
            this.handleDate("reducemonth");
        },
        cueDatechange(date) {
            var td = new Date(date.replace(/-/g, '/'));
            if (this.inputflag == "input1") {
                td = td.setDate(td.getDate() + 6);
            } else {
                td = td.setDate(td.getDate() - 6);
            }

            var tdt = new Date(td);
            var y = tdt.getFullYear();
            var m = tdt.getMonth() + 1;
            var d = tdt.getDate();
            var w = this.weeklist[new Date(`${y}-${m}-${d}`.replace(/-/g, '/')).getDay()];
            if (this.inputflag == "input1") {
                this.curDatetwo = `${y}年${m}月${d}日 ${w}`;
                this.curDatetwo1 = `${y}-${m}-${d}`;
            } else if (this.inputflag == "input2") {
                this.curDate = `${y}年${m}月${d}日 ${w}`;
                this.curDate1 = `${y}-${m}-${d}`;
            }
        },
        daychange(item) {
            
            if (!this.isfree) {
                if (this.curyear < this.nowyear) {
                    return;
                }
                if (item < this.curday || this.nowmonth > this.curmonth) {
                    return;
                }
            }
            this.tapcurday = item;
            if (this.inputflag == "input1") {
                var d = new Date(this.curDate1.replace(/-/g, '/'));
            } else if (this.inputflag == "input2") {
                var d = new Date(this.curDatetwo1.replace(/-/g, '/'));
            }

            d = d.setDate(item);
            var dt = new Date(d);
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            var w = this.weeklist[new Date(`${y}-${m}-${d}`.replace(/-/g, '/')).getDay()];
            this.curyear = y;
            this.curmonth = m;

            this.pickshow = false;
            if (this.isfree) {
                if (this.inputflag == "input1") {
                    this.curDate = `${y}年${m}月${d}日 ${w}`;
                    this.curDate1 = `${y}-${m}-${d}`;
                    this.cueDatechange(this.curDate1);
                } else if (this.inputflag == "input2") {
                    this.curDatetwo = `${y}年${m}月${d}日 ${w}`;
                    this.curDatetwo1 = `${y}-${m}-${d}`;
                    this.cueDatechange(this.curDatetwo1);
                }
                this.$emit('change',{
                    start_time:this.curDate1,
                    end_time:this.curDatetwo1
                })
            }
			else{
				this.curDate = `${y}年${m}月${d}日 ${w}`;
                this.curDate1 = `${y}-${m}-${d}`;
                this.$emit('change',this.curDate1)
			}
            
            
        },
        getcurmonthList(date) {
            var d = new Date(date.replace(/-/g, '/'));
            var cyear = d.getFullYear();
            var cmonth = d.getMonth() + 1;
            var dt = new Date(cyear, cmonth, 0);
            let fillList = [];
            if (new Date(`${cyear}-${cmonth}-1`.replace(/-/g, '/')).getDay() != 0) {
                fillList = new Array(
                    new Date(`${cyear}-${cmonth}-1`.replace(/-/g, '/')).getDay() - 1
                ).fill(0);
            } else {
                fillList = new Array(6).fill(0);
            }
            this.dayList = fillList.concat(
                [...Array(dt.getDate() + 1).keys()].splice(1)
            );
        },
        openDatePick(item) {
            if (item == "input1" || item == "input2") {
                this.inputflag = item;
            }
			else{
				this.inputflag='input1'
			}

            this.pickshow = !this.pickshow;
            let picktop =
                document.querySelector("#pick").offsetTop +
                document.querySelector("#pick").offsetHeight / 2;
            document.getElementById(
                "overlay"
            ).style.height = `calc(100vh - ${picktop}px)`;
            this.handleDate();
        },
        adddate() {
            this.handleDate("addday");
        },
        reducedate() {
            if (!this.isfree) {
                if (this.curDate1 == this.nowDate) {
                    return;
                }
            }
            
            this.handleDate("reduceday");
            
        },
        handleDate(option) {
            if (this.inputflag == "input1") {
                var d = new Date(this.curDate1.replace(/-/g, '/'));
            } else if (this.inputflag == "input2") {
                var d = new Date(this.curDatetwo1.replace(/-/g, '/'));
            }

            if (option == "addday") {
                d = d.setDate(d.getDate() + 1);
            } else if (option == "reduceday") {
                d = d.setDate(d.getDate() - 1);
            } else if (option == "addmonth") {
                d = d.setMonth(d.getMonth() + 1);
            } else if (option == "reducemonth") {
                d = d.setMonth(d.getMonth() - 1);
            }
            var dt = new Date(d);
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            var w = this.weeklist[new Date(`${y}-${m}-${d}`.replace(/-/g, '/')).getDay()];
            if (month != m) {
                this.curday = 0;
            } else {
                if (this.value != "") {
                    this.curday = new Date().getDate();
                } else {
                    this.curday = day;
                }
            }
            this.curyear = y;
            this.curmonth = m;
            this.tapcurday = d;

            if (this.isfree) {
                if (this.inputflag == "input1") {
                    this.curDate = `${y}年${m}月${d}日 ${w}`;
                    this.curDate1 = `${y}-${m}-${d}`;
                    this.getcurmonthList(this.curDate1);
                    this.cueDatechange(this.curDate1);
                } else if (this.inputflag == "input2") {
                    this.curDatetwo = `${y}年${m}月${d}日 ${w}`;
                    this.curDatetwo1 = `${y}-${m}-${d}`;
                    this.getcurmonthList(this.curDatetwo1);
                    this.cueDatechange(this.curDatetwo1);
                }
                this.$emit('change',{
                    start_time:this.curDate1,
                    end_time:this.curDatetwo1
                })
            }
			else{
				this.curDate = `${y}年${m}月${d}日 ${w}`;
                    this.curDate1 = `${y}-${m}-${d}`;
                    this.getcurmonthList(this.curDate1);
                    this.$emit('change',this.curDate1)
			}
        },
        getdate() {
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            week = this.weeklist[new Date(`${year}-${month}-${day}`.replace(/-/g, '/')).getDay()];
            this.curyear = year;
            this.nowyear = year;
            this.nowmonth = month;
            this.curmonth = month;
            this.curday = day;
            this.tapcurday = day;
            this.curDate1 = `${year}-${month}-${day}`;
            this.nowDate = `${year}-${month}-${day}`;
            this.curDate = `${year}年${month}月${day}日 ${week}`;
            this.cueDatechange(this.curDate1);
        },
        init(){
            this.pickshow=false
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-back {
    z-index: 100;
    width: 100%;
    background: #fff;
    position: relative;
    display: flex;
    line-height: 30px;
}
.van-icon{
    font-size: 14px;
}
.P-week{
    font-size: 14px;
}
.pick-box{
    font-size: 14px;
    text-align: center;
}
.input-back > span {
    margin: 0 2px;
}
.separate{
    padding: 0 10px;
    color: #2A3131;
}
.input {
    width: 100px;
    height: 26px;
    border-radius: 6px;
    border: 1px solid #E2E2E2;
    text-align: center;
    /* width: fit-content; */
    /* padding: 0 10px; */
    font-size: 12px;
    z-index: 100;
    position: relative;
}
.P-month {
    justify-content: center;
    margin-top: 10px;
}
.active {
    border-radius: 50%;
    color: #fff !important;
    background: #FF5D62;
}
.day-back {
    line-height: 32px;
    margin-top: 10px;
}
.day-back > div {
    width: 32px;
    height: 32px;
    margin: auto;
    text-align: center;
}
.P-week {
}
.pick-box {
    display: grid;
    grid-template-columns: 14% 14% 14% 14% 14% 14% 14%;
    justify-content: center;
}
.Date-Pick {
    position: absolute;
    top: -1px;
    background: #fff;
    width: calc(100% - 20px);
    padding: 20px 10px;
    border-radius: 0px 0px 15px 15px;
}
.overlay {
    /* position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    left: 0;
    margin: 0 !important;
    z-index: 99;
    bottom: 0; */
    position: fixed;
    left: 0;
    right: 0;
    top: 82px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1001;
}
.pick {
    z-index: 100;
    display: flex;
    align-items: center;
    line-height: 20px;
    position: relative;
    background: #fff;
}
.pick > div {
    margin: 0 10px;
    font-size: 14px;
}
</style>
