<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="showDetail">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="song">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        v-if="isBtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
        @canplay="canplay"
      ></audio>
      <van-popup
        v-model:show="detailShow"
        position="bottom"
        :style="{ height: '100%', weight: '100%' }"
      >
        <MusicDetail
          :musicInfo="playList[playListIndex]"
          :isBtnShow="this.isBtnShow"
          :play="this.play"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import MusicDetail from "@/components/item/MusicDetail.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      interval: 0,
    };
  },
  methods: {
    play() {
      //判断音乐是否正在播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateBtnShow(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateBtnShow(true);
        clearInterval(this.interval);
      }
    },
    updateTime() {
      this.interval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 500);
    },
    showDetail() {
      this.updateDetailShow();
    },
    canplay() {
      this.updateDuration(this.$refs.audio.duration); //当歌曲可以播放时，总时长信息已获取到，可以去提交更改duration
    },
    ...mapMutations([
      "updateBtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  components: { MusicDetail },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "isBtnShow",
      "detailShow",
      "duration",
    ]),
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true;
      this.updateBtnShow(false);
    },
    playList() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.autoplay = true;
        this.updateBtnShow(false);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  display: flex;
  width: 100%;
  height: 1.5rem;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .footerLeft {
    display: flex;
    width: 75%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    .song {
      width: 75%;
    }
    p {
      font-size: 0.32rem;
    }
    img {
      width: 0.9575rem;
      height: 0.9575rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>