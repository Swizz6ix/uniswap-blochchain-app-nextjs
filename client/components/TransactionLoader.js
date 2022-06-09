import React from 'react';
import { css } from "@emotion/react";
import { MoonLoader } from "react-spinners"

function TransactionLoader() {
  return (
    <div className={style.wrapper}>TransactionLoader
        <div className={style.title}>
            Transaction in progress ...
            <MoonLoader color={'#fff'} loading={true} css={cssOverride} size={50} />
        </div>
    </div>
  )
}

export default TransactionLoader

const style = {
    wrapper: `text-white h-96 w-72 flex flex-col justify-center items-center`,
    title: `font-semibold text-xl mb-12`,
}

const cssOverride = css`
    display: block;
    margin: 0 auto;
    border-color: white;
`