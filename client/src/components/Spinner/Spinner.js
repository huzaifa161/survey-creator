import React from 'react';
import styles from './Spinner.module.css';


const Spinner = () => {
    return (
        <div className={styles.Spinner}>
            <div className={styles.SpinnerChild1}></div>   
            <div className={styles.SpinnerChild2}></div>   
        </div>
    )
}

export default Spinner;