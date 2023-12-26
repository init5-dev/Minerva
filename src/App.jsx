import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ApplicationBar from "./components/ApplicationBar"
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import axios from "axios";
import Prompt from "./components/Prompt";

const host = import.meta.env.VITE_EXPRESS_HOST
const port = import.meta.env.VITE_EXPRESS_PORT
const chatId = "658a3646b22d89c21851fc78"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([])
  const [chat, setChat] = useState('')
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
    axios.get(`http://${host}:${port}/api/v1/chats/`)
      .then(response => {
        const data = response.data
        setChats(data)
        setChat(data[0])
      })
  }

  const loadHistory = () => {
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
      }).then(() => {
        loadHistory()
      })
    }
  }

  const newChat = () => {
    axios.post(`http://${host}:${port}/api/v1/chats/`, {
      title: ""
    })
  }

  useEffect(() => {
    loadChats()
    loadHistory()
  }, [])

  useEffect(() => {
    console.log(chat._id)
  }, [chat])

  useEffect(() => {
    let historyUpdated = [...history]
    historyUpdated.push({ role: 'user', content: lastPrompt }, { role: '', content: '' })
    setHistory([...historyUpdated])

    prompt()
  }, [lastPrompt])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApplicationBar drawerState={{ open, setOpen }} />
      <Sidebar handler={{ open, setOpen, setChat, newChat }} chats={chats} />
      <Chat history={history} loading={loading} />
      <Prompt handler={{ lastPrompt, setLastPrompt }} />
    </ThemeProvider>
  )
}

export default App
