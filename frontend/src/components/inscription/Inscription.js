import React from 'react';
import './Inscription.css'

const Inscription = () => {
	return(
		<div className="inscription">
			<h2>Inscription</h2>
			<form className="inscription">
				<div className="username">
					<input type="text" placeholder="Nom d'utilisateur"/>
					<div className="sexe">
						<span className="Sexe">Sexe</span><span>M</span><span>F</span>
					</div>
				</div>
				<div className="password">
					<input type="password" placeholder="Mot de Passe"/>
					<input type="password" placeholder="Confirmer Mot de Passe"/>
				</div>
				<button>S'inscrire</button>
			</form>
			<div className="overlay"></div>
		</div>
	)
}

export default Inscription;