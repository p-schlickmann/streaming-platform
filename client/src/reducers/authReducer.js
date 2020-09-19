export default (state={token: '', userInfo: null}, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, token: action.payload.token, userInfo: action.payload.userInfo}
        case 'SIGN_OUT':
            return {...state, token: '', userInfo: null}
        default:
            return state
    }
}