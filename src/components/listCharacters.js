import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from  '../lib/init-firestore'

export default function ListCharacters() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        getCharacters()
    }, [])

    const getCharacters = () => {
        const charactersCollectionRef = collection(db, "Characters");
        getDocs(charactersCollectionRef).then(response => {
            console.log(response.docs);
            const chars = response.docs.map(doc => ({data: doc.data(), id: doc.id}));
            setCharacters(chars);
        })
        .catch(error => console.error(error));
    }

    return (
        <div id='char_list'>
            <button onClick={getCharacters} id='refresh_button'>Refresh Characters</button>
            <ul>
                {characters.map(char => (
                    <li key={char.id}> {char.id} : {char.data.Colour} </li>
                ))}
            </ul>
        </div>
    )
}