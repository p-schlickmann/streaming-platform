import React, { useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {useCookies} from 'react-cookie'

import {signInWithToken} from '../actions/actions'

const Header = ({location, userInfo, signInWithToken}) => {
    const [cookies] = useCookies(['token'])

    useEffect(()=> {
        if (cookies.token && !userInfo) signInWithToken(cookies.token)
    }, [cookies, signInWithToken, userInfo])

    const renderHeaderLinks = () => {
        return (
            <div className="right menu">
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                <Link to="/categories" className="item"><h3>Categories</h3></Link>
                    {userInfo ? <Link to={`/live/${userInfo.username}`} className="item"><h3>My channel</h3></Link> : null}
                <Link to={cookies.token ? '/profile' : '/login'} className="item">
                    <button className="ui red google button">
                        <i className="user icon" />
                        {cookies.token ? 'Profile' : 'Log in'}
                    </button>
                </Link>
            </div>
            
        )
    }

    if (location.pathname.match('/login') || location.pathname.match('/signup') || location.pathname.match('/profile') || location.pathname.match('/404'))  return null
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h1>Streamy</h1></Link>
            {renderHeaderLinks()}
        </div>
    )
}

const mapStateToProps = state => {
    return {userInfo:state.auth.userInfo}
}

export default connect(mapStateToProps, {signInWithToken})(withRouter(Header))
