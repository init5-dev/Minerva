import { Send } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from 'react';

const Prompt = ({ handler }) => {
  const [prompt, setPrompt] = useState('')
  const { setLastPrompt } = handler

  const send = (e) => {
    setPrompt(e.target.value)
  }

  return (
    <Stack direction='row' gap={2} width='100vw'>
      <TextField multiline sx={{ width: '95vw' }} value={prompt} onChange={send}/>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={() => {
          setLastPrompt(prompt)
          setPrompt('')
        }}
      >
        <Send />
      </IconButton>
    </Stack>
  );
};

export default Prompt;