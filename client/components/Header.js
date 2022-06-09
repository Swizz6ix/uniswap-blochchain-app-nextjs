import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from 'next/image';
import ethLogo from "../assets/ethLogo.png";
import { TransactionContext } from '../context/TransactionContext';

function Header() {
  const {connectWallet, currentAccount} = useContext(TransactionContext);
  const [selectedNav, setSelectedNav] = useState("swap");
  const [userName, setUserName] = useState('')
  const activeBtn = useRef(null);


  useEffect(() => {
    activeBtn.current.click()
  }, [])

  useEffect(() => {
    if (!currentAccount) return
    
    setUserName(`${currentAccount.slice(0, 7)} ...${currentAccount.slice(35)}`)
  }, [currentAccount])

  const navs = [
    {
      id: 'nav1', name: 'Swap', btnActv: activeBtn
    },
    {
      id: 'nav2', name: 'Pool'
    },
    {
      id: 'nav3', name: 'Vote'
    }
  ]


  const src = 'https://upload.wikimedia.org/wikipedia/commons/8/82/Uniswap_Logo.png';

  // const src1 = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ethereum_coin.svg"
    return (
      <div className={style.wrapper}>
        <div className={style.headerLogo}>
        <Image alt='logo' loader={() => src} src={'https://upload.wikimedia.org/wikipedia/commons/8/82/Uniswap_Logo.png'} width={40} height={40} />
        </div>

        <div className={style.nav}>
          <div className={style.navItemsContainer}>
            {navs.map((nav, index) => (
                <div key={nav.id} ref={nav.btnActv} onClick={() => setSelectedNav(nav.id)}
            className={`${style.navItem} ${selectedNav === nav.id && style.activeNavItem}`}
            >
              {nav.name}
            </div>
            ))}
            <a
            href='https://info.uniswap.org/#/'
            target='_blank'
            rel='noreferrer'
            >
              <div className={style.navItem}>
                Charts <FiArrowUpRight />
              </div>
            </a>
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <div className={`${style.button} ${style.buttonPadding}`}>
              <div className={style.buttonIconContainer}>
                <Image src={ethLogo} alt="eth logo" height={20} width={20} />
              </div>
              <p>Etherum</p>
              <div className={style.buttonIconContainer}>
                <AiOutlineDown />
              </div>
          </div>
            {currentAccount ? (
              <div className={`${style.button} ${style.buttonPadding}`}>
                <div className={style.buttonTextContainer}>
                  {userName}
                </div>
              </div>
            ) : (
              <div onClick={() => connectWallet()}
              className={`${style.button} ${style.buttonPadding}`}
              >
                <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                  Connect Wallet
                </div>
              </div>
            )}

          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={`${style.buttonIconContainer} mx-2`}>
              <HiOutlineDotsVertical />
            </div>
          </div>
        </div>

      </div>
    )
}

export default Header


const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: ` flex bg-[#191b1f] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242a]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191b1f] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: ``,
  buttonAccent: `bg-[#172a42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#a490ea]`
}