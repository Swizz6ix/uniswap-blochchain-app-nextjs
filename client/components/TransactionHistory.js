import React, { useEffect, useState, useContext } from "react";
import { client } from '../lib/sanityClient';
import { TransactionContext } from '../context/TransactionContext';
import Image from "next/image";
import { FiArrowUpRight } from 'react-icons/fi';

function TransactionHistory() {
    const { isLoading, currentAccount } = useContext(TransactionContext)
    const [transactionHistroy, setTransactionHistroy] = useState([])

    useEffect(() => {
        ;(async () => {
            if (!isLoading && currentAccount) {
                const query = `*[_type=="user" && _id == "${currentAccount}"] {
                    "transactionList": transactions[] = {amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..4]
                }`

                const clientRes = await client.fetch(query)

                setTransactionHistroy(clientRes[0].transactionList)
            }
        })()
    }, [isLoading, currentAccount])

    const src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg';


  return (
    <div className={style.wrapper}>TransactionHistory
    <div>
        {transactionHistroy && transactionHistroy?.map((transaction, index) => (
            <div className={style.txHistoryItem} key={index}>
                <div className={style.txDetails}>
                    <Image loader={() => src}  src={src} alt="Eth Logo" height={20} width={15} />
                    {transaction.amount} = sent to(' ')
                    <span className={style.toAddress}>
                        {transaction.toAddress.substring(0, 6)}...
                    </span>
                </div>{' '}
                on{' '}
                <div className="style.txTimestamp">
                    {new Date(transaction.timestamp).toLocaleString('en-US', {
                        timeZone: 'PST',
                        hour12: true,
                        timeStyle: 'short',
                        dateStyle: 'long',
                    })}
                </div>
                <div className={style.etherscanLink}>
                        <a
                        href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                        target='_blank'
                        rel="noreferrer"
                        className={style.etherscanLink}
                        >
                            View on etherscan
                            <FiArrowUpRight />
                        </a>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default TransactionHistory


const style = {
    wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll scrollbar-hide px-8`,
    txHistoryItem: `bg-[#191a1e] round-lg px-4 py-2 my-2 flex items-center justify-end`,
    txDetails: `flex items-center`,
    toAddress: `text-[#f48706] mx-2`,
    txTimestamp: `mx-2`,
    etherscanLink: `flex items-center text-[#21272e5]`,
}