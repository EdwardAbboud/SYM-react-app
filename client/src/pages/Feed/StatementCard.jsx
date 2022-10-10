import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import style from "./StatementCard.module.css";
import appStyle from "../../App.module.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import useFetch from "../../hooks/useFetch";
import { getCookie } from "../../hooks/useCookie";
import { useRef } from "react";

function StatementCard(props) {
  const votes = useRef();
  const upVotes = useRef();
  const downVotes = useRef();

  const [upButton, setUpButton] = useState("");
  const [downButton, setDownButton] = useState("");
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const totalVotes = () => {
    votes.current = upVotes.current.length - downVotes.current.length;
  };

  useEffect(() => {
    upVotes.current = props.statement.upVotes;
    downVotes.current = props.statement.downVotes;
    totalVotes();

    props.statement.upVotes.includes(getCookie("userID"))
      ? setUpButton(style.red)
      : setUpButton("");

    props.statement.downVotes.includes(getCookie("userID"))
      ? setDownButton(style.red)
      : setDownButton("");

    return cancelFetch;
  }, []);

  // const navigate = useNavigate();

  // function toDetail(e) {
  //   e.preventDefault();
  //   navigate(`/statement/view/${statement._id}`);
  // }

  // Split long single words into max length
  function splitString(str, length) {
    let words = str.split(" ");
    for (let j = 0; j < words.length; j++) {
      let l = words[j].length;
      if (l > length) {
        let result = [],
          i = 0;
        while (i < l) {
          result.push(words[j].substr(i, length));
          i += length;
        }
        words[j] = result.join(" ");
      }
    }
    return words.join(" ");
  }

  const onSuccess = (onReceived) => {
    upVotes.current = onReceived.result.upVotes;
    downVotes.current = onReceived.result.downVotes;
    totalVotes();

    upVotes.current.includes(getCookie("userID"))
      ? setUpButton(style.red)
      : setUpButton("");

    downVotes.current.includes(getCookie("userID"))
      ? setDownButton(style.red)
      : setDownButton("");
  };

  const { performFetch, cancelFetch } = useFetch(
    `/statements/${props.statement._id}`,
    onSuccess
  );

  useEffect(() => {
    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        statement: {
          userID: props.statement.userID,
          taggersID: props.statement.taggersID,
          fullStatement: props.statement.fullStatement,
          statementStart: props.statement.statementStart,
          statementEnd: props.statement.statementEnd,
          dateCreated: props.statement.dateCreated,
          upVotes: upVotes.current,
          downVotes: downVotes.current,
        },
      }),
    });
  }, [upVoted, downVoted]);

  const upHandler = () => {
    upVotes.current.includes(getCookie("userID"))
      ? (upVotes.current = upVotes.current.filter(
          (user) => user !== getCookie("userID")
        ))
      : upVotes.current.push(getCookie("userID"));

    if (downVotes.current.includes(getCookie("userID")))
      downVotes.current = downVotes.current.filter(
        (user) => user !== getCookie("userID")
      );
    upVoted ? setUpVoted(false) : setUpVoted(true);
  };

  const downHandler = () => {
    downVotes.current.includes(getCookie("userID"))
      ? (downVotes.current = downVotes.current.filter(
          (user) => user !== getCookie("userID")
        ))
      : downVotes.current.push(getCookie("userID"));

    if (upVotes.current.includes(getCookie("userID")))
      upVotes.current = upVotes.current.filter(
        (user) => user !== getCookie("userID")
      );
    downVoted ? setDownVoted(false) : setDownVoted(true);
  };

  return (
    <div className={style.statementCard}>
      <div className={style.cardContainer}>
        <div className={style.row}>
          <div className={style.column}>
            <p className={`${appStyle.boldBody} ${style.statement}`}>
              {splitString(props.statement.fullStatement, 50)}
            </p>
            <p className={`${appStyle.body} ${style.taggers}`}>
              {props.statement.taggersID.length} taggers
            </p>
          </div>
          <div className={style.voteContainer}>
            <button className={appStyle.body} onClick={upHandler}>
              <ImArrowUp className={upButton} />
            </button>
            <p className={appStyle.body}>{votes.current}</p>
            <button className={appStyle.body} onClick={downHandler}>
              <ImArrowDown className={downButton} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatementCard;

StatementCard.propTypes = {
  statement: PropTypes.object.isRequired,
};