import styles from './FormControl.module.css'
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';

const renderDateTimePicker = ({ input: { onChange, value } }) =>
    <DateTimePicker
        onChange={onChange}
        format="dd-MM-y"
        time={false}
        clearIcon={false}
        disableClock={true}
        value={!value ? null : new Date(value)}
        className={styles.dataTimePicker}
    />

export default renderDateTimePicker;