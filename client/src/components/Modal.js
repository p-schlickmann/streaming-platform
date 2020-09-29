import React from 'react'
import ReactDOM from 'react-dom'


const Modal = ({onEnd, setModal, title, message}) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div style={{padding:'20px'}} className="ui standard modal visible active">
                <div className="header">
                    <h1>{title}</h1>
                </div>
                <div className="content">
                    <h2>Are you sure? <br/>{message}</h2>
                    
                </div>
                <div className="actions" >
                    <div>
                    <button className="ui large button red" onClick={onEnd}>Confirm</button>
                    <button className="ui large button" onClick={() => setModal(false)}>Cancel</button>
                    </div>
                    
                </div>
                
            </div>
        </div>, 
        document.querySelector("#modal")
    )
}

export default Modal