import React from 'react'
import { Link } from 'react-router-dom'

import GoogleAuth from './GoogleAuth'


const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item"><h2>Streamy</h2></Link>
            <div className="right menu">
                <Link to="/" className="item"><h3>All Streams</h3></Link>
                <div className="item"><GoogleAuth /></div>
            </div>
        </div>
    )
}

export default Header