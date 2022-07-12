<template>
  <div class="userInfo">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <img :src="this.userInfo.avatarUrl" alt="" />
    <p>{{ userInfo.nickname }}</p>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.userInfo);
  },
  computed: {
    userInfo() {
      return (
        this.$store.state.user || JSON.parse(sessionStorage.getItem("userInfo"))
      );
    },
  },
};
</script>
<style lang="less" scoped>
.userInfo {
  width: 100%;
  height: 12rem;
  img {
    display: block;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 1.125rem;
    margin: 2.625rem auto 0.5rem;
  }
  p {
    text-align: center;
  }
}
</style>
