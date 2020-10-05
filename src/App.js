import React, { Component } from "react";
import { ContactForm } from "./components/ContactForm";
import { ContactList } from "./components/ContactList";
import { Filter } from "./components/Filter";
import style from "./app.module.css";
import pop from "./Transition/pop.module.css";

import { CSSTransition } from "react-transition-group";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    isExist: false,
    duplicateContact: "",
  };

  handleCloseError = () => {
    this.setState({
      isExist: false,
    });
  };

  addContact = (contact) => {
    const chechedName = contact.name;
    const avaibleNames = this.state.contacts.map((contact) =>
      contact.name.toLowerCase()
    );

    if (avaibleNames.includes(chechedName.toLowerCase())) {
      this.setState({ isExist: true, duplicateContact: chechedName });
      setTimeout(
        () => this.setState({ isExist: false, duplicateContact: "" }),
        5000
      );
    } else
      this.setState({
        contacts: [...this.state.contacts, contact],
        isExist: false,
        duplicateContact: "",
      });
  };

  handleSearchInput = (event) => {
    event.preventDefault();
    this.setState({
      filter: event.target.value,
    });
  };

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  componentDidMount() {
    const actualContacts = localStorage.getItem("contacts");
    if (actualContacts) {
      const contacts = JSON.parse(actualContacts);
      this.setState({ contacts });
    }
  }

  contactFilter = () => {
    const { contacts, filter } = this.state;
    return filter
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
  };

  handleDelete = (event) => {
    const id = event.target.id;
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };
  render() {
    const { isExist, duplicateContact } = this.state;
    const filteredNames = this.contactFilter();
    return (
      <div className={style.container}>
        <div className={style.headWrapper}>
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames={style}
          >
            <h1 className={style.title}>Phonebook</h1>
          </CSSTransition>

          <CSSTransition
            in={isExist}
            timeout={250}
            classNames={style}
            unmountOnExit
          >
            <div onClick={this.handleCloseError} className={style.error}>
              {duplicateContact} already exist!
            </div>
          </CSSTransition>
        </div>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <>
          <CSSTransition
            in={this.state.contacts.length > 1}
            timeout={500}
            classNames={pop}
            unmountOnExit
          >
            <Filter onFilter={this.handleSearchInput}></Filter>
          </CSSTransition>
          <ContactList
            contacts={filteredNames}
            onDelete={this.handleDelete}
          ></ContactList>
        </>
      </div>
    );
  }
}
