<template>
  <div class="itemMusic">
    <ItemMusicTop :playList="state.playList" v-if="state.isGetData" />
    <ItemMusicList
      :subscribedCount="state.playList.subscribedCount"
      :itemList="state.itemList"
      v-if="state.isGetData"
    />
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playList: [],
      itemList: [],
      isGetData: false,
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      state.playList = res.data.playlist;
      // console.log(res); //歌单数据
      let result = await getItemList({ id, limit: 10, offset: 0 });
      console.log(result); //具体每首歌的数据
      state.itemList = result.data.songs;
      state.isGetData = true;
    });
    return { state };
  },
  components: { ItemMusicTop, ItemMusicList },
};
</script>