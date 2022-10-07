<template>
  <div :id="playerId" class="player" :style="{ height: h + 'px' }" />
</template>

<script>
// import { mapGetters } from 'vuex'

import { generateUUID } from "@/utils/index";
import { getKitToken } from "@/api/imou";
import { genLivePlayUrl, genLocalRecordPlayUrl } from "@/utils/imou";

export default {
  name: "Player",
  props: {
    cameraId: {
      type: String,
      default: "6L08B12PAG2D445"
    },
    h: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      playerId: "player-" + generateUUID(),
      player: null,
      kitToken: "",
      playerType: "live"
    };
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.initPlayer();
    });
  },
  methods: {
    initPlayer() {
      const _t = this;
      _t.player = new _t.ImouPlayer(`#${_t.playerId}`);
      // _t.player.setup({
      //   src: [
      //     {
      //       url: '', // url拼接说明请见：2.2.3 轻应用播放地址说明
      //       kitToken: '' // 播放Token，通过接口getKitToken获取，具体请见：2.2.4 getKitToken接口协议说明
      //     }
      //   ], // 播放地址
      //   width: '100%', // 播放器宽度
      //   height: 400, // 播放器高度
      //   poster: '', // 封面图url
      //   autoplay: false, // 是否自动播放
      //   controls: false // 是否展示控制栏
      // })
    },
    async realPlay(startTime, endTime) {
      const _t = this;
      if (_t.player != null) {
        _t.playerStop();
        _t.playerDestroy();
      }

      const token = await getKitToken({
        deviceId: _t.cameraId,
        channelId: 0
      });
      _t.kitToken = token.data.kitToken;
      // genLocalRecordPlayUrl
      _t.player = new _t.ImouPlayer(`#${_t.playerId}`);
      console.log(_t.player.playerSet);
      _t.player.setup({
        src: [
          {
            url: genLivePlayUrl(_t.cameraId, 0, 1, 1), // url拼接说明请见：2.2.3 轻应用播放地址说明
            kitToken: _t.kitToken // 播放Token，通过接口getKitToken获取，具体请见：2.2.4 getKitToken接口协议说明
          }
        ], // 播放地址
        width: "100%", // 播放器宽度
        height: "100%", // 播放器高度
        poster: "", // 封面图url
        autoplay: true, // 是否自动播放
        controls: true // 是否展示控制栏
      });
      _t.playerType = "live";
      _t.clearSplitWindow();
    },
    async playerPlay(startTime, endTime) {
      const _t = this;
      if (_t.player != null) {
        _t.playerStop();
        _t.playerDestroy();
      }

      const token = await getKitToken({
        deviceId: _t.cameraId,
        channelId: 0
      });
      _t.kitToken = token.data.kitToken;

      // genLocalRecordPlayUrl
      _t.player = new _t.ImouPlayer(`#${_t.playerId}`);
      _t.player.setup({
        src: [
          {
            url: genLocalRecordPlayUrl(
              _t.cameraId,
              0,
              2,
              1,
              startTime,
              endTime
            ), // url拼接说明请见：2.2.3 轻应用播放地址说明
            kitToken: _t.kitToken // 播放Token，通过接口getKitToken获取，具体请见：2.2.4 getKitToken接口协议说明
          }
        ], // 播放地址
        width: "100%", // 播放器宽度
        height: "100%", // 播放器高度
        poster: "", // 封面图url
        autoplay: true, // 是否自动播放
        controls: true // 是否展示控制栏
      });
      _t.playerType = "record";
      _t.clearSplitWindow();
    },
    // 清除split窗口
    clearSplitWindow() {
      this.$nextTick(() => {
        const list = document.querySelectorAll(".player__split");
        for (let i = 0; i < list.length; i++) {
          list[i].style.display = "none";
        }
      });
    },
    // 停止播放
    playerStop() {
      const _t = this;
      _t.player.stop();
      _t.playerType = "live";
    },
    // 销毁播放器
    playerDestroy() {
      const _t = this;
      _t.player.destroy();
      _t.playerType = "live";
    },
    getState() {
      const _t = this;
      console.log(_t.player);
      if (_t.player && _t.player.playerSet.length > 0) {
        return _t.player.playerSet[0].isPlaying;
      }
    },
    getPlayerType() {
      return this.playerType;
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
  background-color: #000;
  background-image: url("../../../assets/icon_no_video.png");
  background-size: 80px;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
