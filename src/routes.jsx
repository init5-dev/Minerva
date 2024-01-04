import { createBrowserRouter } from "react-router-dom";
import ConfDialog from "./components/ConfDialog";
import Container from "./components/Container";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />
  },
  {
    path: '/settings',
    element: <ConfDialog />
  }
])

export default router