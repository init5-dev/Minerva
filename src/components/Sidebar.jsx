import { Drawer, IconButton, Divider, List, ListItem, ListItemText, ListItemButton, Typography, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

const drawerWidth = 240;

const Sidebar = ({ handler, chats }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      anchor="left"
      open={handler.open}
      variant="temporary"
      onClose={() => handler.setOpen(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Divider />
      <Stack direction="row" gap={2} alignItems='center'>
        <Typography variant="h6" sx={{ padding: 2 }}>
          Chats recientes
        </Typography>
        <IconButton 
        onClick={() => {
          handler.newChat()
          handler.setOpen(false)
        }}
        disabled={handler.loading}
        >
          <Add />
        </IconButton>
      </Stack>
      <Divider />
      <List>
        {chats && chats.map((chat) => (
          chat.title && <ListItem key={chat._id} disablePadding selected={handler.chat._id === chat._id}>
            <ListItemButton
              onClick={() => {
                handler.setChat(chat)
                handler.setOpen(false)
              }}
              disabled={handler.loading}
            >
              <ListItemText primary={chat.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer >


  );
};

export default Sidebar;