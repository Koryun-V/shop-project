import React from 'react';


const RadioButton = ({ name, value, checked, onChange, label }) => {
  return (
    <div className="custom-radio-container">
      <label className={`custom-radio ${checked ? 'selected' : ''}`}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="custom-radio-input"
        />
        <span className="custom-radio-circle"></span>
        <span className="custom-radio-label">{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
