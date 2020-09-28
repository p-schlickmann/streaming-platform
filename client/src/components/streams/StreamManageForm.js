import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import {getCategories} from '../../actions/actions'

const StreamManageForm = ({categories, getCategories, userInfo, onSubmit, message, initVal}) => {
    
    useEffect(()=>{
        getCategories()
    }, [getCategories])

    const renderDropdown = () => {
        return categories.map(cat => {
            if (initVal) {
                if (initVal.category === cat.id) var _ = true
            }
            return (
                <option key={cat.id} value={cat.id} selected={ _ ? cat.id : null} >{cat.name}</option>
            )
        })
    }

    return (
        message === 'Redirect' 
        ?<Redirect to={`/live/${userInfo.username}`} />
        :<form className="ui form" onSubmit={onSubmit}>
            <div className="field">
                <label>{initVal ? 'Change Title' : 'Enter Stream Title'}</label>
                <input type="text" name="title" defaultValue={initVal ? initVal.title : '' } />
            </div>
            <div className="field">
                <label>{initVal ? 'Change Category': 'Pick a category'}</label>
                <select name="category">
                    <option></option>
                    {renderDropdown()}
                </select>
             </div>
             <br/>
            <button className="ui button primary">Submit</button>
            
            <p style={{display: 'inline'}}>{message}</p>
            <Link to={message ? `/live/${userInfo.username}`: '/'} style={{display: 'inline'}}>{message ? `http://localhost:3000/live/${userInfo.username}` : null}</Link>
        </form>
    )
}



const mapStateToProps = state => {
    return {categories: state.categories}
}

export default connect(mapStateToProps, {getCategories})(StreamManageForm)

