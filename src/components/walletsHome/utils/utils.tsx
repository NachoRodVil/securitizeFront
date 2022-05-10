import axios from "axios";
import { ExchangeRate, Wallet } from "./types";

const API_URL = "https://securitize-challenge-api.herokuapp.com/"

async function fetchWallets(): Promise<Wallet[]> {
    const data = await axios.get(`${API_URL}/wallets`);
    return data.data
}

async function fetchER(): Promise<ExchangeRate[]> {
    const data = await axios.get(`${API_URL}/exchangeRates`);
    return data.data
}

async function updateER(id:string, value: number){
    try{
    const response = await axios.patch(`${API_URL}/exchangeRates/${id}`,{value})
    return response
    } catch(error){
        return error
    }
}

async function updateWalletEth(id:string, eth: number){
    try{
    const response = await axios.patch(`${API_URL}/wallets/eth/${id}`,{eth})
    return response
    } catch(error){
        return error
    }
}

async function updateWalletFav(id:string){
    try{
    const response = await axios.patch(`${API_URL}/wallets/${id}`)
    return response
    } catch(error){
        return error
    }
}

export { fetchWallets, fetchER, updateER, updateWalletEth, updateWalletFav }