import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/scss/index.scss';


class InputText extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className={styles.inputWrapper}>
                <label htmlFor={this.props.name} className={styles.info}>{this.props.label}</label>
                    <input
                        type="text"
                        name={this.props.name}
                        className={this.props.error ? styles.inputError : ''}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}/>
                {this.props.error && <label htmlFor={this.props.name} className={styles.error}>{this.props.label.split('*')[0]}: {this.props.error}</label>}
            </div>
        );
    }
}

InputText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string
};


export default InputText;