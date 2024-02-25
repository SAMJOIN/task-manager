import { useState } from 'react';
import style from './Note.module.css'
import NewNoteForm from './newNoteForm';
import { connect } from 'react-redux';
import { removeNote, editNotes } from '../../Redux/note-reducer';

let Note = (props) => {

    const date = new Date(props.date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'short' });

    const onSubmit = (formData) => {
        console.log(formData);
        toggleForm(false);
        document.body.style.overflow = 'visible';
        props.editNotes(props.id, formData.title, formData.note, formData.color);
    }

    function deleteNote() {
        props.removeNote(props.id);
    }

    let openForm = () => {
        toggleForm(true);
        document.body.style.overflow = 'hidden';
    }

    let closeForm = () => {
        toggleForm(false);
        document.body.style.overflow = 'visible';
    }

    let [formOpen, toggleForm] = useState(false); // Состояние формы

    return (
        <>
            <div className={style.noteBlock} onClick={openForm}>
                <h1 style={{backgroundColor: props.color}} className={style.title}>{props.title}</h1>
                <p className={style.note}>{props.note}</p>
                <p className={style.date}>{[day, monthName, year].join([' '])}</p>
            </div>
            {formOpen && <NewNoteForm
                onSubmit={onSubmit}
                closeForm={closeForm}
                deleteNote={deleteNote}
                note={props.note}
                title={props.title} />}
        </>
    );
}

export default connect(null, {removeNote, editNotes}) (Note);