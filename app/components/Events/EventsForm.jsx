import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputText from "../Commons/InputText.jsx";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styles from '../../assets/scss/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const modifiersStyles = {
    highlight: {
        color: 'white',
        backgroundColor: '#ffc107',
    }
};

class EventsForm extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <form>
                <div className={styles.calendar}>
                    <DayPicker
                        name="date"
                        onDayClick={this.props.onDateChange}
                        modifiers={{
                            highlight: this.props.event.date
                        }}
                        modifiersStyles={modifiersStyles}
                    />
                    {this.props.errors['date'] && <label htmlFor="date">Date: {this.props.errors['date']}</label>}
                </div>
                <InputText
                    name="firstName"
                    label="First Name*"
                    value={this.props.event.firstName}
                    onChange={this.props.onChange}
                    error={this.props.errors['firstName']}
                />

                <InputText
                    name="lastName"
                    label="Last Name*"
                    value={this.props.event.lastName}
                    onChange={this.props.onChange}
                    error={this.props.errors['lastName']}
                />

                <InputText
                    name="email"
                    label="Email*"
                    value={this.props.event.email}
                    onChange={this.props.onChange}
                    error={this.props.errors['email']}

                />
                <div className={styles.actionsWrapper}>
                    <div className={styles.actions}>
                        <FontAwesomeIcon
                            icon="check-circle"
                            className={styles.submit}
                            onClick={this.props.onSave}
                        />
                        <FontAwesomeIcon
                            icon="ban"
                            className={styles.ban}
                            onClick={this.props.onReset}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

EventsForm.propTypes = {
    event: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default EventsForm;