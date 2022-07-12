<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="130"
        :show-indicators="false"
        class="my-swipe"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play-copy"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import { getMusicList } from "@/request/api/home";
export default {
  /* vue2
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getList() {
      let res = await getMusicList();
      console.log(res);
      this.musicList = res.data.result;
    },
  },
  mounted() {
    this.getList();
  }, */
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      console.log(res);
      state.musicList = res.data.result;
    });
    return { state, changeCount };
  },
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    .title {
      font-weight: 900;
      font-size: 0.43rem;
      line-height: 0.6rem;
    }
    .more {
      border: 0.0125rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;
    .my-swipe {
      height: 100%;
      .van-swipe-item {
        height: 100%;
        position: relative;
        padding-right: 0.1875rem;
        .playCount {
          position: absolute;
          z-index: 100;
          right: 0.25rem;
          color: white;
          margin-top: 0.06rem;
          .icon {
            width: 0.3rem;
            height: 0.3rem;
          }
        }
        img {
          width: 100%;
          height: 2.375rem;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>