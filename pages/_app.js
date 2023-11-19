import { ToDoListProvider } from '@/context/ToDolistApp'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <ToDoListProvider>
    <div>
    <Component {...pageProps} />
    </div>
  </ToDoListProvider>
  )
}
