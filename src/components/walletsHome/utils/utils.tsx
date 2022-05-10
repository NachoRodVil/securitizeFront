import axios from "axios";
import { ExchangeRate, Wallet } from "./types";


async function fetchWallets(): Promise<Wallet[]> {
    const data = await axios.get("/wallets");
    return data.data
}

async function fetchER(): Promise<ExchangeRate[]> {
    const data = await axios.get("/exchangeRates");
    return data.data
}

async function updateER(id:string, value: number){
    try{
    const response = await axios.patch(`/exchangeRates/${id}`,{value})
    return response
    } catch(error){
        return error
    }
}

async function updateWalletEth(id:string, eth: number){
    try{
    const response = await axios.patch(`/wallets/eth/${id}`,{eth})
    return response
    } catch(error){
        return error
    }
}

async function updateWalletFav(id:string){
    try{
    const response = await axios.patch(`/wallets/${id}`)
    return response
    } catch(error){
        return error
    }
}

export { fetchWallets, fetchER, updateER, updateWalletEth, updateWalletFav }