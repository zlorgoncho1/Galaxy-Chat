import React from 'react';
import './Message.css'

const Message = (props) => {
	const {user, messageUser, messageContent, messageDate, messageToken} = props;

	return(
		<div className={ user.username === messageUser.username ? 
			`message ${messageToken} isUser` :
			`message ${messageToken} notUser`}
		>
			<p className="username">{messageUser.username}</p>
			<div>
				<p className="message" style={{backgroundColor: 
					user.username !== messageUser.username && messageUser.sexe === 'M' ?
					'#1C004D':
					'#3183EA'}}
				>{messageContent}</p>
				<p className="date">{messageDate}</p>
			</div>
		</div>
	)}

export default Message;