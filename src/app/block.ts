export interface blockInterface {
    Index: number,
    Timestamp: string,
    PrevHash: string,
    Hash: string,
    AllData: dataInterface,
    IsGenesis: boolean

}

export interface dataInterface {
    Seller: string,
    Buyer: string,
    Amount: number,
    Price: number
}