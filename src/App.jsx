import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addReminder, deleteReminder } from './actions/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',

        }
    }
    addReminder() {
        this.props.addReminder(this.state.text);
    }

    deleteReminder(id) {
        this.props.deleteReminder(this.state.id);
    }

    renderReminder() {
        const { reminders } = this.props;
        return (

            <ul className="list-group col-sm-4">

                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id}
                                className="list-group-item "
                            >
                                <div className="list-item"> {reminder.text} </div>
                                <div className="list-item delete-button"
                                        
                                    onClick={() => this.deleteReminder(reminder.id)}
                                >
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="App">
                <div className="title">
                    Reminder Application
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input type="text" className="form-control"
                            placeholder="Things to do..."
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                    </div>
                    <button className="btn btn-success"
                        type="button"
                        onClick={() => this.addReminder()}
                    >
                        Add Reminder
                    </button>
                    {this.renderReminder()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder })(App);