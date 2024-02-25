import styles from './FormControl.module.css'


const Textarea = ({input, meta,placeholder,wrap}) => {
    debugger;
    return (
        <div>
            {meta.touched && !meta.active && ((meta.error && <span className={styles.errorMessage}>{meta.error}</span>))}
            <textarea wrap={wrap} {...input}  placeholder={placeholder}
            className={styles.taskInput + " " + (meta.error && meta.touched ? styles.error : '')}/>
        </div>
    );
}

export default Textarea;