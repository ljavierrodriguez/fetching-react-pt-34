import React, { useEffect, useState } from 'react'
import ItemList from './components/ItemList';
import List from './components/List';

const Main = () => {

    const [url] = useState("https://3001-ljavierrodr-fetchingrea-39zff5q7o6h.ws-us88.gitpod.io");

    const [text, setText] = useState("");

    const [currentNote, setCurrentNote] = useState(null);

    const [notes, setNotes] = useState([
        /* { "id": 1, "text": "First Note"} */
    ]);

    const [users, setUsers] = useState([
        /* { id: 1, username: 'john.doe', active: true } */
    ]);

    const [error, setError] = useState(null);

    useEffect(() => {
        getNotes();
        getUsers();
    }, [])


    const getNotes = () => {
        const options = {
            method: 'GET', // GET, POST, PUT, DELETE
            // body: (string), // POST, PUT
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${url}/notes`, options)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data);
                setNotes(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getUsers = async () => {
        const options = {
            method: 'GET', // GET, POST, PUT, DELETE
            // body: (string), // POST, PUT
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const response = await fetch(`${url}/users`, options)

            const data = await response.json();

            setUsers(data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        let note = { text: text };
        if (note !== '') addNote(note);
    }

    const handleSubmitUpdate = e => {
        e.preventDefault();
        if (currentNote.text !== '') updateNote(currentNote);
    }

    const addNote = async (note) => {
        // note = { text: "" }
        const options = {
            method: 'POST', // GET, POST, PUT, DELETE
            body: JSON.stringify(note), // POST, PUT
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const response = await fetch(`${url}/notes`, options)

            const data = await response.json();

            console.log("Note Saved");
            console.log(data); // { text: 'Test', id: 1 }

            if (data.id) {
                setNotes((prevState) => prevState.concat(data))
                //getNotes();
                setText('');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const updateNote = async (note) => {
        const options = {
            method: 'PUT', // GET, POST, PUT, DELETE
            body: JSON.stringify(note), // POST, PUT
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const response = await fetch(`${url}/notes/${note.id}`, options);
            if (response.status == 200) {
                getNotes();
                setError(null);
                setCurrentNote(null);
            } else {
                setError("Error al intentar eliminar");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const deleteNote = async (id) => {
        const options = {
            method: 'DELETE', // GET, POST, PUT, DELETE
            // body: (string), // POST, PUT
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const response = await fetch(`${url}/notes/${id}`, options);
            if (response.status == 200) {
                //getNotes();
                setNotes((prevState) => prevState.filter((note) => note.id !== id));
                setError(null);
            } else {
                setError("Error al intentar eliminar");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 py-2">
                        {
                            !!error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="note" className="form-label">Note:</label>
                                <input type="text" className="form-control" placeholder="Add Note" value={text} onChange={(e) => setText(e.target.value)} />
                            </div>
                            <button className="btn btn-primary btn-sm w-100">Save Note</button>
                        </form>
                        <br />
                        {
                            !!currentNote && (
                                <form onSubmit={handleSubmitUpdate}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="note" className="form-label">Note:</label>
                                        <input type="text" className="form-control" placeholder="Edit Note" value={currentNote.text}
                                            onChange={(e) => setCurrentNote((prevState) => {
                                                return { ...prevState, text: e.target.value }
                                            })} />
                                    </div>
                                    <button className="btn btn-primary btn-sm w-100">Update Note</button>
                                </form>
                            )
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 py-3">
                        <h5>Notes List</h5>
                        <List>
                            {
                                notes.length > 0 ?
                                    notes.map((note) => {
                                        return (
                                            <ItemList text={note.text} key={note.id} id={note.id} onClick={deleteNote} setCurrentNote={setCurrentNote} />
                                        )
                                    }) : (
                                        <ItemList text="Empty List" />
                                    )
                            }
                        </List>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 py-3">
                        <List>
                            {
                                users.length > 0 ?
                                    users.map((user) => {
                                        return (
                                            <ItemList text={user.username} key={user.id} />
                                        )
                                    }) : (
                                        <ItemList text="Empty List" />
                                    )
                            }
                        </List>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main