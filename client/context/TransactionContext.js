import React, { useState, useEffect } from "react";
import { contractABI, contractAddress} from '../lib/constants';
import { ethers} from 'ethers';
import { client } from "../lib/sanityClient";
import { Router } from "next/router";
import { useRouter } from "next/router";


export const TransactionContext = React.createContext();


let eth

if (typeof window != 'undefined') {
    eth = window.ethereum
}

const getEthereumContract = () => {
    const Provider = new ethers.providers.web3Provider(eth)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    )

    return transactionContract
}

// This is the contextAPI
export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
    })

    const router = useRouter();

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    // Create user profile in Sanity
    useEffect(() => {
        if (!currentAccount) return;
        (async () => {
            const userDoc = {
                _type: 'users',
                _id: 'currentAccount',
                userName: 'Unnamed',
                address: currentAccount
            }

            await client.createIfNotExists(userDoc)
        })()
    }, [currentAccount])

    // This will popup the metaMask and connect the wallet
    const connectWallet = async (metamask = eth) => {
        try {
            if (!metamask) return alert('Please install metamask')
            const accounts = await metamask.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        } catch (error) {
        console.error(error)
        throw new Error('No ethereum object.')
    }
    console.log(currentAccount)
}

const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
        if (!metamask) return alert('Please install metamask')
    const accounts = await metamask.request({method: 'eth_requestAccounts'})
    if (accounts.length) {
        setCurrentAccount(accounts[0])
        console.log(currentAccount)
    }
    } catch (error) {
        console.error(error)
        throw new Error('No ethereum object.')
    }
    }

    // sending the transaction
    const sendTransaction = async (
        metamask = eth,
        connectedAccount = currentAccount
    ) => {
        try {
            if (!metamask) return alert('Please install metamask')
            const { addressTo, amount } = formData
            const transactionContract = getEthereumContract()

            const parsedAmount = ethers.utils.parseEther(amount)

            await metamask.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x7EF40',
                        value: parsedAmount._hex,
                    },
                ],
            })

            const transactionHash = await transactionContract.publishTransaction(
                addressTo,
                parsedAmount,
                `Transferring Eth ${parsedAmount} to ${addressTo}`,
                'TRANSFER'
            )

            setIsLoading(true)

            await transactionHash.wait()

            // Save Transactions to the database
            await saveTransaction(
                transactionHash.hash,
                amount,
                connectedAccount,
                addressTo
            )

            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    // Handles change on the formData
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e }))
        setFormData('')
    }

    // the function that save the transaction to the database
    const saveTransaction = async (
        txHash,
        amount,
        fromAddress = currentAccount,
        toAddress
    ) => {
        const txDoc = {
            _type: 'transactions',
            _id: txHash, 
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamp: new Date(Date.now()).toISOString(),
            txHash: txHash,
            amount: parseFloat(amount)
        }

        await client.createIfNotExists(txDoc)

        await client
            .patch(currentAccount)
            .setIfMissing({ transactionHash: [] })
            .insert('after', 'transactions[-1]', [
                {
                    _key: txHash,
                    _ref: txHash,
                    _type: 'reference',
                },
            ])
            .commit()

        return
    }

    // loading Modal
    useEffect(() => {
        if (isLoading) {
            router.push(`/?loading=${currentAccount}`)
        } else {
            router.push(`/`)
        }
    }, [isLoading])

return (
    <TransactionContext.Provider value={{currentAccount, connectWallet, sendTransaction, formData, handleChange, isLoading}}>
        {children}
    </TransactionContext.Provider>
)
}