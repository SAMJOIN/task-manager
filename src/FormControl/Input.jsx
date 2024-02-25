import styles from './FormControl.module.css'


const Input = ({input, meta,placeholder,wrap}) => {
    return (
        <div>
            {meta.touched && !meta.active && ((meta.error && <span className={styles.inputErrorMessage}>{meta.error}</span>))}
            <input wrap={wrap} {...input}  placeholder={placeholder}
            className={styles.noteInput + " " + (meta.error && meta.touched ? styles.error : '')}/>
        </div>
    );
}

export default Input;