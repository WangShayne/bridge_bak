<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="labelPane"
    @draw="draw"
  >
    <div class="camera" @click="handleClick" />
  </bm-overlay>
</template>

<script>
import { generateUUID } from '@/utils/index'
import { getKitToken } from '@/api/imou'

export default {
  components: {
  },
  props: {
    position: {
      type: Object,
      default: () => {
      }
    },
    active: {
      type: Boolean,
      default: false
    },
    camera: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      playerId: 'player' + generateUUID(),
      player: null,
      dialogVisible: false,
      kitToken: ''
    }
  },
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  created() {
    console.log(generateUUID())
  },
  methods: {
    async handleClick() {
      const _t = this
      // const token = await getKitToken({
      //   deviceId: deviceId,
      //   channelId: 0
      // })
      // _t.kitToken = token.data.kitToken
      //
      // _t.dialogVisible = !_t.dialogVisible
      // if (_t.dialogVisible) {
      //   _t.initPlayer()
      // } else {
      //   _t.playerStop()
      //   _t.playerDestroy()
      // }
      _t.$router.push({ path: '1/iview' })
    },
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    // 播放模块
    initPlayer() {
      const _t = this
      _t.$nextTick(() => {
        _t.player = new _t.ImouPlayer(`#${_t.playerId}`)
        _t.player.setup({
          src: [
            {
              url: 'imou://open.lechange.com/6L08B12PAG2D445/0/1?streamId=1', // url拼接说明请见：2.2.3 轻应用播放地址说明
              kitToken: _t.kitToken // 播放Token，通过接口getKitToken获取，具体请见：2.2.4 getKitToken接口协议说明
            }
          ], // 播放地址
          width: 760, // 播放器宽度
          height: 400, // 播放器高度
          poster: '', // 封面图url
          autoplay: true, // 是否自动播放
          controls: true // 是否展示控制栏
        })
      })
    },
    // 停止播放
    playerStop() {
      const _t = this
      _t.player.stop()
    },
    // 销毁播放器
    playerDestroy() {
      const _t = this
      _t.player.destroy()
    }
  }
}
</script>

<style>
.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  /*background: rgba(0, 0, 0, 0.5);*/
  overflow: hidden;
  /*box-shadow: 0 0 5px #000;*/
  color: #fff;
  text-align: center;
  position: absolute;
}

.camera {
  padding: 10px;
  width: 120px;
  height: 40px;
  background: url('../../../assets/Camera0.png') center center no-repeat;
  background-size: contain;
}

.sample.active {
  /*background: rgba(0, 0, 0, 0.75);*/
  color: #fff;
}
</style>
