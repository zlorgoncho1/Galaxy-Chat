import React, {useState, useEffect, useRef, useMemo} from 'react';
import './Connexion.css'
import VanillaTilt from 'vanilla-tilt';


const Connexion = (props) => {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errror, setErrror] = useState("")

	/* Vanilla Tilt */

	const tilt = useRef(null);
	
	const options = useMemo(() =>{
		return {
	    scale: 1.05,
	    speed: 1000,
	    max: 7
	}}, []);

	useEffect(() => {
		VanillaTilt.init(tilt.current, options);
	}, [options])

  	/* Vanilla Tilt */

	const usernameHandleChange = (e) =>{
		setErrror("")
		const newUsername = e.target.value
		setUsername(newUsername)
	}

	const passwordHandleChange = (e) =>{
		setErrror("")
		const newPassword = e.target.value
		setPassword(newPassword)
	}

	const handleConnect = e => {
		e.preventDefault();
		fetch('http://localhost:8000/connect/',{
			method: 'POST',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({username: username, password: password})
		}).then(response => response.json()).then(serverResponse => {
			if (serverResponse.status === true) {
				props.toAuthenticate(serverResponse.user)
				setUsername("")
				setPassword("")
			}
			else{
				setErrror("Identifiants Incorrects!")
			}
		})
	}

	return(
		<div className="connexion" ref={tilt}>
			<h2>Connexion</h2>
			{errror !== "" && <p className="error">{errror}</p>}
			<form className="connexion" onSubmit={handleConnect}>
				<input type="text" placeholder="Nom d'utilisateur" onChange={usernameHandleChange} value={username}/>
				<input type="password" placeholder="Mot de Passe" onChange={passwordHandleChange} value={password}/>
				<button>Se Connecter</button>
			</form>
			<div className="overlay"></div>
		</div>
	)
}

export default Connexion;