import React, {Component} from 'react';
import styles from '../../assets/scss/index.scss';

class Loading extends Component {

    render() {
        return (
            <div className={styles.loader}>
                <h1>Loading...</h1>
            </div>
        );
    }
}

export default Loading;