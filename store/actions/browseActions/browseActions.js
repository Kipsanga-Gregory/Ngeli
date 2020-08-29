import {USER_CLICKED, USER_MATCHED} from '../actionTypes'

export const AddUserClicked = (claim) => {
    return {
      type: USER_CLICKED,
      claim
    }
  }