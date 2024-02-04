// CustomRadioCard.js

import React, { useState } from 'react';
import styles from '@/styles/home/home.module.css';

const InvestCalculatorRadioButton = ({ label, value, checked, onChange }) => {
  return (
    <label className={`${styles.radioCard} ${checked ? styles.checked : ''}`}>
      <input
        type="radio"
        name="radioOptions"
        value={value}
        className={styles.radioButton}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default InvestCalculatorRadioButton;
