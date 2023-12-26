import { Box, Typography, styled } from "@mui/material";
import ChatMsg from "./ChatMsg";
import { useEffect } from "react";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    height: '80vh',
    overflowX: 'hidden',
    overflowY: 'auto'
  }),
);

const Chat = ({ history, loading }) => {

  useEffect(() => {
    const mainEl = document.getElementById('main-div')
    mainEl.scrollTo(0, mainEl.scrollHeight)
  }, [history])

  return (
    <Main id='main-div' open={open}>
      {history && history.map((message, key) =>
        <ChatMsg key={key} role={message.role} content={message.content} />
      )}
    </Main>
  );
};

export default Chat;
