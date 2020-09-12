import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'


const Header = ({location, auth_status}) => {
    console.log(auth_status)
    if (location.pathname.match('/login') || location.pathname.match('/signup')|| location.pathname.match('/profile') )  return null
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h1>Streamy</h1></Link>
            <div className="right menu">
                <Link to="/categories" className="item"><h3>Categories</h3></Link>
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                <Link to={auth_status.isSignedIn ? '/profile' : '/login'} className="item">
                    <button className="ui red google button">
                        <i className="user icon" />
                        {auth_status.isSignedIn ? 'Profile' : 'Log in'}
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