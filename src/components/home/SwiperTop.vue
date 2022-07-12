<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { getBanner } from "@/request/api/home.js";
export default {
  setup() {
    const state = reactive({
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    });
    onMounted(async () => {
      let res = await getBanner();
      state.images = res.data.banners;
    });
    // axios.get("http://localhost:3000/banner?type=2").then((res) => {
    //   console.log(res);
    // });
    return { state };
  },
};
</script>
<style lang="less" scoped>
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 2.5rem;
    .van-swipe-item {
      padding: 0 0.1875rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.125rem;
      }
    }
  }
}
</style>