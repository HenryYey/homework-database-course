import http from '@/utils/http'

export function getTable(name) {
  return http.get('/tables/getTable', name)
}

export function getTables() {
  return http.get('/tables/getTables')
}

export function updateRow(data) {
  return http.post('/tables/updateRow', data)
}

export function deleteRow(data) {
  return http.post('/tables/deleteRow', data)
}