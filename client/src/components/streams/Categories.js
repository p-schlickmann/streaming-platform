import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import {getCategories} from '../../actions/actions'

const Categories = ({getCategories, categories}) => {

    useEffect(() => {
       getCategories() 
    },[])

    const renderCategories = () => {
        return categories.map(category => {
            return (
                <div key={category.id} className="medium item">
                    <div onClick={() => '' } className="content" style={{fontSize:'20px', cursor: "pointer"}}>
                        {category.name}
                    </div>
                </div>
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