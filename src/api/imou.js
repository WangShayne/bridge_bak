import request from '@/utils/request'

export function getKitToken(query) {
  return request({
    url: '/api/kitToken',
    method: 'get',
    params: query
  })
}
