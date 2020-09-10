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

export default () => {
    return (
        <div className="ui container">
            <BrowserRouter >
                <div>
                    <Header />
                    <Route path="/categories" exact component={Categories}/>
                    <Route path="/login" exact component={Auth} />
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit" exact component={StreamEdit}/>
                    <Route path="/streams/delete" exact component={StreamDelete}/>
                    <Route path="/streams/show" exact component={StreamShow}/>
                </div>
            </BrowserRouter>
        </div>
    )
}
