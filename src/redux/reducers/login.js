const initState = {nickname:'',role:''}
export function loginReducer(prevState=initState,action){
        const {type,payload} = action
        if(type == 'add'){
             return payload
        }
        return prevState
}
const detailList = []
export function menuReducer(prevState=detailList,action){
        const {type,payload} = action
        if(type == 'generate'){
                return payload
        }
        return prevState
}
