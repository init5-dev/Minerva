import { Drawer, IconButton, Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Typography, Stack } from "@mui/material";
import { Inbox as InboxIcon, Mail as MailIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Add } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ handler, chats }) => {
  const theme = useTheme();

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
        <IconButton onClick={() => {
          handler.newChat()
        }}>
          <Add />
        </IconButton>
      </Stack>
      <Divider />
      <List>
        {chats && chats.map((chat) => (
          chat.title && <ListItem key={chat._id} disablePadding selected={handler.chat._id === chat._id}>
            <ListItemButton onClick={() => { handler.setChat(chat) }}>
              <ListItemText primary={chat.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>


  );
};

export default Sidebar;