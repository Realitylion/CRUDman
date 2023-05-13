import "../style/listCharacters.css"
import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from  '../lib/init-firestore'
import { Context } from "../context";

export default function ListCharacters() {
    const [characters, setCharacters] = useState([]);
    const { editChar, setEditChar, isHome, setisHome } = useContext(Context);

    useEffect(() => {
        getCharacters()
    }, [])

    const getCharacters = () => {
        const charactersCollectionRef = collection(db, "Characters");
        getDocs(charactersCollectionRef).then(response => {
            const chars = response.docs.map(doc => ({data: doc.data(), id: doc.id}));
            setCharacters(chars);
        })
        .catch(error => console.error(error));
    }

    const editCharFunc = (editingCharID) => {
        setEditChar(editingCharID);
        setisHome(false);
    }

    const deleteCharFunc = (deletingCharID) => {
        // confirm("Are you sure?"?);
    }

    return (
        <div id='char_list'>
            <button onClick={getCharacters} id='refresh_button'>Refresh Characters</button>
            <h2>Available Characters:</h2>
            <table>
                {characters.map(char => (
                    <tr key={char.id}>
                        <td className="col1"><h2 style={{color: char.data.Colour}}>{char.data.Name}</h2></td>
                        <td>
                            <button className="button edit_button" id={char.data.Name} hidden onClick={() => {editCharFunc(char.id)}}>Edit</button>
                            <label htmlFor={char.data.Name}><img src="edit_icon.png" height="30px" alt="edit_icon.png" /></label>
                        </td>
                        <td>
                            <button className="button delete_button" id={char.id} hidden onClick={() => {deleteCharFunc(char.id)}}>Delete</button>
                            <label htmlFor={char.id}><img src="delete_icon.png" height="30px" alt="delete_icon.png" /></label>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}