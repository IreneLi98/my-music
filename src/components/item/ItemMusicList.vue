<template>
  <div class="ItemMusicList">
    <div class="listTop">
      <div class="listTopLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <p>
          播放全部<span>（共{{ itemList.length }}首）</span>
        </p>
      </div>
      <div class="listTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="listContent">
      <div class="item" v-for="(item, index) in itemList" :key="item">
        <div class="itemLeft" @click="playList(index)">
          <span class="index">{{ index + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="item1 in item.ar" :key="item1">{{ item1.name }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    playList(index) {
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(index);
      // console.log(index);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
  props: ["subscribedCount", "itemList"],
};
</script>
<style lang="less" scoped>
.ItemMusicList {
  width: 100%;
  height: 17rem;
  margin-top: 0.125rem;
  background-color: #fff;
  border-top-left-radius: 0.1875rem;
  border-top-right-radius: 0.1875rem;
  .listTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    .listTopLeft {
      display: flex;
      align-items: center;
      width: 60%;
      height: 100%;
      padding-left: 0.225rem;
      p {
        font-weight: 700;
        font-size: 0.3rem;
        span {
          font-weight: 400;
          font-size: 0.1875rem;
          color: #ccc;
        }
      }
      .icon {
        stroke: #333333;
        stroke-width: 20;
        margin-right: 0.2875rem;
      }
    }
    .listTopRight {
      display: flex;
      margin-right: 0.15rem;
      padding: 0 0.1875rem;
      align-items: center;
      height: 83%;
      background-color: red;
      border-radius: 0.4rem;
      color: white;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.1rem;
        fill: #fff;
        stroke: #fff; //文字描边
        stroke-width: 50;
      }
    }
  }
}
.listContent {
  width: 100%;
  height: 14.5rem;
  padding: 0 0.1875rem;
  margin-bottom: 1.5rem;
  .item {
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.25rem 0;
    .itemLeft {
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      .index {
        width: 0.5rem;
        text-align: center;
      }
      div {
        flex: 1;
        margin-left: 0.125rem;
        p {
          font-weight: 700;
          font-size: 0.32rem;
        }
        span {
          font-size: 0.2rem;
          padding-right: 0.3125rem;
          color: rgb(140, 137, 137);
        }
      }
    }
    .itemRight {
      width: 18%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .icon {
        position: absolute;
      }
      .bofang {
        left: 0;
      }
      .liebiao {
        right: 0;
      }
    }
  }
}
</style>