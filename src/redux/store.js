import {createStore,combineReducers} from 'redux'
import {loginReducer,menuReducer} from './reducers/login'
const root = combineReducers({
    loginReducer,
    menuReducer
})
const store = createStore(root)
export default store