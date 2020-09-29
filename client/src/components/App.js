import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'

import Header from './Header'
import StreamCreate from './streams/StreamCreate'

import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import WatchStream from './streams/WatchStream'
import Categories from './streams/Categories'
import Auth from './Auth'
import SignUp from './SignUp'
import Profile from './Profile'
import ProfileEdit from './ProfileEdit'
import PasswordReset from './PasswordReset'
import _404 from './404'

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
                        <Route path='/profile/edit' exact component={ProfileEdit} />
                        <Route path='/profile/changepassword' exact component={PasswordReset} />
                        <Route path="/categories" exact component={Categories}/>
                        <Route path="/categories/:categoryName" component={StreamList}/>
                        <Route path="/live/:userName" component={WatchStream} />
                        <Route path="/stream/new" exact component={StreamCreate}/>
                        <Route path="/stream/edit" exact component={StreamEdit}/>
                        <Route path="*" component={_404}></Route>
                        </Switch>
                        
                    
                    
                </div>
            </BrowserRouter>
            </CookiesProvider>
        </div>
    )
}
