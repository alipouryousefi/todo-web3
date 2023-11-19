import React, { useState, useEffect } from 'react'
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { toDoListABI, toDoListAddress } from "./constants"

const fetchContract = (signerOrProvider) => new ethers.Contract(toDoListAddress, toDoListABI)

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [error, setError] = useState("")
    const [allToDoList, setAllToDoList] = useState([])
    const [myList, setMyList] = useState([])
    const [allAddress, setAllAddress] = useState([])


    const checkIfWalletIsConnecte = async () => {
        if (!window.ethereum) return setError("Please install metamask")
        const account = await window.ethereum.request({ method: "eth_accounts" })

        if (account.length) {
            setCurrentAccount(account[0])
            console.log(account[0])
        } else {
            setError("Please install metamask & connect, reload")
        }
    }

    const connectWallet = async () => {
        if (!window.ethereum) return setError("Please install metamask")
        const account = await window.ethereum.request({ method: "eth_requestAccounts" })

        setCurrentAccount(account[0])


    }

    //interact with smart contarct
    const toDoList = async (message) => {
        try {
            const web3modal = new Web3Modal()
            const connection = await web3modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = await fetchContract(signer)

            const createList = await contract.createList(message)
            createList.wait()

            console.log(createList)
        } catch (error) {
            setError("Something wrong with creating list")
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnecte()
    }, [])
    return (
        <ToDoListContext.Provider value={{ checkIfWalletIsConnecte, connectWallet, toDoList }}>
            {children}
        </ToDoListContext.Provider>
    )
}



