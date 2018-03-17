import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addReminder, deleteReminder, deleteAllReminders } from './actions/index';
import moment from 'moment';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    removeReminders() {
        this.props.deleteAllReminders();
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
                                <div className="list-item">
                                    <div> {reminder.text}</div>
                                    <div> {moment(new Date(reminder.dueDate)).fromNow()}</div>
                                </div>
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
                        <input type="date" className="form-control"
                            onChange={event => this.setState({ dueDate: event.target.value })}
                        />
                    </div>
                        <button className="btn btn-success"
                            type="button"
                             onClick={() => this.addReminder()}>
                            Add Reminder
                        </button>
                    {this.renderReminder()}
                </div>
                <button className="btn btn-danger"
                    onClick={() => this.removeReminders()}
                >
                    Clear Reminders
                 </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}



export default connect(mapStateToProps, { addReminder, deleteReminder, deleteAllReminders })(App);