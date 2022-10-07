<template>
  <div>
    <baidu-map
      class="map"
      :style="{ height: h + 'px' }"
      :map-click="false"
      scroll-wheel-zoom
      :zoom="zoom"
      :center="center"
      @ready="handler"
    />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: "Map",
  components: {},
  props: {
    lng: {
      type: String,
      default: "118.814297"
    },
    lat: {
      type: String,
      default: "31.956533"
    },
    h: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      map: null,
      BMap: null,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      channel: [],
      active: false
    };
  },
  computed: {},
  created() {
    const _t = this;
    // const brigeId = this.$route.meta.id
    // await 获取数据
    // bridge.map(item => {
    //   if (item.id === brigeId) {
    //     let { lat, lng } = item
    //     lat = Number(lat)
    //     lng = Number(lng)
    //     _t.handler({}, lng, lat)
    //     item.channel.length && item.channel.map(video => {
    //       video.lat = Number(video.lat)
    //       video.lng = Number(video.lng)
    //       _t.channel.push(video)
    //     })
    //   }
    // })
    _t.handler({}, _t.lng, _t.lat);
  },
  methods: {
    handler({ BMap, map }, lng, lat) {
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = 16;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
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

.map {
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
</style>
