import { createStore } from 'vuex'
import { getMusiclyric } from '@/request/api/item.js'
export default createStore({
  state: {
    playList: [{ // 播放列表，底部播放器正在播放的那首歌
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar: [{ name: "灏灏灏仔" }]
    },
    ],
    playListIndex: 0,
    isBtnShow: true,
    detailShow: false,
    lyric: {},
    currentTime: 0,
    duration: 0,
    isLogin: false,
    isFooterMusicShow: true,
    token: 0,
    user: {}
  },
  mutations: {
    updateBtnShow(state, value) {
      state.isBtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
      // console.log(state.playList);
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyric(state, value) {
      state.lyric = value
      // console.log(value);
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
      // console.log(state.currentTime);
    },
    updateDuration(state, val) {
      state.duration = val;
      // console.log(state.duration);
    },
    addPlayList(state, value) {
      state.playList.push(value);
    },
    updateIsLogin(state, val) {
      state.isLogin = val;
    },
    updateToken(state, val) {
      state.token = val
      sessionStorage.setItem('token', state.token)
    },
    updateUser(state, val) {
      sessionStorage.setItem('userInfo', JSON.stringify(val))
      state.user = val;
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusiclyric(value);
      // console.log(res);
      context.commit('updateLyric', res.data.lrc.lyric)
    },

  },
  modules: {
  }
})
