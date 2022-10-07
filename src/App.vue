<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const _t = this
    _t.$options.sockets.onmessage = ({ data }) => {
      const parseData = JSON.parse(data)
      if (parseData.code === 0) {
        parseData.devices.forEach(device => {
          try {
            const bridgeMenuList = document.querySelectorAll(`.bridge${device.gate_id} .el-menu-item`)
            // bridgeMenuList.forEach(item => {
            //   item.className =
            // })
            // if (device.alert) {
            //   bridgeMenu.className = 'el-menu-item warning-flash-bg'
            // } else {
            //   bridgeMenu.className = 'el-menu-item'
            // }
            const bridgeMenuLen = bridgeMenuList.length
            if (device.alert) {
              for (let i = 0; i < bridgeMenuLen; i++) {
                if (bridgeMenuList[i].className.indexOf('warning-flash-bg') > -1) {
                  break
                } else {
                  bridgeMenuList[i].className = 'el-menu-item warning-flash-bg'
                }
              }
            } else {
              for (let i = 0; i < bridgeMenuLen; i++) {
                if (bridgeMenuList[i].className.indexOf('warning-flash-bg') > -1) {
                  bridgeMenuList[i].className = 'el-menu-item'
                } else {
                  break
                }
              }
            }
          } catch (e) {
            console.log(e)
          }
        })
      }
    }
  }
}
</script>
