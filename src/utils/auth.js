export function authLogin(){
    let token=sessionStorage.getItem('token')
    return token?true:false
}
//验证token