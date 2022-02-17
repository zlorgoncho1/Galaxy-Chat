import React from 'react';
import './Message.css'

const Message = (props) => {
	const {user, content, date, token} = props;
	return(
		<div className="message">
			<p className="username">{user.username}</p>
			<div>
				<p className="message">{content}</p>
				<p className="date">{date}</p>
			</div>
		</div>
	)}

export default Message;