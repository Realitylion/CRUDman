import './App.css';
import NavBar from './components/navBar';
import ListCharacters from './components/listCharacters';
import Stickman from './components/creationChar';
import { useState } from 'react';

function App() {
  const [isHome, setisHome] = useState(true);
  const [colour, setColour] = useState("black");

  if(isHome) {
    return (
    <>
      <NavBar />  
      <button id="create_char_button" onClick={() => {setisHome(false)}}>Create a New Character</button>
      {/* <ListCharacters /> */}
    </>
    )
  } else {
    return (
      <>
        <div id="creation_page">
          <NavBar /> 
          <h1>Welcome to Character Creation Page!</h1>
          <Stickman colour={colour} />
          <button id="back_to_home" onClick={() => setisHome(true)}>Back to Characters</button>
        </div>
      </>
    )
  }
}

export default App;