import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faNoteSticky, faGear } from '@fortawesome/free-solid-svg-icons'
import logo from './../../logo.svg'
import { HandySvg } from 'handy-svg';

const Icon = () => (
    <HandySvg
        src={logo}
        className={styles.icon}
        width="200"
        height="200"
    />
);

let Nav = (props) => {
    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
                <Icon />
            </div>
            <div className={styles.linkBlock}>
                <NavLink className={styles.link} to='/Tasks'>
                    <div className={styles.sign}><FontAwesomeIcon icon={faBarsProgress} /></div>
                    <p>Tasks</p>
                </NavLink>
            </div>
            <div className={styles.linkBlock} >
                <NavLink className={styles.link} to='/Notes'>
                    <div className={styles.sign}><FontAwesomeIcon icon={faNoteSticky} /></div>
                    <p>Notes</p>
                </NavLink>
            </div>
            <div className={styles.linkBlock}>
                <NavLink className={styles.link} to='/Settings'>
                    <div className={styles.sign}><FontAwesomeIcon icon={faGear} /></div>
                    <p>Settings</p>
                </NavLink>
            </div>
        </div>
    );
}

export default Nav;