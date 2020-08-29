import {USER_CLICKED, USER_MATCHED} from '../../actions/actionTypes'
const initialState = {
   isClicked: false,
   crushedPerson: {}
}

const BrowseReducer = (state=initialState, action)=>{
    switch (action.type) {       
        case USER_CLICKED:
            return{
                ...state,
                userClicked: action.claim
            }
        default:
            return state
    }
}

export default BrowseReducer