import { AccountCircle, LightbulbCircle } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import React from 'react';

const ChatMsg = ({ role, content, loading }) => {

  const theme = useTheme()

  const formatContent = () => {
    return content.split('\n').map((p, key) => <p key={key}>{p.split()}</p>)
  }

  const styles = {
    display: 'flex',
    columnGap: 2,
    backgroundColor: role === 'user' && theme.palette.grey[900],
    borderRadius: role === 'user' && 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 2,
    marginBottom: 2
  }

  return (
    <Box sx={{
      display: 'flex',
      columnGap: 2,
      alignItems: 'center'
    }}>
      {role === 'user' ? <AccountCircle /> : <LightbulbCircle />}
      <Typography sx={styles}>
        <Box>
          {loading ? '.......': formatContent()}
        </Box>
      </Typography>
    </Box>
  );
};

export default ChatMsg;