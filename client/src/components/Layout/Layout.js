import React from 'react';
import styles from './Layout.module.css';
import Header from './Header';
import Sidebar from './Sidebar';
const Layout = ({ children, showSidebar }) => {
    return (
        <div className={styles.Layout}>
            <Header />
            <div className={styles.Container}>
                { showSidebar && <Sidebar />}
                <div className={styles.ContainerMain}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;