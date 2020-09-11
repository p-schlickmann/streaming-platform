export default (state={isSignedIn: false, token: null}, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isSignedIn: true, token: action.payload.token}
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, token: null}
        default:
            return state
    }
}