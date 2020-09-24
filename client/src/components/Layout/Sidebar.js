import React from 'react';
import styles from './Layout.module.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
    
            <ul className={styles.SidebarUl}>
                <li className={styles.SidebarLi}>
                    <Link className={styles.SidebarLink} to='/survey/all-surveys'>Surveys</Link>
                </li>
                <li className={styles.SidebarLi}>
                    <Link className={styles.SidebarLink} to='/survey/my-surveys'>My Surveys</Link>
                </li>
                <li className={styles.SidebarLi}>
                    <Link className={styles.SidebarLink} to='/survey/create-new-survey'>New Surveys</Link>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar;