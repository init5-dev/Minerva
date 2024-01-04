import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Login = async ({ login }) => {

  const host = import.meta.env.VITE_EXPRESS_HOST
  const port = import.meta.env.VITE_EXPRESS_PORT

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tries, setTries] = useState(0)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const checkCredentials = async () => {
    const response = await axios(`http://${host}:${port}/api/v1/users/login`)
    const user = response.data
    return false
  }

  const handleClick = () => {
    const authorized = checkCredentials()

    if (!authorized) {
      setTries(tries + 1)
      if (tries <= 3) {
        setError(true)
      } else {
        setBlocked(true)
      }
    } else {
      login(true)
    }
  }

  return !blocked ?
    <Stack direction='column' gap={1}>
      <TextField
        margin="dense"
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <Button onClick={handleClick}>Log in!</Button>
      {
        error && <Box><p color="error">Incorrect credentials</p></Box>
      }
    </Stack>
    : <Box>Too many tries!</Box>
};

export default Login;