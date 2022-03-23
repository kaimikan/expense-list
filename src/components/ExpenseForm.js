import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

//const date = new Date();
const now = moment();
console.log(now.format("Do MMM, YYYY"));

export default class ExpenseForm extends React.Component {
  state = {
    description: "",
    note: "",
    amount: "",
    createdAt: moment(),
    calendarFocused: false,
    error: ""
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description
    }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({
      note
    }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    // you can check the match() regex on regex101.com
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) this.setState(() => ({ createdAt }));
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  // if i used the name onSubmit it wasn't going through (it seems to be a reserved name)
  submitForm = (e) => {
    // prevent page refresh
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount"
      }));
    } else {
      this.setState(() => ({
        error: ""
      }));
      this.props.submitFormAddEntry({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <p>
            <b>Error: </b> {this.state.error}
          </p>
        )}
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.setState.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={(/* day */) => false}
            firstDayOfWeek={1}
            displayFormat="D/MM/YYYY"
          />
          {/* created at will be done with a third-party component */}
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
