import React from 'react'
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'

import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import WatchStream from './streams/WatchStream'
import Categories from './streams/Categories'
import Auth from './Auth'
import SignUp from './SignUp'
import Profile from './Profile'
import NotFound from './NotFound'

export default () => {
    return (
        <div className="ui container">
            <CookiesProvider>
            <BrowserRouter >
                <div>
                
                    
                        <Header />
                        <Switch>
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/login" exact render={(props) => <Auth {...props}/>} />
                        <Route path='/signup' exact component={SignUp}/>
                        <Route path='/profile' exact component={Profile} />
                        <Route path="/categories" exact component={Categories}/>
                        <Route path="/categories/:categoryName" component={StreamList}/>
                        <Route path="/live/:userName" component={WatchStream} />
                        <Route path="/streams/new" exact component={StreamCreate}/>
                        <Route path="/streams/edit" exact component={StreamEdit}/>
                        <Route path="/streams/delete" exact component={StreamDelete}/>
                        <Route path="/404" exact component={NotFound}/>
                        <Route component={NotFound}>
                            <Redirect to="/404"/>
                        </Route>
                        </Switch>
                        
                    
                    
                </div>
            </BrowserRouter>
            </CookiesProvider>
        </div>
    )
}
