import { useEffect, useState } from "react";
import Main from "./Main";
import Login from "./Login";

const Container = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{
    console.log('LOGIN:', loggedIn)
  }, [loggedIn])

  return loggedIn ? <Main /> : <Login login={setLoggedIn}/>
};

export default Container;