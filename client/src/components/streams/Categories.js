import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import {getCategories} from '../../actions/actions'

const Categories = ({getCategories, categories}) => {

    useEffect(() => {
       console.log(categories)
       getCategories() 
    },[])

    const renderCategories = () => {
        return categories.map(category => {
            return (
                <div key={category.id} class="item">
                    <div className="content">
                        {category.name}
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <h3>Categories</h3>
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