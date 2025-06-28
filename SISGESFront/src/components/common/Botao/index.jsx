import React from 'react';
import PropTypes from "prop-types";
import './Button.css'; // Assuming you have a CSS file for styling

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false, 
  className = '' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;