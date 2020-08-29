import {CONVO_PARAM, ADD_MESSAGE} from '../../actions/actionTypes'
const initialState = {
   isClicked: false
}

const  ChatsReducer = (state=initialState, action)=>{
    switch (action.type) {       
        case CONVO_PARAM:
            return {
                ...state,
                convoParam: action.claim
            }
        case ADD_MESSAGE:
            console.log(`reducer ${action.claim}`)
            return {
                ...state,
                convoParam: {...state.convoParam, message: state.convoParam.message.concat(action.claim)}
            }
        default:
            return state
    }
}

export default ChatsReducer