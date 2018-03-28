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

    // addReminder() {
    //     this.props.addReminder(this.state.text, this.state.dueDate);
    // }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    removeReminders() {
        this.props.deleteAllReminders();
    }

    clearReminder() {
        if(this.props.reminders.length>0) {
            return (
                <button className="btn btn-danger"
                onClick={() => this.removeReminders()}
                >
                Clear Reminders
                 </button>
        )
    }
    }

    renderReminder() {
        const { reminders } = this.props;
        return (

            <ul className="list-group col-ls-4">

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
        console.log(this.props.reminders)
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
                        onClick={() => this.props.addReminder(this.state.text, this.state.dueDate)}>
                        Add Reminder
                        </button>
                    <div className="">
                        {this.renderReminder()}
                    </div>
                </div>
                {this.clearReminder()}
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