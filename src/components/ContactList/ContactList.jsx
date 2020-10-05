import React from "react";
import PropTypes from "prop-types";
import styles from "./contactlist.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ContactList = ({ contacts, onDelete }) => (
  <TransitionGroup component="ul" className={styles.list}>
    {contacts.map(({ id, name, number }) => (
      <CSSTransition key={id} timeout={250} classNames={styles}>
        <li>
          <div className={styles.wrapper}>
            <span className={styles.telName}>{name}</span>
            <span className={styles.telNumber}>{number}</span>

            <button className={styles.closeBtn} id={id} onClick={onDelete}>
              &times;
            </button>
          </div>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
