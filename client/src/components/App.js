import React, {useState, useEffect } from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Categories from './streams/Categories'
import Auth from './Auth'
import SignUp from './SignUp'
import Profile from './Profile'


export default () => {
    return (
        <div className="ui container">
            <BrowserRouter >
                <div>
                    <Header />
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/login" exact render={(props) => <Auth {...props}/>} />
                    <Route path='/signup' exact component={SignUp}/>
                    <Route path='/profile' exact component={Profile} />
                    <Route path="/categories" exact component={Categories}/>
                    <Route path="/categories/:categoryName" component={StreamList}/>
                    <Route path="/live/:userName" component={StreamShow} />
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit" exact component={StreamEdit}/>
                    <Route path="/streams/delete" exact component={StreamDelete}/>
                </div>
            </BrowserRouter>
        </div>
    )
}
