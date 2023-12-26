import { Send } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from 'react';

const Prompt = ({ handler }) => {
  const [prompt, setPrompt] = useState('')
  const [ready, setReady] = useState(false)
  const { setLastPrompt } = handler

  const handleChange = (e) => {
    const value = e.target.value

    setReady(value.trim().length && !handler.loading)
    setPrompt(value)
  }

  const send = () => {
    if (!handler.loading) {
      setLastPrompt(prompt.trim())
      setPrompt('')
      setReady(false)
    }
  }

  return (
    <Stack direction='row' gap={2} width='100vw' p={1}>
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