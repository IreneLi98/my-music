<template>
  <!-- 歌单详情页上半部分 -->
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="" class="bgImg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playList.coverImgUrl" alt="" />
      <div class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ changeCount(playList.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="title">{{ playList.name }}</p>
      <div class="creator">
        <img :src="playList.creator.avatarUrl" alt="" />
        <span>{{ playList.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="description">
        <span>{{ playList.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  <div class="itemTopFoot">
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ changeCount(playList.subscribedCount) }}</span>
    </div>
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ changeCount(playList.shareCount) }}</span>
    </div>
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    }
    return { changeCount };
  },
  props: ["playList"],
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  // background-color: pink;
  span {
    font-size: 0.375rem;
    color: #fff;
  }
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    margin: 0 0.125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      fill: #fff;
    }
  }
  .bgImg {
    width: 100%;
    height: 11rem;
    position: absolute;
    z-index: -1;
    filter: blur(0.375rem);
  }
}
.itemTopContent {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  margin-top: 0.4rem;
  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;
    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 15%;
    }
    .playCount {
      position: absolute;
      top: 0.125rem;
      right: 0.1rem;
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        vertical-align: middle;
      }
      span {
        color: #fff;
        font-size: 0.26rem;
      }
    }
  }
  .contentRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    height: 2.6rem;
    // background-color: pink;
    .title {
      font-weight: 900;
      font-size: 0.3rem;
      color: #fff;
      font-family: "微软雅黑";
    }
    .creator {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.2rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
      }
    }
    .description {
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ccc;
      span {
        width: 95%;
        height: 100%;
        font-size: 0.24rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
      }
    }
  }
}
.itemTopFoot {
  width: 100%;
  height: 1.25rem;
  display: flex;
  padding: 0.1875rem;
  justify-content: space-between;
  align-items: center;
  .footItem {
    .icon {
      margin-bottom: 0.0625rem;
      fill: #fff;
    }
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }
}
</style>