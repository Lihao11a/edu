import service from "../utils/request";
//登录接口
export function login(data){
    return service({
        url:'/user/login',
        method:'post',
        data
     })
}
export function register(data) {
   return service({
     url: '/user/register',
     method: 'post',
     data
   })
 }
export function getInfo(){
     return service({
        url:'/user/getInfo',
        method:'get'
     })
}
export function getUserList(data) {
   return service({
     url: '/user/getUserList',
     method: 'get',
     data
   })
 }
 export function changeRole(data) {
   return service({
     url: '/user/changeRole',
     method: 'post',
     data
   })
 }