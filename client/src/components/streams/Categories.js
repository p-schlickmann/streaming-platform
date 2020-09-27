import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import {getCategories} from '../../actions/actions'

const Categories = ({getCategories, categories}) => {

    useEffect(() => {
            getCategories() 
    },[getCategories])

    const renderCategories = () => {
        return categories.map(category => {
            return (
                <Link to={`/categories/${category.name}`} key={category.id} className="item">

                    <div className="content" style={{fontSize:'20px', cursor: "pointer"}}>
                        {/* <br/>
                        <i className="big middle aligned icon lock" /> */}
                        <div className="content" >
                            <p style={{fontSize: '22px'}}>{category.name}</p>
                        </div>
                            
                    </div>
                    <br />
                </Link>
            )
        })
    }

    return (
        <div>
            <h2>Categories</h2>
            <div className="ui celled list">
                {renderCategories()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {categories: state.categories}
}

export default connect(mapStateToProps, {getCategories})(Categories)