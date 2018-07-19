import React, { Component } from 'react';
import Loading from './Loading/Loading.jsx';
import EventsPage from './Events/EventsPage.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axiosCalls from "../reducers/axiosStatusReducer";
import styles from '../assets/scss/index.scss';


export class App extends Component {

    loading() {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <Loading/>
                    <EventsPage/>
                </div>
            </div>
        );
    }

    content() {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.blur}>
                        <EventsPage/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.props.loading ? this.loading() : this.content();
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.axiosCalls > 0
    }
}

export default connect(mapStateToProps)(App);