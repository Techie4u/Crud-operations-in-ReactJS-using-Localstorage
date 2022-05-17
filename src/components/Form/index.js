import React, { Component } from "react";
import MaterialTable from "material-table";
import tableIcons from "../icons";
import moment from "moment";

import "./index.css";

class Form extends Component {
  state = {
    data: [],
    status: "",
    name: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
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
    const data = JSON.parse(localStorage.getItem("events"));
    data &&
      data.map((event) => {
        console.log(event)
        if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") >
          moment(new Date(event.endDate)).format("YYYY-MM-DD")
        ) {
          event.endDate = event.startDate;
          window.location.reload();
        } else if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") <=
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.endDate)).format("YYYY-MM-DD") >=
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.status = "Inprogress";
        } else if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.endDate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.status = "Completed";
        } else if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.endDate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.status = "Upcoming";
        }
      });
    localStorage.setItem("events", JSON.stringify(data));
  }

  submitForm = (event) => {
    event.preventDefault();

    const eventData = {
      name: this.state.name,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      status: this.state.status,
    };
    const details = JSON.parse(localStorage.getItem("events") || "[]");

    details.push(eventData);
    localStorage.setItem("events", JSON.stringify(details));
    this.componentDidMount();

    this.setState({ name: "" });
    this.setState({ startDate: "" });
    this.setState({ endDate: "" });
    this.setState({ startTime: "" });
    this.setState({ endTime: "" });

    window.location.reload();
  };
  render() {
    const eventDetails = JSON.parse(localStorage.getItem("events"));

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
          options={{ paging: true, search: true }}
          editable={{
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;

                const updatedRows = [...eventDetails];
                updatedRows.splice(index, 1);
                this.setState({
                  data: [...this.state.data, ...updatedRows],
                });

                localStorage.setItem("events", JSON.stringify(updatedRows));
                resolve();
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const data = JSON.parse(localStorage.getItem("events"));
                const index = oldRow.tableData.id;
                console.log("u", updatedRow);
                console.log("o", oldRow);
                console.log("i", index);
                const updatedRows = [...data];
                updatedRows[index] = updatedRow;
                console.log("uu", updatedRows);
                this.componentDidMount();
                localStorage.setItem("events", JSON.stringify(updatedRows));
                window.location.reload();
                resolve();
              }),
          }}
          columns={[
            { title: "Event Name", field: "name" },
            { title: "Start Time", field: "startTime" },
            { title: "End Time", field: "endTime" },
            { title: "Start Date", field: "startDate" },
            { title: "End Date", field: "endDate" },
            { title: "Status", field: "status" },
          ]}
          data={eventDetails ? eventDetails : []}
          title="Event Details"
        />
      </div>
    );
  }
}
export default Form;
