import React from 'react';
import './Connexion.css'
import Bg from './bg.png'

const Connexion = () => {
	return(
		<div className="connexion">
			<h2>Connexion</h2>
			<form className="connexion">
				<input type="text" placeholder="Nom d'utilisateur"/>
				<input type="password" placeholder="Mot de Passe"/>
				<button>Se Connecter</button>
			</form>
			<div className="overlay"></div>
		</div>
	)
}

export default Connexion;