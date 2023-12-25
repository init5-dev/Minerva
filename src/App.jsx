import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ApplicationBar from "./components/ApplicationBar"
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
import Chat from "./components/Chat";
import axios from "axios";
import Prompt from "./components/Prompt";

const host = import.meta.env.VITE_EXPRESS_HOST
const port = import.meta.env.VITE_EXPRESS_PORT
const chatId = "6589d1a742b36bc4362ea7dd"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('')
  const [history, setHistory] = useState([
    {
      role: 'user',
      content: 'Hola!'
    },
    {
      role: 'model',
      content: 'Hola! En qué puedo ayudarte'
    }
  ])
  const [loading, setLoading] = useState(false)

  const loadChats = () => {
    setLoading(true)
    axios.get(`http://${host}:${port}/api/v1/chats/${chatId}`)
      .then(response => {
        const data = response.data
        setHistory(data._history.map(message => ({
          role: message.role,
          content: message.parts[0].text
        })))
        setLoading(false)
      })
  }

  const prompt = () => {
    if (lastPrompt.length) {
      axios.post(`http://${host}:${port}/api/v1/messages/send`, {
        chatId: chatId,
        message: lastPrompt
      }).then(response => {
        loadChats()
      })
    }
  }

  useEffect(() => {
    const chatId = '6589d1a742b36bc4362ea7dd'
    loadChats()
  }, [])

  useEffect(() => {
    const historyUpdated = [...history]
    historyUpdated.push({ role: 'user', content: lastPrompt }, { role: 'model', content: '' })
    setHistory([...historyUpdated])

    console.log(JSON.stringify(history))
    
    prompt()
  }, [lastPrompt])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApplicationBar drawerState={{ open, setOpen }} />
      <Sidebar drawerState={{ open, setOpen }} />
      <Chat history={history} loading={loading} />
      <Prompt handler={{ lastPrompt, setLastPrompt }} />
    </ThemeProvider>
  )
}

export default App
