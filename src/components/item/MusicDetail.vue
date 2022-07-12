<template>
  <div class="MusicDetail">
    <!-- 背景图片 -->
    <img :src="musicInfo.al.picUrl" alt="" class="bgImg" />
    <div class="top">
      <div class="topLeft">
        <svg class="icon liebiao" aria-hidden="true" @click="back">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftMarquee" style="color: #fff">
          <Vue3Marquee :duration="5">
            {{ musicInfo.name }}
          </Vue3Marquee>
          <div class="creator">
            <span v-for="item in musicInfo.ar" :key="item">{{
              item.name
            }}</span>
            <svg class="icon liebiao" aria-hidden="true">
              <use xlink:href="#icon-youjiantou1"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="topRight">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="middle" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="needle"
        :class="{ needle_active: !isBtnShow }"
      />
      <img src="@/assets/cd.png" alt="" class="cd" />
      <img
        :src="musicInfo.al.picUrl"
        alt=""
        class="img_al"
        @click="isLyricShow = true"
        :class="{ img_al_pause: isBtnShow, img_al_active: !isBtnShow }"
      />
    </div>
    <div class="lyric" v-show="isLyricShow" @click="isLyricShow = false">
      <p
        v-for="item in showLyric"
        :key="item"
        :class="{
          lyric_active:
            this.currentTime * 1000 >= item.time &&
            this.currentTime * 1000 < item.next,
        }"
      >
        {{ item.lyric }}
      </p>
    </div>
    <div class="footer">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerMiddle">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footerBottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          v-if="isBtnShow"
          @click="play"
        >
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: true,
    };
  },
  methods: {
    back() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations([
      "updateDetailShow",
      "updateBtnShow",
      "updatePlayListIndex",
    ]),
  },
  mounted() {
    // console.log(this.musicInfo);
    // console.log(this.lyric);
  },
  computed: {
    showLyric() {
      let arr;
      if (this.lyric) {
        arr = this.lyric.split("\n").map((item) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lyric = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(mill)) {
            mill = item.slice(7, 9);
            lyric = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min, sec, mill, lyric, time);
          return { min, sec, mill, lyric, time };
        });
        arr.forEach((item, i) => {
          if (i == arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 10000000000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
    ...mapState([
      "lyric",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
  },
  watch: {
    currentTime(newVal) {
      let p = document.querySelector(".lyric_active");
      let lyricBox = document.querySelector(".lyric");
      if (p) {
        if (p.offsetTop > 280) {
          lyricBox.scrollTop = p.offsetTop - 280;
        }
      }
      if (newVal == this.duration) {
        if (this.playListIndex == this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
          this.play();
        }
      }
    },
  },
  props: ["musicInfo", "isBtnShow", "play"],
  components: { Vue3Marquee },
};
</script>
<style lang="less" scoped>
.MusicDetail {
  width: 100%;
  height: 100%;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(80px);
  }
  .top {
    display: flex;
    width: 100%;
    height: 1.2rem;
    fill: #fff;
    .topLeft {
      width: 75%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0.2rem 0.2125rem;
      .leftMarquee {
        width: 65%;
        margin-left: 0.3rem;
        .vue3-marquee {
          width: 80%;
          font-size: 0.3425rem;
        }
        .creator {
          display: flex;
          align-items: center;
          font-size: 0.1125rem;
          color: #ccc;
          span {
            padding-right: 0.225rem;
          }
        }
        .icon {
          width: 0.2rem;
          height: 0.2rem;
          fill: #ccc;
        }
      }
    }
    .topRight {
      width: 25%;
      padding: 0.3125rem;
      .icon {
        float: right;
      }
    }
  }
  .middle {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center; //水平居中
    position: relative;
    .needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }
    .needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .cd {
      width: 4.5rem;
      height: 4.5rem;
      position: absolute;
      top: 19%;
      z-index: -1;
    }
    .img_al {
      width: 3rem;
      height: 3rem;
      position: absolute;
      top: 27%;
      border-radius: 50%;
      // z-index: -1;
      animation: rotateCD 10s linear infinite;
    }
    .img_al_active {
      animation-play-state: running;
    }
    .img_al_pause {
      animation-play-state: paused;
    }
    @keyframes rotateCD {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .lyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.3125rem 0;
    overflow: scroll;
    padding: 0 0.5125rem;
    p {
      text-align: center;
      color: #fff;
      margin-bottom: 0.225rem;
      transition: all 0.5s linear;
    }
    .lyric_active {
      font-weight: 700;
      font-size: 0.4rem;
    }
  }
  .footer {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: rgb(245, 234, 234);
      }
    }
    .range {
      width: 100%;
      height: 0.06rem;
    }
    .footerBottom {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        fill: rgb(245, 234, 234);
      }
      .bofang {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>