import React from 'react';
import './Message.css'

const Message = (props) => {
	const {user, messageUser, messageContent, messageDate, messageToken} = props;
	const date = new Date(Number(messageDate))
	const hours = date.getHours()
	const minutes = date.getMinutes()

	return(
		<div className={ user.username === messageUser.username ? 
			`message ${messageToken} isUser` :
			`message ${messageToken} notUser`}
		>
			<p className="username">{messageUser.username}</p>
			<div>
				<p className="message" style={{backgroundColor: 
					user.username !== messageUser.username && messageUser.sexe === 'M' ?
					'#1C004D': user.username !== messageUser.username && messageUser.sexe === 'F' ?
					'#3183EA' : '#1D4980'}}
				>{messageContent}</p>
				<p className="date">{hours}:{minutes}</p>
			</div>
		</div>
	)}

export default Message;