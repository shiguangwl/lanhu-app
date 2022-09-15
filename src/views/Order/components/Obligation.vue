<template>
  <div class="obligation">
      <ul class="obligation-list">
          <li class="obligation-item">
              <div class="head">
                  <span class="date">2022年5月16日 午餐</span>
                  <span class="status">待付款</span>
              </div>
              <div class="banner">
                  <ul class="food-list">
                      <li class="food-item">
                          <img src="../../../assets/orderfood/shop.png" alt="">
                          <span class="name">广式蒜香排广式蒜香排</span>
                      </li>
                       <li class="food-item">
                          <img src="../../../assets/orderfood/shop.png" alt="">
                          <span class="name">广式蒜香排广式蒜香排</span>
                      </li>
                       <li class="food-item">
                          <img src="../../../assets/orderfood/shop.png" alt="">
                          <span class="name">广式蒜香排广式蒜香排</span>
                      </li>
                       <li class="food-item">
                          <img src="../../../assets/orderfood/shop.png" alt="">
                          <span class="name">广式蒜香排广式蒜香排</span>
                      </li>
                  </ul>
                  <div class="money">
                      <span class="price">￥11.99</span>
                      <span class="num">共6件</span>
                  </div>
              </div>
              <div class="footer">
                  <button>立即支付</button>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.obligation{
    .obligation-list{
        .obligation-item{
            width: 343px;
            height: 192px;
            background: #FFFFFF;
            border-radius: 10px 10px 10px 10px;
            margin: 14px 16px;
            padding: 0 12px;
            box-sizing: border-box;
            .head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 38px;
                border-bottom: 1px dashed #eee;
                .date{
                    font-size: 12px;
                    font-weight: 400;
                    color: #242424;
                }
                .status{
                    font-size: 12px;
                    font-weight: 400;
                    color: #959595;
                }
            }
            .banner{
                display: flex;
                align-items: center;
                width: 100%;
                height: 102px;
                .food-list{
                    display: flex;
                    align-items: center;
                    width: 270px;
                    overflow-x: auto;
                    .food-item{
                        margin-right: 6px;
                        display: flex;
                        flex-direction: column;
                        &:last-child{
                            margin-right: 0;
                        }
                        img{
                            width: 80px;
                            height: 60px;
                            border-radius: 8px 8px 8px 8px;
                        }
                        .name{
                            font-size: 12px;
                            font-weight: 400;
                            color: #5D5D5D;
                            padding-top: 7px;
                            width:72px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                    &::-webkit-scrollbar {
                        display: none;
                    }
                }
                .money{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 73px;
                    height: 80px;
                    .price{
                        font-size: 14px;
                        font-weight: 500;
                        color: #242424;
                    }
                    .num{
                        font-size: 11px;
                        font-weight: 400;
                        color: #959595;
                        padding-top: 6px;
                    }
                }
            }
            .footer{
                display: flex;
                justify-content: flex-end;
                button{
                    height: 27px;
                    font-size: 12px;
                    color: #FF5D62;
                    border: 1px solid #FF5D62;
                    border-radius: 6px 6px 6px 6px;
                    background: #fff;
                }
            }
        }
    }
}
</style>