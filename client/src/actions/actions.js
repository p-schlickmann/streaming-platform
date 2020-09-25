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
    dispatch({
        type: 'SIGN_OUT',
    })
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

export const getStream = (userName) => async dispatch => {
    try {
        var response = await streams.get(`streams?user=${userName}`)
    } catch(e) {
        
    } finally {
        if (!response) {
            dispatch({
                type: 'GET_STREAM',
                payload: [{error: 'This channel does not exist'}]
            })
        } else {
            if (response.status === 200 && !response.data[0]) {
                dispatch({
                    type: 'GET_STREAM',
                    payload: [{error: 'This Channel is not streaming right now', errorName: userName}]
                })
            } else {
                dispatch({
                    type: 'GET_STREAM',
                    payload: response.data
                })
            }
        }
        
    }
    
}

export const getCategories = () => async dispatch => {
    const response = await streams.get('categories/')
    dispatch({
        type: 'GET_CATEGORIES',
        payload: response.data
    })
} 

