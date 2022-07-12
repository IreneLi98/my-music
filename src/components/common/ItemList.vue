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