import {createStore, combineReducers} from 'redux'
import AuthReducer from './reducers/auth/authReducer'
import BrowseReducer from './reducers/auth/browsingReducer'
import ChatsReducer from './reducers/auth//chatsReducer'

const rootReducer = combineReducers({
  AuthReducer,
  BrowseReducer,
  ChatsReducer
})

const storeGiver = ()=>{
  return createStore(rootReducer)
}

export default storeGiver;
