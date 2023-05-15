import './App.css';
import NavBar from './components/navBar';
import ListCharacters from './components/listCharacters';
import Stickman from './components/creationChar';
import { useContext } from 'react';
import { Context } from "./context";

function App() {
  const { setEditChar, isHome, setisHome }= useContext(Context);

  if(isHome) {
    return (
    <>
      <NavBar />  
      <div
      className='wrapper'>
        <button id="create_char_button" onClick={() => {setisHome(false)}}>Create Character</button>
        <ListCharacters />
      </div>
    </>
    )
  } else {
    return (
      <>
        <div id="creation_page">
          <NavBar /> 
          <div
          className='wrapper'>
            <Stickman />
            <button id="back_to_home" onClick={() => {setisHome(true); setEditChar("")}}>Back to Characters</button>
          </div>
        </div>
      </>
    )
  }
}

export default App;