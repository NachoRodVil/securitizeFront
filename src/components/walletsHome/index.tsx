import React, { useEffect, useState } from 'react';
import { ExchangeRate, Wallet } from './utils/types';
import { fetchER, fetchWallets } from './utils/utils';
import Spinner from 'react-bootstrap/Spinner'
import WalletsBody from './walletsBody';

function WalletsHome() {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const getWalletsAndER = async () => {
        setLoading(true)
        const resultsWallets = await fetchWallets()
        setWallets(resultsWallets)
        const resultsER = await fetchER()
        setExchangeRates(resultsER)
        setLoading(false)
    }

    const reFetchER = async ()=>{
        setLoading(true)
        const resultsER = await fetchER()
        setExchangeRates(resultsER)
        setLoading(false)
    }

    useEffect(() => {
        getWalletsAndER()
    }, [])

    return (
        <div className='main'>
            <h1 className='title'>IRV WALLETS</h1>
            <h2 className='subTitle'>SECURITIZE CHALLENGE</h2>
            {loading ?
                (<>
                    <Spinner animation="border" />
                </>)
                : (<>
                    <WalletsBody wallets={wallets} exchangeRates={exchangeRates} reFetchER={reFetchER}/>
                </>)}
        </div>
    );
}

export default WalletsHome;