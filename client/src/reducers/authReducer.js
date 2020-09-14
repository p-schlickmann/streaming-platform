export default (state={token: null}, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, token: action.payload.token}
        case 'SIGN_OUT':
            return {...state, token: null}
        default:
            return state
    }
}