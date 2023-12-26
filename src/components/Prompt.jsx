import { Send } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from 'react';

const Prompt = ({ handler }) => {
  const [prompt, setPrompt] = useState('')
  const [ready, setReady] = useState(false)
  const { setLastPrompt } = handler

  const handleChange = (e) => {
    if (e.target.value.trim().length) {
      setReady(true)
      setPrompt(e.target.value)
    } else {
      setReady(false)
    }
  }

  const send = () => {
    setLastPrompt(prompt.trim())
    setPrompt('')
    setReady(false)
  }

  return (
    <Stack direction='row' gap={2} width='100vw'>
      <TextField
        sx={{ width: '95vw' }}
        value={prompt}
        onChange={handleChange}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            send()
          }
        }}
      />
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        disabled={!ready}
        onClick={send}
      >
        <Send />
      </IconButton>
    </Stack>
  );
};

export default Prompt;