import React, { Component } from "react";
import styles from "./contactform.module.css";

const shortId = require("shortid");

export default class App extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeNumber = (event) => {
    this.setState({
      number: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.props.onSubmit({
      id: shortId.generate(),
      name: this.state.name,
      number: this.state.number,
    });
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    return (
      <div>
        <div className={styles.border}>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <h3>Name</h3>
            <input
              className={styles.input}
              type="text"
              onChange={this.handleChangeName}
              value={this.state.name}
            ></input>
            <h3>Number</h3>
            <input
              className={styles.input}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
              placeholder="000-00-00"
              type="tel"
              onChange={this.handleChangeNumber}
              value={this.state.number}
            ></input>
            {/* <small>Format : 000-00-00</small> */}
            <br />
            <button
              className={styles.button}
              type="submit"
              disabled={
                this.state.name === "" || this.state.number === ""
                  ? true
                  : false
              }
            >
              {" "}
              Add contact
            </button>
          </form>
        </div>
      </div>
    );
  }
}
