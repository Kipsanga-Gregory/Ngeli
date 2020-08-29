import {AUTH_TRUE, LOGIN_DATA, NEW_USER_REG} from '../actionTypes'

export const ToggleAuth = () => {
  return {
    type: AUTH_TRUE
  }
}

export const userLogin = (claim) => {
  return {
    type: LOGIN_DATA,
    claim
  }
}

export const RegNewUser = (claim) => {
  return {
    type: NEW_USER_REG,
    claim
  }
}
