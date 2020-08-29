import {AUTH_TRUE, LOGIN_DATA, NEW_USER_REG} from '../../actions/actionTypes'

const initialState = {
  isAuthenticated: false,
}

const AuthReducer = (state = initialState, action)=>{
  switch (action.type) {
    case AUTH_TRUE:
    return {
      ...state,
      isAuthenticated: !state.isAuthenticated
    }
    case LOGIN_DATA:
    return {
      ...state,
      UnregUser: action.claim
    }
    case NEW_USER_REG:
      return {
        ...state,
        newUser: action.claim
      }
    default:
      return state
  }
}

export default AuthReducer
