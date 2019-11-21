import http from '@/utils/http'

export function getEvents() {
  return http.get('/time/getEvents')
}

export function addEvent(data) {
  return http.post('/time/addEvents', data)
}
