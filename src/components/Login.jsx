import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Login = ({ login }) => {

  const host = import.meta.env.VITE_EXPRESS_HOST
  const port = import.meta.env.VITE_EXPRESS_PORT

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tries, setTries] = useState(0)
  const [error, setError] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const checkCredentials = async () => {
    const response = await axios.post(`http://${host}:${port}/api/v1/users/login`, {
      email,
      password
    })
    const message = response.data.message
    console.log(response)
    return message === 'Logged!'
  }

  const handleClick = async () => {
    const authorized = await checkCredentials()

    if (!authorized) {
      setTries(tries + 1)
      if (tries <= 3) {
        setError(true)
      } else {
        setBlocked(true)
      }
    } else {
      console.log(authorized)
      login(true)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: { xs: '100vw', lg: '35vw' },
      ml: { xs: 0, lg: '30vw' },
      height: '30vw',
      mt: { xs: '30vh', lg: '15vh' }
    }}>
      <img src="../../public/logo.png" width='80px' />
      <br />
      <br />
      {
        !blocked ?
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
            <Typography variant="subtitle2"  align="center">
              Do you want to try the application? Request access credentials from the developer: <Link href="mailto:nelson.ochagavia@gmail.com">nelson.ochagavia@gmail.com</Link>
            </Typography>
            {
              error && <Box><p color="error">Incorrect credentials</p></Box>
            }
          </Stack>
          : <Box sx={{ height: '5vh', mt: '45vh' }}>
            <Typography variant="h5" color="error">Too many tries!</Typography>
            <Typography variant="body1" align="center">Please, try later</Typography>
          </Box>
      }
    </Box>
  )
};

export default Login;