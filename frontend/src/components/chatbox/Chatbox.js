import React, {useState, useEffect} from 'react';
import './Chatbox.css'
import Message from './Message'

const Chatbox = () => {
	const [messages, setMessages] = useState([])

	const allMessages = []
	useEffect(() => {
		fetch('http://localhost:8000/messages').then(response => response.json()).then(data => setMessages(data))
	}, [])

	const showMessages = messages.slice(0, 4).map(message => {
			return <Message key={message.token} user={message.user} content={message.content} date={message.date} token={message.token}/>
		})

	return(
		<div className="chatbox">
			<div className="messages">
				{showMessages}
			</div>
			<form></form>
			<div className="overlay"></div>
		</div>
	)
}


export default Chatbox;