import React, {useState} from 'react';
import './Inscription.css'

const Inscription = (props) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [sexe, setSexe] = useState("")
	const [mSexeClicked, setMSexeClicked] = useState(false)
	const [fSexeClicked, setFSexeClicked] = useState(false)
	const [errror, setErrror] = useState("")

	const usernameHandleChange = e => {
		setErrror("")
		setUsername(e.target.value)
	}
	const passwordHandleChange = e => {
		setErrror("")
		setPassword(e.target.value)
	}
	const confirmPasswordHandleChange = e => {
		setErrror("")
		setConfirmPassword(e.target.value)
	}

	const mHandleClick = () => {
		setErrror("")
		setSexe("M")
		setMSexeClicked(true)
		setFSexeClicked(false)
	}
	const fHandleClick = () => {
		setErrror("")
		setSexe("F")
		setFSexeClicked(true)
		setMSexeClicked(false)
	}
	const inscriptionTraitement = (username, password, confirmPassword, sexe) => {
		if (username.length < 4){
			setErrror("Le nom d'utilisateur est trop court! Minimum: 4 caractères")
			return false
		}
		if (username.replace(/[^a-zA-Z0-9 ]/g, "") != username){
			setErrror("Le nom d'utilisateur ne doit pas contenir de caractères spéciaux")
			return false
		}
		if(sexe != "M" && sexe !="F"){
			setErrror("Oups, Vous n'avez pas défini votre sexe!")
			return false
		}
		if(password.length < 6){
			setErrror("Le mot de passe est trop court! Minimum: 6 caractères")
			return false
		}
		if(password != confirmPassword){
			setErrror("Les mots de passe ne correspondent pas!")
			return false
		}
		return true
	}

	const handleSubmit = e => {
		e.preventDefault()
		const sameUserMessage = "Un objet user avec ce champ username existe déjà."
		if (inscriptionTraitement(username, password, confirmPassword, sexe)){
			fetch('http://localhost:8000/insert/',{
			method: 'POST',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({username: username, password: password, sexe: sexe, isConnected: true})
		}).then(response => response.json()).then(user => {
			if (user.username == sameUserMessage){
				setErrror("Ce nom d'utilisateur a déjà été choisie !")
			}
			else{
				setUsername("")
				setSexe("")
				setMSexeClicked(false)
				setFSexeClicked(false)
			}
		})
		}
		setPassword("")
		setConfirmPassword("")
	}


	return(
		<div className="inscription">
			<h2>Inscription</h2>
			{errror != "" && <p className="errror">{errror}</p>}
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