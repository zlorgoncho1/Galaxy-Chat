import './App.css';
import Connexion from './components/connexion/Connexion'
import Inscription from './components/inscription/Inscription'
import Chatbox from './components/chatbox/Chatbox'

function App(){
  return(
    <>
      <div className="main">
        <h1 className='title'>Galaxy Chat</h1>
        <div className="content">
            <div className="authentification">
              <Connexion/>
              <Inscription/>
            </div>
            <div className="chatboxWrapper">
              <Chatbox/>
            </div>
        </div>
        </div>
      <footer className="footer">
        <p>© IAMZLORG - ALL RIGHTS RESERVED</p>
      </footer>
    </>
  );
}

export default App;
