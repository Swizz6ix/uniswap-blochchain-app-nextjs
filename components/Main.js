import React from 'react';
import Image from 'next/image';
import { RiSettings3Fill } from 'react-icons/ri'
import { AiOutlineDown } from 'react-icons/ai'
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import TransactionLoader from "../components/TransactionLoader"

Modal.setAppElement('#__next')

function Main() {
    const {formData, handleChange, sendTransaction} = useContext(TransactionContext);

    const router = useRouter();

    const handleSumbit = async (e) => {
        const { addressTo, amount } = formData
        e.preventDefault()

        if (!addressTo || !amount ) return

        sendTransaction();
    }

    const src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg';


  return (
    <div>
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.formHeader}>
                    <div>Swap</div>
                    <div>
                        <RiSettings3Fill />
                    </div>
                </div>
                <div className={style.transferPropContainer}>
                    <input
                    className={style.transferPropInput}
                    type='text'
                    placeholder='0.0'
                    pattern='^[0-9]*[.,]?[0-9]*$'
                    onChange={(e) => handleChange(e, "amount")}
                    />
                    <div className={style.currencySelector}>
                        <div className={style.currencySelectorContent}>
                            <div className={style.currencySelectorIcon}>
                                 <Image loader={() => src} src={src} alt='eth logo' height={20} width={20} /> *
                            </div>
                            <div className={style.currencySelectorTicker}>
                                Eth
                            </div>
                            <AiOutlineDown className={style.currencySelectorArrow} />

                        </div>

                    </div>
                </div>

                <div className={style.transferPropContainer}>
                    <input
                    className={style.transferPropInput}
                    placeholder='0x...'
                    type='text'
                    onChange={(e) => handleChange(0, 'addressTo')}
                    />
                    <div className={style.currencySelector}></div>
                </div>
                <div onClick={(e) => handleSumbit(e)} className={style.comfirmButton}>
                    Comfirm
                </div>
            </div>
        </div>
        <Modal isOpen={ !!router.query.loading} style={customStyles}>
            <TransactionLoader />
        </Modal>
    </div>
  )
}

export default Main

const style = {
    wrapper: 'w-screen flex items-center justify-center mt-14',
    content: `bg-[#191b1f] w-[40rem] rounded-2xl p-4`,
    formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
    transferPropContainer: `bg-[#20242a] my-3 rounded-2xl p-6 text-3xl border border-[#20242a] hover:border-[#41444f] flex justify-between`,
    transferPropInput: `bg-transparent placeholder:text-[#b2b9d2] outline-none mb-6 w-full text-2xl`,
    currencySelector: `flex w-1/4`,
    currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2d2f36] hover:bg-[#41444f] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
    currencySelectorIcon: `flex items-center`,
    currencySelectorTicker: `mx-2`,
    currencySelectorArrow: `text-lg`,
    comfirmButton: `bg-[#2172e5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172e5] hover:border-[#234169]`
}


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#0a0b0d',
        padding: 0,
        border: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(10, 11, 13, 0.75)',
    },
}