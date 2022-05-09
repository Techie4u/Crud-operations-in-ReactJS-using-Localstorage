import React, { Component } from "react";
import MaterialTable from "material-table";
import tableIcons from "../icons";

import "./index.css";

class Form extends Component {
  state = {
    data: [],
  };
  onChangeEventName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeStartTime = (event) => {
    this.setState({ startTime: event.target.value });
  };
  onChangeEndTime = (event) => {
    this.setState({ endTime: event.target.value });
  };
  onChangeStartDate = (event) => {
    this.setState({ startDate: event.target.value });
  };
  onChangeEndDate = (event) => {
    this.setState({ endDate: event.target.value });
  };
  componentDidMount() {
    const details = JSON.parse(localStorage.getItem("details") || "[]");

    this.setState({ details: details });
  }
  submitForm = (event) => {
    event.preventDefault();
    const { name, startTime, endTime, startDate, endDate } = this.state;
    const details = JSON.parse(localStorage.getItem("details") || "[]");
    const data = {
      name: name,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
    };
    details.push(data);
    localStorage.setItem("details", JSON.stringify(details));
    this.componentDidMount();
    this.setState(details);
  };

  render() {
    const eventDetails = JSON.parse(localStorage.getItem("details"));

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">
            <label className="input-label" htmlFor="name">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              className="input-field"
              onChange={this.onChangeEventName}
            />
            <label className="input-label" htmlFor="startTime">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              className="input-field"
              onChange={this.onChangeStartTime}
            />
            <label className="input-label" htmlFor="endTime">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              className="input-field"
              onChange={this.onChangeEndTime}
            />
            <label className="input-label" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="input-field"
              onChange={this.onChangeStartDate}
            />
            <label className="input-label" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="input-field"
              onChange={this.onChangeEndDate}
            />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
        <MaterialTable
          icons={tableIcons}
          editable={{
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                console.log(index);
                const updatedRows = [...eventDetails];
                updatedRows.splice(index, 1);
                this.setState({
                  data: [...this.state.data, ...updatedRows],
                });
                localStorage.setItem("details", JSON.stringify(updatedRows));
                resolve();
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.id;
                console.log(index);
                const updatedRows = [...eventDetails];
                updatedRows[index] = updatedRow;
                console.log(updatedRows);
                this.setState({
                  data: [...this.state.data, ...updatedRows],
                });
                localStorage.setItem("details", JSON.stringify(updatedRows));
                resolve();
              }),
          }}
          columns={[
            { title: "Event Name", field: "name" },
            { title: "Start Time", field: "startTime" },
            { title: "End Time", field: "endTime" },
            { title: "Start Date", field: "startDate" },
            { title: "End Date", field: "endDate" },
          ]}
          data={eventDetails ? eventDetails : []}
          title="Demo Title"
        />
      </div>
    );
  }
}
export default Form;
