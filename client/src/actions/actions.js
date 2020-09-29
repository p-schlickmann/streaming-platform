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
    try{
        var signInResponse = await streams.post('token/', formValues)
    } catch(e) {
        dispatch(
            {
                type: 'SIGN_IN_ERROR',
                payload: {
                    error: 'Unable to Log in with provided credentials'
                }
            }
        ) 
    } finally {
        
        if (signInResponse) {
            
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
        }
    }
} 

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const editProfile = (formValues, token, history) => async dispatch => {
    const response = await streams.patch('me/', formValues, {
        headers: {
            Authorization: `Token ${token}`
        }
    })

    console.log(response)

    dispatch({
        type: 'EDIT_PROFILE',
        payload: response.data
    })

    history.push('/profile')
}

export const deleteProfile = (token) => async dispatch => {
    const response = await streams.delete('me/', {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    if (response.status===204){
        dispatch({
            type: "DELETE_PROFILE",
        })
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

