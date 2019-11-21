import http from '@/utils/http'

export function userLogin(data) {
  return http.postWithoutAuth('/user/login', data)
}