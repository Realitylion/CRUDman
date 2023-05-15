import { useEffect, useState, useContext, useRef } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/init-firestore';
import '../style/createChar.css'
import { Context } from "../context";

export default function Stickman() {
    const [curColour, setCurColour] = useState("#000000");
    const { editChar, setEditChar } = useContext(Context);
    var id = useRef("");
    var incomingChar = useRef("");

    useEffect(() => {
        if (editChar !== "") {
            id.current = editChar;
            const submit_button = document.getElementById("submit_button");
            submit_button.innerHTML = "Update Character!";
            const charactersCollectionRef = collection(db, "Characters");
            getDocs(charactersCollectionRef).then(response => {
                const chars = response.docs.map(doc => ({data: doc.data(), id: doc.id}));
                var i = 0;
                for (i; i < chars.length; i++) {
                    if (chars[i].id === editChar) {
                        incomingChar.current = chars[i].data.Name;
                        setCharName(chars[i].data.Name);
                        setCurColour(chars[i].data.Colour);
                        break;
                    }
                }
            })
            setEditChar("");
        }
    })

    useEffect(() => {    
        updateColour();
    })

    const updateColour = () => {
        const parts = document.getElementsByClassName("part");
        for (var i = 0; i < 6; i++) {
            parts[i].style.stroke = `${curColour}`;
        }
    }

    const [charName, setCharName] = useState("");
    const submit_form = () => {
        const submit_button = document.getElementById("submit_button");
        if(submit_button.innerHTML === "Create this Character!") {
            if(charName === "") {
                alert("Enter a name for your character!");
            } else {
                const charactersCollectionRef = collection(db, "Characters");
                getDocs(charactersCollectionRef).then(response => {
                    const chars_list = response.docs.map(doc => ({name: doc.data().Name}));
                    var flag = false;
                    for (var i = 0; i<chars_list.length; i++) {
                        if (chars_list[i].name === charName) {
                            alert("Character name taken, try a different one!");
                            flag = true;
                            break;
                        }
                    }
                    if (flag === false) {
                        addDoc(charactersCollectionRef, {Name: charName, Colour: curColour}).then(() => {
                            setCharName("");
                            setCurColour("#000000");
                            alert("Character created successfully!");
                            const back_button = document.getElementById("back_to_home");
                            back_button.click();
                        }).catch(error => console.error(error))
                    }
                }).catch(error => console.error(error));
            }
        } else {
            if(charName === "") {
                alert("Character name cannot be empty!");
            } else {
                const charactersCollectionRef = collection(db, "Characters");
                getDocs(charactersCollectionRef).then(response => {
                    const chars_list = response.docs.map(doc => ({name: doc.data().Name}));
                    var flag = false;
                    for (var i = 0; i<chars_list.length; i++) {
                        if (chars_list[i].name === charName && incomingChar.current !== charName) {
                            alert("Character name taken, try a different one!");
                            flag = true;
                            break;
                        }
                    }
                    if (flag === false) {
                        const docRef = doc(db, "Characters", id.current);
                        updateDoc(docRef, {Name: charName, Colour: curColour}).then(() => {
                            alert("Updated the character!");
                            const back_button = document.getElementById("back_to_home");
                            back_button.click();
                        }).catch(error => {console.log(error)})
                    }
                })
            }
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
                    placeholder="Name your Character"
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
                        onChange={(e) => {setCurColour(e.target.value)}}
                    />
                </div>
                <button type='submit' id="submit_button" onClick={(e) => {e.preventDefault(); submit_form();}}>Create this Character!</button>
            </form>
        </>
    )
}