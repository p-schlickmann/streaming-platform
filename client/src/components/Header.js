import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {useCookies} from 'react-cookie'

const Header = ({location}) => {
    const [cookies, setCookies, removeCookie] = useCookies(['token'])

    if (location.pathname.match('/login') || location.pathname.match('/signup') || location.pathname.match('/profile') )  return null
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h1>Streamy</h1></Link>
            <div className="right menu">
                
                <Link to="/categories" className="item"><h3>Categories</h3></Link>
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                {cookies.token ? <Link to="/streams/new" className="item"><h3>My channel</h3></Link> : null}
                <Link to={cookies.token ? '/profile' : '/login'} className="item">
                    <button className="ui red google button">
                        <i className="user icon" />
                        {cookies.token ? 'Profile' : 'Log in'}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default connect()(withRouter(Header))
