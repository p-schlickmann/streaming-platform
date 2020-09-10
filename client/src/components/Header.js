import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const Header = ({location}) => {
    if (location.pathname.match('/login')) return null
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h1>Streamy</h1></Link>
            <div className="right menu">
                <Link to="/categories" className="item"><h3>Categories</h3></Link>
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                <Link to='/login' className="item">
                    <button className="ui red google button">
                        <i className="user icon" />
                        Log in
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(Header)