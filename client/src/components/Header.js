import React from 'react'
import { Link } from 'react-router-dom'

import Auth from './Auth'


const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h1>Streamy</h1></Link>
            <div className="right menu">
                <Link to="/categories" className="item"><h3>Categories</h3></Link>
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                <div className="item"><Auth /></div>
            </div>
        </div>
    )
}

export default Header