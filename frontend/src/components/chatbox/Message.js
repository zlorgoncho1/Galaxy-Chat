import React from 'react';
import './Message.css'

const Message = (props) => {
	const {user, content, date} = props;
	return(
		<div className="message">
			<p className="username">{user.username}</p>
			<div>
				<p className="message" style={{backgroundColor: user.sexe == 'M' ? '#1C004D':'#3183EA'}}>{content}</p>
				<p className="date">{date}</p>
			</div>
		</div>
	)}

export default Message;