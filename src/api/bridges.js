import request from '@/utils/request'

export function getBridgeList() {
  return request({
    url: '/bridge/bridge/monitorArea/list',
    method: 'get'
  })
}

export function getBridge(id) {
  return request({
    url: '/bridge/bridge/monitorArea/queryById',
    method: 'get',
    params: { id: id }
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
