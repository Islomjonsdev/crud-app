import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Main from './components/Main/Main'

function App() {
  return (
    <>
      <ToastContainer />
      <Main />
    </>
  )
}

export default App
