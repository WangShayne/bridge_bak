<template>
  <div>
    <div class="message" :style="{ height: h + 'px' }">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in tableData"
          :key="item.id"
          :title="item.id"
          :name="index"
        >
          <el-form
            v-for="data in item.data"
            :key="data.key"
            :class="warnings ? 'warning-flash-bg' : ''"
            label-position="left"
            inline
          >
            <el-form-item :label="data.transTime" label-width="180px">
              <span
                style="display:inline-block;width: 210px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                >{{ data.deviceData }}</span
              >
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { parseTime, generateUUID } from "@/utils/index";

export default {
  name: "Message",
  props: {
    warnings: {
      type: Boolean,
      default: false
    },
    gateId: {
      type: String,
      default: ""
    },
    h: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: [],
      activeNames: [0]
    };
  },
  computed: {},
  mounted() {
    const _t = this;
    // let flag = true
    _t.$options.sockets.onmessage = ({ data }) => {
      const parseData = JSON.parse(data);
      if (parseData.code === 0) {
        parseData.devices.forEach(device => {
          if (device.gate_id === _t.gateId) {
            // 判断设别列表是否存在
            const isExist =
              _t.tableData.length &&
              _t.tableData.some((val, index) => {
                return device.id === val.id;
              });
            if (device.alert) {
              this.$emit("warningEvent", device.id);
            }
            device.data.forEach(deviceData => {
              const temTime = Number(deviceData.time + "000");
              deviceData.transTime = parseTime(
                new Date(temTime),
                "{y}-{m}-{d} {h}:{i}:{s}"
              );
              deviceData.key = generateUUID();
            });
            if (!isExist) {
              _t.tableData.push(device);
            } else {
              _t.tableData.forEach((tdata, index) => {
                if (tdata.id === device.id) {
                  // _t.tableData.splice(index, 1)
                  // _t.$delete(tdata, 'data')
                  // _t.$set(tdata, 'data', device.data)
                  tdata.data.push(...device.data);
                  const tdlen = tdata.data.length;
                  if (tdlen > 22) {
                    tdata.data.splice(0, tdlen - 22);
                  }
                }
              });
            }
          }
        });
      }
    };
  },
  methods: {
    rowClass(row) {
      const _t = this;
      if (_t.warnings) {
        return "warning-flash-bg";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
.message {
  .source {
    padding: 24px;
  }
}
.el-collapse-item__header,
.el-collapse-item__content {
  padding: 24px;
}

.warning-flash-bg {
  animation: glowingbg 1500ms infinite !important;
  //background-color: #b20000;
}
@keyframes glowingbg {
  0% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 20px #ff0000;
  }
  100% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
}
</style>
