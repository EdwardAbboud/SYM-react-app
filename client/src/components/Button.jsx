import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Style
import style from "./Button.module.css";

export default function Button(props) {
  let buttonClass;

  switch (props.class) {
    case "buttonBorder":
      buttonClass = style.buttonBorder;
      break;
    case "buttonDisabled":
      buttonClass = style.buttonDisabled;
      break;
    case "":
      buttonClass = style.button;
      break;
    default:
      buttonClass = style.button;
  }

  if (props.path) {
    return (
      <div className={style.linkContainer}>
        <Link to={props.path} className={style.buttonLink}>
          <button
            className={buttonClass}
            onClick={props.buttonHandler}
            disabled={props.disabled}
            {...props.rest}
          >
            {props.children}
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={style.linkContainer}>
        <button
          className={buttonClass}
          onClick={props.buttonHandler}
          disabled={props.disabled}
          {...props.rest}
        >
          {props.children}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  path: PropTypes.string,
  buttonHandler: PropTypes.func,

  buttonClass: PropTypes.string,
  rest: PropTypes.object,

  children: PropTypes.node.isRequired,
  class: PropTypes.string,
  disabled: PropTypes.bool,
};
