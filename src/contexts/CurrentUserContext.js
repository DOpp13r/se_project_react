import React from "react";

const CurrentUserContext = React.createContext({
  user: {
    name: "",
    avatar: "",
    email: "",
    _id: "",
  },
});

export { CurrentUserContext };
