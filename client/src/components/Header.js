import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import getCookie from './../utils/getCookie'

const Header = ({location, auth_status}) => {
    const token = getCookie('token')
    console.log(token)
    const isTokenValid = token!=='0'
    if (location.pathname.match('/login') || location.pathname.match('/signup')|| location.pathname.match('/profile') )  return null
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h1>Streamy</h1></Link>
            <div className="right menu">
                <Link to="/categories" className="item"><h3>Categories</h3></Link>
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                <Link to={isTokenValid ? '/profile' : '/login'} className="item">
                    <button className="ui red google button">
                        <i className="user icon" />
                        {isTokenValid ? 'Profile' : 'Log in'}
                    </button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {auth_status: state.auth}
}

export default connect(mapStateToProps)(withRouter(Header))