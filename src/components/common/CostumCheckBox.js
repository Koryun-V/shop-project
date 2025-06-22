import React from 'react';
import {ReactComponent as CheckIcon} from "../../assets/icon/check-solid.svg";

const CustomCheckbox = ({checked, onChange, value,}) => {

  return (
    <div className="custom__checkbox">
      <input
        type="checkbox"
        id={value}
        checked={checked}
        onChange={onChange}
        value={value}
        className="custom__checkbox__input"
      />

      <label htmlFor={value} className="custom__checkbox__label">
        <span
          className={"custom__checkbox__checkmark"}
        >

         {checked && <CheckIcon className={"custom__checkbox__icon"}

         />}

        </span>
      </label>
    </div>
  );
};


export default CustomCheckbox;
