import React, {useState, useEffect, useRef, useMemo} from 'react';
import './Inscription.css'
import VanillaTilt from 'vanilla-tilt';

const Inscription = (props) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [sexe, setSexe] = useState("")
	const [mSexeClicked, setMSexeClicked] = useState(false)
	const [fSexeClicked, setFSexeClicked] = useState(false)
	const [error, setError] = useState("")

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

	const usernameHandleChange = e => {
		setError("")
		setUsername(e.target.value)
	}
	const passwordHandleChange = e => {
		setError("")
		setPassword(e.target.value)
	}
	const confirmPasswordHandleChange = e => {
		setError("")
		setConfirmPassword(e.target.value)
	}

	const mHandleClick = () => {
		setError("")
		setSexe("M")
		setMSexeClicked(true)
		setFSexeClicked(false)
	}
	const fHandleClick = () => {
		setError("")
		setSexe("F")
		setFSexeClicked(true)
		setMSexeClicked(false)
	}
	const errorArray = ["Le nom d'utilisateur est trop court! Minimum: 4 caractères", "Le nom d'utilisateur est trop long! Maximum: 20 caractères",
					"Le nom d'utilisateur ne doit pas contenir de caractères spéciaux", "Oups, Vous n'avez pas défini votre sexe!",
					"Le mot de passe est trop court! Minimum: 6 caractères", "Les mots de passe ne correspondent pas!", 
					"Désolé, un d'utilisateur possède déjà ce nom d'utilisateur!"
					]
	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.length < 4){
			setError(errorArray[0])
			return false
		}
		if (username.length > 20){
			setError(errorArray[1])
			return false
		}
		if (username.replace(/[^a-zA-Z0-9 ]/g, "") !== username){
			setError(errorArray[2])
			return false
		}
		if(sexe !== "M" && sexe !=="F"){
			setError(errorArray[3])
			return false
		}
		if(password.length < 6){
			setError(errorArray[4])
			return false
		}
		if(password !== confirmPassword){
			setError(errorArray[5])
			return false
		}
		traitementInscription()
	}
	const traitementInscription = () => {
		fetch('http://localhost:8000/insert/',{
			method: 'POST',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({username: username, password: password, sexe: sexe, isConnected: true, confirmPassword: confirmPassword})
		})
		.then(response => response.json()).then(user => {
			console.log(user)
			if(user.error !== undefined){
				setError(user.error)
			}
			else{
				setUsername("")
				setSexe("")
				setMSexeClicked("")
				setMSexeClicked("")
				props.toAuthenticate(user)
			}
		})
		setPassword("")
		setConfirmPassword("")
	}

	return(
		<div className="inscription" ref={tilt}>
			<h2>Inscription</h2>
			{error !== "" && <p className="error">{error}</p>}
			<form className="inscription" onSubmit={handleSubmit}>
				<div className="username">
					<input type="text" placeholder="Nom d'utilisateur" value={username} onChange={usernameHandleChange}/>
					<div className="sexe">
						<span className="Sexe">Sexe</span>
						<span onClick={mHandleClick} className={mSexeClicked ? "clicked" : ""}>M</span>
						<span onClick={fHandleClick} className={fSexeClicked ? "clicked" : ""}>F</span>
					</div>
				</div>
				<div className="password">
					<input type="password" placeholder="Mot de Passe" value={password} onChange={passwordHandleChange}/>
					<input type="password" placeholder="Confirmer Mot de Passe" value={confirmPassword} onChange={confirmPasswordHandleChange}/>
				</div>
				<button>S'inscrire</button>
			</form>
			<div className="overlay"></div>
		</div>
	)
}

export default Inscription;