import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

function App() {
  const [isSigned, setIsSigned] = useState(false)
  const [userName, setUserName] = useState(`GuestUser`)
  const [nickname, setNickname] = useState('')

  const uiconfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSucess: () => false
    }
  }

   const firebaseConfig = {
    apiKey: "AIzaSyCRCFleIh_oCmRbgLcuOcp1Fz46ZaC7L6U",
    authDomain: "teste2-7179e.firebaseapp.com",
  };

  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
  }
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsSigned(!!user)
      
      if(!nickname) {
        setUserName(user.displayName)
      } 
    })
  }, [])

  function SigOut() {
    firebase.auth().signOut()
  }

  function guestLogin() {
    return Math.floor(Math.random() * Math.floor(100))
  }

  return (
    <div className="App">
        {isSigned ? (
          <>
            <div>Signed In</div>
            <h3>{userName ? userName : `GuestUser-${guestLogin()}`}</h3> 
            <button onClick={() => SigOut()}>Sign Out</button>
          </>)
        : ( <>
          <StyledFirebaseAuth uiConfig={uiconfig} firebaseAuth={firebase.auth()} />
          <span>
            {/* <input type='text' value={nickname} onChange={e => setNickname(e.target.value)} placeholder='Your Nickname'/> */}
            <button onClick={() =>{
                firebase.auth().signInAnonymously()
              }}>Guest</button>
          </span>
        </>)}
    </div>
  );
}

export default App;
