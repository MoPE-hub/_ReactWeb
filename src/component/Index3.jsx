import React, { useEffect, useState } from 'react'
import {API, Storage} from "aws-amplify";
import {listTodos} from "../graphql/queries";
import * as mutations from '../graphql/mutations';
// import {runInContext as todosFromAPI} from "yarn/lib/cli";

const initialFormState = { name: '', description: '' }

const Main = () => {

  // const [notes, setNotes] = useState([]);
  // const [formData, setFormData] = useState(initialFormState);
  //
  // useEffect(() => {
  //   fetchNotes();
  // }, []);
  //
  // async function fetchNotes() {
  // const apiData = await API.graphql({ query: listTodos });
  // setNotes(apiData.data.listTodos.items);
  //   // await Promise.all(todosFromAPI.map(async note => {
  //   //   if (note.image) {
  //   //     const image = await Storage.get(note.image);
  //   //     note.image = image;
  //   //   }
  //   //   return note;
  //   // }))
  //   setNotes(apiData.data.listTodos.items);
  // }
  //
  // async function createNote() {
  //   if (!formData.name || !formData.description) return;
  //   await API.graphql({ query: mutations.createTodo, variables: { input: formData } });
  //   if (formData.image) {
  //     const image = await Storage.get(formData.image);
  //     formData.image = image;
  //   }
  //   setNotes([ ...notes, formData ]);
  //   setFormData(initialFormState);
  // }
  //
  // async function deleteNote({ id }) {
  //   const newNotesArray = notes.filter(note => note.id !== id);
  //   setNotes(newNotesArray);
  //   await API.graphql({ query: mutations.deleteTodo, variables: { input: { id } }});
  // }
  //
  // async function onChange(e) {
  //   if (!e.target.files[0]) return
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, image: file.name });
  //   await Storage.put(file.name, file);
  //   fetchNotes();
  // }

  return(
    <React.Fragment>
      <div className="wrap">
        {/*<IntroduceBox />*/}
        {/*<div>*/}
        {/*  <input*/}
        {/*    onChange={e => setFormData({ ...formData, 'name': e.target.value})}*/}
        {/*    placeholder="Note name"*/}
        {/*    value={formData.name}*/}
        {/*  />*/}
        {/*  <input*/}
        {/*    onChange={e => setFormData({ ...formData, 'description': e.target.value})}*/}
        {/*    placeholder="Note description"*/}
        {/*    value={formData.description}*/}
        {/*  />*/}
        {/*  <input*/}
        {/*    type="file"*/}
        {/*    onChange={onChange}*/}
        {/*  />*/}
        {/*  <button onClick={createNote}>Create Note</button>*/}
        {/*  <div style={{marginBottom: 30}}>*/}
        {/*    {*/}
        {/*      notes.map(note => (*/}
        {/*        <div key={note.id || note.name}>*/}
        {/*          <h2>{note.name}</h2>*/}
        {/*          <p>{note.description}</p>*/}
        {/*          {*/}
        {/*            note.image && <img src={note.image} style={{width: 400}} />*/}
        {/*          }*/}
        {/*          <button onClick={() => deleteNote(note)}>Delete note</button>*/}
        {/*        </div>*/}
        {/*      ))*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </React.Fragment>
  )
}

export default Main
