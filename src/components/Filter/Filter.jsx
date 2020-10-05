import React from "react";
import PropTypes from "prop-types";
import styles from "./filter.module.css";

const Filter = ({ onFilter }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <p>Find contacts by name</p>
      <input type="text" onChange={onFilter} name="filter"></input>
    </div>
  </div>
);

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
