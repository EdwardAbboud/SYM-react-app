// React
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
// Component
import Button from "../../components/Button";
import Input from "../../components/Input";
// Style
import style from "./StatementForm.module.css";
import appStyle from "../../App.module.css";
// Hooks
import { getCookie } from "../../hooks/useCookie";

const StatementView = ({ statementHandler }) => {
  const statementStartInputRef = useRef();
  const statementEndInputRef = useRef();
  const [charOne, setCharOne] = useState(0);
  const [charTwo, setCharTwo] = useState(0);
  // Submit form
  const submitHandler = (e) => {
    const enteredStatementStart = statementStartInputRef.current.value;
    const enteredStatementEnd = statementEndInputRef.current.value;
    const dateNow = new Date();
    const statement = {
      userID: getCookie("userID"),
      statementStart: enteredStatementStart,
      statementEnd: enteredStatementEnd,
      fullStatement: enteredStatementStart + " " + enteredStatementEnd,
      dateCreated: dateNow,
    };
    e.preventDefault();
    statementHandler(statement);
  };
  const charCountOne = (e) => {
    setCharOne(e.target.value.length);
  };
  const charCountTwo = (e) => {
    setCharTwo(e.target.value.length);
  };

  return (
    <div className={style.createStatementPage}>
      <div className={style.glassDiv}>
        <form className={style.formClass} name="newStatement">
          <h2 className={appStyle.headerOne}>Share with the world!</h2>
          <div className={style.statementInputs}>
            <Input
              name="statementStart"
              label={`Subject (${charOne}/50)`}
              placeholder="In the morning i like to"
              type="text"
              required
              id="statementStart"
              reference={statementStartInputRef}
              ariaLabel="statementStart"
              length="50"
              onChange={charCountOne}
            />
            <Input
              name="statementEnd"
              label={`Statement (${charTwo}/50)`}
              placeholder="start by having breakfast"
              type="text"
              required
              id="statementEnd"
              reference={statementEndInputRef}
              ariaLabel="statementEnd"
              length="50"
              textArea={true}
              onChange={charCountTwo}
            />
          </div>
          <div className={style.buttonsDiv}>
            <div className={style.singleButton}>
              <Button type="submit" buttonHandler={submitHandler}>
                Post
              </Button>
            </div>
            <div className={style.singleButton}>
              <Button type="button" path="/feed" class="buttonBorder">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

StatementView.propTypes = {
  statementHandler: PropTypes.func.isRequired,
};

export default StatementView;
