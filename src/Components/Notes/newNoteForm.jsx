import { Field, initialize, reduxForm } from "redux-form"
import styled from "styled-components";
import { useEffect } from "react";
import Textarea from '../../FormControl/Textarea'
import styles from './Notes.module.css'
import Input from "../../FormControl/Input";


const FormWrapper = styled.form`
    width: 30%;
    height: 300px;
    border-radius: 15px;
    padding: 20px 20px 0 20px;
    background-color: white;
    box-shadow: 0 0 10px 0 black;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
    font-family: Comic Sans MS, Comic Sans, cursive;
`
const Label = styled.label`
    display: block;
    font-size: 20px;
    margin: 5px 0 5px 0;
`

const Mount = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #0000007d;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
`




const required = value => value ? undefined : 'Required'

const NewNoteForm = (props) => {

    // Инициализируем пропсы, чтобы прокинуть их в форму
    useEffect(() => {
        props.initialize(
            {
                title: props.title,
                note: props.note,
                date: props.date
            })
    }, [])

    return (
        <div>
            <Mount onClick={props.closeForm} />
            <FormWrapper onSubmit={props.handleSubmit}>
                <div style={{ display: "flex", width: '100%' }}>
                    <div>
                        <Label>Title</Label>
                        <Field component={Input} name="title" placeholder="Write title" validate={required} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'column-reverse'}}>
                        <Field className={styles.colorInput} defaultValue="#fc1100" component="input" name="color" type="color" />
                    </div>
                </div>
                <div>
                    <Label>Note</Label>
                    <Field placeholder="Write note here" component={Textarea} name="note" wrap="soft" validate={required} />
                </div>
                <div className={styles.btnBar}>
                    <button className={styles.button} type="submit">
                        <svg className={styles.svgIcon} fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#a649da" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>
                        <span className={styles.label}>Save</span>
                    </button>

                    {props.note
                        ?
                        <button className={styles.closeButton} onClick={props.deleteNote}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                            </svg>
                        </button>
                        : <></>}
                </div>
            </FormWrapper>
        </div>
    );
}

export default reduxForm({
    form: "noteForm"
})(NewNoteForm);