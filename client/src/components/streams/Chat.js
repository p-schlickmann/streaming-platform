import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Chat = ({userInfo}) => {
    
    const [messages, addMessage] = useState([
        {
            author:'Streamy Bot', content: 'Welcome to the live chat! Have fun :)'
        }
    ])
    const [newMessage, setMessageInput] = useState('')

    const renderMessages = () => {
        return messages.map(msg => {
            return (
                <div key={msg.author} style={{margin:'2px 10px'}}>
                   <p>
                       <strong style={{fontSize:'16px'}}>{msg.author}:  </strong>
                       {msg.content}
                    </p> 
                </div>
            )
        })
    } 

    const onSubmit = (e) => {
        e.preventDefault()
        if (!newMessage) return 
        addMessage([...messages, {author: userInfo.username, content: newMessage} ])
        setMessageInput('')
    }

    const renderMessageBox = () => {
        if (userInfo) {
            return (
                <form className="ui form" style={{display:"flex", }} onSubmit={onSubmit}>
                    <input style={{marginRight:"5px", }}  type="text" placeholder="Type your message here..." value={newMessage} onChange={e => setMessageInput(e.target.value)}/>
                    <button type="submit" className="ui blue button">Send</button>
                </form>
            )
        } else {
            return (
                <form className="ui form" style={{display:"flex", }} onSubmit={onSubmit}>
                    <input style={{marginRight:"5px", }} type="text" placeholder="You must be logged in..." disabled />
                    <Link to="/login" className="ui red button">Login</Link>
                </form>
            )
        }
    }

    return (
        <div style={{backgroundColor:'#f2f2f2', display:"flex", flexDirection:'column', alignItems:'center'}}>
            <div style={{height:'70vh', width:'100%'}}>
                <div style={{textAlign:'center', padding:'10px 0' ,borderBottom:'1.5px solid grey'}}>
                    <h3>Live Chat</h3>
                </div>
                <br/>
                <div style={{marginLeft:'5px'}}>
                    {renderMessages()}
                </div>
            </div>
            <div style={{margin: '5px 0' , width:'90%'}} >
                {renderMessageBox()}
            </div>
        </div>
    )
}

export default Chat
