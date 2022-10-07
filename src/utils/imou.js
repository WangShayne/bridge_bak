const imou_URL = 'imou://open.lechange.com'

/**
 * 生成乐橙云直播地址
 * @param {string} required=true deviceId
 * @param {number} required=true channelId
 * @param {number} required=true type   =>  播放类型： 1 直播（实时预览）； 2 录像回放；
 * @param {number} required=false streamId (default 1)
 * @disc 开发者直播地址示例为：imou://open.lechange.com/deviceId/channelId/type?streamId=1
 *
 */
export function genLivePlayUrl(deviceId, channelId, type = 1, streamId = 1) {
  return `${imou_URL}/${deviceId}/${channelId}/${type}?streamId=${streamId}`
}

/**
 * 生成乐橙云回放地址
 * @param {string} deviceId
 * @param {number} channelId
 * @param {number} streamId (default 1)
 * @param {string} beginTime
 * @param {string} endTime
 * @disc 云录像播放地址示例为：imou://open.lechange.com/deviceId/channelId/2?streamId=1&beginTime=2021-08-08 09:00:00&endTime=2021-08-08 10:00:00
 *
 */
export function genCloudRecordPlayUrl(deviceId, channelId, type = 2, streamId = 1, beginTime, endTime) {
  return `${imou_URL}/${deviceId}/${channelId}/${type}?streamId=${streamId}&beginTime=${beginTime}&endTime=${endTime}`
}

/**
 * 生成本地回放地址
 * @param {string} deviceId
 * @param {number} channelId
 * @param {number} streamId (default 1)
 * @param {string} beginTime
 * @param {string} endTime
 * @disc imou://open.lechange.com/deviceId/channelId/2?streamId=1&recordType=localRecord&beginTime=2021-08-08 09:00:00&endTime=2021-08-08 10:00:00
 *
 */
export function genLocalRecordPlayUrl(deviceId, channelId, type = 2, streamId = 1, beginTime, endTime) {
  return `${imou_URL}/${deviceId}/${channelId}/${type}?streamId=${streamId}&recordType=localRecord&beginTime=${beginTime}&endTime=${endTime}`
}

