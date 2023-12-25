import { Send } from "@mui/icons-material";
import { IconButton, Input, Stack } from "@mui/material";
import React, { useState } from 'react';

const Prompt = ({ handler }) => {
  const [prompt, setPrompt] = useState('')
  const { lastPrompt, setLastPrompt } = handler

  return (
    <Stack direction='row' gap={2} width='100vw'>
      <Input sx={{ width: '95vw' }} value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} />
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