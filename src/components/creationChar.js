import { useEffect, useState } from 'react';
import '../style/createChar.css';

export default function Stickman({colour}) {
    const [curColour, setCurColour] = useState(colour);
    useEffect(() => {
        updateColour()
    }, [])
    
    const updateColour = () => {
        const head = document.getElementsByClassName("head")[0];
        head.style.border = `5px solid ${curColour}`;
        const parts = document.getElementsByClassName("part");
        for (var i = 0; i < 5; i++) {
            parts[i].style.border = `3px solid ${curColour}`;
        }
    }

    const [charName, setCharName] = useState("")
    const submit_button = document.getElementById("submit_button");
    if(submit_button) {
        submit_button.addEventListener("click", (e) => {
            e.preventDefault();
            // add document in firestore 
        })
    }
    

    return (
        <>
            <form>
                <input 
                    type='text' 
                    placeholder='Name your character'
                    value={charName}
                    onChange={(e) => {setCharName(e.target.value)}} 
                    required
                />
                <label for="color">Choose colour: </label>
                <input 
                    id="color" 
                    type="color" 
                    value={curColour} 
                    onChange={(e) => {setCurColour(e.target.value); updateColour(); console.log(curColour)}}
                />
                <button type='submit' id="submit_button">Create this Character!</button>
            </form>
            
            <div class="stickman">
                <div class="head"></div>
                <div class="torso part"></div>
                <div class="leftarm part"></div>
                <div class="rightarm part"></div>
                <div class="leftleg part"></div>
                <div class="rightleg part"></div>
            </div>
        </>
    )
}