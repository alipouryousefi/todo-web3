import { ToDoListContext } from '@/context/ToDolistApp'
import React, { useContext, useEffect } from 'react'

const Home = () => {
  const { checkIfWalletIsConnecte, toDoList } = useContext(ToDoListContext)
  useEffect(() => {
    checkIfWalletIsConnecte()
    toDoList()
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home