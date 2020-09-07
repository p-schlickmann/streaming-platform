export default (state={isSignedIn: null, token: null}, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isSignedIn: true, token: action.payload.token}
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null}
        default:
            return state
    }
}