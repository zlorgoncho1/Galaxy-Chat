import React, {useState, useEffect, useRef} from 'react';
import './Chatbox.css'
import Message from './Message'
import Send from './send.png'

const Chatbox = (props) => {
	const [messages, setMessages] = useState([])
	const [messageContent, setMessageContent] = useState("")

	const messagesRef = useRef()

	const handleChange = e => {
		const newMessage = e.target.value
		setMessageContent(newMessage)
	}
	const handleSubmit = e => {
		e.preventDefault()
		if (messageContent.replace(/[^a-zA-Z0-9]/g, "").length !== 0){
			sendNewMessage()
		}
	}
	const sendNewMessage = () => {
		fetch('http://localhost:8000/messages/',{
			method: 'POST',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		    	user: {
		    		username: props.user.username,
		    		sexe: props.user.sexe
		    	},
		    	content: messageContent,
		    	date: Date.now(),
		    	token: `message-${Date.now()}`
		    })
		})
		setMessageContent("")
	}
	const toScroll = () => {
		const ref = messagesRef.current
		ref.scrollTop = ref.scrollHeight - ref.clientHeight
		return ref.scrollTop
	}
	const getStateData = () => messages
		useEffect(() => {
		fetch('http://localhost:8000/messages').then(response => response.json()).then(data =>{
			setMessages(data)
			toScroll()
		})
	})
	const showMessages = messages.map(message => {
			return <Message 
			key={message.token} messageUser={message.user} 
			messageContent={message.content} messageDate={message.date} 
			messageToken={message.token} user={props.user}/>
	})

	return(
		<div className="chatbox">
			<div className={props.user.isConnected ? "messages" : "messages notConnected"}  ref={messagesRef}>
				{showMessages}
			</div>
			{props.user.isConnected &&
			<form className="send" onSubmit={handleSubmit}>
				<div>
					<textarea required maxLength="160" placeholder="Ecrire un message" onChange={handleChange} value={messageContent}></textarea>
					<button><img src={Send} width='20' height='20'/></button>
					<p>{160 - messageContent.length}</p>
				</div>
			</form>
			}
			<div className="overlay"></div>
		</div>
	)
}


export default Chatbox;