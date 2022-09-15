<template>
  <div class="Serachindex">
      <ul class="search_list">
          <li class="search_item" v-for="(item,index) in words" :key="index">
              <van-icon name="search" size="16" color="#959595" />
              <span class="text">{{item}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:['words'],
}
</script>

<style lang="less" scoped>
.Serachindex{
    .search_list{
        background: #fff;
        padding: 0 16px;
        .search_item{
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            .van-icon{
                padding-right: 10px;
            }
            .text{
                font-size: 14px;
                width:300px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>