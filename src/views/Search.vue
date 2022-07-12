<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        v-model="keyWord"
        placeholder="陈奕迅"
        @keydown.enter="enterKey"
      />
    </div>
    <div class="history">
      <span class="searchSpan">历史</span>
      <div class="center">
        <span
          v-for="item in keyWordList"
          :key="item"
          class="spanHistory"
          @click="searchHistory(item)"
          >{{ item }}</span
        >
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true" @click="delHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
    </div>
    <div class="searchContent">
      <div class="listContent">
        <div class="item" v-for="(item, index) in this.searchList" :key="item">
          <div class="itemLeft" @click="addPlayList(item)">
            <span class="index">{{ index + 1 }}</span>
            <div>
              <p>{{ item.name }}</p>
              <span v-for="item1 in item.artists" :key="item1">{{
                item1.name
              }}</span>
            </div>
          </div>
          <div class="itemRight">
            <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
              <use xlink:href="#icon-shipin"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSearchRes } from "@/request/api/home.js";
export default {
  data() {
    return {
      keyWordList: [],
      keyWord: "",
      searchList: [],
    };
  },
  methods: {
    async enterKey() {
      if (this.keyWord !== "") {
        this.keyWordList.unshift(this.keyWord);
        this.keyWordList = [...new Set(this.keyWordList)]; //去重
        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }
        localStorage.setItem("keyWords", JSON.stringify(this.keyWordList));
        let res = await getSearchRes(this.keyWord);
        this.searchList = res.data.result.songs;
        this.keyWord = "";
      }
    },
    async searchHistory(item) {
      let res = await getSearchRes(item);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
    },
    addPlayList(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("addPlayList", item); //把当前点击的歌曲添加到播放列表后面
      this.$store.commit(
        //更新当前的播放索引值为最后一位
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
    delHistory() {
      this.keyWordList = [];
      localStorage.removeItem("keyWords");
    },
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWords")) || [];
  },
};
</script>
<style lang="less" scoped>
.search {
  width: 100%;
  height: 100%;

  .searchTop {
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.825rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.2125rem;
    }
    input {
      width: 90%;
      height: 0.6rem;
      margin: 0 0.3125rem;
      border: none;
      border-bottom: 1px solid #ccc;
      padding-left: 0.1875rem;
    }
  }
  .history {
    display: flex;
    width: 100%;
    padding: 0.2rem;
    .searchSpan {
      width: 0.625rem;
      font-weight: 900;
      padding-top: 0.2025rem;
    }
    .center {
      width: 85%;
      .spanHistory {
        height: 0.6375rem;
        line-height: 0.6375rem;
        padding: 0 0.2rem;
        background-color: rgb(185, 169, 169);
        border-radius: 0.4rem;
        margin: 0 0.2rem;
        display: inline-block;
      }
    }
    .right {
      flex: 1;
      padding-top: 0.2025rem;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .listContent {
    width: 100%;
    padding: 0 0.1875rem;
    margin-bottom: 1.8rem;
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
}
</style>