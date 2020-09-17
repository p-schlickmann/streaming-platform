import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {getCategories} from '../../actions/actions'
import streams from '../../api/streams'

const Categories = ({getCategories, categories}) => {

    const [categoryChosen, setCategory] = useState('')

    useEffect(() => {
       getCategories() 
    },[])

    const renderCategories = () => {
        return categories.map(category => {
            return (
                <div key={category.id} className="medium item">
                    <div 
                    onClick={() => setCategory(category.name) } 
                    className="content" style={{fontSize:'20px', cursor: "pointer"}}>
                        {category.name}
                    </div>
                </div>
            )
        })
    }

    return (
        categoryChosen
        ? <Redirect to={`/categories/${categoryChosen}`} />
        :<div>
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