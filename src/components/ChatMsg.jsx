import { AccountCircle, LightbulbCircle } from "@mui/icons-material";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const Avatar = ({ role }) => {
  return <Box marginTop={3}>
    {role === 'user' ? <AccountCircle /> : role === 'model' ? <LightbulbCircle /> : <CircularProgress size={24} />}
  </Box>
}

const ChatMsg = ({ role, content }) => {

  const theme = useTheme()

  const styles = {
    columnGap: 2,
    backgroundColor: role === 'user' && theme.palette.grey[900],
    borderRadius: role === 'user' && 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1,
    paddingBottom: 1,
    marginBottom: 1
  }

  return (
    <Box sx={{
      display: 'flex',
      columnGap: 2
    }}>
      <Avatar role={role} />
      <Box sx={styles}>
        <Markdown rehypePlugins={[rehypeHighlight]}>{content}</Markdown>
      </Box>
    </Box>
  );
};

export default ChatMsg;