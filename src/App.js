import { useState } from 'react';
import './App.css'
import { getDatabase, child, ref, set, get, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: "https://react-crud-project-16049-default-rtdb.firebaseio.com",
  projectId: "react-crud-project-16049",
  storageBucket: "react-crud-project-16049.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_REACT_APP_API_ID}`,
  measurementId: "G-PNKMTY40ML"
};
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

function App() {
  // home
  const [status, setStatus] = useState("None");
  const home = () => {
    setStatus("None");
    setUpdateStatus("None");
    setCreateName("");
    setCreateCount("");
    setUpdateName("");
    setUpdateCount("");
    setReadName("");
    setDeleteName("");
  }

  // create
  const [createName, setCreateName] = useState("");
  const [createCount, setCreateCount] = useState("");
  const createNameFunc = async () => {
    const db = getDatabase();
    if (createName !== "" && createCount !== "") {
      set(ref(db, 'GemsCounter/' + createName), {
        count: createCount
      });
      alert("Entry was made!");
      setCreateName("");
      setCreateCount("");
    } else {
      alert("Enter name/gems count");
    }
  }

  // read
  const [ReadName, setReadName] = useState("");
  const ReadNameFunc = async () => {
    if (ReadName !== "") {
      const dbRef = ref(getDatabase());
      var path = `/GemsCounter/${ReadName}`;
      get(child(dbRef, path)).then((snapshot) => {
        if(snapshot.exists()) {
          path = `/GemsCounter/${ReadName}/count`
          get(child(dbRef, path)).then((snapshot) => {
            alert(ReadName + " has " + snapshot.val() + " gems");
            setReadName("");
          })
        } else {
          alert("User not found!");
        }  
      })
    } else {
      alert ("Enter a name!");
    }
  }

  // update
  const [updateStatus, setUpdateStatus] = useState("None");
  const [updateName, setUpdateName] = useState("");
  const CheckUpdateFunc = async () => {
    if (updateName !== "") {
      const dbRef = ref(getDatabase());
      var path = `/GemsCounter/${updateName}`;
      get(child(dbRef, path)).then((snapshot) => {
        if(snapshot.exists()) {
          setUpdateStatus("NameFound");
        } else {
          alert("Name not found");
        }
      })
    } else {
      alert("Enter a name!");
    }
  }
  const [updateCount, setUpdateCount] = useState("");
  const UpdateFunc = async () => {
    if (updateCount !== "") {
      const db = getDatabase();
      set(ref(db, 'GemsCounter/' + updateName), {
        count : updateCount
      })
      alert("Updated " + updateName + "'s gems to " + updateCount);
      setUpdateName("");
      setUpdateCount("");
      setUpdateStatus("None");
    } else {
      alert("Enter count!");  
    }
  }

  // delete
  const [DeleteName, setDeleteName] = useState("");
  const DeleteNameFunc = async () => {
    if (DeleteName !== "") {
      const dbRef = ref(getDatabase());
      var path = `/GemsCounter/${DeleteName}`;
      get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
          const db = getDatabase();
          remove(ref(db, 'GemsCounter/' + DeleteName));
          alert(DeleteName + " was deleted");
          setDeleteName("");
        } else {
          alert("User does not exist!");
        }
      })
    } else {
      alert("Enter a name!");
    }
  }

  return (
    <div>
    {
      {
        'None': <>
                  <h1>Hello, user!</h1>
                  <h5>Choose which operation you would like to perform:</h5>
                  <button onClick={() => {setStatus("Create")}}>Create new user</button><br/>
                  <button onClick={() => {setStatus("Read")}}>Check how many gems a user owns</button><br/>
                  <button onClick={() => {setStatus("Update")}}>Change number of gems owned by a user</button><br/>
                  <button onClick={() => {setStatus("Delete")}}>Delete a user</button><br/>
                </>,
        'Create': <>
                    <h1>Create</h1>
                    <form>
                      <input 
                        placeholder='Enter name' 
                        value = {createName}
                        onChange={(e) => {setCreateName(e.target.value)}}
                        required
                      /><br/>
                      <input 
                        placeholder='Enter count' 
                        type='number'
                        value = {createCount}
                        onChange={(e) => {setCreateCount(e.target.value)}}
                        required
                      /><br/>
                      <button 
                        type="submit"
                        onClick={(e) => {e.preventDefault(); createNameFunc()}}
                      >Create entry</button>
                    </form>
                    <button onClick={() => {home()}}>Back</button>
                  </>,
        'Read': <>
                  <h1>Read</h1>
                  <form>
                      <input 
                        placeholder='Enter name' 
                        value = {ReadName}
                        onChange={(e) => {setReadName(e.target.value)}}
                        required
                      />
                      <button 
                        type="submit"
                        onClick={(e) => {e.preventDefault(); ReadNameFunc()}}
                      >Read entry</button>
                    </form>
                  <button onClick={() => {home()}}>Back</button>
                </>,
        'Update': <>
                    <h1>Update</h1>
                    <form>
                      {
                        {
                          'None': <>
                                    <input 
                                      placeholder='Enter name' 
                                      value = {updateName}
                                      onChange={(e) => {setUpdateName(e.target.value)}}
                                      required
                                    />
                                    <button 
                                      type="submit"
                                      onClick={(e) => {e.preventDefault(); CheckUpdateFunc()}}
                                    >Check for name</button>
                                  </>,
                          'NameFound': <>
                                          <input 
                                            placeholder='Enter number of gems' 
                                            type='number'
                                            value = {updateCount}
                                            onChange={(e) => {setUpdateCount(e.target.value)}}
                                            required
                                          />
                                          <button
                                            type="submit"
                                            onClick={(e) => {e.preventDefault(); UpdateFunc()}}
                                          >Change number of gems</button>
                                        </>
                                        
                        }[updateStatus]
                      }
                    </form>
                    <button onClick={() => {home()}}>Back</button>
                  </>,
        'Delete': <>
                    <h1>Delete</h1>
                    <form>
                      <input 
                        placeholder='Enter name' 
                        value = {DeleteName}
                        onChange={(e) => {setDeleteName(e.target.value)}}
                        required
                      />
                      <button 
                        type="submit"
                        onClick={(e) => {e.preventDefault(); DeleteNameFunc()}}
                      >Delete entry</button>
                    </form>
                    <button onClick={() => {home()}}>Back</button>
                  </>
      }[status]
    }
    </div>
  )
}

export default App;
