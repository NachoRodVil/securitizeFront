export interface Wallet {
    id: string;
    owner: string;
    eth: number;
    isFav: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ExchangeRate {
    id: string;
    currency: string;
    value: number;
}