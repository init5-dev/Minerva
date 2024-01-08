import { useState } from "react";
import Main from "./Main";
import Login from "./Login";

const Container = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  return loggedIn ? <Main /> : <Login login={setLoggedIn}/>
};

export default Container;