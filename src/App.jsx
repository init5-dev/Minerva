import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ApplicationBar from "./components/ApplicationBar"
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import axios from "axios";
import Prompt from "./components/Prompt";
import AlertDialog from "./components/Alert";

const host = import.meta.env.VITE_EXPRESS_HOST
const port = import.meta.env.VITE_EXPRESS_PORT

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState({
    title: '',
    message: ''
  });

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

  const handleError = (title, message) => {
    setLoading(false)
    setHistory([])
    setAlertOpen(true)
    setAlert({
      title,
      message
    })
  }

  const loadChats = (chatId = null) => {
    setLoading(true)
    axios.get(`http://${host}:${port}/api/v1/chats/`)
      .then(response => {
        if (response.data) {
          const data = response.data
          setChats([...data])
          setChat(chatId ? data.find(chat => chat._id === chatId) : data[0])
        }
        setLoading(false)
      })
      .catch(error => {
        console.log('ERROR ON LOAD CHATS: ', error.message)
        handleError('Error', '¡Lo siento! Hubo un problema al cargar los chats')
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

            setHistory(history.map(message => ({
              role: message.role,
              content: message.parts[0].text
            })))
            setLoading(false)
          }
        }
      })
      .catch(error => {
        if (!alertOpen) {
          console.log('ERROR ON LOAD MESSAGES: ', error.message)
          handleError('Error', '¡Lo siento! Hubo un problema al cargar los mensajes')
        }
      })
  }

  const prompt = () => {
    if (lastPrompt.length && chat) {
      axios.post(`http://${host}:${port}/api/v1/messages/send`, {
        chatId: chat._id,
        message: lastPrompt
      }).then(() => {
        return loadHistory()
      }).catch(error => {
        if (!alertOpen) {
          console.log('ERROR ON LOAD MESSAGES: ', error.message)
          handleError('Error', '¡Lo siento! Hubo un problema al cargar los mensajes')
        }
      })
    }
  }

  const newChat = () => {
    axios.post(`http://${host}:${port}/api/v1/chats/`, {
      title: "Nuevo chat" + new Date
    }).then(response => {

      if (response.data) {
        const chatId = response.data.chatId
        return loadChats(chatId)
      }

    }).catch(error => {
      if (!alertOpen) {
        console.log('ERROR ON LOAD CHATS: ', error.message)
        handleError('Error', '¡Lo siento! Hubo un problema al cargar los chats')
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
      <ApplicationBar drawerState={{ open: sidebarOpen, setOpen: setSidebarOpen }} />
      <Sidebar handler={{ open: sidebarOpen, setOpen: setSidebarOpen, setChat, newChat, chat }} chats={chats} />
      <Chat history={history} />
      <Prompt handler={{ lastPrompt, setLastPrompt, loading }} />
      {alertOpen && <AlertDialog title={alert.title} message={alert.message} open={alertOpen} setOpen={setAlertOpen} />}
    </ThemeProvider>
  )
}

export default App
