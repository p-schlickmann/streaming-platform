import streams from '../api/streams'


export const signIn = (formValues) => async dispatch => {
    const response = await streams.post('token/', formValues)
    console.log(response)
    dispatch(
        {
            type: 'SIGN_IN',
            payload: response.data
        }
    ) 
} 

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const getStreams = () => async dispatch => {
    const response = await streams.get('streams/')
    dispatch({
        type: 'GET_STREAMS',
        payload: response.data
    })
}

export const createStream = formValues => async dispatch => {
     const response = await streams.post('newstream/', formValues)
     
}

export const getCategories = () => async dispatch => {
    const response = await streams.get('categories/')
    dispatch({
        type: 'GET_CATEGORIES',
        payload: response.data
    })
} 