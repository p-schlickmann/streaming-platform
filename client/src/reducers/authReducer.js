export default (state={token: '', userInfo: null}, action) => {
    switch(action.type){
        
        case 'SIGN_IN':
            
            return {...state, token: action.payload.token, userInfo: action.payload.userInfo, error: null}
        case 'SIGN_IN_ERROR':
            return action.payload
        case 'SIGN_OUT':
            return {...state, token: '', userInfo: null}
        case 'EDIT_PROFILE':
            return {...state, userInfo:action.payload }
        case 'DELETE_PROFILE':
            return {...state, token: '', userInfo: null}
        default:
            return state
    }
}