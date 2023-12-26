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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([])
  const [chat, setChat] = useState(null)
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

  const loadChats = (chatId = null) => {
    axios.get(`http://${host}:${port}/api/v1/chats/`)
      .then(response => {
        if (response.data) {
          const data = response.data
          setChats([...data])
          setChat(chatId ? data.find(chat => chat._id === chatId) : data[0])
        }
      })
  }

  const loadHistory = () => {
    setLoading(true)
    axios.get(`http://${host}:${port}/api/v1/chats/${chat._id}`)
      .then(response => {

        if (response.data) {
          const data = response.data
          const history = [...data._history]

          if (history && history.length) {
            history.splice(0, 1) // Removes instruction entry
            console.log('HISTORY:\n', JSON.stringify(history, null, 2))

            setHistory(history.map(message => ({
              role: message.role,
              content: message.parts[0].text
            })))
            setLoading(false)
          }
        }
      })
  }

  const prompt = () => {
    if (lastPrompt.length && chat) {
      console.log('CURRENT CHAT:', chat)
      axios.post(`http://${host}:${port}/api/v1/messages/send`, {
        chatId: chat._id,
        message: lastPrompt
      }).then(() => {
        loadHistory()
      })
    }
  }

  const newChat = () => {
    axios.post(`http://${host}:${port}/api/v1/chats/`, {
      title: "Nuevo chat" + new Date
    }).then(response => {

      if (response.data) {
        const chatId = response.data.chatId
        loadChats(chatId)
      }

    })
  }

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (chats.length) {
      loadHistory()
    }
  }, [chats])

  useEffect(() => {
    if (chats.length) {
      loadHistory()
    }
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
      <Sidebar handler={{ open, setOpen, setChat, newChat, chat }} chats={chats} />
      <Chat history={history} loading={loading} />
      <Prompt handler={{ lastPrompt, setLastPrompt }} />
    </ThemeProvider>
  )
}

export default App
