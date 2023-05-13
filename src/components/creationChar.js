import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/init-firestore';
import '../style/createChar.css'

export default function Stickman({colour}) {
    const [curColour, setCurColour] = useState("#000000");
    useEffect(() => {
        updateColour()
    })
    
    const updateColour = () => {
        const parts = document.getElementsByClassName("part");
        for (var i = 0; i < 6; i++) {
            parts[i].style.stroke = `${curColour}`;
        }
    }

    const [charName, setCharName] = useState("");
    const submit_form = () => {
        if(charName === "") {
            alert("Enter a name for your character!");
        } else {
            const charactersCollectionRef = collection(db, "Characters");
            getDocs(charactersCollectionRef).then(response => {
                const chars_list = response.docs.map(doc => ({name: doc.data().Name}));
                console.log(chars_list);
                var flag = false;
                for (var i = 0; i<chars_list.length; i++) {
                    if (chars_list[i].name === charName) {
                        alert("Character name taken, try a different one!");
                        flag = true;
                        break;
                    }
                }
                if (flag === false) {
                    addDoc(charactersCollectionRef, {Name: charName, Colour: curColour}).then(response => {
                        console.log(response);
                        setCharName("");
                        setCurColour("#000000");
                        updateColour();
                        alert("Character created successfully!");
                        const back_button = document.getElementById("back_to_home");
                        back_button.click();
                    }).catch(error => console.error(error))
                }
            }).catch(error => console.error(error));
        }
    }

    return (
        <>
            <div className='stick-wrapper'>
                <svg width="116" height="258" viewBox="0 0 116 258" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='part' d="M82.5 30C82.5 46.3816 71.4495 59.5 58 59.5C44.5505 59.5 33.5 46.3816 33.5 30C33.5 13.6184 44.5505 0.5 58 0.5C71.4495 0.5 82.5 13.6184 82.5 30Z" stroke="#000"/>
                    <path className='part' d="M58 60V160" stroke="#000"/>
                    <path className='part' d="M58 160L82.1922 257.03" stroke="#000"/>
                    <path className='part' d="M58.1922 160L34 257.03" stroke="#000"/>
                    <path className='part' d="M58 82L115.341 122.15" stroke="#000"/>
                    <path className='part' d="M58.3406 82L1 122.15" stroke="#000"/>
                </svg>
            </div>
            
            <form>
                <input 
                    id='name_text_box'
                    type='text' 
                    placeholder='Name your character'
                    value={charName}
                    maxLength="20"
                    onChange={(e) => {setCharName(e.target.value)}}
                />
                <div>
                    <label htmlFor="color">Choose colour: </label>
                    <input 
                        id="color" 
                        type="color" 
                        value={curColour} 
                        onChange={(e) => {setCurColour(e.target.value); updateColour(); console.log(curColour)}}
                    />
                </div>
                <button type='submit' id="submit_button" onClick={(e) => {e.preventDefault(); submit_form();}}>Create this Character!</button>
            </form>
        </>
    )
}