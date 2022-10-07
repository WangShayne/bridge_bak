<template>
  <div class="dashboard-container">
    <el-container>
      <!-- <el-aside width="500px">
        <el-row style="margin-bottom: 20px">
          <el-button type="primary" @click="test2">实时画面</el-button>
          <el-button type="default" @click="test3">取消报警</el-button>
          <el-button type="default" @click="test4">关闭视频</el-button>
          <el-button type="default" @click="test5">ss</el-button>
          <el-button type="default" @click="test6">rr</el-button>
        </el-row>
      </el-aside> -->

      <el-container>
        <el-main>
          <div class="container" :style="{ height: h + 'px' }">
            <el-card :body-style="{ padding: '0px' }">
              <Player
                ref="realPlayer"
                :camera-id="bridge.cameraId"
                :h="componentH"
              />
            </el-card>
            <el-card :body-style="{ padding: '0px' }">
              <Player
                ref="player"
                :camera-id="bridge.cameraId"
                :h="componentH"
              />
            </el-card>
            <el-card :body-style="{ padding: '0px' }" :h="componentH">
              <Message
                :warnings="warings"
                :gate-id="$route.meta.gateId"
                @warningEvent="receiveWaring"
                @cancelWarningEvent="receiveCancelWarning"
              />
            </el-card>
            <el-card :body-style="{ padding: '0px' }">
              <Map :lng="bridge.lng" :lat="bridge.lat" :h="componentH" />
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Message from "./components/message.vue";
import Player from "./components/player.vue";
import Map from "./components/map.vue";
import { parseTime } from "@/utils/index";

export default {
  name: "Bridges",
  components: {
    Message,
    Player,
    Map
  },
  data() {
    return {
      map: null,
      BMap: null,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      channel: [],
      active: false,
      warings: false,
      errMessage: null,
      errList: [],
      timer1: null,
      playType: "live", // live or record
      h: 0,
      componentH: 0
    };
  },
  computed: {
    list() {
      return this.$store.state.bridge.list;
    },
    bridge() {
      const id = this.$route.meta.id;
      const list = this.$store.state.bridge.list;
      let obj = {};
      list.forEach(item => {
        if (item.id === id) {
          obj = Object.assign(obj, item);
        }
      });
      return obj;
    }
  },
  created() {},
  mounted() {
    this.h = this.$getViewportSize().height - 80;
    this.componentH = this.h / 2;
    this.$nextTick(() => {
      this.$refs.realPlayer.realPlay();
    });
  },
  methods: {
    test1() {
      this.receiveWaring();
    },
    receiveWaring(id) {
      const _t = this;
      this.warings = true;
      const pos = _t.errList.indexOf(id);
      if (pos < 0) {
        _t.errList.push(id);
        clearTimeout(_t.timer1);
        _t["errMsg" + id] = this.$message({
          showClose: true,
          message: `警告!${_t.bridge.name}设备${id}检测到撞击!`,
          type: "error",
          duration: 30000,
          onClose: () => {
            // _t['errMsg' + id].close()
            _t["errMsg" + id] = null;
            _t.warings = false;
            _t.errList.splice(_t.errList.indexOf(id), 1);
          }
        });
        const playerType = this.$refs.player.getPlayerType();
        const playerState = this.$refs.player.getState();
        if (!playerState || playerType === "live") {
          _t.timer1 = setTimeout(() => {
            const startTime = new Date().getTime() - 20000;
            const endTime = new Date().getTime() + 5000;
            this.$refs.player.playerPlay(
              parseTime(new Date(startTime), "{y}-{m}-{d} {h}:{i}:{s}"),
              parseTime(new Date(endTime), "{y}-{m}-{d} {h}:{i}:{s}")
            );
            if (this.$refs.player) {
              this.$refs.player.playerStop();
              this.$refs.player.playerDestroy();
            }
            clearTimeout(_t.timer1);
          }, 5000);
        }
      }
    },
    receiveCancelWarning(id) {
      const _t = this;
      if (this.warings) {
        this.warings = false;
      }
      if (_t["errMsg" + id]) {
        _t["errMsg" + id].close();
        _t["errMsg" + id] = null;
        const pos = _t.errList.indexOf(id);
        if (pos > 0) {
          _t.errList.splice(pos, 1);
        }
      }
      if (this.$refs.player) {
        this.$refs.player.playerStop();
        this.$refs.player.playerDestroy();
      }
    },
    test2() {
      this.$refs.player.realPlay();
      console.log(this.$refs.player.getState());
    },
    test3() {
      // this.warings = false
      // this.errMessage.close()
      // this.$refs.player.playerStop()
      // this.$refs.player.playerDestroy()
      const _t = this;
      // this.receiveCancelWarning()
      _t.errList.map(id => {
        _t.receiveCancelWarning(id);
      });
    },
    test4() {
      console.log(this.$refs.player.getState());
      if (this.$refs.player) {
        this.$refs.player.playerStop();
        this.$refs.player.playerDestroy();
      }
    },
    test5() {
      console.log(this.list);
      console.log(this.$route.meta.gateId);
      console.log(this.bridge);
    },
    test6() {
      const startTime = new Date().getTime() - 20000;
      const endTime = new Date().getTime() + 5000;
      this.$refs.player.playerPlay(
        parseTime(new Date(startTime), "{y}-{m}-{d} {h}:{i}:{s}"),
        parseTime(new Date(endTime), "{y}-{m}-{d} {h}:{i}:{s}")
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 12px;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.el-main {
  padding: 0 12px;
}
aside {
  margin-bottom: 0;
  //height: calc(100vh - 200px);
  height: 90vh;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
