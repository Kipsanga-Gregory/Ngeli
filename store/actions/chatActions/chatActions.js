import {CONVO_PARAM, ADD_MESSAGE} from '../actionTypes'

export const AddConvoParam = (claim) => {
    return {
      type: CONVO_PARAM,
      claim
    }
  }

export const AddMessage = (claim) => {
    console.log(`action ${claim.message}`)
    return {
      type: ADD_MESSAGE,
      claim
    }
  }