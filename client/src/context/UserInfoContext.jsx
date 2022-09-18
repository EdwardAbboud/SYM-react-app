import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const UserInfoContext = createContext({
  email: "",
  setEmail: () => {},
  username: "",
  setUsername: () => {},
  StatementsOfUser: {},
  setStatementsOfUser: () => {},
  token: "",
  setToken: () => {},
  userID: "",
  setUserID: () => {},
});

export function UserInfoContextProvider(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [StatementsOfUser, setStatementsOfUser] = useState({});
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");

  const context = {
    email,
    setEmail,
    username,
    setUsername,
    StatementsOfUser,
    setStatementsOfUser,
    token,
    setToken,
    userID,
    setUserID,
  };

  return (
    <UserInfoContext.Provider value={context}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

UserInfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoContext;