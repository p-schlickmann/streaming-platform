import streams from '../api/streams'


export const signInWithToken = token => async dispatch => {
    const userInfoResponse = await streams.get('me/', {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    dispatch(
        {
            type: 'SIGN_IN',
            payload: {
                token: token,
                userInfo: userInfoResponse.data
            }
        }
    ) 
} 


export const signIn = (formValues) => async dispatch => {
    const signInResponse = await streams.post('token/', formValues)
    if (signInResponse.data.token) {
        const userInfoResponse = await streams.get('me/', {
            headers: {
                Authorization: `Token ${signInResponse.data.token}`
            }
        })
        dispatch(
            {
                type: 'SIGN_IN',
                payload: {
                    token: signInResponse.data.token,
                    userInfo: userInfoResponse.data
                }
            }
        ) 
    } else {
        dispatch(
            {
                type: 'SIGN_IN',
                payload: {
                    token: null,
                    userInfo: null
                }
            }
        ) 
    }
    
} 

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const getStreams = (category) => async dispatch => {
    if (!category) category = ''
    const response = await streams.get(`streams?category=${category}`)
    dispatch({
        type: 'GET_STREAMS',
        payload: response.data
    })
}

export const createStream = formValues => async dispatch => {
     const response = await streams.post('newstream/', formValues, {
         headers: {
             Authorization: `Token ${formValues.token}`
         }
     })
     console.log(response)
     dispatch({
        type: 'CREATE_STREAM'
    })
}

export const getCategories = () => async dispatch => {
    const response = await streams.get('categories/')
    dispatch({
        type: 'GET_CATEGORIES',
        payload: response.data
    })
} 