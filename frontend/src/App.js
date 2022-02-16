import './App.css';
import Connexion from './components/connexion/Connexion'
import Inscription from './components/inscription/Inscription'

function App() {
  return (
    <div className="App">
      <div className="main">
        <h1 className='title'>Galaxy Chat</h1>
        <div className="authentification">
          <Connexion/>
          <Inscription/>
        </div>
      </div>
      <footer className="footer">
        <p>© IAMZLORG - ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

export default App;
