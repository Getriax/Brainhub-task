import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import styles from '../../assets/scss/index.scss';
import EventsForm from "./EventsForm.jsx";


export class EventsPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = this.initState();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    initState() {
        return {
            event: {
                firstName: '',
                lastName: '',
                email: '',
                date: new Date(Date.now())
            },
            errors: {}
        }
    }

    handleInputChange(evt) {
        let name = evt.target.name;
        let event = Object.assign({}, this.state.event);
        event[name] = evt.target.value;
        return this.setState({event})
    }

    handleSaveEvent(evt) {
        evt.preventDefault();

        if(!this.eventFormIsValid()) {
            return;
        }
        this.props.actions.saveEvent(this.state.event)
            .then(() => {
                this.setState(this.initState());
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleDateChange(date) {
        let event = Object.assign({}, this.state.event);
        event.date = date;
        return this.setState({event});
    }

    handleReset() {
        return this.setState(this.initState());
    }

    eventFormIsValid() {
        let errors = {};
        let answer = true;

        if(this.state.event.firstName === '') {
            errors.firstName = 'is required';
            answer = false;
        }

        if(this.state.event.lastName === '') {
            errors.lastName = 'is required';
            answer = false;
        }


        if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.event.email))) {
            errors.email = 'incorrect email';
            answer = false;
        }

        if(new Date(this.state.event.date) - Date.now() < 0) {
            errors.date = 'should be in the future';
            answer = false;
        }

        this.setState({errors});

        return answer;
    }


    render() {
        return (
            <div className={styles.events}>
                <EventsForm
                    event={this.state.event}
                    onSave={this.handleSaveEvent}
                    onChange={this.handleInputChange}
                    onDateChange={this.handleDateChange}
                    onReset={this.handleReset}
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

EventsPage.propTypes = {};

function mapStateToProps(state, ownProps) {
    return {
        events: state.events
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);