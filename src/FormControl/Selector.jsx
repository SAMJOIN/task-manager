import styles from './FormControl.module.css'

const Selector = ({ input, meta, placeholder, wrap }) => {
    return (
        <div>
            {meta.touched && !meta.active && ((meta.error && <span className={styles.selectorErrorMessage} >{meta.error}</span>))}
            <select wrap={wrap} {...input} placeholder={placeholder}
                className={styles.selector + " " + (meta.error && meta.touched ? styles.error : '')}>
                <option selected style={{ display: "none" }}></option>
                <option value={'urgentImportant'}>Срочное важное</option>
                <option value={'notUrgentImportant'}>Несрочное важное</option>
                <option value={'urgentNotImportant'}>Срочное неважное</option>
                <option value={'notUrgentNotImportant'}>Несрочное неважное</option>
            </select>
        </div>
    );
}

export default Selector;