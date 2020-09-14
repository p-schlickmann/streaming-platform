import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers/reducers'
import App from './components/App'


ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(reduxThunk))}>
        <App />
    </Provider>, 
    document.querySelector('#root')
    )
