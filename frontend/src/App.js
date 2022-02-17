import './App.css';
import {useState} from 'react';
import Connexion from './components/connexion/Connexion'
import Inscription from './components/inscription/Inscription'
import Chatbox from './components/chatbox/Chatbox'

function App(){
  const [user, setUser] = useState({
    isConnected: false
  })
  const toAuthenticate = (userConnected) => {
    console.log(userConnected)
    setUser(userConnected)
  }
  return(
    <>
      <div className="main">
        <h1 className='title'>Galaxy Chat</h1>
        <div className="content">
        {!user.isConnected &&
            <div className="authentification">
              <Connexion toAuthenticate={toAuthenticate}/>
              <Inscription toAuthenticate={toAuthenticate}/>
            </div>
          }
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
