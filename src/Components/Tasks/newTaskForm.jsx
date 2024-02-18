import { Field, initialize, reduxForm } from "redux-form"
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useEffect } from "react";
import styles from './newTaskForm.module.css';

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


const renderDateTimePicker = ({ input: { onChange, value } }) =>
    <DateTimePicker
        onChange={onChange}
        format="dd-MM-y"
        time={false}
        clearIcon={false}
        disableClock={true}
        value={!value ? null : new Date(value)}
    />

let NewTaskForm = (props) => {

    // Инициализируем пропсы, чтобы прокинуть их в форму
    useEffect(() => {
        props.initialize(
            {
                task: props.task,
                deadline: props.deadline,
                tasksType: props.tasksType
            })
    }, [])

    return (
        <div>
            <Mount onClick={props.closeForm} />
            <FormWrapper onSubmit={props.handleSubmit}>
                <div>
                    <Label>Type</Label>
                    <Field component="select" name="tasksType" placeholder="Choose type">
                        <option selected style={{ display: "none" }}></option>
                        <option value={'urgentImportant'}>Срочное важное</option>
                        <option value={'notUrgentImportant'}>Несрочное важное</option>
                        <option value={'urgentNotImportant'}>Срочное неважное</option>
                        <option value={'notUrgentNotImportant'}>Несрочное неважное</option>
                    </Field>
                </div>
                <div>
                    <Label>Task</Label>
                    <Field placeholder="Write task here" component="input" type="text" name="task" />
                </div>
                <div>
                    <Label>Deadline</Label>
                    <Field name="deadline" component={renderDateTimePicker} />
                </div>
                <button type="submit">Save</button>
                {props.task ? <button className={styles.closeButton} onClick={props.deleteTask}>
                    <svg viewBox="0 0 448 512" class={styles.svgIcon}><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                </button> : <></>}
            </FormWrapper>
        </div>
    );
}

export default reduxForm({
    form: "taskForm"
})(NewTaskForm);